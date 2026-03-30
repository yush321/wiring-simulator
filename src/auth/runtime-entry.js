import { createClient } from '@supabase/supabase-js';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';

const DEFAULTS = {
  provider: 'kakao',
  supabaseUrl: '',
  supabaseAnonKey: '',
  redirectUrl: 'electricianmaster://auth/callback',
  webRedirectUrl: '',
  enableGuestAccess: true,
  sessionVerifyIntervalMs: 45000
};

const STORAGE_KEYS = {
  deviceFingerprint: 'electricianmaster_device_fingerprint_v1',
  sessionNonce: 'electricianmaster_session_nonce_v1'
};

const state = {
  client: null,
  initialized: false,
  initializing: null,
  session: null,
  user: null,
  listeners: new Set(),
  appListenersRegistered: false,
  deviceFingerprint: null,
  deviceId: null,
  sessionNonce: null,
  sessionStatus: 'idle',
  sessionEstablishedForUserId: null,
  authLifecyclePromise: null,
  verifyTimerId: null,
  lastError: null,
  webListenersRegistered: false,
  verifyInFlight: null,
  lastVerifyAt: 0
};

function getConfig() {
  return {
    ...DEFAULTS,
    ...(typeof window !== 'undefined' && window.APP_AUTH_CONFIG ? window.APP_AUTH_CONFIG : {})
  };
}

function getStorage() {
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
}

function getStoredValue(key) {
  const storage = getStorage();
  if (!storage) return '';
  try {
    return String(storage.getItem(key) || '').trim();
  } catch (error) {
    return '';
  }
}

function setStoredValue(key, value) {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(key, String(value || ''));
  } catch (error) {}
}

function removeStoredValue(key) {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(key);
  } catch (error) {}
}

function createUuid() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return template.replace(/[xy]/g, token => {
    const random = Math.floor(Math.random() * 16);
    const value = token === 'x' ? random : ((random & 0x3) | 0x8);
    return value.toString(16);
  });
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function inferDisplayNameFromEmail(email) {
  const normalized = normalizeEmail(email);
  const localPart = normalized.split('@')[0] || '';
  return localPart || '사용자';
}

function isNativePlatform() {
  return !!window?.Capacitor?.isNativePlatform?.();
}

function isConfigured() {
  const cfg = getConfig();
  return !!String(cfg.supabaseUrl || '').trim() && !!String(cfg.supabaseAnonKey || '').trim();
}

function getRedirectUrl() {
  const cfg = getConfig();
  if (isNativePlatform()) return String(cfg.redirectUrl || '').trim();
  if (String(cfg.webRedirectUrl || '').trim()) return String(cfg.webRedirectUrl).trim();
  return `${window.location.origin}${window.location.pathname}`;
}

function getPlatformName() {
  const platform = String(window?.Capacitor?.getPlatform?.() || '').trim().toLowerCase();
  if (platform === 'android' || platform === 'ios' || platform === 'web') return platform;
  if (navigator.userAgent.toLowerCase().includes('android')) return 'android';
  if (/iphone|ipad|ipod/i.test(navigator.userAgent)) return 'ios';
  return 'web';
}

function getDeviceName() {
  const platform = getPlatformName();
  if (platform === 'web') {
    return String(navigator.platform || 'Web Browser').trim();
  }
  return String(navigator.userAgent || platform || 'unknown').trim().slice(0, 120);
}

function getUserDisplayName(user) {
  if (!user) return '게스트';
  const metadata = user.user_metadata || {};
  return (
    metadata.full_name ||
    metadata.name ||
    metadata.nickname ||
    metadata.preferred_username ||
    user.email ||
    user.phone ||
    '사용자'
  );
}

