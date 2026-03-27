(function () {
    function renderHomeDrawerMenu() {
        const host = document.getElementById('homeDrawerMenu');
        if (!host) return;

        const buildSubButtons = prefix => {
            let out = '';
            for (let i = 1; i <= 18; i += 1) {
                out += `<button class="drawer-subitem" type="button" onclick="openCategoryFromDrawer('${prefix}_${i}')">${i}</button>`;
            }
            return out;
        };

        const buildNumberingButtons = () => {
            let out = '';
            for (let i = 1; i <= 18; i += 1) {
                out += `<button class="drawer-subitem" type="button" onclick="openCategoryFromDrawer('numbering_${i}')">${i}</button>`;
            }
            return out;
        };

        host.innerHTML = `
            <button class="drawer-item" type="button" onclick="openCategoryFromDrawer('usage_tips')">1. 효과적인 학습 방법</button>
            <button class="drawer-item" type="button" onclick="openCategoryFromDrawer('parts_intro')">2. 부품 이해</button>
            <details class="drawer-group" open>
                <summary>3. 선 번호 학습(서버 예정)</summary>
                <div class="drawer-sublist">
                    <button class="drawer-subitem wide" type="button" onclick="openCategoryFromDrawer('numbering')">최근 화면 이어하기</button>
                    ${buildNumberingButtons()}
                </div>
            </details>
            <button class="drawer-item" type="button" onclick="openCategoryFromDrawer('main_wiring')">4. 배선 연습(주회로)</button>
            <details class="drawer-group">
                <summary>5. 배선 연습(보조회로)</summary>
                <div class="drawer-sublist">
                    <button class="drawer-subitem wide" type="button" onclick="openCategoryFromDrawer('public_all')">전체 튜토리얼 보기</button>
                    ${buildSubButtons('public')}
                </div>
            </details>
            <details class="drawer-group">
                <summary>6. 공개도면</summary>
                <div class="drawer-sublist">
                    <button class="drawer-subitem wide" type="button" onclick="openCategoryFromDrawer('practice_all')">전체 화면 보기</button>
                    ${buildSubButtons('practice')}
                </div>
            </details>
        `;
    }

    function applyLayoutCategoryFromDrawer(categoryId) {
        if (!categoryId) return;
        if (typeof ensureLayoutCategoryOptions === 'function') ensureLayoutCategoryOptions(categoryId);
        if (typeof layoutCategorySelect !== 'undefined' && layoutCategorySelect) {
            layoutCategorySelect.value = categoryId;
        } else {
            const categorySelect = document.getElementById('layoutCategorySelect');
            if (categorySelect) categorySelect.value = categoryId;
        }
        if (typeof onLayoutCategoryChange === 'function') onLayoutCategoryChange();
        if (typeof syncWiringCategoryPresetButtons === 'function') syncWiringCategoryPresetButtons();
    }

    function setProgressRing(id, textId, value) {
        const safe = Math.max(0, Math.min(100, Number(value) || 0));
        const ring = document.getElementById(id);
        const text = document.getElementById(textId);
        if (ring) ring.style.setProperty('--value', String(safe));
        if (text) text.textContent = `${safe}%`;
    }

    function getAuthApi() {
        return (typeof window !== 'undefined' && window.APP_AUTH) ? window.APP_AUTH : null;
    }

    function getAuthState() {
        const auth = getAuthApi();
        return auth?.getState
            ? auth.getState()
            : {
                configured: false,
                authenticated: false,
                guestEnabled: true,
                displayName: '게스트',
                sessionStatus: 'idle',
                lastErrorMessage: null
            };
    }

    function renderAuthUi(snapshot) {
        const state = snapshot || getAuthState();
        const chip = document.getElementById('homeUserChip');
        const actionBtn = document.getElementById('homeAuthActionBtn');
        const heroStatus = document.getElementById('heroAuthStatus');

        if (chip) chip.textContent = state.authenticated ? state.displayName : '게스트';
        if (actionBtn) actionBtn.textContent = state.authenticated ? '로그아웃' : '로그인';

        if (heroStatus) {
            if (!state.configured) {
                heroStatus.textContent = 'Supabase 설정이 비어 있습니다. 지금은 무료 체험 모드로 앱을 둘러볼 수 있습니다.';
            } else if (state.lastErrorMessage) {
                heroStatus.textContent = state.lastErrorMessage;
            } else if (state.authenticated && state.sessionStatus === 'syncing') {
                heroStatus.textContent = '계정과 기기 상태를 확인하는 중입니다.';
            } else if (state.authenticated) {
                heroStatus.textContent = `${state.displayName} 계정으로 로그인되어 있습니다. 진도와 유료 잠금이 계정에 연결됩니다.`;
            } else {
                heroStatus.textContent = '카카오 로그인으로 학습 기록과 유료 기능 잠금을 계정에 연결합니다.';
            }
        }
    }

    function showHomeScreen() {
        document.body.classList.remove('prelaunch');
        document.body.classList.add('home-mode');
        const hero = document.getElementById('heroScreen');
        if (hero) hero.style.display = 'none';
        const home = document.getElementById('homeScreen');
        if (home) home.style.display = 'block';
        setProgressRing('wiringProgressRing', 'wiringProgressText', 42);
        setProgressRing('numberingProgressRing', 'numberingProgressText', 28);
        renderAuthUi();
    }

    function toggleHomeDrawer(open) {
        const drawer = document.getElementById('homeDrawer');
        const backdrop = document.getElementById('homeDrawerBackdrop');
        const on = !!open;
        if (drawer) {
            if (on) drawer.classList.add('open');
            else drawer.classList.remove('open');
            drawer.setAttribute('aria-hidden', on ? 'false' : 'true');
        }
        if (backdrop) backdrop.style.display = on ? 'block' : 'none';
    }

    function revealAppCore() {
        document.body.classList.remove('prelaunch');
        document.body.classList.remove('home-mode');
        const hero = document.getElementById('heroScreen');
        if (hero) hero.style.display = 'none';
        const home = document.getElementById('homeScreen');
        if (home) home.style.display = 'none';
        toggleHomeDrawer(false);
    }

    function startAppFromHero() {
        showHomeScreen();
    }

    async function continueWithProvider(name) {
        const provider = String(name || '').toLowerCase();
        if (provider !== 'kakao') {
            alert('현재는 카카오 로그인만 우선 연결합니다.');
            return;
        }

        const auth = getAuthApi();
        if (!auth) {
            alert('인증 모듈이 아직 준비되지 않았습니다.');
            return;
        }

        const result = await auth.signInWithKakao();
        if (!result?.ok) {
            alert(result?.error || '카카오 로그인을 시작하지 못했습니다.');
        }
    }

    async function handleHomeAuthAction() {
        const auth = getAuthApi();
        if (!auth) {
            alert('인증 모듈이 아직 준비되지 않았습니다.');
            return;
        }

        const state = getAuthState();
        if (state.authenticated) {
            const result = await auth.signOut();
            if (!result?.ok) {
                alert(result?.error || '로그아웃에 실패했습니다.');
                return;
            }
            renderAuthUi(auth.getState?.());
            return;
        }

        const result = await auth.signInWithKakao();
        if (!result?.ok) {
            alert(result?.error || '카카오 로그인을 시작하지 못했습니다.');
        }
    }

    function continueLearning(mode) {
        revealAppCore();
        if (String(mode) === 'numbering') {
            if (typeof setPrimaryMode === 'function') setPrimaryMode('numbering');
            else if (typeof toggleNumberingMode === 'function') toggleNumberingMode();
            return;
        }
        if (typeof setPrimaryMode === 'function') setPrimaryMode('wiring');
    }

    function openCategoryFromDrawer(target) {
        const key = String(target || '').trim();
        if (key === 'usage_tips' || key === 'parts_intro') {
            if (typeof openGuideContentModal === 'function') openGuideContentModal(key);
            toggleHomeDrawer(false);
            return;
        }
        const numberingMatch = key.match(/^numbering_(\d+)$/);
        if (numberingMatch) {
            const picked = numberingMatch[1];
            if (typeof rememberNumberingLayoutId === 'function') rememberNumberingLayoutId(picked);
            if (typeof isNumberingMode !== 'undefined' && isNumberingMode && typeof openNumberingModal === 'function') {
                openNumberingModal();
                toggleHomeDrawer(false);
                return;
            }
            continueLearning('numbering');
            return;
        }
        if (key === 'numbering') {
            continueLearning('numbering');
            return;
        }
        revealAppCore();
        if (typeof setPrimaryMode === 'function') setPrimaryMode('wiring');
        if (key === 'public_exam' || key === 'main' || key === 'aux') {
            if (typeof setWiringCategoryPreset === 'function') setWiringCategoryPreset(key);
            return;
        }
        if (key === 'main_wiring' || key === 'practice_all' || key === 'public_all' || /^practice_\d+$/.test(key) || /^public_\d+$/.test(key)) {
            applyLayoutCategoryFromDrawer(key);
            return;
        }
        if (typeof setWiringCategoryPreset === 'function') setWiringCategoryPreset('public_exam');
    }

    window.renderHomeDrawerMenu = renderHomeDrawerMenu;
    window.applyLayoutCategoryFromDrawer = applyLayoutCategoryFromDrawer;
    window.setProgressRing = setProgressRing;
    window.showHomeScreen = showHomeScreen;
    window.toggleHomeDrawer = toggleHomeDrawer;
    window.revealAppCore = revealAppCore;
    window.startAppFromHero = startAppFromHero;
    window.continueWithProvider = continueWithProvider;
    window.handleHomeAuthAction = handleHomeAuthAction;
    window.continueLearning = continueLearning;
    window.openCategoryFromDrawer = openCategoryFromDrawer;

    renderHomeDrawerMenu();
    renderAuthUi();
    document.body.classList.add('prelaunch');
    document.body.classList.remove('home-mode');

    const auth = getAuthApi();
    if (auth?.addListener) {
        auth.addListener(snapshot => {
            renderAuthUi(snapshot);
            if (snapshot?.authenticated) showHomeScreen();
        });
    }
})();
