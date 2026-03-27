-- Supabase schema for:
-- - Kakao-first authentication
-- - device registration limit (max 2)
-- - single active device session
-- - learning progress sync
-- - paid entitlement and premium content manifest

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  login_provider text not null default 'kakao',
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  device_fingerprint text not null,
  platform text not null check (platform in ('android', 'ios', 'web', 'unknown')),
  device_name text,
  model_name text,
  app_version text,
  registration_status text not null default 'registered' check (registration_status in ('registered', 'released', 'blocked')),
  registered_at timestamptz not null default timezone('utc', now()),
  released_at timestamptz,
  last_seen_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, device_fingerprint)
);

create table if not exists public.device_change_logs (
  id bigserial primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  previous_device_id uuid references public.user_devices (id) on delete set null,
  new_device_fingerprint text,
  reason text not null default 'manual',
  changed_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_active_sessions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  device_id uuid not null references public.user_devices (id) on delete cascade,
  session_nonce uuid not null default gen_random_uuid(),
  last_activated_at timestamptz not null default timezone('utc', now()),
  last_seen_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_learning_progress (
  id bigserial primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  scope_kind text not null check (scope_kind in ('wiring', 'numbering', 'guide', 'note', 'meta')),
  scope_key text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, scope_kind, scope_key)
);

create table if not exists public.user_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_code text not null,
  status text not null default 'active' check (status in ('active', 'grace', 'expired', 'revoked')),
  source text not null default 'manual' check (source in ('manual', 'google_play', 'app_store', 'promo', 'admin')),
  external_order_id text,
  starts_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.premium_content_manifest (
  content_key text primary key,
  category text not null check (category in ('answer', 'tutorial', 'numbering', 'bundle')),
  title text not null,
  storage_path text not null,
  version integer not null default 1,
  is_free boolean not null default false,
  requires_product_code text,
  is_enabled boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists user_entitlements_external_order_uidx
  on public.user_entitlements (source, external_order_id)
  where external_order_id is not null;

create index if not exists user_devices_user_status_idx
  on public.user_devices (user_id, registration_status);

create index if not exists device_change_logs_user_changed_at_idx
  on public.device_change_logs (user_id, changed_at desc);

create index if not exists user_learning_progress_user_scope_idx
  on public.user_learning_progress (user_id, scope_kind, scope_key);

create index if not exists user_entitlements_user_status_idx
  on public.user_entitlements (user_id, status, expires_at);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists user_devices_set_updated_at on public.user_devices;
create trigger user_devices_set_updated_at
before update on public.user_devices
for each row
execute function public.set_updated_at();

drop trigger if exists user_learning_progress_set_updated_at on public.user_learning_progress;
create trigger user_learning_progress_set_updated_at
before update on public.user_learning_progress
for each row
execute function public.set_updated_at();

drop trigger if exists user_entitlements_set_updated_at on public.user_entitlements;
create trigger user_entitlements_set_updated_at
before update on public.user_entitlements
for each row
execute function public.set_updated_at();

drop trigger if exists premium_content_manifest_set_updated_at on public.premium_content_manifest;
create trigger premium_content_manifest_set_updated_at
before update on public.premium_content_manifest
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, display_name, login_provider)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'nickname',
      new.raw_user_meta_data ->> 'name',
      new.email
    ),
    coalesce(new.raw_app_meta_data ->> 'provider', 'kakao')
  )
  on conflict (user_id) do update
  set
    display_name = excluded.display_name,
    login_provider = excluded.login_provider,
    updated_at = timezone('utc', now());

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.user_devices enable row level security;
alter table public.device_change_logs enable row level security;
alter table public.user_active_sessions enable row level security;
alter table public.user_learning_progress enable row level security;
alter table public.user_entitlements enable row level security;
alter table public.premium_content_manifest enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
on public.profiles
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
on public.profiles
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists user_devices_select_own on public.user_devices;
create policy user_devices_select_own
on public.user_devices
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists device_change_logs_select_own on public.device_change_logs;
create policy device_change_logs_select_own
on public.device_change_logs
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists user_active_sessions_select_own on public.user_active_sessions;
create policy user_active_sessions_select_own
on public.user_active_sessions
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists learning_progress_select_own on public.user_learning_progress;
create policy learning_progress_select_own
on public.user_learning_progress
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists learning_progress_insert_own on public.user_learning_progress;
create policy learning_progress_insert_own
on public.user_learning_progress
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists learning_progress_update_own on public.user_learning_progress;
create policy learning_progress_update_own
on public.user_learning_progress
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists learning_progress_delete_own on public.user_learning_progress;
create policy learning_progress_delete_own
on public.user_learning_progress
for delete
to authenticated
using (user_id = auth.uid());

