// Runtime auth configuration.
// Fill these values when the Supabase project is ready.
window.APP_AUTH_CONFIG = Object.assign(
  {
    provider: 'kakao',
    supabaseUrl: 'https://znqabutcsqgmjrxtthoo.supabase.co',
    supabaseAnonKey: 'sb_publishable_CTw2eBrDvvL12FCefFVecw_7AWTgBFC',
    redirectUrl: 'electricianmaster://auth/callback',
    webRedirectUrl: 'http://localhost:4173',
    enableGuestAccess: true,
    sessionVerifyIntervalMs: 8000
  },
  window.APP_AUTH_CONFIG || {}
);
