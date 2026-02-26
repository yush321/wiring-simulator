    let currentModalPage = 0;

    const NUMBERING_HELP = {
        MCCB: 'MCCB는 1차(상단)와 2차(하단) 번호 흐름을 같이 봐야 합니다.',
        EOCR: 'EOCR은 주회로 번호와 제어 접점 번호가 섞여 있습니다. 번호와 라벨을 같이 확인하세요.',
        X: 'X 릴레이(8P)는 공통/접점 번호를 구분해 외우는 것이 핵심입니다.',
        T: '타이머는 순시/한시 접점이 섞여 있어 동작별 번호 구분이 중요합니다.',
        FLS: 'FLS는 전원 단자와 센서 신호 단자를 분리해서 기억하세요.',
        MC1: 'MC1은 12핀 접촉기로 상단/하단 번호 대응을 먼저 잡고 들어가세요.',
        MC2: 'MC2는 MC1과 같은 구조이므로 비교 학습하면 빠르게 익힐 수 있습니다.',
        FR: 'FR은 공통(C)과 A/B접점을 먼저 찾은 뒤 번호를 맞추는 방식이 좋습니다.',
        FUSE: '퓨즈는 +1/-1, +2/-2 단자를 방향성으로 기억하면 실수를 줄일 수 있습니다.'
    };

    const NUMBERING_CANDIDATES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '+1', '-1', '+2', '-2'];
    const PIN_PRESETS = {
        FUSE_4: {
            componentId: 'FUSE',
            rows: [
                [{ value: '+', label: '상단', sub: '' }, { value: '-', label: '상단', sub: '' }],
                [{ value: '+', label: '하단', sub: '' }, { value: '-', label: '하단', sub: '' }]
            ]
        },
        RL_2: { componentId: 'RL', rows: [[{ value: '+', label: '단자', sub: '' }, { value: '-', label: '단자', sub: '' }]] },
        WL_2: { componentId: 'WL', rows: [[{ value: '+', label: '단자', sub: '' }, { value: '-', label: '단자', sub: '' }]] },
        GL_2: { componentId: 'GL', rows: [[{ value: '+', label: '단자', sub: '' }, { value: '-', label: '단자', sub: '' }]] },
        BZ_2: { componentId: 'BZ', rows: [[{ value: '+', label: '단자', sub: '' }, { value: '-', label: '단자', sub: '' }]] },
        PB0_2: { componentId: 'PB0', rows: [[{ value: 'C', label: '단자', sub: '' }, { value: 'N', label: '단자', sub: '' }]] },
        PB1_2: { componentId: 'PB1', rows: [[{ value: 'O', label: '단자', sub: '' }, { value: 'N', label: '단자', sub: '' }]] },
        SS_3: { componentId: 'SS', rows: [[{ value: 'M', label: '단자', sub: '' }, { value: 'N', label: '단자', sub: '' }, { value: 'A', label: '단자', sub: '' }]] },
        T_8: { componentId: 'T' },
        FR_8: { componentId: 'FR' },
        X_8: { componentId: 'X' },
        FLS_8: { componentId: 'FLS' },
        EOCR_12: { componentId: 'EOCR' },
        MC1_12: { componentId: 'MC1' },
        MC2_12: { componentId: 'MC2' }
    };

    function persistNumberingScenarios() {
        try {
            const key = (typeof NUMBERING_STORAGE_KEY === 'string' && NUMBERING_STORAGE_KEY) || 'numbering_scenarios_v2';
            localStorage.setItem(key, JSON.stringify(NUMBERING_SCENARIOS));
        } catch (e) {
            // ignore storage errors
        }
    }

    const TUTORIAL_STORAGE_KEY = 'tutorial_config_v1';
    const TUTORIAL_NEW_CATEGORY_VALUE = '__new_category__';
    const TUTORIAL_CONFIG_DEFAULT = JSON.parse(JSON.stringify(TUTORIAL_CONFIG || {}));
    const tutorialEditorState = {
        pages: [''],
        activePage: 0
    };
    const tutorialPlaybackState = {
        active: false,
        paused: false,
        edges: [],
        index: 0,
        stepMs: 1100,
        timer: null
    };

    function parseAssignmentObject(rawText, varName) {
        const text = String(rawText || '').trim();
        if (!text) return null;
        if (text.startsWith('{')) return JSON.parse(text);
        const re = new RegExp(`(?:let|const|var)\\s+${varName}\\s*=\\s*([\\s\\S]*?)\\s*;\\s*$`);
        const m = text.match(re);
        if (!m) return JSON.parse(text);
        return JSON.parse(m[1]);
    }

    async function copyTextToClipboard(text) {
        const value = String(text ?? '');
        if (!value) return false;
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(value);
                return true;
            }
        } catch (e) {
            // fallback below
        }
        try {
            const temp = document.createElement('textarea');
            temp.value = value;
            temp.style.position = 'fixed';
            temp.style.opacity = '0';
            document.body.appendChild(temp);
            temp.select();
            const ok = document.execCommand('copy');
            temp.remove();
            return !!ok;
        } catch (e) {
            return false;
        }
    }

    function buildExportStamp(date = new Date()) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        return `${y}${m}${d}-${hh}${mm}${ss}`;
    }

    function buildExportFileName(kind, scope) {
        const safeKind = String(kind || 'data').replace(/[^A-Za-z0-9_-]+/g, '_');
        const safeScope = String(scope || 'all').replace(/[^A-Za-z0-9_-]+/g, '_');
        return `${safeKind}-${safeScope}-${buildExportStamp()}.json`;
    }

    function downloadJsonTextFile(fileName, text) {
        const blob = new Blob([String(text ?? '')], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    function getTutorialNumericIndex(layoutId) {
        const m = String(layoutId || '').match(/^t(\d+)$/i);
        if (!m) return null;
        const n = parseInt(m[1], 10);
        return Number.isFinite(n) ? n : null;
    }

    function getPracticeNumericIndex(layoutId) {
        const m = String(layoutId || '').match(/^(\d+)$/);
        if (!m) return null;
        const n = parseInt(m[1], 10);
        if (!Number.isFinite(n) || n < 1 || n > 18) return null;
        return n;
    }

    function getDefaultTutorialCategory(layoutId) {
        const practiceIdx = getPracticeNumericIndex(layoutId);
        if (practiceIdx !== null) return `public_${practiceIdx}`;
        const idx = getTutorialNumericIndex(layoutId);
        if (idx !== null && idx >= 1 && idx <= 5) return 'main_wiring';
        if (idx !== null && idx >= 6 && idx <= 13) return 'public_1';
        return 'basic_tutorial';
    }

    function getTutorialCategoryMeta(categoryId) {
        const key = String(categoryId || '').trim();
        if (!key) return { id: 'basic_tutorial', label: '기초 튜토리얼', order: 900 };
        if (key === 'main_wiring') return { id: 'main_wiring', label: '주결선', order: 10 };
        if (key === 'basic_tutorial') return { id: 'basic_tutorial', label: '기초 튜토리얼', order: 900 };
        const m = key.match(/^public_(\d+)(?::(.+))?$/);
        if (m) {
            const n = parseInt(m[1], 10);
            if (Number.isFinite(n) && n >= 1 && n <= 18) {
                const sub = String(m[2] || '').trim();
                const subText = sub ? ` > 소분류 ${sub}` : '';
                return { id: key, label: `기초 튜토리얼 > 공개도면 ${n}${subText}`, order: 100 + n };
            }
        }
        return { id: key, label: `기초 튜토리얼 > ${key}`, order: 800 };
    }

    function normalizeTutorialCategory(categoryId, layoutId) {
        const key = String(categoryId || '').trim();
        if (!key) return getDefaultTutorialCategory(layoutId);
        if (key === TUTORIAL_NEW_CATEGORY_VALUE) return getDefaultTutorialCategory(layoutId);
        return key;
    }

    function parseTutorialCategoryParts(categoryId, layoutId) {
        const normalized = normalizeTutorialCategory(categoryId, layoutId);
        const m = String(normalized || '').match(/^(public_\d+)(?::(.+))$/);
        if (m) return { major: m[1], sub: String(m[2] || '').trim() };
        return { major: normalized, sub: '' };
    }

    function composeTutorialCategory(majorId, subId, layoutId) {
        const major = normalizeTutorialCategory(majorId, layoutId);
        const sub = String(subId || '').trim();
        if (/^public_\d+$/.test(major) && sub) return `${major}:${sub}`;
        return major;
    }

    function getPublicMajorFromLayout(layoutId) {
        const key = String(layoutId || '').trim();
        const numeric = key.match(/^(\d+)$/);
        if (numeric) {
            const n = parseInt(numeric[1], 10);
            if (Number.isFinite(n) && n >= 1 && n <= 18) return `public_${n}`;
        }
        const parts = parseTutorialCategoryParts(TUTORIAL_CONFIG[key]?.category, key);
        return /^public_\d+$/.test(parts.major) ? parts.major : '';
    }

    function collectTutorialTargetsByMajor(major) {
        if (!major) return [];
        return Object.keys(TUTORIAL_CONFIG || {})
            .filter(key => /^t\d+$/i.test(String(key)))
            .map(key => {
                const entry = TUTORIAL_CONFIG[key] || {};
                const parts = parseTutorialCategoryParts(entry.category, key);
                return {
                    key: String(key),
                    title: String(entry.title || key),
                    major: String(parts.major || ''),
                    sub: String(parts.sub || '')
                };
            })
            .filter(item => item.major === major)
            .sort((a, b) => {
                const ai = parseInt(a.sub, 10);
                const bi = parseInt(b.sub, 10);
                const aNum = Number.isFinite(ai);
                const bNum = Number.isFinite(bi);
                if (aNum && bNum && ai !== bi) return ai - bi;
                if (a.sub !== b.sub) return a.sub.localeCompare(b.sub, 'ko');
                const ta = parseInt(a.key.replace(/^t/i, ''), 10);
                const tb = parseInt(b.key.replace(/^t/i, ''), 10);
                return ta - tb;
            });
    }

    function getSelectedPracticeTutorialTargetLayoutId(layoutId) {
        const major = getPublicMajorFromLayout(layoutId);
        if (!major || !practiceFlowTargetSelect) return '';
        const selected = String(practiceFlowTargetSelect.value || '').trim();
        if (!/^t\d+$/i.test(selected)) return '';
        const parts = parseTutorialCategoryParts(TUTORIAL_CONFIG[selected]?.category, selected);
        return parts.major === major ? selected : '';
    }

    function refreshPracticeFlowTargetOptions(layoutId = currentLayoutId) {
        if (!practiceFlowTargetSelect || !practiceFlowTargetWrap) return;
        const major = getPublicMajorFromLayout(layoutId);
        if (!major || /^t\d+$/i.test(String(layoutId || '').trim())) {
            practiceFlowTargetWrap.style.display = 'none';
            practiceFlowTargetSelect.innerHTML = '';
            return;
        }
        practiceFlowTargetWrap.style.display = 'flex';
        const targets = collectTutorialTargetsByMajor(major);
        if (!targets.length) {
            practiceFlowTargetSelect.innerHTML = '<option value="">소분류 없음</option>';
            practiceFlowTargetSelect.disabled = true;
            return;
        }
        practiceFlowTargetSelect.disabled = false;
        const storageKey = `tutorial_flow_target_${major}`;
        let selected = '';
        try {
            selected = String(localStorage.getItem(storageKey) || '').trim();
        } catch (e) {
            selected = '';
        }
        if (!targets.some(t => t.key === selected)) {
            const sub1 = targets.find(t => t.sub === '1');
            selected = sub1 ? sub1.key : targets[0].key;
        }
        practiceFlowTargetSelect.innerHTML = targets
            .map(t => `<option value="${t.key}">소분류 ${t.sub || '-'} (${t.key}) - ${t.title}</option>`)
            .join('');
        practiceFlowTargetSelect.value = selected;
        try {
            localStorage.setItem(storageKey, selected);
        } catch (e) {
            // ignore storage errors
        }
        if (practiceFlowTargetSelect.dataset.boundChange !== '1') {
            practiceFlowTargetSelect.addEventListener('change', () => {
                const next = String(practiceFlowTargetSelect.value || '').trim();
                if (!next) return;
                try {
                    localStorage.setItem(storageKey, next);
                } catch (e) {
                    // ignore storage errors
                }
            });
            practiceFlowTargetSelect.dataset.boundChange = '1';
        }
    }

    function rememberTutorialFlowTarget(layoutId, categoryId) {
        const key = String(layoutId || '').trim();
        if (!/^t\d+$/i.test(key)) return;
        const parts = parseTutorialCategoryParts(categoryId, key);
        const major = String(parts.major || '').trim();
        if (!/^public_\d+$/.test(major)) return;
        try {
            localStorage.setItem(`tutorial_flow_target_${major}`, key);
        } catch (e) {
            // ignore storage errors
        }
        refreshPracticeFlowTargetOptions(currentLayoutId);
    }

    function ensureTutorialEditingLayoutId(preferredCategory = '', createIfMissing = true) {
        const currentId = String(currentLayoutId || '').trim();
        if (/^t\d+$/i.test(currentId)) return currentId;

        const practiceIdx = getPracticeNumericIndex(currentId);
        if (practiceIdx === null) return currentId;

        const major = `public_${practiceIdx}`;
        const parts = parseTutorialCategoryParts(preferredCategory || major, currentId);
        const wantedSub = String(parts.sub || '').trim();
        const tutorialKeys = Object.keys(TUTORIAL_CONFIG || {}).filter(key => /^t\d+$/i.test(String(key)));
        const found = tutorialKeys.find(key => {
            const cat = parseTutorialCategoryParts(TUTORIAL_CONFIG[key]?.category, key);
            if (cat.major !== major) return false;
            if (!wantedSub) return true;
            return String(cat.sub || '').trim() === wantedSub;
        });
        if (found) return found;
        if (!createIfMissing) return currentId;

        const newLayoutId = getNextTutorialLayoutId();
        const freshCategory = composeTutorialCategory(major, wantedSub || '1', newLayoutId);
        TUTORIAL_CONFIG[newLayoutId] = {
            title: `튜토리얼 ${newLayoutId}`,
            desc: [''],
            img: './images/images1.png',
            targetIds: [],
            category: freshCategory
        };
        if (!DB_ANSWERS[newLayoutId]) {
            DB_ANSWERS[newLayoutId] = { targets: [], commons: [], nodes: [], tutorialFlow: [], componentFilter: [] };
        }
        persistTutorialConfig();
        if (typeof persistAnswerData === 'function') persistAnswerData();
        return newLayoutId;
    }

    function getTutorialCategoryChoices() {
        const list = [{ id: 'main_wiring', label: '주결선' }];
        for (let i = 1; i <= 18; i += 1) {
            list.push({ id: `public_${i}`, label: `기초 튜토리얼 > 공개도면 ${i}` });
        }
        list.push({ id: 'basic_tutorial', label: '기초 튜토리얼 (기타)' });
        const used = new Set(list.map(item => item.id));
        Object.keys(TUTORIAL_CONFIG || {}).forEach(layoutId => {
            const entry = TUTORIAL_CONFIG[layoutId] || {};
            const category = normalizeTutorialCategory(entry.category, layoutId);
            if (!category || used.has(category)) return;
            const meta = getTutorialCategoryMeta(category);
            list.push({ id: meta.id, label: meta.label, order: meta.order });
            used.add(category);
        });
        list.sort((a, b) => {
            const ma = getTutorialCategoryMeta(a.id);
            const mb = getTutorialCategoryMeta(b.id);
            if (ma.order !== mb.order) return ma.order - mb.order;
            return String(ma.label).localeCompare(String(mb.label), 'ko');
        });
        return list;
    }

    function populateTutorialCategorySelectOptions(selectEl) {
        if (!selectEl) return;
        const keep = String(selectEl.value || '');
        const choices = getTutorialCategoryChoices();
        selectEl.innerHTML = choices
            .map(item => `<option value="${item.id}">${item.label}</option>`)
            .join('');
        selectEl.insertAdjacentHTML('beforeend', `<option value="${TUTORIAL_NEW_CATEGORY_VALUE}">+ 새 카테고리 만들기</option>`);
        if (keep && !choices.some(item => item.id === keep) && keep !== TUTORIAL_NEW_CATEGORY_VALUE) {
            const meta = getTutorialCategoryMeta(keep);
            selectEl.insertAdjacentHTML('beforeend', `<option value="${meta.id}">${meta.label}</option>`);
        }
        if (keep && choices.some(item => item.id === keep)) selectEl.value = keep;
        else if (keep && keep !== TUTORIAL_NEW_CATEGORY_VALUE) selectEl.value = keep;
    }

    function onTutorialCategoryChange() {
        if (!wiringEditorCategory) return;
        if (wiringEditorCategory.value === TUTORIAL_NEW_CATEGORY_VALUE) {
            const input = prompt('새 카테고리 ID를 입력하세요. 예) public_6_extra');
            const next = String(input || '').trim().replace(/\s+/g, '_');
            if (!next) {
                wiringEditorCategory.value = getDefaultTutorialCategory(currentLayoutId);
            } else {
                populateTutorialCategorySelectOptions(wiringEditorCategory);
                if (!Array.from(wiringEditorCategory.options).some(opt => opt.value === next)) {
                    const meta = getTutorialCategoryMeta(next);
                    wiringEditorCategory.insertAdjacentHTML('beforeend', `<option value="${meta.id}">${meta.label}</option>`);
                }
                wiringEditorCategory.value = next;
                setTutorialEditorStatus(`새 카테고리 생성: ${next}`);
            }
        }
        if (wiringEditorSubcategory) {
            const isPublicMajor = /^public_\d+$/.test(String(wiringEditorCategory.value || ''));
            wiringEditorSubcategory.disabled = !isPublicMajor;
            if (!isPublicMajor) wiringEditorSubcategory.value = '';
        }
    }

    function getTutorialSortValue(layoutId) {
        const idx = getTutorialNumericIndex(layoutId);
        if (idx !== null) return idx;
        return Number.MAX_SAFE_INTEGER;
    }

    function getLayoutCategoryByLayoutId(layoutId) {
        const key = String(layoutId || '').trim();
        if (!key) return 'main_wiring';
        const numeric = parseInt(key, 10);
        if (/^\d+$/.test(key) && Number.isFinite(numeric) && numeric >= 1 && numeric <= 18) {
            return `practice_${numeric}`;
        }
        const entry = cloneTutorialEntry(TUTORIAL_CONFIG[key], key);
        const parts = parseTutorialCategoryParts(entry.category, key);
        const tutorialCategory = parts.major;
        if (tutorialCategory === 'main_wiring') return 'main_wiring';
        if (/^public_\d+$/.test(tutorialCategory)) return tutorialCategory;
        return 'public_1';
    }

    function ensureLayoutCategoryOptions(selectedCategory) {
        if (!layoutCategorySelect) return;
        const keep = String(selectedCategory || layoutCategorySelect.value || 'practice_all');
        const choices = [
            { id: 'practice_all', label: '공개도면 전체' }
        ];
        for (let i = 1; i <= 18; i += 1) {
            choices.push({ id: `practice_${i}`, label: `공개도면 ${i}` });
        }
        choices.push({ id: 'main_wiring', label: '주결선' });
        choices.push({ id: 'public_all', label: '보조결선 전체' });
        for (let i = 1; i <= 18; i += 1) {
            choices.push({ id: `public_${i}`, label: `기초튜토리얼 공개도면 ${i}` });
        }
        layoutCategorySelect.innerHTML = choices
            .map(item => `<option value="${item.id}">${item.label}</option>`)
            .join('');
        if (choices.some(item => item.id === keep)) layoutCategorySelect.value = keep;
    }

    function rebuildLayoutSelectOptions(selectedValue) {
        if (!layoutSelect) return;
        const desired = String(selectedValue || currentLayoutId || layoutSelect.value || '');
        const hasExplicitSelectedValue = selectedValue !== undefined && selectedValue !== null && String(selectedValue).trim() !== '';
        const categoryByDesired = hasExplicitSelectedValue && desired ? getLayoutCategoryByLayoutId(desired) : '';
        const activeCategory = categoryByDesired || String(layoutCategorySelect?.value || 'main_wiring');
        ensureLayoutCategoryOptions(activeCategory);

        const currentCategory = String(layoutCategorySelect?.value || activeCategory || 'main_wiring');
        layoutSelect.innerHTML = '';

        if (currentCategory === 'main_wiring' || currentCategory === 'public_all' || /^public_\d+$/.test(currentCategory)) {
            const entries = Object.keys(TUTORIAL_CONFIG || {})
                .map(layoutId => {
                    const entry = cloneTutorialEntry(TUTORIAL_CONFIG[layoutId], layoutId);
                    const category = parseTutorialCategoryParts(entry.category, layoutId).major;
                    return { layoutId, entry, category };
                })
                .filter(item => {
                    if (currentCategory === 'main_wiring') return item.category === 'main_wiring';
                    if (currentCategory === 'public_all') return /^public_\d+$/.test(item.category);
                    return item.category === currentCategory;
                })
                .sort((a, b) => {
                    const ma = String(a.category || '').match(/^public_(\d+)$/);
                    const mb = String(b.category || '').match(/^public_(\d+)$/);
                    const na = ma ? parseInt(ma[1], 10) : 999;
                    const nb = mb ? parseInt(mb[1], 10) : 999;
                    if (na !== nb) return na - nb;
                    const sa = getTutorialSortValue(a.layoutId);
                    const sb = getTutorialSortValue(b.layoutId);
                    if (sa !== sb) return sa - sb;
                    return String(a.layoutId).localeCompare(String(b.layoutId), 'ko');
                });

            entries.forEach(item => {
                const opt = document.createElement('option');
                opt.value = String(item.layoutId);
                opt.innerText = String(item.entry.title || item.layoutId);
                layoutSelect.appendChild(opt);
            });
        } else {
            const m = currentCategory.match(/^practice_(\d+)$/);
            const only = currentCategory === 'practice_all' ? null : (m ? parseInt(m[1], 10) : null);
            for (let i = 1; i <= 18; i += 1) {
                if (only !== null && i !== only) continue;
                const opt = document.createElement('option');
                opt.value = String(i);
                opt.innerText = `공개도면 ${i}번`;
                layoutSelect.appendChild(opt);
            }
        }

        const allOptions = Array.from(layoutSelect.options || []);
        if (desired && allOptions.some(opt => String(opt.value) === desired)) {
            layoutSelect.value = desired;
        } else if (allOptions.length) {
            layoutSelect.selectedIndex = 0;
        }
    }

    function onLayoutCategoryChange() {
        rebuildLayoutSelectOptions();
        if (typeof syncWiringCategoryPresetButtons === 'function') syncWiringCategoryPresetButtons();
        if (layoutSelect && layoutSelect.value && typeof changeLayout === 'function') changeLayout();
    }

    function getWiringCategoryPresetByCategoryId(categoryId) {
        const key = String(categoryId || '').trim();
        if (key === 'main_wiring') return 'main';
        if (key === 'practice_all' || /^practice_\d+$/.test(key)) return 'public_exam';
        return 'aux';
    }

    function pickCategoryValueByPreset(preset) {
        const raw = String(preset || '').trim();
        const options = Array.from(layoutCategorySelect?.options || []).map(opt => String(opt.value));
        const current = String(layoutCategorySelect?.value || '');
        const selectedLayout = String(layoutSelect?.value || currentLayoutId || '').trim();
        let selectedPublicIndex = null;
        if (/^\d+$/.test(selectedLayout)) {
            const n = parseInt(selectedLayout, 10);
            if (Number.isFinite(n) && n >= 1 && n <= 18) selectedPublicIndex = n;
        } else if (/^t\d+$/i.test(selectedLayout)) {
            const major = getPublicMajorFromLayout(selectedLayout);
            const m = String(major || '').match(/^public_(\d+)$/);
            if (m) {
                const n = parseInt(m[1], 10);
                if (Number.isFinite(n) && n >= 1 && n <= 18) selectedPublicIndex = n;
            }
        }
        if (!options.length) return '';
        if (raw === 'main') return options.includes('main_wiring') ? 'main_wiring' : options[0];
        if (raw === 'public_exam') {
            if (selectedPublicIndex !== null && options.includes(`practice_${selectedPublicIndex}`)) {
                return `practice_${selectedPublicIndex}`;
            }
            const mFromAux = current.match(/^public_(\d+)$/);
            if (mFromAux && options.includes(`practice_${mFromAux[1]}`)) return `practice_${mFromAux[1]}`;
            if (/^practice_\d+$/.test(current) && options.includes(current)) return current;
            if (options.includes('practice_all')) return 'practice_all';
            const found = options.find(v => /^practice_\d+$/.test(v));
            return found || options[0];
        }
        if (selectedPublicIndex !== null && options.includes(`public_${selectedPublicIndex}`)) {
            return `public_${selectedPublicIndex}`;
        }
        const mFromPractice = current.match(/^practice_(\d+)$/);
        if (mFromPractice && options.includes(`public_${mFromPractice[1]}`)) return `public_${mFromPractice[1]}`;
        if (/^public_\d+$/.test(current) && options.includes(current)) return current;
        if (options.includes('public_all')) return 'public_all';
        const found = options.find(v => /^public_\d+$/.test(v));
        return found || options[0];
    }

    function syncWiringCategoryPresetButtons() {
        const preset = getWiringCategoryPresetByCategoryId(layoutCategorySelect?.value);
        const map = [
            ['btnWiringMain', 'main'],
            ['btnWiringAux', 'aux'],
            ['btnWiringPublic', 'public_exam']
        ];
        map.forEach(([id, key]) => {
            const btn = document.getElementById(id);
            if (!btn) return;
            if (preset === key) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    function setWiringCategoryPreset(preset) {
        if (!layoutCategorySelect) return;
        ensureLayoutCategoryOptions(layoutCategorySelect.value || 'main_wiring');
        const target = pickCategoryValueByPreset(preset);
        if (!target) return;
        layoutCategorySelect.value = target;
        onLayoutCategoryChange();
        syncWiringCategoryPresetButtons();
    }

    function setPrimaryMode(mode) {
        const next = String(mode || '').trim() === 'numbering' ? 'numbering' : 'wiring';
        const wiringWrap = document.getElementById('wiringControls');
        const numberingWrap = document.getElementById('numberingControls');
        const btnWiring = document.getElementById('btnPrimaryWiring');
        const btnNumberingPrimary = document.getElementById('btnPrimaryNumbering');

        if (wiringWrap) wiringWrap.style.display = next === 'wiring' ? 'flex' : 'none';
        if (numberingWrap) numberingWrap.style.display = next === 'numbering' ? 'flex' : 'none';
        if (btnWiring) btnWiring.classList.toggle('active', next === 'wiring');
        if (btnNumberingPrimary) btnNumberingPrimary.classList.toggle('active', next === 'numbering');

        if (next === 'numbering') {
            if (!isNumberingMode && typeof toggleNumberingMode === 'function') toggleNumberingMode();
        } else if (isNumberingMode && typeof toggleNumberingMode === 'function') {
            toggleNumberingMode();
        }
    }

    function initTopToolbarUI() {
        const root = document.querySelector('.controls');
        if (!root || root.dataset.uiEnhanced === '1') return;

        const infoBtn = root.querySelector('.btn-info');
        const undoBtn = root.querySelector('.btn-undo');
        const resetBtn = root.querySelector('.btn-reset');
        const adminBtn = root.querySelector('.btn-admin');
        const checkBtn = document.getElementById('btnCheck');
        const numberingBtn = document.getElementById('btnNumbering');
        if (!layoutCategorySelect || !layoutSelect || !infoBtn || !undoBtn || !resetBtn || !adminBtn || !checkBtn || !numberingBtn) return;

        root.classList.add('app-toolbar');
        root.innerHTML = '';

        const primaryTabs = document.createElement('div');
        primaryTabs.className = 'primary-tabs';
        primaryTabs.innerHTML = `
            <button id="btnPrimaryWiring" class="tab-btn active" onclick="setPrimaryMode('wiring')">결선</button>
            <button id="btnPrimaryNumbering" class="tab-btn numbering" onclick="setPrimaryMode('numbering')">넘버링</button>
        `;

        const wiringControls = document.createElement('div');
        wiringControls.id = 'wiringControls';
        wiringControls.className = 'toolbar-row';
        wiringControls.innerHTML = `
            <div class="wiring-segmented">
                <button id="btnWiringPublic" class="seg-btn" onclick="setWiringCategoryPreset('public_exam')">공개도면</button>
                <button id="btnWiringMain" class="seg-btn active" onclick="setWiringCategoryPreset('main')">주결선</button>
                <button id="btnWiringAux" class="seg-btn" onclick="setWiringCategoryPreset('aux')">보조결선</button>
            </div>
        `;
        layoutCategorySelect.classList.add('hidden-native');
        wiringControls.appendChild(layoutCategorySelect);
        wiringControls.appendChild(layoutSelect);
        infoBtn.textContent = '설명';
        undoBtn.textContent = '되돌리기';
        wiringControls.appendChild(infoBtn);
        wiringControls.appendChild(undoBtn);
        wiringControls.appendChild(resetBtn);
        wiringControls.appendChild(checkBtn);

        const numberingControls = document.createElement('div');
        numberingControls.id = 'numberingControls';
        numberingControls.className = 'toolbar-row';
        numberingControls.style.display = 'none';
        numberingBtn.textContent = '넘버링 시작';
        const hint = document.createElement('span');
        hint.className = 'toolbar-hint';
        hint.textContent = '넘버링은 결선 튜토리얼과 분리된 전용 학습 모드입니다.';
        numberingControls.appendChild(numberingBtn);
        numberingControls.appendChild(hint);

        const adminRow = document.createElement('div');
        adminRow.className = 'toolbar-row';
        adminBtn.textContent = '관리자';
        adminRow.appendChild(adminBtn);

        root.appendChild(primaryTabs);
        root.appendChild(wiringControls);
        root.appendChild(numberingControls);
        root.appendChild(adminRow);
        root.dataset.uiEnhanced = '1';

        syncWiringCategoryPresetButtons();
        setPrimaryMode(isNumberingMode ? 'numbering' : 'wiring');
    }

    function cloneTutorialEntry(raw, layoutId) {
        const source = (raw && typeof raw === 'object') ? raw : {};
        const fallbackTitle = String(layoutId || '').startsWith('t') ? `튜토리얼 ${layoutId}` : `공개도면 ${layoutId}번`;
        const descList = Array.isArray(source.desc)
            ? source.desc.map(v => String(v ?? ''))
            : [String(source.desc ?? '')];
        return {
            title: String(source.title || fallbackTitle),
            desc: descList.length ? descList : [''],
            img: String(source.img || './images/images1.png'),
            targetIds: Array.isArray(source.targetIds) ? source.targetIds.slice() : [],
            category: normalizeTutorialCategory(source.category, layoutId)
        };
    }

    function updateLayoutOptionTitle(layoutId) {
        rebuildLayoutSelectOptions(layoutId);
    }

    function getNextTutorialLayoutId() {
        const keys = Object.keys(TUTORIAL_CONFIG || {});
        let maxNum = 0;
        keys.forEach(key => {
            const m = String(key).match(/^t(\d+)$/i);
            if (!m) return;
            const n = parseInt(m[1], 10);
            if (Number.isFinite(n)) maxNum = Math.max(maxNum, n);
        });
        let nextNum = maxNum + 1;
        while (TUTORIAL_CONFIG[`t${nextNum}`]) nextNum += 1;
        return `t${nextNum}`;
    }

    function persistTutorialConfig() {
        try {
            localStorage.setItem(TUTORIAL_STORAGE_KEY, JSON.stringify(TUTORIAL_CONFIG));
        } catch (e) {
            // ignore storage errors
        }
    }

    function sanitizeTutorialStoragePatch(raw) {
        const src = (raw && typeof raw === 'object') ? raw : {};
        const out = {};

        if (typeof src.title === 'string' && src.title.trim()) out.title = src.title;
        if (typeof src.img === 'string' && src.img.trim()) out.img = src.img;
        if (typeof src.category === 'string' && src.category.trim()) out.category = src.category;
        if (Array.isArray(src.targetIds)) out.targetIds = src.targetIds.slice();

        if (Array.isArray(src.desc)) {
            const pages = src.desc.map(v => String(v ?? ''));
            if (pages.some(v => v.trim().length > 0)) out.desc = pages;
        } else if (typeof src.desc === 'string' && src.desc.trim()) {
            out.desc = [src.desc];
        }

        return out;
    }

    function loadTutorialConfigFromStorage() {
        try {
            const raw = localStorage.getItem(TUTORIAL_STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return;
            Object.keys(parsed).forEach(layoutId => {
                const patch = sanitizeTutorialStoragePatch(parsed[layoutId]);
                const merged = cloneTutorialEntry({
                    ...(TUTORIAL_CONFIG[layoutId] || {}),
                    ...patch
                }, layoutId);
                const baseTargetIds = Array.isArray(TUTORIAL_CONFIG[layoutId]?.targetIds)
                    ? TUTORIAL_CONFIG[layoutId].targetIds.slice()
                    : [];
                if (!merged.targetIds.length && baseTargetIds.length) {
                    merged.targetIds = baseTargetIds;
                }
                TUTORIAL_CONFIG[layoutId] = merged;
            });
        } catch (e) {
            // ignore parse errors
        }
    }

    loadTutorialConfigFromStorage();

    function setTutorialEditorStatus(msg, color = '#0f766e') {
        if (!wiringEditorStatus) return;
        wiringEditorStatus.textContent = msg || '';
        wiringEditorStatus.style.color = color;
    }

    function normalizeTutorialPages(values) {
        const list = Array.isArray(values) ? values : [values];
        const normalized = list.map(v => String(v ?? ''));
        return normalized.length ? normalized : [''];
    }

    function syncActiveTutorialPageText() {
        if (!wiringEditorPageText) return;
        const idx = tutorialEditorState.activePage;
        tutorialEditorState.pages[idx] = String(wiringEditorPageText.value || '');
    }

    function renderTutorialPreview() {
        if (!wiringEditorPreview) return;
        syncActiveTutorialPageText();
        const idx = tutorialEditorState.activePage;
        const pageHtml = tutorialEditorState.pages[idx] || '';
        const img = String(wiringEditorImage?.value || '').trim();
        const imageHtml = img ? `<img src="${img}" style="max-width:100%; border:1px solid #ddd; border-radius:6px; margin-bottom:8px;">` : '';
        wiringEditorPreview.innerHTML = `${imageHtml}${pageHtml || '<span style="color:#6b7280;">미리보기 내용 없음</span>'}`;
    }

    function renderTutorialPageTabs() {
        if (!wiringEditorPageTabs) return;
        wiringEditorPageTabs.innerHTML = '';
        tutorialEditorState.pages.forEach((_, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `tutorial-page-tab${idx === tutorialEditorState.activePage ? ' active' : ''}`;
            btn.textContent = `${idx + 1}`;
            btn.addEventListener('click', () => {
                syncActiveTutorialPageText();
                tutorialEditorState.activePage = idx;
                renderTutorialEditorPage();
            });
            wiringEditorPageTabs.appendChild(btn);
        });
    }

    function renderTutorialEditorPage() {
        if (!wiringEditorPageText) return;
        const idx = tutorialEditorState.activePage;
        if (wiringEditorActivePageLabel) wiringEditorActivePageLabel.textContent = `페이지 ${idx + 1} 설명`;
        wiringEditorPageText.value = tutorialEditorState.pages[idx] || '';
        renderTutorialPageTabs();
        renderTutorialPreview();
    }

    function renderTutorialEditorPages(count, values = []) {
        const safeCount = Math.max(1, Math.min(300, Number.isFinite(count) ? count : 1));
        const normalized = normalizeTutorialPages(values);
        tutorialEditorState.pages = Array.from({ length: safeCount }, (_, i) => normalized[i] ?? '');
        tutorialEditorState.activePage = Math.max(0, Math.min(tutorialEditorState.activePage, safeCount - 1));
        renderTutorialEditorPage();
    }

    function applyTutorialPageCount() {
        const count = parseInt(wiringEditorPageCount?.value || '1', 10);
        syncActiveTutorialPageText();
        renderTutorialEditorPages(count, tutorialEditorState.pages);
        if (wiringEditorPageCount) wiringEditorPageCount.value = String(Math.max(1, Math.min(300, count || 1)));
        setTutorialEditorStatus('페이지 수를 반영했습니다.');
    }

    function addTutorialEditorPage() {
        syncActiveTutorialPageText();
        const currentCount = Array.isArray(tutorialEditorState.pages) ? tutorialEditorState.pages.length : 0;
        if (currentCount >= 300) {
            if (wiringEditorPageCount) wiringEditorPageCount.value = '300';
            setTutorialEditorStatus('페이지는 최대 300개까지 추가할 수 있습니다.', '#b45309');
            return;
        }
        tutorialEditorState.pages.push('');
        tutorialEditorState.activePage = tutorialEditorState.pages.length - 1;
        if (wiringEditorPageCount) wiringEditorPageCount.value = String(tutorialEditorState.pages.length);
        renderTutorialEditorPage();
        setTutorialEditorStatus(`새 단계 ${tutorialEditorState.pages.length}를 추가했습니다.`);
    }

    function createNewTutorialLayout() {
        const newLayoutId = getNextTutorialLayoutId();
        const currentEntry = cloneTutorialEntry(TUTORIAL_CONFIG[currentLayoutId], currentLayoutId);
        const selectedCategory = composeTutorialCategory(
            wiringEditorCategory?.value,
            wiringEditorSubcategory?.value,
            newLayoutId
        );
        const fresh = {
            title: `튜토리얼 ${newLayoutId}`,
            desc: [''],
            img: String(wiringEditorImage?.value || currentEntry.img || './images/images1.png'),
            targetIds: Array.isArray(currentEntry.targetIds) ? currentEntry.targetIds.slice() : [],
            category: selectedCategory
        };
        TUTORIAL_CONFIG[newLayoutId] = fresh;
        if (!DB_ANSWERS[newLayoutId]) {
            DB_ANSWERS[newLayoutId] = { targets: [], commons: [], nodes: [], tutorialFlow: [], componentFilter: [] };
        }
        persistTutorialConfig();
        if (typeof persistAnswerData === 'function') persistAnswerData();
        rebuildLayoutSelectOptions(newLayoutId);
        if (layoutSelect) layoutSelect.value = newLayoutId;
        currentLayoutId = newLayoutId;
        if (typeof changeLayout === 'function') changeLayout();
        if (wiringEditorTitle) wiringEditorTitle.value = fresh.title;
        if (wiringEditorImage) wiringEditorImage.value = fresh.img;
        if (wiringEditorCategory) {
            populateTutorialCategorySelectOptions(wiringEditorCategory);
            const cat = parseTutorialCategoryParts(fresh.category, newLayoutId);
            wiringEditorCategory.value = cat.major;
            if (wiringEditorSubcategory) {
                wiringEditorSubcategory.value = cat.sub;
                wiringEditorSubcategory.disabled = !/^public_\d+$/.test(cat.major);
            }
        }
        if (wiringEditorPageCount) wiringEditorPageCount.value = '1';
        tutorialEditorState.activePage = 0;
        renderTutorialEditorPages(1, fresh.desc);
        if (wiringEditorJson) wiringEditorJson.value = '';
        setTutorialEditorStatus(`${newLayoutId} 새 튜토리얼을 생성했습니다.`);
    }

    function getTutorialEditorDraft() {
        syncActiveTutorialPageText();
        const title = String(wiringEditorTitle?.value || '').trim() || `튜토리얼 ${currentLayoutId}`;
        const img = String(wiringEditorImage?.value || '').trim() || './images/images1.png';
        const desc = tutorialEditorState.pages.map(v => String(v ?? '').trim());
        const category = composeTutorialCategory(
            wiringEditorCategory?.value,
            wiringEditorSubcategory?.value,
            currentLayoutId
        );
        return {
            title,
            img,
            desc: desc.length ? desc : [''],
            category
        };
    }

    function applyTutorialDraft(layoutId, draft) {
        const base = cloneTutorialEntry(TUTORIAL_CONFIG[layoutId], layoutId);
        const next = {
            ...base,
            title: draft.title || base.title,
            img: draft.img || base.img,
            desc: Array.isArray(draft.desc) && draft.desc.length ? draft.desc : [''],
            category: normalizeTutorialCategory(draft.category, layoutId)
        };
        TUTORIAL_CONFIG[layoutId] = next;
        return next;
    }

    function wrapActiveTutorialText(prefix, suffix) {
        const target = wiringEditorPageText;
        if (!target) return;
        const start = target.selectionStart ?? target.value.length;
        const end = target.selectionEnd ?? target.value.length;
        const before = target.value.slice(0, start);
        const selected = target.value.slice(start, end);
        const after = target.value.slice(end);
        target.value = `${before}${prefix}${selected}${suffix}${after}`;
        const pos = start + prefix.length + selected.length + suffix.length;
        target.focus();
        target.setSelectionRange(pos, pos);
        syncActiveTutorialPageText();
        renderTutorialPreview();
    }

    function insertActiveTutorialText(text) {
        wrapActiveTutorialText(text, '');
    }

    function openTutorialEditorModal() {
        if (!isAdminMode) {
            alert('관리자 모드에서만 편집기를 열 수 있어.');
            return;
        }
        const preferredCategory = composeTutorialCategory(
            wiringEditorCategory?.value || getDefaultTutorialCategory(currentLayoutId),
            wiringEditorSubcategory?.value,
            currentLayoutId
        );
        const layoutId = ensureTutorialEditingLayoutId(preferredCategory, true);
        currentLayoutId = layoutId;
        rebuildLayoutSelectOptions(layoutId);
        if (layoutSelect) layoutSelect.value = layoutId;
        const entry = cloneTutorialEntry(TUTORIAL_CONFIG[layoutId], layoutId);
        if (wiringEditorTitle) wiringEditorTitle.value = entry.title;
        if (wiringEditorImage) wiringEditorImage.value = entry.img;
        if (wiringEditorCategory) {
            populateTutorialCategorySelectOptions(wiringEditorCategory);
            const cat = parseTutorialCategoryParts(entry.category, layoutId);
            wiringEditorCategory.value = cat.major;
            if (wiringEditorSubcategory) {
                wiringEditorSubcategory.value = cat.sub;
                wiringEditorSubcategory.disabled = !/^public_\d+$/.test(cat.major);
            }
        }
        if (wiringEditorPageCount) wiringEditorPageCount.value = String(entry.desc.length || 1);
        tutorialEditorState.activePage = 0;
        renderTutorialEditorPages(entry.desc.length || 1, entry.desc);
        if (wiringEditorJson) wiringEditorJson.value = '';
        if (wiringEditorPageText && wiringEditorPageText.dataset.boundInput !== '1') {
            wiringEditorPageText.addEventListener('input', () => {
                syncActiveTutorialPageText();
                renderTutorialPreview();
            });
            wiringEditorPageText.dataset.boundInput = '1';
        }
        if (wiringEditorImage && wiringEditorImage.dataset.boundInput !== '1') {
            wiringEditorImage.addEventListener('input', () => renderTutorialPreview());
            wiringEditorImage.dataset.boundInput = '1';
        }
        if (wiringEditorCategory && wiringEditorCategory.dataset.boundChange !== '1') {
            wiringEditorCategory.addEventListener('change', onTutorialCategoryChange);
            wiringEditorCategory.dataset.boundChange = '1';
        }
        setTutorialEditorStatus('');
        if (tutorialEditorModal) tutorialEditorModal.style.display = 'flex';
    }

    function closeTutorialEditorModal() {
        if (tutorialEditorModal) tutorialEditorModal.style.display = 'none';
    }

    function saveTutorialEditor() {
        const preferredCategory = composeTutorialCategory(
            wiringEditorCategory?.value,
            wiringEditorSubcategory?.value,
            currentLayoutId
        );
        const layoutId = ensureTutorialEditingLayoutId(preferredCategory, true);
        if (!layoutId) return;
        currentLayoutId = layoutId;
        const draft = getTutorialEditorDraft();
        applyTutorialDraft(layoutId, draft);
        rememberTutorialFlowTarget(layoutId, draft.category);
        persistTutorialConfig();
        updateLayoutOptionTitle(layoutId);
        if (layoutSelect) layoutSelect.value = layoutId;
        setTutorialEditorStatus(`${layoutId} 튜토리얼 저장 완료`);
    }

    function previewTutorialEditor() {
        saveTutorialEditor();
        closeTutorialEditorModal();
        openModal();
    }

    async function exportTutorialScenario() {
        saveTutorialEditor();
        const payload = JSON.parse(JSON.stringify(TUTORIAL_CONFIG || {}));
        const out = JSON.stringify(payload, null, 2);
        const fileName = buildExportFileName('tutorial', 'all');
        if (wiringEditorJson) {
            wiringEditorJson.value = out;
            wiringEditorJson.select();
        }
        downloadJsonTextFile(fileName, out);
        const copied = await copyTextToClipboard(out);
        setTutorialEditorStatus(
            copied
                ? `결선튜토리얼 JSON 내보내기 완료 (${fileName}) + 자동 복사 완료`
                : `결선튜토리얼 JSON 내보내기 완료 (${fileName}, 복사는 수동)`
        );
    }

    function importTutorialScenario() {
        const layoutId = String(currentLayoutId || '');
        const text = String(wiringEditorJson?.value || '').trim();
        if (!text) return;
        try {
            const data = parseAssignmentObject(text, 'TUTORIAL_CONFIG');
            if (!data || typeof data !== 'object' || Array.isArray(data)) {
                alert('형식이 올바르지 않아. (title/desc/img), ({layoutId:{...}}), 또는 let TUTORIAL_CONFIG = {...}; 형태가 필요해.');
                return;
            }

            // Single-layout object support: {title,desc,img,...}
            const looksLikeSingle = Array.isArray(data.desc) || typeof data.title === 'string' || typeof data.img === 'string';
            if (looksLikeSingle) {
                const entry = cloneTutorialEntry(data, layoutId);
                const existing = cloneTutorialEntry(TUTORIAL_CONFIG[layoutId], layoutId);
                if (!entry.targetIds.length && existing.targetIds.length) {
                    entry.targetIds = existing.targetIds.slice();
                }
                TUTORIAL_CONFIG[layoutId] = entry;
            } else {
                // Full config object support: { t1:{...}, t2:{...}, ... }
                Object.keys(data).forEach(key => {
                    const src = data[key];
                    if (!src || typeof src !== 'object') return;
                    const entry = cloneTutorialEntry(src, key);
                    const existing = cloneTutorialEntry(TUTORIAL_CONFIG[key], key);
                    if (!entry.targetIds.length && existing.targetIds.length) {
                        entry.targetIds = existing.targetIds.slice();
                    }
                    TUTORIAL_CONFIG[key] = entry;
                });
            }

            persistTutorialConfig();
            rebuildLayoutSelectOptions(layoutId);

            const entry = cloneTutorialEntry(TUTORIAL_CONFIG[layoutId], layoutId);
            if (wiringEditorTitle) wiringEditorTitle.value = entry.title;
            if (wiringEditorImage) wiringEditorImage.value = entry.img;
            if (wiringEditorCategory) {
                populateTutorialCategorySelectOptions(wiringEditorCategory);
                const cat = parseTutorialCategoryParts(entry.category, layoutId);
                wiringEditorCategory.value = cat.major;
                if (wiringEditorSubcategory) {
                    wiringEditorSubcategory.value = cat.sub;
                    wiringEditorSubcategory.disabled = !/^public_\d+$/.test(cat.major);
                }
            }
            if (wiringEditorPageCount) wiringEditorPageCount.value = String(entry.desc.length || 1);
            tutorialEditorState.activePage = 0;
            renderTutorialEditorPages(entry.desc.length || 1, entry.desc);
            setTutorialEditorStatus('결선튜토리얼 JSON 불러오기 완료');
        } catch (e) {
            alert('JSON 파싱 실패: 형식을 확인해줘.');
        }
    }

    function resetTutorialLocalStorage() {
        const ok = confirm('튜토리얼 로컬 저장 데이터를 초기화하고 기본값으로 되돌릴까?');
        if (!ok) return;

        try {
            localStorage.removeItem(TUTORIAL_STORAGE_KEY);
        } catch (e) {
            // ignore storage errors
        }

        Object.keys(TUTORIAL_CONFIG).forEach(key => { delete TUTORIAL_CONFIG[key]; });
        Object.assign(TUTORIAL_CONFIG, JSON.parse(JSON.stringify(TUTORIAL_CONFIG_DEFAULT || {})));
        rebuildLayoutSelectOptions(currentLayoutId);

        const current = cloneTutorialEntry(TUTORIAL_CONFIG[currentLayoutId], currentLayoutId);
        if (wiringEditorTitle) wiringEditorTitle.value = current.title;
        if (wiringEditorImage) wiringEditorImage.value = current.img;
        if (wiringEditorCategory) {
            populateTutorialCategorySelectOptions(wiringEditorCategory);
            const cat = parseTutorialCategoryParts(current.category, currentLayoutId);
            wiringEditorCategory.value = cat.major;
            if (wiringEditorSubcategory) {
                wiringEditorSubcategory.value = cat.sub;
                wiringEditorSubcategory.disabled = !/^public_\d+$/.test(cat.major);
            }
        }
        if (wiringEditorPageCount) wiringEditorPageCount.value = String(current.desc.length || 1);
        tutorialEditorState.activePage = 0;
        renderTutorialEditorPages(current.desc.length || 1, current.desc);
        setTutorialEditorStatus('튜토리얼 로컬 저장 초기화 완료');
    }

    function buildTutorialModalPageHtml(data, pageHtml) {
        const body = String(pageHtml ?? '');
        const hasInlineImage = /<img\b/i.test(body);
        const rawSrc = String(data?.img || '').trim().replace(/^['"]|['"]$/g, '');
        if (!rawSrc || hasInlineImage) return body;
        const normalizedSrc = rawSrc.replace(/\\/g, '/');
        const imageBlock = `<img src="${normalizedSrc}" alt="튜토리얼 이미지" style="max-width:100%; height:auto; border:1px solid #ccc; margin:10px 0; border-radius:5px;">`;
        return `${imageBlock}${body}`;
    }

    function updateModalContent() {
        const data = TUTORIAL_CONFIG[currentLayoutId];
        if (!data) return;

        const pages = Array.isArray(data.desc) ? data.desc : [data.desc];
        modalBody.innerHTML = buildTutorialModalPageHtml(data, pages[currentModalPage]);

        const indicator = document.getElementById('pageIndicator');
        if (pages.length > 1) {
            modalTitle.innerText = `${data.title} (${currentModalPage + 1}/${pages.length})`;
            indicator.innerText = `${currentModalPage + 1} / ${pages.length}`;
            indicator.style.display = 'inline-block';
        } else {
            modalTitle.innerText = data.title;
            indicator.style.display = 'none';
        }

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const startBtn = document.getElementById('startBtn');
        const playBtn = document.getElementById('playBtn');
        const playSpeedSelect = document.getElementById('playSpeedSelect');
        if (playBtn) {
            const canPlay = hasTutorialPlayableFlow(currentLayoutId);
            playBtn.style.display = 'inline-block';
            playBtn.disabled = !canPlay;
            if (playSpeedSelect) {
                playSpeedSelect.style.display = 'inline-block';
                playSpeedSelect.disabled = !canPlay;
            }
        }

        if (pages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            startBtn.style.display = 'inline-block';
            return;
        }

        prevBtn.style.display = currentModalPage === 0 ? 'none' : 'inline-block';
        prevBtn.disabled = currentModalPage === 0;

        if (currentModalPage === pages.length - 1) {
            nextBtn.style.display = 'none';
            startBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            startBtn.style.display = 'none';
        }
    }

    function changePage(direction) {
        const data = TUTORIAL_CONFIG[currentLayoutId];
        const pages = Array.isArray(data.desc) ? data.desc : [data.desc];

        currentModalPage += direction;
        if (currentModalPage < 0) currentModalPage = 0;
        if (currentModalPage >= pages.length) currentModalPage = pages.length - 1;

        updateModalContent();
    }

    function openModal() {
        currentLayoutId = document.getElementById('layoutSelect')?.value || currentLayoutId;
        currentModalPage = 0;

        const data = TUTORIAL_CONFIG[currentLayoutId];
        if (data) {
            modalBody.innerHTML = '';
            updateModalContent();
            infoModal.style.display = 'flex';
            return;
        }

        modalTitle.innerText = `공개도면 ${currentLayoutId}번`;
        modalBody.innerHTML = '<p>실전 문제입니다. 전체 회로를 구성하세요.</p>';
        document.getElementById('prevBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('pageIndicator').style.display = 'none';
        document.getElementById('startBtn').style.display = 'inline-block';
        const playBtn = document.getElementById('playBtn');
        const playSpeedSelect = document.getElementById('playSpeedSelect');
        if (playBtn) playBtn.style.display = 'none';
        if (playSpeedSelect) playSpeedSelect.style.display = 'none';
        infoModal.style.display = 'flex';
    }

    function closeModal(id) {
        document.getElementById(id).style.display = 'none';
    }

    function getPlaybackAnswerCandidates(layoutId) {
        const key = String(layoutId || '').trim();
        const out = [];
        const push = v => {
            const s = String(v || '').trim();
            if (!s || out.includes(s)) return;
            out.push(s);
        };
        push(key);

        if (/^t\d+$/i.test(key)) {
            const parts = parseTutorialCategoryParts(TUTORIAL_CONFIG[key]?.category, key);
            const m = String(parts.major || '').match(/^public_(\d+)$/);
            if (m) push(m[1]);
        } else if (/^\d+$/.test(key)) {
            const selected = getSelectedPracticeTutorialTargetLayoutId(key);
            if (selected) push(selected);
            const n = parseInt(key, 10);
            if (Number.isFinite(n) && n >= 1 && n <= 18) {
                const major = `public_${n}`;
                Object.keys(TUTORIAL_CONFIG || {})
                    .filter(k => /^t\d+$/i.test(String(k)))
                    .forEach(k => {
                        const parts = parseTutorialCategoryParts(TUTORIAL_CONFIG[k]?.category, k);
                        if (parts.major === major) push(k);
                    });
            }
        }
        return out;
    }

    function getLayoutPlaybackEdges(layoutId) {
        const candidates = getPlaybackAnswerCandidates(layoutId);
        for (const key of candidates) {
            const ans = DB_ANSWERS[key] || {};
            if (Array.isArray(ans.tutorialFlow) && ans.tutorialFlow.length) {
                const edges = ans.tutorialFlow
                    .map(item => {
                        if (Array.isArray(item) && item.length >= 2) {
                            return [String(item[0]), String(item[1])];
                        }
                        if (item && typeof item === 'object' && item.from && item.to) {
                            return [String(item.from), String(item.to)];
                        }
                        return null;
                    })
                    .filter(v => Array.isArray(v) && v[0] && v[1]);
                if (edges.length) return edges;
            }

            if (Array.isArray(ans.nodes) && ans.nodes.length) {
                const edges = ans.nodes.flatMap(node =>
                    (node.visuals || [])
                        .filter(v => Array.isArray(v) && v.length >= 2)
                        .map(v => [String(v[0]), String(v[1])])
                );
                if (edges.length) return edges;
            }

            if (Array.isArray(ans.targets) && ans.targets.length) {
                const edges = ans.targets
                    .filter(v => Array.isArray(v) && v.length >= 2)
                    .map(v => [String(v[0]), String(v[1])]);
                if (edges.length) return edges;
            }
        }
        return [];
    }

    function hasTutorialPlayableFlow(layoutId) {
        return getLayoutPlaybackEdges(layoutId).length > 0;
    }

    function updatePlaybackControlPanel() {
        if (!playbackControls) return;
        playbackControls.style.display = tutorialPlaybackState.active ? 'block' : 'none';
        if (playbackProgress) {
            const total = tutorialPlaybackState.edges.length;
            const current = Math.min(tutorialPlaybackState.index, total);
            const mode = tutorialPlaybackState.paused ? '일시정지' : '재생';
            playbackProgress.textContent = tutorialPlaybackState.active
                ? `${mode} ${current}/${total}`
                : '재생 대기';
        }
    }

    function drawPlaybackEdge(edge, edgeIndex, total) {
        const fromId = String(edge?.[0] ?? '');
        const toId = String(edge?.[1] ?? '');
        const fromPin = allPins.find(p => p.id === fromId);
        const toPin = allPins.find(p => p.id === toId);
        if (!fromPin || !toPin) return false;

        const duplicate = wires.some(w =>
            (w.start.id === fromId && w.end.id === toId) || (w.start.id === toId && w.end.id === fromId)
        );
        if (duplicate) return false;

        const offset = (typeof getRecommendedWireOffset === 'function')
            ? getRecommendedWireOffset(fromPin, toPin)
            : 0;
        wires.push({ start: fromPin, end: toPin, offset });
        fromPin.connections = (fromPin.connections || 0) + 1;
        toPin.connections = (toPin.connections || 0) + 1;
        if (statusMsg) {
            statusMsg.textContent = `결선 재생 ${edgeIndex + 1}/${total}`;
            statusMsg.style.color = '#fd7e14';
        }
        draw();
        return true;
    }

    function finishTutorialFlowPlayback() {
        tutorialPlaybackState.active = false;
        tutorialPlaybackState.paused = false;
        if (tutorialPlaybackState.timer) {
            clearTimeout(tutorialPlaybackState.timer);
            tutorialPlaybackState.timer = null;
        }
        if (statusMsg) {
            statusMsg.textContent = `결선 재생 완료 (${tutorialPlaybackState.edges.length}개)`;
            statusMsg.style.color = '#17a2b8';
        }
        updatePlaybackControlPanel();
    }

    function scheduleTutorialFlowPlayback() {
        if (!tutorialPlaybackState.active || tutorialPlaybackState.paused) return;
        if (tutorialPlaybackState.index >= tutorialPlaybackState.edges.length) {
            finishTutorialFlowPlayback();
            return;
        }
        const edgeIndex = tutorialPlaybackState.index;
        const edge = tutorialPlaybackState.edges[edgeIndex];
        drawPlaybackEdge(edge, edgeIndex, tutorialPlaybackState.edges.length);
        tutorialPlaybackState.index += 1;
        updatePlaybackControlPanel();
        if (tutorialPlaybackState.index >= tutorialPlaybackState.edges.length) {
            finishTutorialFlowPlayback();
            return;
        }
        tutorialPlaybackState.timer = setTimeout(scheduleTutorialFlowPlayback, tutorialPlaybackState.stepMs);
    }

    function stopTutorialFlowPlayback() {
        const wasActive = tutorialPlaybackState.active || !!tutorialPlaybackState.timer || tutorialPlaybackState.edges.length > 0;
        if (tutorialPlaybackState.timer) {
            clearTimeout(tutorialPlaybackState.timer);
            tutorialPlaybackState.timer = null;
        }
        tutorialPlaybackState.active = false;
        tutorialPlaybackState.paused = false;
        tutorialPlaybackState.index = 0;
        tutorialPlaybackState.edges = [];
        if (wasActive && statusMsg) {
            statusMsg.textContent = '결선 재생 중지';
            statusMsg.style.color = '#fff';
        }
        updatePlaybackControlPanel();
    }

    function pauseTutorialFlowPlayback() {
        if (!tutorialPlaybackState.active) return;
        tutorialPlaybackState.paused = true;
        if (tutorialPlaybackState.timer) {
            clearTimeout(tutorialPlaybackState.timer);
            tutorialPlaybackState.timer = null;
        }
        updatePlaybackControlPanel();
    }

    function resumeTutorialFlowPlayback() {
        if (!tutorialPlaybackState.active) return;
        if (!tutorialPlaybackState.paused) return;
        tutorialPlaybackState.paused = false;
        updatePlaybackControlPanel();
        scheduleTutorialFlowPlayback();
    }

    function stepTutorialFlowPlayback() {
        if (!tutorialPlaybackState.active || !tutorialPlaybackState.paused) return;
        if (tutorialPlaybackState.index >= tutorialPlaybackState.edges.length) {
            finishTutorialFlowPlayback();
            return;
        }
        const edgeIndex = tutorialPlaybackState.index;
        const edge = tutorialPlaybackState.edges[edgeIndex];
        drawPlaybackEdge(edge, edgeIndex, tutorialPlaybackState.edges.length);
        tutorialPlaybackState.index += 1;
        updatePlaybackControlPanel();
        if (tutorialPlaybackState.index >= tutorialPlaybackState.edges.length) {
            finishTutorialFlowPlayback();
        }
    }

    function playTutorialFlowFromModal() {
        if (typeof allPins === 'undefined' || typeof wires === 'undefined') return;
        if (typeof draw !== 'function') return;

        const playSpeedSelect = document.getElementById('playSpeedSelect');
        const edges = getLayoutPlaybackEdges(currentLayoutId);
        if (!edges.length) {
            alert('재생할 결선 데이터가 없습니다. 관리자 모드에서 결선을 저장해 주세요.');
            return;
        }

        // 재생 시작 시 안내 팝업은 자동으로 닫고 캔버스에서 진행 상태를 보여준다.
        closeModal('infoModal');

        stopTutorialFlowPlayback();

        if (typeof resetWires === 'function') resetWires();

        const selectedMs = parseInt(playSpeedSelect?.value || '1100', 10);
        tutorialPlaybackState.stepMs = Number.isFinite(selectedMs) && selectedMs > 50 ? selectedMs : 1100;
        tutorialPlaybackState.edges = edges.slice();
        tutorialPlaybackState.index = 0;
        tutorialPlaybackState.active = true;
        tutorialPlaybackState.paused = false;
        updatePlaybackControlPanel();
        if (statusMsg) {
            statusMsg.textContent = '결선 재생 준비중...';
            statusMsg.style.color = '#f59e0b';
        }
        const startDelayMs = 700;
        tutorialPlaybackState.timer = setTimeout(() => {
            tutorialPlaybackState.timer = null;
            if (!tutorialPlaybackState.active || tutorialPlaybackState.paused) return;
            scheduleTutorialFlowPlayback();
        }, startDelayMs);
    }

    function getTutorialPinList() {
        const pinMap = new Map();
        allPins.forEach(pin => {
            if (!pinMap.has(pin.id)) {
                pinMap.set(pin.id, {
                    id: pin.id,
                    parentId: pin.parentId,
                    number: String(pin.num),
                    label: pin.label || ''
                });
            }
        });
        return Array.from(pinMap.values()).sort((a, b) => a.id.localeCompare(b.id, 'ko'));
    }

    function shuffleArray(list) {
        const arr = list.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function buildChoiceSet(correct, baseChoices) {
        const pick = new Set([String(correct)]);
        baseChoices.forEach(v => pick.add(String(v)));
        for (const v of NUMBERING_CANDIDATES) {
            if (pick.size >= 6) break;
            pick.add(v);
        }
        return shuffleArray(Array.from(pick)).slice(0, 6);
    }

    const DEFAULT_NUMBERING_IMAGE = './images/images1.png';
    const NUMBERING_TUTORIAL_LAYOUT_KEY = 'numbering_tutorial_layout_v1';

    function getNumberingScenarioKeys() {
        return Object.keys(NUMBERING_SCENARIOS || {})
            .filter(key => {
                const s = NUMBERING_SCENARIOS[key];
                return !!(s && Array.isArray(s.stages) && s.stages.length > 0);
            })
            .sort((a, b) => String(a).localeCompare(String(b), 'ko'));
    }

    function resolveNumberingLayoutId() {
        const keys = getNumberingScenarioKeys();
        if (!keys.length) return '';
        let saved = '';
        try {
            saved = String(localStorage.getItem(NUMBERING_TUTORIAL_LAYOUT_KEY) || '').trim();
        } catch (e) {
            saved = '';
        }
        if (saved && keys.includes(saved)) return saved;
        if (keys.includes('t1')) return 't1';
        return keys[0];
    }

    function rememberNumberingLayoutId(layoutId) {
        const key = String(layoutId || '').trim();
        if (!key) return;
        try {
            localStorage.setItem(NUMBERING_TUTORIAL_LAYOUT_KEY, key);
        } catch (e) {
            // ignore storage errors
        }
    }

    function getNumberingBaseImage(layoutId) {
        const key = String(layoutId || '').trim();
        const candidate = String(NUMBERING_SCENARIOS?.[key]?.image || '').trim();
        return candidate || DEFAULT_NUMBERING_IMAGE;
    }

    function getScenarioForLayout(layoutId) {
        const s = NUMBERING_SCENARIOS[layoutId];
        if (!s || !Array.isArray(s.stages)) return null;
        return s;
    }

    function createFallbackStages() {
        const pinList = getTutorialPinList();
        const targetImage = getNumberingBaseImage(currentLayoutId);

        return currentComponents
            .filter(comp => !comp.id.startsWith('TB_'))
            .map(comp => {
                const stagePins = pinList.filter(pin => pin.parentId === comp.id);
                if (!stagePins.length) return null;

                const baseChoices = Array.from(new Set(stagePins.map(pin => pin.number)));
                const questions = stagePins.map((pin, idx) => ({
                    pinId: `${comp.id}_${idx}`,
                    label: pin.label || pin.id,
                    answer: String(pin.number),
                    choices: buildChoiceSet(pin.number, baseChoices),
                    inputMode: 'choice'
                }));

                return {
                    componentId: comp.id,
                    title: comp.label || comp.id,
                    guide: NUMBERING_HELP[comp.id] || `${comp.id}의 핀 번호를 동작 기준으로 확인하세요.`,
                    image: targetImage,
                    inputMode: 'choice',
                    allowReverse: stageAllowsReverse({ componentId: comp.id }),
                    orderMode: 'horizontal',
                    rect: null,
                    questions
                };
            })
            .filter(Boolean);
    }

    function normalizeScenarioStages(stages, fallbackImage) {
        const splitAnswerTokens = raw => {
            const text = String(raw ?? '').trim();
            if (!text) return [];
            if (!text.includes(',')) return [text];
            return text.split(',').map(v => v.trim()).filter(Boolean);
        };

        return stages.map((stage, stageIndex) => {
            const questions = (stage.questions || []).flatMap((q, qIdx) => {
                const tokens = splitAnswerTokens(q.answer);
                if (!tokens.length) return [];
                if (tokens.length === 1) {
                    return [{
                        pinId: q.pinId || `${stage.componentId || 'STAGE'}_${stageIndex}_${qIdx}`,
                        label: q.label || `핀 ${qIdx + 1}`,
                        answer: tokens[0],
                        choices: (q.choices || []).map(String),
                        inputMode: q.inputMode || stage.inputMode || 'choice'
                    }];
                }
                return tokens.map((ans, tokenIdx) => ({
                    pinId: `${q.pinId || `${stage.componentId || 'STAGE'}_${stageIndex}_${qIdx}`}_${tokenIdx + 1}`,
                    label: `${q.label || `핀 ${qIdx + 1}`} ${tokenIdx + 1}`,
                    answer: ans,
                    choices: (q.choices || []).map(String),
                    inputMode: q.inputMode || stage.inputMode || 'choice'
                }));
            });

            return {
                componentId: stage.componentId || `STAGE_${stageIndex + 1}`,
                title: stage.title || stage.componentId || `단계 ${stageIndex + 1}`,
                guide: stage.guide || '해당 영역의 핀 번호를 확인하세요.',
                image: stage.image || fallbackImage,
                inputMode: stage.inputMode || 'choice',
                allowReverse: typeof stage.allowReverse === 'boolean' ? stage.allowReverse : undefined,
                orderMode: stage.orderMode || 'horizontal',
                rect: stage.rect || null,
                questions
            };
        }).filter(stage => stage.questions.length > 0);
    }

    function createNumberingStages(layoutId) {
        const scenario = getScenarioForLayout(layoutId);
        if (!scenario) return [];
        const fallbackImage = scenario.image || getNumberingBaseImage(layoutId);
        // Strict isolation: numbering runs only from authored numbering scenario data.
        // Do not derive stages from current tutorial components/pins.
        return normalizeScenarioStages(scenario.stages, fallbackImage);
    }

    function getCurrentNumberingQuestion() {
        if (!numberingSession) return null;
        const stage = numberingSession.stages[numberingSession.stageIndex];
        if (!stage) return null;
        const progress = getStageProgress(numberingSession.stageIndex);
        const idx = progress.entries.length;
        const sequences = getStageCandidateSequences(stage);
        const activeSeq = progress.selectedSequence || progress.candidateSequences?.[0] || sequences[0];
        const expectedAnswer = activeSeq?.answers?.[idx];
        if (!expectedAnswer) return stage.questions[idx] || null;
        const used = new Set(progress.usedPinIds || []);
        return (stage.questions || []).find(q => String(q.answer ?? '').trim() === expectedAnswer && !used.has(q.pinId))
            || stage.questions[idx]
            || null;
    }

    function getSolvedCount() {
        return numberingSession ? numberingSession.completed.size : 0;
    }

    function getStageProgress(stageIndex) {
        if (!numberingSession) return { entries: [], direction: null };
        const idx = Number.isInteger(stageIndex) ? stageIndex : numberingSession.stageIndex;
        if (!numberingSession.stageProgress[idx]) {
            numberingSession.stageProgress[idx] = {
                entries: [],
                direction: null,
                usedPinIds: [],
                candidateSequences: null,
                selectedSequence: null
            };
        }
        return numberingSession.stageProgress[idx];
    }

    function getStageExpectedAnswers(stage) {
        return (stage?.questions || []).map(q => String(q.answer ?? '').trim());
    }

    function stageAllowsReverse(stage) {
        if (!stage) return false;
        if (typeof stage.allowReverse === 'boolean') return stage.allowReverse;
        const compId = String(stage.componentId || '').trim().toUpperCase();
        return compId === 'T' || compId === 'X' || compId === 'FR';
    }

    function getStageOrderMode(stage) {
        const mode = String(stage?.orderMode || 'horizontal').toLowerCase();
        if (mode === 'vertical' || mode === 'both') return mode;
        return 'horizontal';
    }

    function dedupeSequenceValues(values) {
        const out = [];
        values.forEach(v => {
            const s = String(v ?? '').trim();
            if (!s || out.includes(s)) return;
            out.push(s);
        });
        return out;
    }

    function getOrderedPinValuesByMode(stage, mode) {
        const rows = getStageRows(stage);
        if (!rows.length) return [];
        if (mode === 'vertical') {
            const maxLen = Math.max(...rows.map(r => r.length));
            const seq = [];
            for (let c = 0; c < maxLen; c++) {
                for (let r = 0; r < rows.length; r++) {
                    const pin = rows[r][c];
                    if (!pin || pin.value == null) continue;
                    seq.push(String(pin.value));
                }
            }
            return dedupeSequenceValues(seq);
        }
        const seq = [];
        rows.forEach(row => row.forEach(pin => {
            if (!pin || pin.value == null) return;
            seq.push(String(pin.value));
        }));
        return dedupeSequenceValues(seq);
    }

    function projectAnswersByOrder(stage, answers, mode) {
        const orderedPins = getOrderedPinValuesByMode(stage, mode);
        if (!orderedPins.length) return null;
        const counts = new Map();
        answers.forEach(v => counts.set(v, (counts.get(v) || 0) + 1));
        const out = [];
        orderedPins.forEach(v => {
            const c = counts.get(v) || 0;
            if (c <= 0) return;
            out.push(v);
            counts.set(v, c - 1);
        });
        return out.length === answers.length ? out : null;
    }

    function uniqueSequenceList(items) {
        const seen = new Set();
        const out = [];
        items.forEach(item => {
            const key = `${item.mode}|${item.reverse ? 'R' : 'F'}|${item.answers.join('>')}`;
            if (seen.has(key)) return;
            seen.add(key);
            out.push(item);
        });
        return out;
    }

    function getStageCandidateSequences(stage) {
        const answers = getStageExpectedAnswers(stage);
        if (!answers.length) return [];

        const mode = getStageOrderMode(stage);
        const forward = [];

        if (mode === 'horizontal' || mode === 'both') {
            // Horizontal order follows authored question order exactly.
            forward.push({ answers: answers.slice(), mode: 'horizontal', reverse: false });
        }
        if (mode === 'vertical' || mode === 'both') {
            // Vertical mode still respects authored answer order.
            // (orderMode controls UI guidance, not answer token reordering)
            forward.push({ answers: answers.slice(), mode: 'vertical', reverse: false });
        }
        if (!forward.length) {
            forward.push({ answers: answers.slice(), mode: 'horizontal', reverse: false });
        }

        const all = forward.slice();
        if (stageAllowsReverse(stage)) {
            forward.forEach(seq => {
                all.push({ answers: seq.answers.slice().reverse(), mode: seq.mode, reverse: true });
            });
        }
        return uniqueSequenceList(all);
    }

    function clearNumberingAnswerOverlay() {
        if (!numberingAnswerOverlay) return;
        numberingAnswerOverlay.innerHTML = '';
    }

    function formatSequenceForDisplay(progress) {
        return progress.entries.map(e => String(e.value)).join(', ');
    }

    function updateReverseState(progress) {
        if (!numberingReverseState) return;
        numberingReverseState.textContent = progress.direction === 'reverse' ? '역순 입력 중' : '';
    }

    function getOverlayRectForStage(stage, imgRect, wrapRect) {
        if (stage?.rect) {
            return {
                left: (imgRect.left - wrapRect.left) + (stage.rect.x * imgRect.width),
                top: (imgRect.top - wrapRect.top) + (stage.rect.y * imgRect.height),
                width: stage.rect.w * imgRect.width,
                height: stage.rect.h * imgRect.height
            };
        }
        return {
            left: (imgRect.left - wrapRect.left) + (imgRect.width * 0.2),
            top: (imgRect.top - wrapRect.top) + (imgRect.height * 0.25),
            width: imgRect.width * 0.6,
            height: imgRect.height * 0.2
        };
    }

    function renderStageEntriesOnOverlay(stage, progress, imgRect, wrapRect) {
        const rect = getOverlayRectForStage(stage, imgRect, wrapRect);
        const total = Math.max((stage?.questions || []).length, progress.entries.length);
        const activeSeq = progress?.selectedSequence || progress?.candidateSequences?.[0] || null;
        const displayMode = activeSeq?.mode || getStageOrderMode(stage);
        const isVerticalView = displayMode === 'vertical';
        const cols = isVerticalView ? 1 : (total <= 3 ? Math.max(1, total) : (total <= 6 ? 3 : 4));
        const rows = isVerticalView ? Math.max(1, total) : Math.max(1, Math.ceil(total / cols));
        const isReverse = progress?.direction === 'reverse';

        const getTagPosition = (index) => {
            const clamped = Math.max(0, Math.min(index, Math.max(0, total - 1)));
            const displayIdx = isReverse ? (total - 1 - clamped) : clamped;
            const row = Math.floor(displayIdx / cols);
            const col = displayIdx % cols;
            return {
                x: rect.left + ((col + 0.5) / cols) * rect.width,
                y: rect.top + ((row + 0.5) / rows) * rect.height
            };
        };
        const getQuestionMarkerPosition = (index) => {
            const pos = getTagPosition(index);
            if (!isVerticalView) return pos;
            return {
                x: rect.left + rect.width + 12,
                y: pos.y - 10
            };
        };

        if (!progress?.entries?.length) {
            if (total > 0) {
                const pos = getQuestionMarkerPosition(0);
                const marker = document.createElement('div');
                marker.className = 'numbering-overlay-tag question';
                marker.style.left = `${pos.x}px`;
                marker.style.top = `${pos.y}px`;
                marker.textContent = '?';
                numberingAnswerOverlay.appendChild(marker);
            }
            return;
        }

        progress.entries.forEach((entry, idx) => {
            const pos = getTagPosition(idx);

            const tag = document.createElement('div');
            tag.className = 'numbering-overlay-tag';
            tag.style.left = `${pos.x}px`;
            tag.style.top = `${pos.y}px`;
            tag.textContent = `${entry.value}`;
            numberingAnswerOverlay.appendChild(tag);
        });

        if (progress.entries.length < total) {
            const pos = getQuestionMarkerPosition(progress.entries.length);
            const marker = document.createElement('div');
            marker.className = 'numbering-overlay-tag question';
            marker.style.left = `${pos.x}px`;
            marker.style.top = `${pos.y}px`;
            marker.textContent = '?';
            numberingAnswerOverlay.appendChild(marker);
        }
    }

    function renderNumberingAnswerOverlay(stage, progress) {
        if (!numberingAnswerOverlay) return;
        clearNumberingAnswerOverlay();

        if (!numberingImage) return;

        const wrap = numberingImage.closest('.numbering-focus-wrap');
        if (!wrap) return;

        const imgRect = numberingImage.getBoundingClientRect();
        const wrapRect = wrap.getBoundingClientRect();
        if (numberingSession?.showFinalOverlay) {
            const currentImageHref = numberingImage?.src ? new URL(numberingImage.src, window.location.href).href : '';
            numberingSession.stages.forEach((s, idx) => {
                const stageProgress = getStageProgress(idx);
                if (!stageProgress?.entries?.length) return;
                const stageImageHref = s?.image ? new URL(String(s.image), window.location.href).href : '';
                const sameImage = stageImageHref && currentImageHref && stageImageHref === currentImageHref;
                if (!sameImage && s !== stage) return;
                renderStageEntriesOnOverlay(s, stageProgress, imgRect, wrapRect);
            });
            return;
        }

        renderStageEntriesOnOverlay(stage, progress, imgRect, wrapRect);
    }

    function updatePinButtonStates(progress) {
        document.querySelectorAll('.numbering-pin-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.classList.remove('reverse');
        });
    }

    function updateNumberingProgress() {
        if (!numberingSession) return;

        const solved = getSolvedCount();
        const total = numberingSession.totalQuestions;
        const pct = total === 0 ? 0 : Math.round((solved / total) * 100);

        if (numberingProgressText) numberingProgressText.textContent = `진행률 ${pct}% (${solved}/${total})`;
        if (numberingProgressFill) numberingProgressFill.style.width = `${pct}%`;
    }

    function hideNumberingFocusRect() {
        if (numberingFocusRect) numberingFocusRect.style.display = 'none';
    }

    function applyNumberingFocusRect(stage) {
        if (!numberingFocusRect || !numberingImage || !stage?.rect) {
            hideNumberingFocusRect();
            return;
        }

        const wrap = numberingImage.closest('.numbering-focus-wrap');
        if (!wrap) {
            hideNumberingFocusRect();
            return;
        }

        const imgRect = numberingImage.getBoundingClientRect();
        const wrapRect = wrap.getBoundingClientRect();

        const left = (imgRect.left - wrapRect.left) + (stage.rect.x * imgRect.width);
        const top = (imgRect.top - wrapRect.top) + (stage.rect.y * imgRect.height);
        const width = stage.rect.w * imgRect.width;
        const height = stage.rect.h * imgRect.height;

        numberingFocusRect.style.left = `${left}px`;
        numberingFocusRect.style.top = `${top}px`;
        numberingFocusRect.style.width = `${Math.max(0, width)}px`;
        numberingFocusRect.style.height = `${Math.max(0, height)}px`;
        numberingFocusRect.style.display = 'block';
    }

    function setNumberingAnswerMode(question, stage) {
        const inputMode = question.inputMode || stage.inputMode || 'choice';
        if (inputMode === 'input') {
            numberingChoices.style.display = 'none';
            if (numberingComponentMock) numberingComponentMock.style.display = 'none';
            numberingInputWrap.style.display = 'flex';
            numberingAnswerInput.value = '';
            numberingAnswerInput.placeholder = '쉼표로 연속 입력 (예: 1,2,3 또는 3,1)';
            numberingAnswerInput.focus();
            return;
        }

        numberingInputWrap.style.display = 'none';
        numberingChoices.style.display = 'none';
        if (numberingComponentMock) numberingComponentMock.style.display = 'block';
    }

    function getComponentById(componentId) {
        if (currentComponents && currentComponents.length) {
            const foundInCurrent = currentComponents.find(c => c.id === componentId);
            if (foundInCurrent) return foundInCurrent;
        }
        const layoutBase = (typeof getPublicLayoutBase === 'function')
            ? getPublicLayoutBase(currentLayoutId)
            : PUBLIC_LAYOUT_BASE;
        return (layoutBase || []).find(c => c.id === componentId) || null;
    }

    function buildRowsFromComponent(comp) {
        if (!comp) return [];

        if (comp.type === 'terminal' && Array.isArray(comp.pins)) {
            return [comp.pins.map((p, idx) => {
                if (p.n === '$') return null;
                return {
                    value: String(comp.startNum + idx),
                    label: p.n || '-',
                    sub: p.g || ''
                };
            })];
        }

        const rows = [];
        if (Array.isArray(comp.topArr) && comp.topArr.length) {
            rows.push(comp.topArr.map(p => (p.n === '$' ? null : {
                value: String(p.n),
                label: '상단',
                sub: p.l || ''
            })));
        }
        if (Array.isArray(comp.botArr) && comp.botArr.length) {
            rows.push(comp.botArr.map(p => (p.n === '$' ? null : {
                value: String(p.n),
                label: '하단',
                sub: p.l || ''
            })));
        }
        return rows;
    }

    function getStageRows(stage) {
        const presetKey = stage?.pinPreset || '';
        const preset = presetKey ? PIN_PRESETS[presetKey] : null;

        if (preset?.rows) return preset.rows;

        const targetId = preset?.componentId || stage.componentId;
        const comp = getComponentById(targetId);
        const rows = buildRowsFromComponent(comp);
        if (rows.length) return rows;

        // Fallback: when component/preset id is invalid, still render selectable values from questions.
        const values = [];
        const add = v => {
            const s = String(v ?? '').trim();
            if (!s || values.includes(s)) return;
            values.push(s);
        };
        (stage?.questions || []).forEach(q => {
            add(q?.answer);
            (q?.choices || []).forEach(add);
        });
        if (!values.length) return [];
        return [values.map(v => ({ value: v, label: '선택', sub: '' }))];
    }

    function getColClass(size) {
        if (size <= 2) return 'cols-2';
        if (size === 3) return 'cols-3';
        if (size === 4) return 'cols-4';
        if (size === 5) return 'cols-5';
        if (size === 6) return 'cols-6';
        if (size === 8) return 'cols-8';
        return 'cols-10';
    }

    function createPinButton(value, label, sub) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'numbering-pin-btn';
        btn.dataset.pinValue = String(value);
        btn.innerHTML = `${value}<small>${label}${sub ? ' · ' + sub : ''}</small>`;
        btn.onclick = () => evaluateNumberingAnswer(String(value));
        return btn;
    }

    function createEmptySlot() {
        const empty = document.createElement('div');
        empty.className = 'numbering-pin-slot-empty';
        return empty;
    }

    function renderTerminalRow(container, comp) {
        const row = document.createElement('div');
        row.className = `numbering-pin-row ${getColClass(comp.pins.length || 10)}`;

        comp.pins.forEach((p, idx) => {
            if (p.n === '$') {
                row.appendChild(createEmptySlot());
            } else {
                row.appendChild(createPinButton(String(comp.startNum + idx), p.n || '-', p.g || ''));
            }
        });

        container.appendChild(row);
    }

    function renderTopBottomRows(container, comp) {
        if (Array.isArray(comp.topArr) && comp.topArr.length) {
            const topLabel = document.createElement('div');
            topLabel.className = 'numbering-mock-row-label';
            topLabel.textContent = '상단 단자';
            container.appendChild(topLabel);

            const topRow = document.createElement('div');
            topRow.className = `numbering-pin-row ${getColClass(comp.topArr.length)}`;
            comp.topArr.forEach(p => {
                if (p.n === '$') topRow.appendChild(createEmptySlot());
                else topRow.appendChild(createPinButton(String(p.n), '상단', p.l || ''));
            });
            container.appendChild(topRow);
        }

        if (Array.isArray(comp.botArr) && comp.botArr.length) {
            const botLabel = document.createElement('div');
            botLabel.className = 'numbering-mock-row-label';
            botLabel.textContent = '하단 단자';
            container.appendChild(botLabel);

            const botRow = document.createElement('div');
            botRow.className = `numbering-pin-row ${getColClass(comp.botArr.length)}`;
            comp.botArr.forEach(p => {
                if (p.n === '$') botRow.appendChild(createEmptySlot());
                else botRow.appendChild(createPinButton(String(p.n), '하단', p.l || ''));
            });
            container.appendChild(botRow);
        }
    }

    function getDisplayOrderPins(stage) {
        const rows = getStageRows(stage);
        const out = [];
        rows.forEach(row => {
            row.forEach(pin => {
                if (!pin || pin.value == null) return;
                out.push({
                    value: String(pin.value),
                    label: pin.label || '-',
                    sub: pin.sub || ''
                });
            });
        });
        return out;
    }

    function getPinDisplayOverrides(stage) {
        const csv = (stage?.pinDisplayCsv || '').trim();
        if (!csv) return [];
        return csv.split(',').map(v => v.trim()).filter(Boolean);
    }

    function renderComponentPinMock(stage) {
        if (!numberingComponentMock) return;

        const rows = getStageRows(stage);
        if (!rows.length) {
            numberingComponentMock.style.display = 'none';
            return;
        }

        numberingComponentMock.innerHTML = '';

        const preset = stage.pinPreset ? PIN_PRESETS[stage.pinPreset] : null;
        const title = document.createElement('div');
        title.className = 'numbering-component-title';
        title.textContent = `${(preset?.componentId || stage.componentId)} 핀 모형 (실제 배치 기준)`;
        numberingComponentMock.appendChild(title);

        const body = document.createElement('div');
        body.className = 'numbering-mock-body';
        const overrides = getPinDisplayOverrides(stage);
        const orderedPins = getDisplayOrderPins(stage);
        const overrideMap = new Map();
        orderedPins.forEach((pin, idx) => {
            if (overrides[idx]) overrideMap.set(pin.value, overrides[idx]);
        });

        rows.forEach((rowItems, rowIdx) => {
            if (rows.length > 1) {
                const rowLabel = document.createElement('div');
                rowLabel.className = 'numbering-mock-row-label';
                rowLabel.textContent = rowIdx === 0 ? '상단 단자' : '하단 단자';
                body.appendChild(rowLabel);
            }

            const row = document.createElement('div');
            row.className = `numbering-pin-row ${getColClass(rowItems.length || 2)}`;
            rowItems.forEach(pin => {
                if (!pin) {
                    row.appendChild(createEmptySlot());
                    return;
                }
                const value = String(pin.value);
                row.appendChild(createPinButton(value, overrideMap.get(value) || pin.label || '-', pin.sub || ''));
            });
            body.appendChild(row);
        });

        numberingComponentMock.appendChild(body);
    }

    function renderNumberingStep() {
        if (!numberingSession) return;

        const stage = numberingSession.stages[numberingSession.stageIndex];
        if (!stage || !Array.isArray(stage.questions) || !stage.questions.length) return;

        const progress = getStageProgress(numberingSession.stageIndex);
        const question = getCurrentNumberingQuestion() || stage.questions[0];

        numberingGuideText.textContent = stage.guide;
        numberingStageInfo.textContent = `단계 ${numberingSession.stageIndex + 1}/${numberingSession.stages.length} · ${stage.title}`;

        const stageImage = String(stage.image || getNumberingBaseImage(numberingSession?.layoutId));
        numberingImage.src = stageImage;
        numberingImage.alt = `${stage.componentId} 넘버링 참고 이미지`;
        numberingImage.onload = () => {
            if (!numberingSession) return;
            const active = numberingSession.stages[numberingSession.stageIndex];
            if (active !== stage) return;
            applyNumberingFocusRect(stage);
            renderNumberingAnswerOverlay(stage, progress);
        };
        if (numberingImage.complete) {
            applyNumberingFocusRect(stage);
            renderNumberingAnswerOverlay(stage, progress);
        }

        setNumberingAnswerMode(question, stage);

        numberingChoices.innerHTML = '';
        renderComponentPinMock(stage);
        updatePinButtonStates(progress);
        updateReverseState(progress);
        renderNumberingAnswerOverlay(stage, progress);
        if ((question.inputMode || stage.inputMode || 'choice') === 'choice') {
            // Choice mode is now driven by component pin mock buttons.
        }

        updateNumberingProgress();
    }

    function moveToNextStage() {
        if (!numberingSession) return;

        if (numberingSession.stageIndex < numberingSession.stages.length - 1) {
            numberingSession.showFinalOverlay = false;
            numberingSession.stageIndex += 1;
            numberingResult.textContent = '정답입니다. 다음 단계로 이동합니다.';
            numberingResult.style.color = '#28a745';
            renderNumberingStep();
            return;
        }

        numberingSession.showFinalOverlay = true;
        updateNumberingProgress();
        numberingResult.textContent = '모든 넘버링 단계를 완료했습니다.';
        numberingResult.style.color = '#28a745';
        statusMsg.textContent = '넘버링 100% 완료';
        hideNumberingFocusRect();
        const currentStage = numberingSession.stages[numberingSession.stageIndex];
        renderNumberingAnswerOverlay(currentStage, getStageProgress(numberingSession.stageIndex));
    }

    function evaluateNumberingAnswer(answerValue) {
        if (!numberingSession) return;

        const stage = numberingSession.stages[numberingSession.stageIndex];
        if (!stage) return;
        const progress = getStageProgress(numberingSession.stageIndex);
        const expectedAnswers = getStageExpectedAnswers(stage);
        if (!expectedAnswers.length) return;

        const entryIndex = progress.entries.length;
        if (entryIndex >= expectedAnswers.length) return;
        const answer = String(answerValue).trim();
        if (!answer) return;

        const allCandidates = progress.candidateSequences || getStageCandidateSequences(stage);
        progress.candidateSequences = allCandidates;
        if (!allCandidates.length) return;

        const matched = allCandidates.filter(seq => seq.answers[entryIndex] === answer);
        if (!matched.length) {
            const expectedSet = Array.from(new Set(allCandidates.map(seq => seq.answers[entryIndex]).filter(Boolean)));
            const allowedHint = expectedSet.join(', ');
            numberingResult.textContent = `오답: ${answer} (기대값: ${allowedHint || '없음'})`;
            numberingResult.style.color = '#dc3545';
            renderNumberingStep();
            return;
        }
        progress.candidateSequences = matched;
        if (matched.length === 1) progress.selectedSequence = matched[0];

        const picked = progress.selectedSequence || matched[0];
        progress.direction = picked?.reverse ? 'reverse' : 'forward';

        const used = new Set(progress.usedPinIds || []);
        const question = (stage.questions || []).find(q => {
            const ans = String(q.answer ?? '').trim();
            return ans === answer && !used.has(q.pinId);
        }) || null;
        if (question) {
            numberingAnswers[question.pinId] = progress.direction === 'reverse' ? `${answer} (역순)` : answer;
            numberingSession.completed.add(question.pinId);
            progress.usedPinIds.push(question.pinId);
        }

        progress.entries.push({
            value: answer,
            reverse: progress.direction === 'reverse'
        });

        renderNumberingStep();
        updateNumberingProgress();

        if (progress.entries.length >= expectedAnswers.length) {
            const modeTag = progress.direction === 'reverse' ? ' [역순]' : '';
            numberingResult.textContent = `단계 완료${modeTag}: ${formatSequenceForDisplay(progress)}`;
            numberingResult.style.color = '#28a745';
            setTimeout(moveToNextStage, 500);
            return;
        }

        const nextQuestion = getCurrentNumberingQuestion();
        const nextLabel = nextQuestion ? `'${nextQuestion.label}'` : '다음';
        numberingResult.textContent = `입력됨: ${answer}${progress.direction === 'reverse' ? ' (역순)' : ''} · ${nextLabel}`;
        numberingResult.style.color = progress.direction === 'reverse' ? '#fd7e14' : '#28a745';
    }

    function submitNumberingInput() {
        if (!numberingAnswerInput) return;
        const raw = String(numberingAnswerInput.value || '').trim();
        if (!raw) return;
        const items = raw.includes(',')
            ? raw.split(',').map(v => v.trim()).filter(Boolean)
            : [raw];
        for (const item of items) {
            if (!numberingSession) break;
            const stage = numberingSession.stages[numberingSession.stageIndex];
            const before = getStageProgress(numberingSession.stageIndex).entries.length;
            evaluateNumberingAnswer(item);
            if (!numberingSession || numberingSession.stages[numberingSession.stageIndex] !== stage) break;
            const after = getStageProgress(numberingSession.stageIndex).entries.length;
            if (after === before) break;
        }
        numberingAnswerInput.value = '';
    }

    function prevNumberingStage() {
        if (!numberingSession || numberingSession.stageIndex === 0) return;
        numberingSession.showFinalOverlay = false;
        numberingSession.stageIndex -= 1;
        numberingResult.textContent = '이전 단계로 이동했습니다.';
        numberingResult.style.color = '#333';
        renderNumberingStep();
    }

    function nextNumberingStage() {
        if (!numberingSession || numberingSession.stageIndex >= numberingSession.stages.length - 1) return;
        numberingSession.showFinalOverlay = false;
        numberingSession.stageIndex += 1;
        numberingResult.textContent = '다음 단계로 이동했습니다.';
        numberingResult.style.color = '#333';
        renderNumberingStep();
    }

    function resetCurrentNumberingStage() {
        if (!numberingSession) return;
        numberingSession.showFinalOverlay = false;
        const stageIdx = numberingSession.stageIndex;
        const stage = numberingSession.stages[stageIdx];
        if (!stage) return;

        const progress = getStageProgress(stageIdx);
        progress.entries = [];
        progress.direction = null;
        progress.usedPinIds = [];
        progress.candidateSequences = null;
        progress.selectedSequence = null;

        (stage.questions || []).forEach(q => {
            numberingSession.completed.delete(q.pinId);
            delete numberingAnswers[q.pinId];
        });

        numberingResult.textContent = '현재 단계 입력을 초기화했습니다. 다시 입력하세요.';
        numberingResult.style.color = '#333';
        renderNumberingStep();
        updateNumberingProgress();
    }

    function openNumberingModal() {
        const numberingLayoutId = resolveNumberingLayoutId();
        const stages = createNumberingStages(numberingLayoutId);
        numberingAnswers = {};
        clearNumberingAnswerOverlay();
        if (numberingReverseState) numberingReverseState.textContent = '';
        hideNumberingFocusRect();

        numberingSession = {
            layoutId: numberingLayoutId,
            stages,
            stageIndex: 0,
            totalQuestions: stages.reduce((sum, stage) => sum + stage.questions.length, 0),
            completed: new Set(),
            stageProgress: {},
            showFinalOverlay: false
        };

        numberingResult.style.color = '#333';
        if (!stages.length) {
            numberingGuideText.textContent = '현재 화면에서 학습할 넘버링 대상이 없습니다.';
            numberingStageInfo.textContent = '단계 없음';
            numberingQuestion.textContent = '넘버링 시나리오 데이터가 비어 있습니다.';
            numberingChoices.innerHTML = '';
            numberingInputWrap.style.display = 'none';
            numberingResult.textContent = '넘버링 시작 불가';
            clearNumberingAnswerOverlay();
            updateNumberingProgress();
            numberingModal.style.display = 'flex';
            return;
        }

        rememberNumberingLayoutId(numberingLayoutId);
        numberingResult.textContent = '핀 번호를 연속 입력하세요. 단계 설정(역순 허용/채점 방향)에 따라 자동 판별됩니다.';
        renderNumberingStep();
        numberingModal.style.display = 'flex';
    }

    function gradeNumberingAnswers() {
        if (!numberingSession) return;

        const solved = getSolvedCount();
        const total = numberingSession.totalQuestions;
        const pct = total === 0 ? 0 : Math.round((solved / total) * 100);

        numberingResult.textContent = `현재 진행: ${solved}/${total} (${pct}%)`;
        numberingResult.style.color = '#333';
        statusMsg.textContent = `넘버링 ${pct}% 진행`;
        updateNumberingProgress();
    }

    function fillCorrectNumbers() {
        if (!numberingSession) return;

        numberingSession.stages.forEach((stage, stageIdx) => {
            const progress = getStageProgress(stageIdx);
            progress.entries = [];
            progress.usedPinIds = [];
            const candidates = getStageCandidateSequences(stage);
            const picked = candidates.find(c => !c.reverse) || candidates[0] || null;
            progress.candidateSequences = picked ? [picked] : [];
            progress.selectedSequence = picked;
            progress.direction = picked?.reverse ? 'reverse' : 'forward';
            const answerQueue = picked?.answers || getStageExpectedAnswers(stage);
            answerQueue.forEach(answer => {
                const q = (stage.questions || []).find(item =>
                    String(item.answer ?? '').trim() === String(answer).trim()
                    && !progress.usedPinIds.includes(item.pinId)
                );
                if (!q) return;
                numberingAnswers[q.pinId] = q.answer;
                numberingSession.completed.add(q.pinId);
                progress.usedPinIds.push(q.pinId);
                progress.entries.push({ value: String(q.answer), reverse: !!picked?.reverse });
            });
        });

        numberingResult.textContent = '전체 정답을 표시했습니다. 설명 문구와 함께 복습하세요.';
        numberingResult.style.color = '#17a2b8';
        numberingSession.showFinalOverlay = true;
        updateNumberingProgress();
        renderNumberingStep();
        statusMsg.textContent = '넘버링 정답 표시 완료';
    }

    function closeNumberingModal(turnOff = true) {
        numberingModal.style.display = 'none';
        numberingSession = null;
        hideNumberingFocusRect();
        clearNumberingAnswerOverlay();
        if (numberingReverseState) numberingReverseState.textContent = '';
        if (numberingImage) {
            numberingImage.onload = null;
            numberingImage.src = getNumberingBaseImage(numberingSession?.layoutId || resolveNumberingLayoutId());
        }

        if (turnOff && isNumberingMode) {
            isNumberingMode = false;
            btnNumbering.classList.remove('active');
            statusMsg.style.color = '#fff';
            statusMsg.textContent = '대기 중';
        }
        if (turnOff) {
            const wiringWrap = document.getElementById('wiringControls');
            const numberingWrap = document.getElementById('numberingControls');
            const btnWiring = document.getElementById('btnPrimaryWiring');
            const btnNumberingPrimary = document.getElementById('btnPrimaryNumbering');
            if (wiringWrap) wiringWrap.style.display = 'flex';
            if (numberingWrap) numberingWrap.style.display = 'none';
            if (btnWiring) btnWiring.classList.add('active');
            if (btnNumberingPrimary) btnNumberingPrimary.classList.remove('active');
        }
    }

    function ensureEditorScenario() {
        if (!NUMBERING_SCENARIOS[currentLayoutId]) {
            NUMBERING_SCENARIOS[currentLayoutId] = {
                image: getNumberingBaseImage(currentLayoutId),
                stages: []
            };
        }
        if (!Array.isArray(NUMBERING_SCENARIOS[currentLayoutId].stages)) {
            NUMBERING_SCENARIOS[currentLayoutId].stages = [];
        }
        return NUMBERING_SCENARIOS[currentLayoutId];
    }

    function getEditorCurrentStage() {
        const scenario = ensureEditorScenario();
        if (numberingEditorState.stageIndex < 0 || numberingEditorState.stageIndex >= scenario.stages.length) return null;
        return scenario.stages[numberingEditorState.stageIndex];
    }

    function updateEditorRectOverlay(rect) {
        const wrap = numberingEditorImage?.parentElement;
        if (!wrap || !numberingEditorRect || !rect) {
            if (numberingEditorRect) numberingEditorRect.style.display = 'none';
            return;
        }

        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        numberingEditorRect.style.left = `${rect.x * w}px`;
        numberingEditorRect.style.top = `${rect.y * h}px`;
        numberingEditorRect.style.width = `${rect.w * w}px`;
        numberingEditorRect.style.height = `${rect.h * h}px`;
        numberingEditorRect.style.display = 'block';

        if (editorRectInfo) {
            const fx = n => Number(n).toFixed(3);
            editorRectInfo.textContent = `영역: x=${fx(rect.x)}, y=${fx(rect.y)}, w=${fx(rect.w)}, h=${fx(rect.h)}`;
        }
    }

    function renderEditorStageSelect() {
        const scenario = ensureEditorScenario();
        editorStageSelect.innerHTML = '';

        const emptyOpt = document.createElement('option');
        emptyOpt.value = '-1';
        emptyOpt.textContent = '단계 선택';
        editorStageSelect.appendChild(emptyOpt);

        scenario.stages.forEach((stage, idx) => {
            const opt = document.createElement('option');
            opt.value = String(idx);
            const qCount = Array.isArray(stage.questions) ? stage.questions.length : 0;
            opt.textContent = `${idx + 1}. ${stage.title || stage.componentId || '제목 없음'} (${qCount}문항)`;
            editorStageSelect.appendChild(opt);
        });

        editorStageSelect.value = String(numberingEditorState.stageIndex);
    }

    function updateEditorStageWarning(stage) {
        if (!editorStageWarning) return;
        if (!stage) {
            editorStageWarning.textContent = '';
            return;
        }
        const qCount = Array.isArray(stage.questions) ? stage.questions.length : 0;
        editorStageWarning.textContent = qCount === 0
            ? '경고: 이 단계는 문항이 0개라 사용자 모드에서 학습에 표시되지 않습니다.'
            : '';
    }

    function clearEditorQuestionForm() {
        if (editorQuestionLabel) editorQuestionLabel.value = '';
        if (editorQuestionAnswer) editorQuestionAnswer.value = '';
        if (editorQuestionChoices) editorQuestionChoices.value = '';
    }

    function renderEditorQuestionSelect(stage) {
        if (!editorQuestionSelect) return;
        editorQuestionSelect.innerHTML = '';

        const emptyOpt = document.createElement('option');
        emptyOpt.value = '-1';
        emptyOpt.textContent = '문항 선택 (수정/삭제)';
        editorQuestionSelect.appendChild(emptyOpt);

        if (!stage || !Array.isArray(stage.questions) || stage.questions.length === 0) {
            editorQuestionSelect.value = '-1';
            editorQuestionSelect.disabled = true;
            numberingEditorState.questionIndex = -1;
            return;
        }

        stage.questions.forEach((q, idx) => {
            const opt = document.createElement('option');
            opt.value = String(idx);
            opt.textContent = `${idx + 1}. ${q.label || '라벨 없음'} = ${q.answer || ''}`;
            editorQuestionSelect.appendChild(opt);
        });

        const idx = Number.isInteger(numberingEditorState.questionIndex) ? numberingEditorState.questionIndex : -1;
        if (idx >= 0 && idx < stage.questions.length) {
            editorQuestionSelect.value = String(idx);
        } else {
            editorQuestionSelect.value = '-1';
            numberingEditorState.questionIndex = -1;
        }
        editorQuestionSelect.disabled = false;
    }

    function loadEditorQuestionToForm() {
        const stage = getEditorCurrentStage();
        const idx = Number.isInteger(numberingEditorState.questionIndex) ? numberingEditorState.questionIndex : -1;
        if (!stage || !Array.isArray(stage.questions) || idx < 0 || idx >= stage.questions.length) {
            clearEditorQuestionForm();
            return;
        }
        const q = stage.questions[idx];
        if (editorQuestionLabel) editorQuestionLabel.value = q.label || '';
        if (editorQuestionAnswer) editorQuestionAnswer.value = q.answer || '';
        if (editorQuestionChoices) editorQuestionChoices.value = Array.isArray(q.choices) ? q.choices.join(',') : '';
    }

    function onEditorQuestionSelectChange() {
        numberingEditorState.questionIndex = parseInt(editorQuestionSelect?.value || '-1', 10);
        loadEditorQuestionToForm();
    }

    function loadEditorStageToForm() {
        const scenario = ensureEditorScenario();
        editorImageUrl.value = scenario.image || './images/images1.png';
        numberingEditorImage.src = editorImageUrl.value;

        const stage = getEditorCurrentStage();
        if (!stage) {
            editorStageTitle.value = '';
            editorComponentId.value = '';
            editorGuideText.value = '';
            editorInputMode.value = 'choice';
            if (editorAllowReverse) editorAllowReverse.checked = false;
            if (editorOrderMode) editorOrderMode.value = 'horizontal';
            editorPinDisplayCsv.value = '';
            numberingEditorState.currentRect = null;
            numberingEditorState.questionIndex = -1;
            updateEditorRectOverlay(null);
            updateEditorStageWarning(null);
            renderEditorQuestionSelect(null);
            clearEditorQuestionForm();
            return;
        }

        editorStageTitle.value = stage.title || '';
        editorComponentId.value = stage.componentId || '';
        editorGuideText.value = stage.guide || '';
        editorPinPreset.value = stage.pinPreset || '';
        editorInputMode.value = stage.inputMode || 'choice';
        if (editorAllowReverse) editorAllowReverse.checked = !!stage.allowReverse;
        if (editorOrderMode) editorOrderMode.value = stage.orderMode || 'horizontal';
        editorPinDisplayCsv.value = stage.pinDisplayCsv || '';
        numberingEditorState.currentRect = stage.rect || null;
        updateEditorRectOverlay(numberingEditorState.currentRect);
        updateEditorStageWarning(stage);
        renderEditorQuestionSelect(stage);
        loadEditorQuestionToForm();
    }

    function onEditorStageSelectChange() {
        numberingEditorState.stageIndex = parseInt(editorStageSelect.value || '-1', 10);
        numberingEditorState.questionIndex = -1;
        loadEditorStageToForm();
    }

    function newEditorStage() {
        const scenario = ensureEditorScenario();
        scenario.stages.push({
            title: '새 단계',
            componentId: 'NEW',
            pinPreset: '',
            guide: '설명 문구를 입력하세요.',
            inputMode: 'choice',
            allowReverse: false,
            orderMode: 'horizontal',
            pinDisplayCsv: '',
            rect: null,
            questions: []
        });
        numberingEditorState.stageIndex = scenario.stages.length - 1;
        persistNumberingScenarios();
        renderEditorStageSelect();
        loadEditorStageToForm();
        updateEditorStageWarning(getEditorCurrentStage());
    }

    function deleteEditorStage() {
        const scenario = ensureEditorScenario();
        const idx = numberingEditorState.stageIndex;
        if (idx < 0 || idx >= scenario.stages.length) return;

        scenario.stages.splice(idx, 1);
        numberingEditorState.stageIndex = Math.min(idx, scenario.stages.length - 1);
        persistNumberingScenarios();
        renderEditorStageSelect();
        loadEditorStageToForm();
    }

    function moveEditorStageUp() {
        const scenario = ensureEditorScenario();
        const idx = numberingEditorState.stageIndex;
        if (idx <= 0 || idx >= scenario.stages.length) return;

        const tmp = scenario.stages[idx - 1];
        scenario.stages[idx - 1] = scenario.stages[idx];
        scenario.stages[idx] = tmp;
        numberingEditorState.stageIndex = idx - 1;

        persistNumberingScenarios();
        renderEditorStageSelect();
        loadEditorStageToForm();
        if (editorRectInfo) editorRectInfo.textContent = '단계 순서를 위로 이동했어.';
    }

    function moveEditorStageDown() {
        const scenario = ensureEditorScenario();
        const idx = numberingEditorState.stageIndex;
        if (idx < 0 || idx >= scenario.stages.length - 1) return;

        const tmp = scenario.stages[idx + 1];
        scenario.stages[idx + 1] = scenario.stages[idx];
        scenario.stages[idx] = tmp;
        numberingEditorState.stageIndex = idx + 1;

        persistNumberingScenarios();
        renderEditorStageSelect();
        loadEditorStageToForm();
        if (editorRectInfo) editorRectInfo.textContent = '단계 순서를 아래로 이동했어.';
    }

    function startEditorRectMode() {
        numberingEditorState.rectMode = true;
        editorRectInfo.textContent = '영역 선택 모드: 이미지에서 드래그하세요.';
    }

    function addEditorQuestion() {
        const stage = getEditorCurrentStage();
        if (!stage) return;

        const label = (editorQuestionLabel.value || '').trim();
        const answer = (editorQuestionAnswer.value || '').trim();
        if (!label || !answer) {
            alert('문항 라벨과 정답 번호를 입력해줘.');
            return;
        }

        const choices = (editorQuestionChoices.value || '')
            .split(',')
            .map(v => v.trim())
            .filter(Boolean);

        const item = {
            pinId: `${stage.componentId || 'Q'}_${Date.now()}`,
            label,
            answer,
            choices,
            inputMode: editorInputMode.value || 'choice'
        };

        if (!Array.isArray(stage.questions)) stage.questions = [];
        stage.questions.push(item);
        numberingEditorState.questionIndex = stage.questions.length - 1;

        clearEditorQuestionForm();

        persistNumberingScenarios();
        editorRectInfo.textContent = `문항 추가됨 (총 ${stage.questions.length}개)`;
        renderEditorStageSelect();
        updateEditorStageWarning(stage);
        renderEditorQuestionSelect(stage);
        loadEditorQuestionToForm();
    }

    function updateEditorQuestion() {
        const stage = getEditorCurrentStage();
        if (!stage || !Array.isArray(stage.questions)) return;
        const idx = Number.isInteger(numberingEditorState.questionIndex) ? numberingEditorState.questionIndex : -1;
        if (idx < 0 || idx >= stage.questions.length) {
            alert('수정할 문항을 먼저 선택해줘.');
            return;
        }

        const label = (editorQuestionLabel.value || '').trim();
        const answer = (editorQuestionAnswer.value || '').trim();
        if (!label || !answer) {
            alert('문항 라벨과 정답 번호를 입력해줘.');
            return;
        }

        const choices = (editorQuestionChoices.value || '')
            .split(',')
            .map(v => v.trim())
            .filter(Boolean);

        const target = stage.questions[idx] || {};
        target.pinId = target.pinId || `${stage.componentId || 'Q'}_${Date.now()}`;
        target.label = label;
        target.answer = answer;
        target.choices = choices;
        target.inputMode = editorInputMode.value || 'choice';
        stage.questions[idx] = target;

        persistNumberingScenarios();
        renderEditorStageSelect();
        updateEditorStageWarning(stage);
        renderEditorQuestionSelect(stage);
        editorRectInfo.textContent = `문항 수정됨 (${idx + 1}번)`;
    }

    function deleteEditorQuestion() {
        const stage = getEditorCurrentStage();
        if (!stage || !Array.isArray(stage.questions)) return;
        const idx = Number.isInteger(numberingEditorState.questionIndex) ? numberingEditorState.questionIndex : -1;
        if (idx < 0 || idx >= stage.questions.length) {
            alert('삭제할 문항을 먼저 선택해줘.');
            return;
        }

        stage.questions.splice(idx, 1);
        numberingEditorState.questionIndex = Math.min(idx, stage.questions.length - 1);

        persistNumberingScenarios();
        renderEditorStageSelect();
        updateEditorStageWarning(stage);
        renderEditorQuestionSelect(stage);
        loadEditorQuestionToForm();
        editorRectInfo.textContent = `문항 삭제됨 (남은 문항 ${stage.questions.length}개)`;
    }

    function saveEditorStage() {
        const scenario = ensureEditorScenario();
        let stage = getEditorCurrentStage();
        if (!stage) {
            stage = {
                title: '새 단계',
                componentId: 'NEW',
                guide: '설명 문구를 입력하세요.',
                inputMode: 'choice',
                allowReverse: false,
                orderMode: 'horizontal',
                rect: null,
                questions: []
            };
            scenario.stages.push(stage);
            numberingEditorState.stageIndex = scenario.stages.length - 1;
        }

        stage.title = (editorStageTitle.value || '').trim() || stage.title;
        stage.componentId = (editorComponentId.value || '').trim() || stage.componentId;
        stage.pinPreset = (editorPinPreset.value || '').trim();
        stage.guide = (editorGuideText.value || '').trim() || stage.guide;
        stage.inputMode = editorInputMode.value || 'choice';
        stage.allowReverse = !!editorAllowReverse?.checked;
        stage.orderMode = editorOrderMode?.value || 'horizontal';
        stage.pinDisplayCsv = (editorPinDisplayCsv.value || '').trim();
        stage.rect = numberingEditorState.currentRect || null;

        const img = (editorImageUrl.value || '').trim();
        if (img) scenario.image = img;

        persistNumberingScenarios();
        renderEditorStageSelect();
        loadEditorStageToForm();

        // For authoring flow: when current stage is complete and is the last one,
        // auto-create next stage so the editor is not stuck on step 1.
        const isCurrentLast = numberingEditorState.stageIndex === scenario.stages.length - 1;
        const stageHasContent = !!stage.rect || (Array.isArray(stage.questions) && stage.questions.length > 0);
        if (isCurrentLast && stageHasContent) {
            scenario.stages.push({
                title: `새 단계 ${scenario.stages.length + 1}`,
                componentId: 'NEW',
                pinPreset: '',
                guide: '설명 문구를 입력하세요.',
                inputMode: 'choice',
                allowReverse: false,
                orderMode: 'horizontal',
                pinDisplayCsv: '',
                rect: null,
                questions: []
            });
            numberingEditorState.stageIndex = scenario.stages.length - 1;
            persistNumberingScenarios();
            renderEditorStageSelect();
            loadEditorStageToForm();
            editorRectInfo.textContent = '단계 저장 완료, 다음 단계가 자동 생성됐어.';
            return;
        }

        const questionCount = Array.isArray(stage.questions) ? stage.questions.length : 0;
        editorRectInfo.textContent = questionCount === 0
            ? '단계 저장 완료 (문항 0개: 사용자 모드에 표시되지 않음)'
            : '단계 저장 완료';
    }

    function createScenarioTemplate() {
        return {
            image: (editorImageUrl?.value || '').trim() || getNumberingBaseImage(currentLayoutId),
            stages: [
                {
                    title: '예시 단계 1',
                    componentId: 'MC1',
                    guide: '이미지에서 해당 부품을 보고 핀 번호를 맞춰보세요.',
                    inputMode: 'choice',
                    allowReverse: false,
                    orderMode: 'horizontal',
                    rect: { x: 0.2, y: 0.2, w: 0.3, h: 0.25 },
                    questions: [
                        {
                            pinId: 'MC1_SAMPLE_1',
                            label: 'A접점',
                            answer: '8',
                            choices: ['6', '7', '8', '9'],
                            inputMode: 'choice'
                        }
                    ]
                }
            ]
        };
    }

    async function exportNumberingScenario() {
        saveEditorStage();
        let scenario = ensureEditorScenario();
        if (!Array.isArray(scenario.stages) || scenario.stages.length === 0) {
            scenario = createScenarioTemplate();
            NUMBERING_SCENARIOS[currentLayoutId] = scenario;
            persistNumberingScenarios();
            numberingEditorState.stageIndex = 0;
            renderEditorStageSelect();
            loadEditorStageToForm();
            editorRectInfo.textContent = '비어 있어서 템플릿 1단계를 자동 생성했어.';
        }
        // Export as layout-keyed object so it can be pasted directly into repository defaults.
        const keyed = { [currentLayoutId]: scenario };
        const out = JSON.stringify(keyed, null, 2);
        const fileName = buildExportFileName('numbering', currentLayoutId || 'layout');
        numberingEditorJson.value = out;
        numberingEditorJson.select();
        downloadJsonTextFile(fileName, out);
        const copied = await copyTextToClipboard(out);
        if (editorRectInfo) {
            editorRectInfo.textContent = copied
                ? `넘버링 JSON 내보내기 완료 (${fileName}) + 자동 복사 완료`
                : `넘버링 JSON 내보내기 완료 (${fileName}, 복사는 수동)`;
        }
    }

    function importNumberingScenario() {
        const text = (numberingEditorJson.value || '').trim();
        if (!text) return;

        try {
            const data = JSON.parse(text);
            let scenario = null;

            // Format A: { "image": "...", "stages": [...] }
            if (data && Array.isArray(data.stages)) {
                scenario = data;
            }

            // Format B: { "t1": { "image": "...", "stages": [...] } }
            if (!scenario && data && data[currentLayoutId] && Array.isArray(data[currentLayoutId].stages)) {
                scenario = data[currentLayoutId];
            }

            if (!scenario) {
                alert('형식이 올바르지 않아. (stages) 또는 ({layoutId:{stages}}) 형태가 필요해.');
                return;
            }

            NUMBERING_SCENARIOS[currentLayoutId] = scenario;
            persistNumberingScenarios();
            numberingEditorState.stageIndex = scenario.stages.length ? 0 : -1;
            renderEditorStageSelect();
            loadEditorStageToForm();
            editorRectInfo.textContent = 'JSON 불러오기 완료';
        } catch (e) {
            alert('JSON 파싱 실패: 형식을 다시 확인해줘.');
        }
    }

    function refreshNumberingFromEditor() {
        saveEditorStage();
        if (isNumberingMode) {
            openNumberingModal();
        }
        editorRectInfo.textContent = '학습 모드 반영 완료 (넘버링 버튼으로 바로 확인 가능)';
    }

    function resetNumberingLocalStorage() {
        const ok = confirm('넘버링 로컬 저장 데이터를 초기화하고 기본값으로 되돌릴까?');
        if (!ok) return;

        try {
            const key = (typeof NUMBERING_STORAGE_KEY === 'string' && NUMBERING_STORAGE_KEY) || 'numbering_scenarios_v2';
            localStorage.removeItem(key);
        } catch (e) {
            // ignore storage errors
        }

        NUMBERING_SCENARIOS = JSON.parse(JSON.stringify(NUMBERING_SCENARIOS_DEFAULT || {}));
        numberingEditorState.stageIndex = -1;
        numberingEditorState.questionIndex = -1;
        numberingEditorState.currentRect = null;
        numberingSession = null;
        numberingAnswers = {};

        const scenario = ensureEditorScenario();
        numberingEditorState.stageIndex = scenario.stages.length ? 0 : -1;
        renderEditorStageSelect();
        loadEditorStageToForm();
        if (isNumberingMode) openNumberingModal();
        editorRectInfo.textContent = '로컬 저장 초기화 완료. 기본 시나리오로 복원했어.';
    }

    function bindEditorPointerEvents() {
        const wrap = numberingEditorImage?.parentElement;
        if (!wrap || wrap.dataset.boundRect === '1') return;

        const toNormPoint = evt => {
            const rect = wrap.getBoundingClientRect();
            const x = Math.min(Math.max(0, evt.clientX - rect.left), rect.width);
            const y = Math.min(Math.max(0, evt.clientY - rect.top), rect.height);
            return {
                x: rect.width ? x / rect.width : 0,
                y: rect.height ? y / rect.height : 0
            };
        };

        wrap.addEventListener('pointerdown', evt => {
            if (!numberingEditorState.rectMode) return;
            evt.preventDefault();
            if (wrap.setPointerCapture) {
                try { wrap.setPointerCapture(evt.pointerId); } catch (e) {}
            }
            const p = toNormPoint(evt);
            numberingEditorState.dragging = true;
            numberingEditorState.startX = p.x;
            numberingEditorState.startY = p.y;
            numberingEditorState.currentRect = { x: p.x, y: p.y, w: 0, h: 0 };
            updateEditorRectOverlay(numberingEditorState.currentRect);
        });

        wrap.addEventListener('pointermove', evt => {
            if (!numberingEditorState.dragging) return;
            evt.preventDefault();
            const p = toNormPoint(evt);
            const x = Math.min(numberingEditorState.startX, p.x);
            const y = Math.min(numberingEditorState.startY, p.y);
            const w = Math.abs(numberingEditorState.startX - p.x);
            const h = Math.abs(numberingEditorState.startY - p.y);
            numberingEditorState.currentRect = { x, y, w, h };
            updateEditorRectOverlay(numberingEditorState.currentRect);
        });

        const onUp = evt => {
            if (!numberingEditorState.dragging) return;
            if (evt && wrap.releasePointerCapture) {
                try { wrap.releasePointerCapture(evt.pointerId); } catch (e) {}
            }
            numberingEditorState.dragging = false;
            numberingEditorState.rectMode = false;
            editorRectInfo.textContent = '영역 선택 완료. 단계 저장을 눌러 반영해줘.';
        };

        wrap.addEventListener('pointerup', onUp);
        wrap.addEventListener('pointercancel', onUp);
        wrap.addEventListener('pointerleave', onUp);
        wrap.addEventListener('dragstart', evt => evt.preventDefault());

        wrap.dataset.boundRect = '1';
    }

    function openNumberingEditorModal() {
        if (!isAdminMode) {
            alert('관리자 모드에서만 편집기를 열 수 있어.');
            return;
        }

        const scenario = ensureEditorScenario();
        if (numberingEditorState.stageIndex < 0) {
            numberingEditorState.stageIndex = scenario.stages.length ? 0 : -1;
        }

        bindEditorPointerEvents();
        renderEditorStageSelect();
        loadEditorStageToForm();
        numberingEditorModal.style.display = 'flex';
    }

    function onEditorPinPresetChange() {
        const key = (editorPinPreset?.value || '').trim();
        if (!key) return;
        const preset = PIN_PRESETS[key];
        if (!preset) return;

        if (editorComponentId && (!editorComponentId.value || editorComponentId.value === 'NEW')) {
            editorComponentId.value = preset.componentId || editorComponentId.value;
        }
        if (editorStageTitle && (!editorStageTitle.value || editorStageTitle.value.startsWith('새 단계'))) {
            editorStageTitle.value = `${preset.componentId || '부품'} 넘버링`;
        }
    }

    function closeNumberingEditorModal() {
        numberingEditorModal.style.display = 'none';
    }