function getDeviceFingerprint() {
  if (state.deviceFingerprint) return state.deviceFingerprint;
  const stored = getStoredValue(STORAGE_KEYS.deviceFingerprint);
  if (stored) {
    state.deviceFingerprint = stored;
    return stored;
  }
  const fingerprint = createUuid();
  state.deviceFingerprint = fingerprint;
  setStoredValue(STORAGE_KEYS.deviceFingerprint, fingerprint);
  return fingerprint;
}

function setLastError(code, message) {
  if (!code) {
    state.lastError = null;
    return;
  }
  state.lastError = {
    code: String(code || 'UNKNOWN'),
    message: String(message || getMessageForCode(code))
  };
}

function stopVerifyTimer() {
  if (!state.verifyTimerId) return;
  window.clearInterval(state.verifyTimerId);
  state.verifyTimerId = null;
}

function clearSessionGuardState() {
  stopVerifyTimer();
  state.deviceId = null;
  state.sessionNonce = null;
  state.sessionStatus = 'idle';
  state.sessionEstablishedForUserId = null;
  state.verifyInFlight = null;
  state.lastVerifyAt = 0;
  removeStoredValue(STORAGE_KEYS.sessionNonce);
}

function getSnapshot() {
  const cfg = getConfig();
  return {
    initialized: state.initialized,
    configured: isConfigured(),
    authenticated: !!state.user,
    provider: String(cfg.provider || 'kakao'),
    guestEnabled: cfg.enableGuestAccess !== false,
    user: state.user,
    displayName: getUserDisplayName(state.user),
    deviceFingerprint: state.deviceFingerprint,
    deviceId: state.deviceId,
    sessionStatus: state.sessionStatus,
    sessionEstablished: !!state.user && state.sessionEstablishedForUserId === state.user.id,
    lastErrorCode: state.lastError?.code || null,
    lastErrorMessage: state.lastError?.message || null
  };
}

function emitState() {
  const snapshot = getSnapshot();
  window.dispatchEvent(new CustomEvent('app-auth-change', { detail: snapshot }));
  state.listeners.forEach(listener => {
    try {
      listener(snapshot);
    } catch (error) {
      console.error('Auth listener failed:', error);
    }
  });
}

function getMessageForCode(code) {
  switch (String(code || '').trim()) {
    case 'AUTH_REQUIRED':
      return '로그인이 필요합니다.';
    case 'DEVICE_LIMIT_REACHED':
      return '등록 가능한 기기 수는 최대 2대입니다.';
    case 'DEVICE_CHANGE_COOLDOWN':
      return '기기 변경은 월 1회만 허용됩니다.';
    case 'DEVICE_NOT_REGISTERED':
      return '이 기기는 아직 등록되지 않았습니다.';
    case 'SESSION_NOT_FOUND':
      return '활성 세션을 찾지 못했습니다. 다시 로그인해 주세요.';
    case 'SESSION_REVOKED':
      return '다른 기기에서 앱이 열려 현재 기기에서 로그아웃되었습니다.';
    case 'DEVICE_SESSION_SETUP_FAILED':
      return '기기 인증을 완료하지 못했습니다. 다시 로그인해 주세요.';
    case 'SESSION_VERIFY_FAILED':
      return '세션 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.';
    case 'SUPABASE_NOT_CONFIGURED':
      return 'Supabase 설정값이 비어 있습니다.';
    case 'EMAIL_REQUIRED':
      return '이메일을 입력해 주세요.';
    case 'PASSWORD_REQUIRED':
      return '비밀번호를 입력해 주세요.';
    case 'PASSWORD_TOO_SHORT':
      return '비밀번호는 6자 이상으로 입력해 주세요.';
    default:
      return '인증 중 문제가 발생했습니다.';
  }
}

function normalizeRpcPayload(data, fallbackCode) {
  const value = Array.isArray(data) ? data[0] : data;
  const payload = value && typeof value === 'object' ? value : {};
  const code = String(payload.code || fallbackCode || 'UNKNOWN').trim();
  return {
    ...payload,
    ok: payload.ok !== false,
    code,
    message: String(payload.message || getMessageForCode(code))
  };
}

