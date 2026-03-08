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
            <button class="drawer-item" type="button" onclick="openCategoryFromDrawer('usage_tips')">1. 효과적인 앱사용 방법</button>
            <button class="drawer-item" type="button" onclick="openCategoryFromDrawer('parts_intro')">2. 부품 이해</button>
            <details class="drawer-group" open>
                <summary>3. 핀 번호 학습(넘버링)</summary>
                <div class="drawer-sublist">
                    <button class="drawer-subitem wide" type="button" onclick="openCategoryFromDrawer('numbering')">최근 도면 이어하기</button>
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
                    <button class="drawer-subitem wide" type="button" onclick="openCategoryFromDrawer('practice_all')">전체 도면 보기</button>
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

    function showHomeScreen() {
        document.body.classList.remove('prelaunch');
        document.body.classList.add('home-mode');
        const hero = document.getElementById('heroScreen');
        if (hero) hero.style.display = 'none';
        const home = document.getElementById('homeScreen');
        if (home) home.style.display = 'block';
        setProgressRing('wiringProgressRing', 'wiringProgressText', 42);
        setProgressRing('numberingProgressRing', 'numberingProgressText', 28);
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

    function continueWithProvider(name) {
        const provider = String(name || '').toLowerCase();
        if (provider === 'google') alert('Google 로그인은 준비 중입니다. 대시보드로 이동합니다.');
        else if (provider === 'apple') alert('Apple 로그인은 준비 중입니다. 대시보드로 이동합니다.');
        showHomeScreen();
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
    window.continueLearning = continueLearning;
    window.openCategoryFromDrawer = openCategoryFromDrawer;

    renderHomeDrawerMenu();
    document.body.classList.add('prelaunch');
    document.body.classList.remove('home-mode');
})();
