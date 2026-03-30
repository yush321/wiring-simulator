(function () {
    const WIRING_SELECTION_STORAGE_KEY = 'app_wiring_selection_v1';
    const NUMBERING_TUTORIAL_LAYOUT_KEY = 'numbering_tutorial_layout_v1';
    const TUTORIAL_FLOW_TARGET_PREFIX = 'tutorial_flow_target_';
    const TRACKED_SCOPE_KINDS = ['wiring', 'numbering', 'meta'];

    const state = {
        restoredUserId: null,
        restorePromise: null,
        pendingSyncTimers: new Map(),
        applyingServerState: false
    };

    function getAuthApi() {
        return (typeof window !== 'undefined' && window.APP_AUTH) ? window.APP_AUTH : null;
    }

    function getSupabaseClient() {
        return getAuthApi()?.getSupabaseClient?.() || null;
    }

    function getStorage() {
        try {
            return window.localStorage;
        } catch (error) {
            return null;
        }
    }

    function safeGetItem(key) {
        const storage = getStorage();
        if (!storage) return '';
        try {
            return String(storage.getItem(key) || '');
        } catch (error) {
            return '';
        }
    }

    function safeSetItem(key, value) {
        const storage = getStorage();
        if (!storage) return;
        try {
            storage.setItem(key, String(value || ''));
        } catch (error) {}
    }

    function safeRemoveItem(key) {
        const storage = getStorage();
        if (!storage) return;
        try {
            storage.removeItem(key);
        } catch (error) {}
    }

    function parseJson(raw) {
        try {
            return JSON.parse(String(raw || '').trim() || 'null');
        } catch (error) {
            return null;
        }
    }

    function buildPayloadTimestamp(rawValue) {
        const parsed = parseJson(rawValue);
        const updatedAt = parsed && typeof parsed === 'object' ? parsed.updatedAt : '';
        return String(updatedAt || new Date().toISOString());
    }

    function buildEntryFromStorageKey(storageKey, rawValue) {
        const key = String(storageKey || '').trim();
        if (!key) return null;

        if (key === WIRING_SELECTION_STORAGE_KEY) {
            const parsed = parseJson(rawValue);
            const layoutId = String(parsed?.layoutId || '').trim();
            const categoryId = String(parsed?.categoryId || '').trim();
            if (!layoutId) return null;
            return {
                scopeKind: 'wiring',
                scopeKey: 'selection',
                payload: {
                    categoryId,
                    layoutId,
                    updatedAt: String(parsed?.updatedAt || new Date().toISOString())
                }
            };
        }

        if (key === NUMBERING_TUTORIAL_LAYOUT_KEY) {
            const value = String(rawValue || '').trim();
            if (!value) return null;
            return {
                scopeKind: 'numbering',
                scopeKey: 'tutorial_layout',
                payload: {
                    value,
                    updatedAt: buildPayloadTimestamp(rawValue)
                }
            };
        }

        if (key.startsWith(TUTORIAL_FLOW_TARGET_PREFIX)) {
            const major = key.slice(TUTORIAL_FLOW_TARGET_PREFIX.length).trim();
            const value = String(rawValue || '').trim();
            if (!major || !value) return null;
            if (!major) return null;
            return {
                scopeKind: 'meta',
                scopeKey: `tutorial_flow_target:${major}`,
                payload: {
                    value,
                    updatedAt: buildPayloadTimestamp(rawValue)
                }
            };
        }

        return null;
    }

    async function upsertProgressEntry(entry) {
        const auth = getAuthApi();
        const client = getSupabaseClient();
        if (!auth?.isAuthenticated?.() || !client || !entry) return false;

        const { error } = await client.rpc('upsert_learning_progress', {
            p_scope_kind: entry.scopeKind,
            p_scope_key: entry.scopeKey,
            p_payload: entry.payload
        });

        if (error) {
            console.error('Failed to sync progress entry:', entry.scopeKind, entry.scopeKey, error);
            return false;
        }

        return true;
    }

    function syncStorageKey(storageKey, explicitValue) {
        if (state.applyingServerState) return;

        const auth = getAuthApi();
        if (!auth?.isAuthenticated?.()) return;

        const rawValue = explicitValue !== undefined ? explicitValue : safeGetItem(storageKey);
        const entry = buildEntryFromStorageKey(storageKey, rawValue);
        if (!entry) return;

        const timerKey = `${entry.scopeKind}:${entry.scopeKey}`;
        const currentTimer = state.pendingSyncTimers.get(timerKey);
        if (currentTimer) window.clearTimeout(currentTimer);

        const nextTimer = window.setTimeout(() => {
            state.pendingSyncTimers.delete(timerKey);
            void upsertProgressEntry(entry);
        }, 250);

        state.pendingSyncTimers.set(timerKey, nextTimer);
    }

    async function syncAllLocalProgress() {
        const auth = getAuthApi();
        if (!auth?.isAuthenticated?.()) return false;

        const entries = [];
        const storage = getStorage();
        if (!storage) return false;

        const wiringSelection = safeGetItem(WIRING_SELECTION_STORAGE_KEY);
        if (wiringSelection) entries.push(buildEntryFromStorageKey(WIRING_SELECTION_STORAGE_KEY, wiringSelection));

        const numberingLayout = safeGetItem(NUMBERING_TUTORIAL_LAYOUT_KEY);
        if (numberingLayout) entries.push(buildEntryFromStorageKey(NUMBERING_TUTORIAL_LAYOUT_KEY, numberingLayout));

        for (let index = 0; index < storage.length; index += 1) {
            const key = String(storage.key(index) || '').trim();
            if (!key.startsWith(TUTORIAL_FLOW_TARGET_PREFIX)) continue;
            entries.push(buildEntryFromStorageKey(key, safeGetItem(key)));
        }

        for (const entry of entries.filter(Boolean)) {
            await upsertProgressEntry(entry);
        }

        return true;
    }

    function applyServerRowToLocalStorage(row) {
        const payload = row?.payload && typeof row.payload === 'object' ? row.payload : {};
        const scopeKind = String(row?.scope_kind || '').trim();
        const scopeKey = String(row?.scope_key || '').trim();

        if (scopeKind === 'wiring' && scopeKey === 'selection') {
            const layoutId = String(payload.layoutId || '').trim();
            if (!layoutId) return;
            safeSetItem(WIRING_SELECTION_STORAGE_KEY, JSON.stringify({
                categoryId: String(payload.categoryId || '').trim(),
                layoutId,
                updatedAt: String(payload.updatedAt || row.updated_at || new Date().toISOString())
            }));
            return;
        }

        if (scopeKind === 'numbering' && scopeKey === 'tutorial_layout') {
            const value = String(payload.value || '').trim();
            if (!value) return;
            safeSetItem(NUMBERING_TUTORIAL_LAYOUT_KEY, value);
            return;
        }

        if (scopeKind === 'meta' && scopeKey.startsWith('tutorial_flow_target:')) {
            const major = scopeKey.slice('tutorial_flow_target:'.length).trim();
            const value = String(payload.value || '').trim();
            if (!major || !value) return;
            safeSetItem(`${TUTORIAL_FLOW_TARGET_PREFIX}${major}`, value);
        }
    }

    async function restoreProgressFromServer() {
        const auth = getAuthApi();
        const userId = String(auth?.getUser?.()?.id || '').trim();
        const client = getSupabaseClient();
        if (!userId || !client) return false;
        if (state.restorePromise) return state.restorePromise;

        state.restorePromise = (async () => {
            const { data, error } = await client
                .from('user_learning_progress')
                .select('scope_kind, scope_key, payload, updated_at')
                .in('scope_kind', TRACKED_SCOPE_KINDS);

            if (error) {
                console.error('Failed to restore progress from server:', error);
                return false;
            }

            state.applyingServerState = true;
            try {
                (Array.isArray(data) ? data : []).forEach(applyServerRowToLocalStorage);
            } finally {
                state.applyingServerState = false;
            }

            state.restoredUserId = userId;
            window.dispatchEvent(new CustomEvent('app-progress-restored', { detail: { userId } }));
            if (typeof window.applySavedWiringSelection === 'function') {
                window.applySavedWiringSelection();
            }
            return true;
        })().finally(() => {
            state.restorePromise = null;
        });

        return state.restorePromise;
    }

    async function handleAuthSnapshot(snapshot) {
        const userId = String(snapshot?.user?.id || '').trim();
        if (!userId) {
            state.restoredUserId = null;
            return;
        }
        if (state.restoredUserId === userId) return;

        await restoreProgressFromServer();
        await syncAllLocalProgress();
    }

    function initProgressSync() {
        const auth = getAuthApi();
        if (!auth?.addListener) return;

        auth.addListener(snapshot => {
            void handleAuthSnapshot(snapshot);
        });

        const initialSnapshot = auth.getState?.();
        if (initialSnapshot?.authenticated) {
            void handleAuthSnapshot(initialSnapshot);
        }
    }

    window.APP_PROGRESS_SYNC = {
        WIRING_SELECTION_STORAGE_KEY,
        syncStorageKey,
        syncAllLocalProgress,
        restoreProgressFromServer
    };

    initProgressSync();
})();