function shouldForceLogout(code) {
  return ['DEVICE_LIMIT_REACHED', 'DEVICE_NOT_REGISTERED', 'SESSION_NOT_FOUND', 'SESSION_REVOKED'].includes(
    String(code || '').trim()
  );
}

function applyAuthSession(data) {
  state.session = data?.session || null;
  state.user = data?.session?.user || null;
  emitState();
}

async function ensureClient() {
  if (!isConfigured()) return null;
  if (state.client) return state.client;

  state.client = createClient(getConfig().supabaseUrl, getConfig().supabaseAnonKey, {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: !isNativePlatform(),
      persistSession: true,
      autoRefreshToken: true
    }
  });

  state.client.auth.onAuthStateChange((_event, session) => {
    state.session = session || null;
    state.user = session?.user || null;

    if (!state.user) {
      clearSessionGuardState();
      emitState();
      return;
    }

    emitState();
    if (state.sessionEstablishedForUserId !== state.user.id) {
      void ensureDeviceSession({ forceClaim: true });
    }
  });

  if (isNativePlatform() && !state.appListenersRegistered) {
    await App.addListener('appUrlOpen', handleAppUrlOpen);
    await App.addListener('appStateChange', handleAppStateChange);
    state.appListenersRegistered = true;
  }

  if (!isNativePlatform() && !state.webListenersRegistered) {
    registerWebSessionListeners();
    state.webListenersRegistered = true;
  }

  return state.client;
}

function registerWebSessionListeners() {
  const triggerVerify = () => {
    if (!state.user || !state.sessionNonce) return;
    void requestSessionVerification({ minIntervalMs: 1500 });
  };

  window.addEventListener('focus', triggerVerify);
  window.addEventListener('pageshow', triggerVerify);
  window.addEventListener('online', triggerVerify);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') triggerVerify();
  });
  document.addEventListener('pointerdown', triggerVerify, true);
  document.addEventListener('keydown', triggerVerify, true);
}

async function invokeRpc(name, params) {
  const client = await ensureClient();
  if (!client) {
    return {
      ok: false,
      error: new Error('SUPABASE_NOT_CONFIGURED')
    };
  }
  const { data, error } = await client.rpc(name, params);
  if (error) {
    return { ok: false, error };
  }
  return { ok: true, data };
}

async function handleAppUrlOpen(event) {
  const url = String(event?.url || '').trim();
  const redirectUrl = String(getConfig().redirectUrl || '').trim();
  if (!url || !redirectUrl) return;

  const normalizedPrefix = redirectUrl.replace(/\/+$/, '').toLowerCase();
  if (!url.toLowerCase().startsWith(normalizedPrefix)) return;

  try {
    await Browser.close();
  } catch (error) {}

  const parsed = new URL(url);
  const code = parsed.searchParams.get('code');
  if (!code || !state.client) return;

  const { error } = await state.client.auth.exchangeCodeForSession(code);
  if (error) {
    console.error('Failed to exchange auth code:', error);
    setLastError('DEVICE_SESSION_SETUP_FAILED', '로그인 코드를 처리하지 못했습니다. 다시 시도해 주세요.');
    emitState();
  }
}

async function handleAppStateChange(event) {
  if (!event?.isActive || !state.user || !state.sessionNonce) return;
  await requestSessionVerification();
}

async function forceSignOut(code, message) {
  setLastError(code, message);
  clearSessionGuardState();

  if (state.client) {
    const { error } = await state.client.auth.signOut();
    if (error) {
      console.error('Failed to sign out after auth enforcement:', error);
    }
  }

  state.session = null;
  state.user = null;
  emitState();
  return { ok: false, code, message };
}

