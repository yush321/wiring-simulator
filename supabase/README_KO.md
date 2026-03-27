# Supabase Setup

이 폴더는 현재 앱의 `Supabase + Kakao 로그인` 백엔드 초안입니다.

앱 쪽에서 이미 다음 흐름은 준비되어 있습니다.

- 카카오 로그인 버튼
- Supabase 세션 복원
- Capacitor deep link: `electricianmaster://auth/callback`
- 무료 체험 진입

실제 로그인을 붙이려면 아래 순서로 진행하면 됩니다.

## 1. Supabase 프로젝트 생성

1. Supabase에서 새 프로젝트를 만듭니다.
2. `Project Settings -> API`에서 다음 값을 복사합니다.
   - `Project URL`
   - `anon public key`
3. 이 값을 [app-config.js](/c:/Users/YU/PycharmProjects/기능사실기앱/src/config/app-config.js)에 입력합니다.

필드 설명:

- `supabaseUrl`: 프로젝트 URL
- `supabaseAnonKey`: anon public key
- `redirectUrl`: 모바일 앱 deep link
- `webRedirectUrl`: 웹 테스트용 redirect URL

기본값:

- 모바일: `electricianmaster://auth/callback`
- 웹 테스트: `http://localhost:4173`

주의:

- `anon key`는 앱에 들어가도 됩니다.
- `service_role key`는 절대 앱에 넣으면 안 됩니다.
- 실제 접근 제어는 RLS 정책으로 막아야 합니다.

## 2. SQL 적용

1. Supabase Dashboard -> SQL Editor 열기
2. [schema.sql](/c:/Users/YU/PycharmProjects/기능사실기앱/supabase/schema.sql) 전체 실행

이 SQL은 다음을 만듭니다.

- `profiles`
- `user_devices`
- `device_change_logs`
- `user_active_sessions`
- `user_learning_progress`
- `user_entitlements`
- `premium_content_manifest`

또한 아래 서버 함수도 포함되어 있습니다.

- `register_current_device(...)`
- `release_current_device(...)`
- `claim_active_device_session(...)`
- `verify_current_device_session(...)`
- `upsert_learning_progress(...)`

## 3. Kakao Provider 연결

1. Kakao Developers에서 앱 생성
2. REST API 키 확보
3. Supabase Dashboard -> Authentication -> Providers -> Kakao 활성화
4. Kakao Client ID / Secret 입력

Redirect URL은 Supabase가 안내하는 값을 Kakao 콘솔에 그대로 등록합니다.

추가로 앱/웹 테스트용 redirect는 아래를 같이 허용하는 쪽이 안전합니다.

- `http://localhost:4173`
- `electricianmaster://auth/callback`

실제 등록 값은 Supabase 대시보드의 Provider 설정 화면에 나온 값을 우선으로 맞추세요.

## 4. Storage 구조 권장안

이미지는 현재 앱 번들에 넣고, 유료 정답/튜토리얼 데이터만 Storage로 빼는 방향을 권장합니다.

예시:

- bucket: `premium-data`
- path:
  - `premium/answers/02.json`
  - `premium/answers/03.json`
  - `premium/tutorial/02.json`
  - `premium/numbering/02.json`

`premium_content_manifest.storage_path`에는 위 경로를 넣습니다.

## 5. 현재 스키마가 해결하는 것

- 한 계정당 기기 최대 2대
- 기기 해제 후 월 1회만 교체
- 한 번에 한 기기만 활성 세션
- 학습 진도 서버 저장
- 유료 권한 기반 콘텐츠 열람

## 6. 아직 앱 코드에서 남은 일

현재 앱에는 인증 뼈대만 붙어 있습니다. 다음 단계에서 연결해야 할 일은 아래입니다.

- Supabase URL/anon key 실제 입력
- 기기 fingerprint 수집 방식 확정
- 앱 시작 시 `register_current_device` 호출
- 로그인 성공 후 `claim_active_device_session` 호출
- 화면 전환/heartbeat 때 `verify_current_device_session` 호출
- `localStorage` 기반 진도를 `user_learning_progress`와 병행 저장
- 결제 후 `user_entitlements` 갱신 로직 추가

## 7. 기기 fingerprint 메모

지금은 서버 함수가 `device_fingerprint` 문자열을 받도록 설계되어 있습니다.

실제 앱에서는 아래 중 하나를 써야 합니다.

- 안정적인 native device id plugin
- 앱 설치 단위 UUID를 생성해서 Secure Storage에 보관

개인적으로는 "하드웨어 고유값"보다 "앱 설치 UUID + 서버 등록" 방식이 운영상 더 안전합니다.

## 8. 추천 상품 코드

예시:

- `pass_1month`
- `pass_2month`
- `kit_basic`
- `kit_practice`

현재 `schema.sql` 예시는 `pass_2month`를 기준으로 premium content를 잠그도록 넣어두었습니다.