drop policy if exists entitlements_select_own on public.user_entitlements;
create policy entitlements_select_own
on public.user_entitlements
for select
to authenticated
using (user_id = auth.uid());

create or replace function public.has_active_entitlement(p_product_code text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_entitlements e
    where e.user_id = auth.uid()
      and e.product_code = p_product_code
      and e.status in ('active', 'grace')
      and (e.expires_at is null or e.expires_at > timezone('utc', now()))
  );
$$;

drop policy if exists premium_content_manifest_select on public.premium_content_manifest;
create policy premium_content_manifest_select
on public.premium_content_manifest
for select
to authenticated, anon
using (
  is_enabled = true
  and (
    is_free = true
    or (
      auth.uid() is not null
      and requires_product_code is not null
      and public.has_active_entitlement(requires_product_code)
    )
  )
);

create or replace function public.register_current_device(
  p_device_fingerprint text,
  p_platform text,
  p_device_name text default null,
  p_model_name text default null,
  p_app_version text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_existing public.user_devices%rowtype;
  v_device_id uuid;
  v_active_count integer;
  v_platform text := lower(coalesce(nullif(trim(p_platform), ''), 'unknown'));
begin
  if v_user_id is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  if coalesce(trim(p_device_fingerprint), '') = '' then
    raise exception 'DEVICE_FINGERPRINT_REQUIRED';
  end if;

  select *
  into v_existing
  from public.user_devices
  where user_id = v_user_id
    and device_fingerprint = trim(p_device_fingerprint)
  limit 1;

  if found then
    update public.user_devices
    set
      platform = v_platform,
      device_name = nullif(trim(p_device_name), ''),
      model_name = nullif(trim(p_model_name), ''),
      app_version = nullif(trim(p_app_version), ''),
      registration_status = 'registered',
      released_at = null,
      last_seen_at = timezone('utc', now())
    where id = v_existing.id
    returning id into v_device_id;

    return jsonb_build_object(
      'ok', true,
      'device_id', v_device_id,
      'reused', true,
      'code', 'REGISTERED'
    );
  end if;

  select count(*)
  into v_active_count
  from public.user_devices
  where user_id = v_user_id
    and registration_status = 'registered';

  if v_active_count >= 2 then
    return jsonb_build_object(
      'ok', false,
      'code', 'DEVICE_LIMIT_REACHED',
      'message', '등록 가능한 기기 수는 최대 2대입니다.'
    );
  end if;

  insert into public.user_devices (
    user_id,
    device_fingerprint,
    platform,
    device_name,
    model_name,
    app_version,
    last_seen_at
  )
  values (
    v_user_id,
    trim(p_device_fingerprint),
    v_platform,
    nullif(trim(p_device_name), ''),
    nullif(trim(p_model_name), ''),
    nullif(trim(p_app_version), ''),
    timezone('utc', now())
  )
  returning id into v_device_id;

  return jsonb_build_object(
    'ok', true,
    'device_id', v_device_id,
    'reused', false,
    'code', 'REGISTERED'
  );
end;
$$;

create or replace function public.release_current_device(
  p_device_fingerprint text,
  p_reason text default 'manual'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_device public.user_devices%rowtype;
  v_changes_this_month integer;
begin
  if v_user_id is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  if coalesce(trim(p_device_fingerprint), '') = '' then
    raise exception 'DEVICE_FINGERPRINT_REQUIRED';
  end if;

  select *
  into v_device
  from public.user_devices
  where user_id = v_user_id
    and device_fingerprint = trim(p_device_fingerprint)
    and registration_status = 'registered'
  limit 1;

  if not found then
    return jsonb_build_object(
      'ok', false,
      'code', 'DEVICE_NOT_FOUND',
      'message', '등록된 기기를 찾을 수 없습니다.'
    );
  end if;

  select count(*)
  into v_changes_this_month
  from public.device_change_logs
  where user_id = v_user_id
    and changed_at >= date_trunc('month', timezone('utc', now()));

  if v_changes_this_month >= 1 then
    return jsonb_build_object(
      'ok', false,
      'code', 'DEVICE_CHANGE_COOLDOWN',
      'message', '기기 변경은 월 1회만 허용됩니다.'
    );
  end if;

  update public.user_devices
  set
    registration_status = 'released',
    released_at = timezone('utc', now())
  where id = v_device.id;

  delete from public.user_active_sessions
  where user_id = v_user_id
    and device_id = v_device.id;

  insert into public.device_change_logs (
    user_id,
    previous_device_id,
    new_device_fingerprint,
    reason
  )
  values (
    v_user_id,
    v_device.id,
    null,
    coalesce(nullif(trim(p_reason), ''), 'manual')
  );

  return jsonb_build_object(
    'ok', true,
    'code', 'DEVICE_RELEASED',
    'device_id', v_device.id
  );
end;
$$;

create or replace function public.claim_active_device_session(
  p_device_fingerprint text,
  p_session_nonce uuid default gen_random_uuid()
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_device public.user_devices%rowtype;
  v_previous public.user_active_sessions%rowtype;
begin
  if v_user_id is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  select *
  into v_device
  from public.user_devices
  where user_id = v_user_id
    and device_fingerprint = trim(p_device_fingerprint)
    and registration_status = 'registered'
  limit 1;

  if not found then
    return jsonb_build_object(
      'ok', false,
      'code', 'DEVICE_NOT_REGISTERED',
      'message', '먼저 기기 등록이 필요합니다.'
    );
  end if;

  select *
  into v_previous
  from public.user_active_sessions
  where user_id = v_user_id;

  insert into public.user_active_sessions (
    user_id,
    device_id,
    session_nonce,
    last_activated_at,
    last_seen_at
  )
  values (
    v_user_id,
    v_device.id,
    p_session_nonce,
    timezone('utc', now()),
    timezone('utc', now())
  )
  on conflict (user_id) do update
  set
    device_id = excluded.device_id,
    session_nonce = excluded.session_nonce,
    last_activated_at = excluded.last_activated_at,
    last_seen_at = excluded.last_seen_at;

  update public.user_devices
  set last_seen_at = timezone('utc', now())
  where id = v_device.id;

  return jsonb_build_object(
    'ok', true,
    'code', 'SESSION_CLAIMED',
    'device_id', v_device.id,
    'session_nonce', p_session_nonce,
    'kicked_device_id', v_previous.device_id
  );
end;
$$;

create or replace function public.verify_current_device_session(
  p_device_fingerprint text,
  p_session_nonce uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_device public.user_devices%rowtype;
  v_session public.user_active_sessions%rowtype;
begin
  if v_user_id is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  select *
  into v_device
  from public.user_devices
  where user_id = v_user_id
    and device_fingerprint = trim(p_device_fingerprint)
    and registration_status = 'registered'
  limit 1;

  if not found then
    return jsonb_build_object(
      'ok', false,
      'code', 'DEVICE_NOT_REGISTERED'
    );
  end if;

  select *
  into v_session
  from public.user_active_sessions
  where user_id = v_user_id;

  if not found then
    return jsonb_build_object(
      'ok', false,
      'code', 'SESSION_NOT_FOUND'
    );
  end if;

  if v_session.device_id <> v_device.id or v_session.session_nonce <> p_session_nonce then
    return jsonb_build_object(
      'ok', false,
      'code', 'SESSION_REVOKED'
    );
  end if;

  update public.user_devices
  set last_seen_at = timezone('utc', now())
  where id = v_device.id;

  update public.user_active_sessions
  set last_seen_at = timezone('utc', now())
  where user_id = v_user_id;

  return jsonb_build_object(
    'ok', true,
    'code', 'SESSION_ACTIVE',
    'device_id', v_device.id
  );
end;
$$;

create or replace function public.upsert_learning_progress(
  p_scope_kind text,
  p_scope_key text,
  p_payload jsonb
)
returns public.user_learning_progress
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_row public.user_learning_progress%rowtype;
begin
  if v_user_id is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  insert into public.user_learning_progress (
    user_id,
    scope_kind,
    scope_key,
    payload
  )
  values (
    v_user_id,
    p_scope_kind,
    trim(p_scope_key),
    coalesce(p_payload, '{}'::jsonb)
  )
  on conflict (user_id, scope_kind, scope_key) do update
  set payload = excluded.payload
  returning * into v_row;

  return v_row;
end;
$$;

-- Example content manifest rows.
-- Adjust storage_path to match your Storage bucket layout.
insert into public.premium_content_manifest (
  content_key,
  category,
  title,
  storage_path,
  version,
  is_free,
  requires_product_code,
  is_enabled
)
values
  ('answers_01', 'answer', '1번 도면 정답', 'premium/answers/01.json', 1, true, null, true),
  ('answers_02', 'answer', '2번 도면 정답', 'premium/answers/02.json', 1, false, 'pass_2month', true),
  ('answers_03', 'answer', '3번 도면 정답', 'premium/answers/03.json', 1, false, 'pass_2month', true)
on conflict (content_key) do nothing;