function startVerifyTimer() {
  stopVerifyTimer();
  const intervalMs = Math.max(4000, Number(getConfig().sessionVerifyIntervalMs) || DEFAULTS.sessionVerifyIntervalMs);
  state.verifyTimerId = window.setInterval(() => {
    if (!state.user || !state.sessionNonce) return;
    void requestSessionVerification({ minIntervalMs: Math.max(2500, Math.floor(intervalMs / 2)) });
  }, intervalMs);
}

function requestSessionVerification(options = {}) {
  const { minIntervalMs = 0, suppressSignOut = false } = options;
  if (!state.user || !state.sessionNonce) {
    return Promise.resolve({
      ok: false,
      code: 'AUTH_REQUIRED',
      message: getMessageForCode('AUTH_REQUIRED')
    });
  }

  const now = Date.now();
  if (state.verifyInFlight) return state.verifyInFlight;
  if (minIntervalMs > 0 && now - state.lastVerifyAt < minIntervalMs) {
    return Promise.resolve({
      ok: true,
      code: 'VERIFY_SKIPPED'
    });
  }

  state.verifyInFlight = verifyCurrentDeviceSession({ suppressSignOut })
    .finally(() => {
      state.lastVerifyAt = Date.now();
      state.verifyInFlight = null;
    });

  return state.verifyInFlight;
}

async function verifyCurrentDeviceSession(options = {}) {
  const { suppressSignOut = false } = options;
  if (!state.user) {
    return {
      ok: false,
      code: 'AUTH_REQUIRED',
      message: getMessageForCode('AUTH_REQUIRED')
    };
  }

  const deviceFingerprint = getDeviceFingerprint();
  const sessionNonce = state.sessionNonce || getStoredValue(STORAGE_KEYS.sessionNonce);
  if (!sessionNonce) {
    const payload = {
      ok: false,
      code: 'SESSION_NOT_FOUND',
      message: getMessageForCode('SESSION_NOT_FOUND')
    };
    if (!suppressSignOut) {
      await forceSignOut(payload.code, payload.message);
    }
    return payload;
  }

  state.sessionNonce = sessionNonce;

  const result = await invokeRpc('verify_current_device_session', {
    p_device_fingerprint: deviceFingerprint,
    p_session_nonce: sessionNonce
  });

  if (!result.ok) {
    console.error('Failed to verify current device session:', result.error);
    const payload = {
      ok: false,
      code: 'SESSION_VERIFY_FAILED',
      message: getMessageForCode('SESSION_VERIFY_FAILED')
    };
    if (!suppressSignOut) {
      setLastError(payload.code, payload.message);
      state.sessionStatus = 'warning';
      emitState();
    }
    return payload;
  }

  const payload = normalizeRpcPayload(result.data, 'SESSION_VERIFY_FAILED');
  if (payload.ok) {
    state.deviceId = payload.device_id || state.deviceId;
    state.sessionStatus = 'active';
    setLastError(null, '');
    emitState();
    return payload;
  }

  if (!suppressSignOut && shouldForceLogout(payload.code)) {
    await forceSignOut(payload.code, payload.message);
    return payload;
  }

  if (!suppressSignOut) {
    setLastError(payload.code, payload.message);
    state.sessionStatus = 'warning';
    emitState();
  }
  return payload;
}

async function ensureDeviceSession(options = {}) {
  const { forceClaim = false } = options;
  if (!state.user) {
    return {
      ok: false,
      code: 'AUTH_REQUIRED',
      message: getMessageForCode('AUTH_REQUIRED')
    };
  }

  if (state.authLifecyclePromise) return state.authLifecyclePromise;

  state.authLifecyclePromise = (async () => {
    state.sessionStatus = 'syncing';
    emitState();

    const deviceFingerprint = getDeviceFingerprint();
    const platform = getPlatformName();

    const registerResult = await invokeRpc('register_current_device', {
      p_device_fingerprint: deviceFingerprint,
      p_platform: platform,
      p_device_name: platform === 'web' ? 'Web Browser' : 'Mobile App',
      p_model_name: getDeviceName(),
      p_app_version: null
    });

    if (!registerResult.ok) {
      throw registerResult.error;
    }

    const registerPayload = normalizeRpcPayload(registerResult.data, 'DEVICE_SESSION_SETUP_FAILED');
    if (!registerPayload.ok) {
      if (shouldForceLogout(registerPayload.code)) {
        await forceSignOut(registerPayload.code, registerPayload.message);
      } else {
        setLastError(registerPayload.code, registerPayload.message);
        state.sessionStatus = 'warning';
        emitState();
      }
      return registerPayload;
    }

    state.deviceId = registerPayload.device_id || state.deviceId;

    const shouldClaim = forceClaim || state.sessionEstablishedForUserId !== state.user.id || !state.sessionNonce;
    if (shouldClaim) {
      const sessionNonce = createUuid();
      const claimResult = await invokeRpc('claim_active_device_session', {
        p_device_fingerprint: deviceFingerprint,
        p_session_nonce: sessionNonce
      });

      if (!claimResult.ok) {
        throw claimResult.error;
      }

      const claimPayload = normalizeRpcPayload(claimResult.data, 'DEVICE_SESSION_SETUP_FAILED');
      if (!claimPayload.ok) {
        if (shouldForceLogout(claimPayload.code)) {
          await forceSignOut(claimPayload.code, claimPayload.message);
        } else {
          setLastError(claimPayload.code, claimPayload.message);
          state.sessionStatus = 'warning';
          emitState();
        }
        return claimPayload;
      }

      state.deviceId = claimPayload.device_id || state.deviceId;
      state.sessionNonce = sessionNonce;
      setStoredValue(STORAGE_KEYS.sessionNonce, sessionNonce);
    }

    state.sessionEstablishedForUserId = state.user.id;
    state.sessionStatus = 'active';
    setLastError(null, '');
    startVerifyTimer();
    emitState();
    return { ok: true, code: 'SESSION_ACTIVE' };
  })().catch(async error => {
    console.error('Failed to establish device session:', error);
    await forceSignOut('DEVICE_SESSION_SETUP_FAILED', getMessageForCode('DEVICE_SESSION_SETUP_FAILED'));
    return {
      ok: false,
      code: 'DEVICE_SESSION_SETUP_FAILED',
      message: getMessageForCode('DEVICE_SESSION_SETUP_FAILED')
    };
  }).finally(() => {
    state.authLifecyclePromise = null;
  });

  return state.authLifecyclePromise;
}

async function init() {
  if (state.initializing) return state.initializing;
  state.initializing = (async () => {
    const client = await ensureClient();
    if (client) {
      const { data, error } = await client.auth.getSession();
      if (error) console.error('Failed to restore auth session:', error);
      state.session = data?.session || null;
      state.user = data?.session?.user || null;
      state.deviceFingerprint = getStoredValue(STORAGE_KEYS.deviceFingerprint) || null;
      state.sessionNonce = getStoredValue(STORAGE_KEYS.sessionNonce) || null;
      if (state.user) {
        await ensureDeviceSession({ forceClaim: true });
      }
    }
    state.initialized = true;
    emitState();
    return getSnapshot();
  })();
  return state.initializing;
}

async function signInWithProvider(providerName) {
  const client = await ensureClient();
  if (!client) {
    return { ok: false, error: getMessageForCode('SUPABASE_NOT_CONFIGURED') };
  }

  setLastError(null, '');
  const provider = String(providerName || getConfig().provider || 'kakao');
  const options = { redirectTo: getRedirectUrl() };
  if (isNativePlatform()) options.skipBrowserRedirect = true;

  const { data, error } = await client.auth.signInWithOAuth({
    provider,
    options
  });

  if (error) {
    return { ok: false, error: error.message || '로그인을 시작하지 못했습니다.' };
  }

  if (isNativePlatform() && data?.url) {
    await Browser.open({ url: data.url, windowName: '_self' });
  }

  return { ok: true };
}

async function signInWithPassword(email, password) {
  const client = await ensureClient();
  if (!client) {
    return { ok: false, error: getMessageForCode('SUPABASE_NOT_CONFIGURED') };
  }

  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = String(password || '');
  if (!normalizedEmail) return { ok: false, error: getMessageForCode('EMAIL_REQUIRED') };
  if (!normalizedPassword) return { ok: false, error: getMessageForCode('PASSWORD_REQUIRED') };

  setLastError(null, '');
  const { data, error } = await client.auth.signInWithPassword({
    email: normalizedEmail,
    password: normalizedPassword
  });

  if (error) {
    return { ok: false, error: error.message || '이메일 로그인에 실패했습니다.' };
  }

  applyAuthSession(data);
  if (!state.user) {
    return { ok: false, error: '로그인 세션을 확인하지 못했습니다.' };
  }

  const sessionResult = await ensureDeviceSession({ forceClaim: true });
  if (!sessionResult?.ok) {
    return { ok: false, error: sessionResult?.message || getMessageForCode('DEVICE_SESSION_SETUP_FAILED') };
  }

  return { ok: true };
}

async function signUpWithEmail(email, password) {
  const client = await ensureClient();
  if (!client) {
    return { ok: false, error: getMessageForCode('SUPABASE_NOT_CONFIGURED') };
  }

  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = String(password || '');
  if (!normalizedEmail) return { ok: false, error: getMessageForCode('EMAIL_REQUIRED') };
  if (!normalizedPassword) return { ok: false, error: getMessageForCode('PASSWORD_REQUIRED') };
  if (normalizedPassword.length < 6) return { ok: false, error: getMessageForCode('PASSWORD_TOO_SHORT') };

  setLastError(null, '');
  const displayName = inferDisplayNameFromEmail(normalizedEmail);
  const { data, error } = await client.auth.signUp({
    email: normalizedEmail,
    password: normalizedPassword,
    options: {
      data: {
        nickname: displayName,
        name: displayName
      }
    }
  });

  if (error) {
    return { ok: false, error: error.message || '계정 생성에 실패했습니다.' };
  }

  applyAuthSession(data);
  if (state.user) {
    const sessionResult = await ensureDeviceSession({ forceClaim: true });
    if (!sessionResult?.ok) {
      return { ok: false, error: sessionResult?.message || getMessageForCode('DEVICE_SESSION_SETUP_FAILED') };
    }
    return { ok: true, message: '테스트 계정이 만들어졌습니다.' };
  }

  return {
    ok: true,
    message: '계정이 만들어졌습니다. Supabase에서 Confirm email이 켜져 있으면 메일 확인 후 로그인해 주세요.'
  };
}

async function signOut() {
  await init();
  setLastError(null, '');
  clearSessionGuardState();

  if (!state.client) {
    state.session = null;
    state.user = null;
    emitState();
    return { ok: true };
  }

  const { error } = await state.client.auth.signOut();
  if (error) {
    return { ok: false, error: error.message || '로그아웃에 실패했습니다.' };
  }

  state.session = null;
  state.user = null;
  emitState();
  return { ok: true };
}

function addListener(listener) {
  if (typeof listener !== 'function') return () => {};
  state.listeners.add(listener);
  listener(getSnapshot());
  return () => state.listeners.delete(listener);
}

window.APP_AUTH = {
  init,
  getState: getSnapshot,
  isConfigured,
  isAuthenticated: () => !!state.user,
  getUser: () => state.user,
  getDisplayName: () => getUserDisplayName(state.user),
  getSupabaseClient: () => state.client,
  getDeviceFingerprint,
  ensureDeviceSession,
  verifyCurrentDeviceSession,
  signInWithKakao: () => signInWithProvider('kakao'),
  signInWithProvider,
  signInWithPassword,
  signUpWithEmail,
  signOut,
  addListener
};

void init();
