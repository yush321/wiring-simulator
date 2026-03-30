(function () {
    const GUIDE_CONTENT_STORAGE_KEY = 'guide_content_v1';
    const GUIDE_EXPORT_VAR_NAME = 'APP_GUIDE_CONTENT_DEFAULT';
    const GUIDE_KEYS = ['usage_tips', 'parts_intro'];
    const GUIDE_CONTENT_FALLBACK = {
        usage_tips: {
            title: '효과적인 앱사용 방법',
            pages: [
                {
                    image: '',
                    body: '<p><b>추천 순서:</b> 사용법 확인 -> 부품 이해 -> 넘버링 -> 배선 연습 순서로 진행하세요.</p><p>처음에는 채점보다 설명과 되돌리기를 자주 쓰는 편이 효율적입니다.</p>'
                }
            ]
        },
        parts_intro: {
            title: '부품 이해',
            pages: [
                {
                    image: '',
                    body: '<p>자주 나오는 부품의 역할과 접점 구조를 먼저 익혀두면 넘버링과 배선 속도가 같이 올라갑니다.</p><p>이미지와 설명을 관리자 모드에서 페이지별로 정리해 둘 수 있습니다.</p>'
                }
            ]
        }
    };

    const guideEditorModal = document.getElementById('guideEditorModal');
    const guideEditorKey = document.getElementById('guideEditorKey');
    const guideEditorTitle = document.getElementById('guideEditorTitle');
    const guideEditorPageCount = document.getElementById('guideEditorPageCount');
    const guideEditorPageTabs = document.getElementById('guideEditorPageTabs');
    const guideEditorActivePageLabel = document.getElementById('guideEditorActivePageLabel');
    const guideEditorPageImage = document.getElementById('guideEditorPageImage');
    const guideEditorPageText = document.getElementById('guideEditorPageText');
    const guideEditorPreview = document.getElementById('guideEditorPreview');
    const guideEditorStatus = document.getElementById('guideEditorStatus');
    const guideEditorJson = document.getElementById('guideEditorJson');

    const guideEditorState = {
        key: 'usage_tips',
        pages: [],
        activePage: 0
    };

    let guideModalState = null;

    function deepClone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function normalizeGuidePage(page) {
        return {
            image: String(page?.image || '').trim(),
            body: String(page?.body || '')
        };
    }

    function normalizeGuideEntry(entry, key) {
        const source = entry && typeof entry === 'object' && !Array.isArray(entry) ? entry : {};
        const rawPages = Array.isArray(source.pages) && source.pages.length ? source.pages : [{ image: '', body: '' }];
        return {
            title: String(source.title || GUIDE_CONTENT_FALLBACK[key]?.title || key),
            pages: rawPages.map(normalizeGuidePage)
        };
    }

    function normalizeGuideContentMap(raw, options = {}) {
        const allowPartial = !!options.allowPartial;
        const source = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
        const result = {};

        GUIDE_KEYS.forEach(key => {
            if (allowPartial && !(key in source)) return;
            const entry = source[key];
            if (allowPartial && (!entry || typeof entry !== 'object' || Array.isArray(entry))) return;
            result[key] = normalizeGuideEntry(entry, key);
        });

        if (allowPartial) return result;

        GUIDE_KEYS.forEach(key => {
            if (!result[key]) {
                result[key] = normalizeGuideEntry(GUIDE_CONTENT_FALLBACK[key], key);
            }
        });

        return result;
    }

    const GUIDE_CONTENT_DEFAULT = normalizeGuideContentMap(window.APP_GUIDE_CONTENT_DEFAULT || GUIDE_CONTENT_FALLBACK);

    function loadInitialGuideContent() {
        const base = deepClone(GUIDE_CONTENT_DEFAULT);
        try {
            const savedGuide = localStorage.getItem(GUIDE_CONTENT_STORAGE_KEY);
            if (!savedGuide) return base;
            const parsedGuide = JSON.parse(savedGuide);
            const overrides = normalizeGuideContentMap(parsedGuide, { allowPartial: true });
            return normalizeGuideContentMap({
                ...base,
                ...overrides
            });
        } catch (e) {
            return base;
        }
    }

    let guideContent = loadInitialGuideContent();

    function persistGuideContent() {
        try {
            localStorage.setItem(GUIDE_CONTENT_STORAGE_KEY, JSON.stringify(guideContent));
        } catch (e) {
            // ignore storage errors
        }
    }

    function cloneGuideEntry(key) {
        return normalizeGuideEntry(guideContent[key] || GUIDE_CONTENT_DEFAULT[key], key);
    }

    function buildGuideExportPayload() {
        return normalizeGuideContentMap(guideContent);
    }

    function setGuideEditorStatus(text) {
        if (guideEditorStatus) guideEditorStatus.textContent = String(text || '');
    }

    function syncGuideEditorDraft() {
        if (!guideEditorState.pages.length) return;
        const idx = Number.isInteger(guideEditorState.activePage) ? guideEditorState.activePage : 0;
        if (!guideEditorState.pages[idx]) guideEditorState.pages[idx] = { image: '', body: '' };
        guideEditorState.pages[idx].image = String(guideEditorPageImage?.value || '').trim();
        guideEditorState.pages[idx].body = String(guideEditorPageText?.value || '');
    }

    function renderGuideEditorPreview() {
        if (!guideEditorPreview) return;
        syncGuideEditorDraft();
        const idx = Number.isInteger(guideEditorState.activePage) ? guideEditorState.activePage : 0;
        const page = guideEditorState.pages[idx] || { image: '', body: '' };
        const imageBlock = page.image
            ? `<img src="${String(page.image).replace(/\\/g, '/')}" alt="가이드 이미지" style="max-width:100%; height:auto; border:1px solid #ccc; margin:10px 0; border-radius:5px;">`
            : '';
        guideEditorPreview.innerHTML = `${imageBlock}${String(page.body || '')}`;
    }

    function renderGuideEditorPages(count, pages) {
        guideEditorState.pages = Array.from({ length: Math.max(1, count) }, (_, idx) => ({
            image: String(pages?.[idx]?.image || ''),
            body: String(pages?.[idx]?.body || '')
        }));
        if (guideEditorState.activePage >= guideEditorState.pages.length) {
            guideEditorState.activePage = guideEditorState.pages.length - 1;
        }
        if (guideEditorPageTabs) {
            guideEditorPageTabs.innerHTML = '';
            guideEditorState.pages.forEach((page, idx) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = `페이지 ${idx + 1}`;
                if (idx === guideEditorState.activePage) btn.classList.add('active');
                btn.onclick = () => {
                    syncGuideEditorDraft();
                    guideEditorState.activePage = idx;
                    renderGuideEditorPages(guideEditorState.pages.length, guideEditorState.pages);
                };
                guideEditorPageTabs.appendChild(btn);
            });
        }
        const active = guideEditorState.pages[guideEditorState.activePage] || { image: '', body: '' };
        if (guideEditorActivePageLabel) guideEditorActivePageLabel.textContent = `페이지 ${guideEditorState.activePage + 1}`;
        if (guideEditorPageImage) guideEditorPageImage.value = active.image || '';
        if (guideEditorPageText) guideEditorPageText.value = active.body || '';
        if (guideEditorPageCount) guideEditorPageCount.value = String(guideEditorState.pages.length);
        renderGuideEditorPreview();
    }

    function loadGuideEditorEntry(key) {
        const normalized = key === 'parts_intro' ? 'parts_intro' : 'usage_tips';
        guideEditorState.key = normalized;
        const entry = cloneGuideEntry(normalized);
        if (guideEditorKey) guideEditorKey.value = normalized;
        if (guideEditorTitle) guideEditorTitle.value = entry.title;
        guideEditorState.activePage = 0;
        renderGuideEditorPages(entry.pages.length || 1, entry.pages);
        setGuideEditorStatus('');
    }

    function buildGuideModalPageHtml(entry, page) {
        const image = String(page?.image || '').trim();
        const body = String(page?.body || '');
        const imageBlock = image
            ? `<img src="${image.replace(/\\/g, '/')}" alt="${entry.title}" style="max-width:100%; height:auto; border:1px solid #ccc; margin:10px 0; border-radius:5px;">`
            : '';
        return `${imageBlock}${body}`;
    }

    function openGuideContentModal(key = 'usage_tips') {
        currentModalPage = 0;
        guideModalState = { key: key === 'parts_intro' ? 'parts_intro' : 'usage_tips' };
        if (typeof updateModalContent === 'function') updateModalContent();
        if (typeof infoModal !== 'undefined' && infoModal) infoModal.style.display = 'flex';
    }

    function renderGuideModalContent(pageIndex) {
        if (!guideModalState) return false;

        const entry = cloneGuideEntry(guideModalState.key);
        const pages = entry.pages;
        const page = pages[pageIndex] || pages[0] || { image: '', body: '' };
        const indicator = document.getElementById('pageIndicator');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const startBtn = document.getElementById('startBtn');
        const playBtn = document.getElementById('playBtn');
        const playSpeedSelect = document.getElementById('playSpeedSelect');

        modalBody.innerHTML = buildGuideModalPageHtml(entry, page);
        if (pages.length > 1) {
            modalTitle.innerText = `${entry.title} (${pageIndex + 1}/${pages.length})`;
            indicator.innerText = `${pageIndex + 1} / ${pages.length}`;
            indicator.style.display = 'inline-block';
        } else {
            modalTitle.innerText = entry.title;
            indicator.style.display = 'none';
        }
        if (playBtn) playBtn.style.display = 'none';
        if (playSpeedSelect) playSpeedSelect.style.display = 'none';
        if (pages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            startBtn.style.display = 'inline-block';
            return true;
        }
        prevBtn.style.display = pageIndex === 0 ? 'none' : 'inline-block';
        prevBtn.disabled = pageIndex === 0;
        if (pageIndex === pages.length - 1) {
            nextBtn.style.display = 'none';
            startBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            startBtn.style.display = 'none';
        }
        return true;
    }

    function openGuideEditorModal(key = 'usage_tips') {
        if (!isAdminMode) {
            alert('관리자 모드에서만 편집기를 사용할 수 있어.');
            return;
        }
        loadGuideEditorEntry(key);
        if (guideEditorPageText && guideEditorPageText.dataset.boundInput !== '1') {
            guideEditorPageText.addEventListener('input', renderGuideEditorPreview);
            guideEditorPageText.dataset.boundInput = '1';
        }
        if (guideEditorPageImage && guideEditorPageImage.dataset.boundInput !== '1') {
            guideEditorPageImage.addEventListener('input', renderGuideEditorPreview);
            guideEditorPageImage.dataset.boundInput = '1';
        }
        if (guideEditorModal) guideEditorModal.style.display = 'flex';
    }

    function parseGuideImportText(rawText) {
        const text = String(rawText || '').trim();
        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (e) {
            // continue below
        }

        if (typeof parseAssignmentObject === 'function') {
            try {
                return parseAssignmentObject(text, GUIDE_EXPORT_VAR_NAME);
            } catch (e) {
                // continue below
            }
        }

        const assignmentPatterns = [
            /(?:window\.)?APP_GUIDE_CONTENT_DEFAULT\s*=\s*([\s\S]*?)\s*;?\s*$/,
            /(?:const|let|var)\s+APP_GUIDE_CONTENT_DEFAULT\s*=\s*([\s\S]*?)\s*;?\s*$/
        ];
        for (const pattern of assignmentPatterns) {
            const match = text.match(pattern);
            if (!match?.[1]) continue;
            return JSON.parse(match[1]);
        }

        return JSON.parse(text);
    }

    function mergeGuideImportData(data) {
        if (!data || typeof data !== 'object' || Array.isArray(data)) return false;

        const currentKey = guideEditorState.key || 'usage_tips';
        const looksLikeSingleEntry = Array.isArray(data.pages) || typeof data.title === 'string';
        const nextContent = buildGuideExportPayload();

        if (looksLikeSingleEntry) {
            nextContent[currentKey] = normalizeGuideEntry(data, currentKey);
        } else {
            const partial = normalizeGuideContentMap(data, { allowPartial: true });
            const importedKeys = Object.keys(partial);
            if (!importedKeys.length) return false;
            importedKeys.forEach(key => {
                nextContent[key] = partial[key];
            });
        }

        guideContent = normalizeGuideContentMap(nextContent);
        persistGuideContent();
        return true;
    }

    window.onGuideEditorKeyChange = function () {
        syncGuideEditorDraft();
        loadGuideEditorEntry(guideEditorKey?.value || 'usage_tips');
    };

    window.applyGuidePageCount = function () {
        syncGuideEditorDraft();
        const count = Math.max(1, Math.min(100, parseInt(guideEditorPageCount?.value || '1', 10) || 1));
        renderGuideEditorPages(count, guideEditorState.pages);
        setGuideEditorStatus(`페이지 수를 ${count}개로 적용했습니다.`);
    };

    window.addGuideEditorPage = function () {
        syncGuideEditorDraft();
        guideEditorState.pages.push({ image: '', body: '' });
        guideEditorState.activePage = guideEditorState.pages.length - 1;
        renderGuideEditorPages(guideEditorState.pages.length, guideEditorState.pages);
        setGuideEditorStatus('새 페이지를 추가했습니다.');
    };

    window.saveGuideEditor = function () {
        syncGuideEditorDraft();
        const key = guideEditorState.key || 'usage_tips';
        guideContent[key] = {
            title: String(guideEditorTitle?.value || '').trim() || cloneGuideEntry(key).title,
            pages: guideEditorState.pages.map(normalizeGuidePage)
        };
        persistGuideContent();
        setGuideEditorStatus(`${guideContent[key].title} 저장 완료`);
    };

    window.exportGuideScenario = async function () {
        window.saveGuideEditor();
        const payload = buildGuideExportPayload();
        const out = JSON.stringify(payload, null, 2);
        const fileName = typeof buildExportFileName === 'function'
            ? buildExportFileName('guide', 'all')
            : 'guide-content.json';

        if (guideEditorJson) {
            guideEditorJson.value = out;
            guideEditorJson.select();
        }
        if (typeof downloadJsonTextFile === 'function') {
            downloadJsonTextFile(fileName, out);
        }
        const copied = typeof copyTextToClipboard === 'function'
            ? await copyTextToClipboard(out)
            : false;
        setGuideEditorStatus(
            copied
                ? `가이드 JSON 내보내기 완료 (${fileName}) + 자동 복사 완료`
                : `가이드 JSON 내보내기 완료 (${fileName}, 기본 파일은 src/data/guide/guide-content-data.js)`
        );
    };

    window.importGuideScenario = function () {
        const text = String(guideEditorJson?.value || '').trim();
        if (!text) return;

        try {
            const data = parseGuideImportText(text);
            const ok = mergeGuideImportData(data);
            if (!ok) {
                alert('형식이 올바르지 않아. {usage_tips:{...}, parts_intro:{...}} 또는 {title,pages} 형태가 필요해.');
                return;
            }
            loadGuideEditorEntry(guideEditorState.key || 'usage_tips');
            setGuideEditorStatus('가이드 JSON 불러오기 완료');
        } catch (e) {
            alert(`가이드 JSON을 불러오지 못했어: ${e?.message || e}`);
        }
    };

    window.closeGuideEditorModal = function () {
        if (guideEditorModal) guideEditorModal.style.display = 'none';
    };

    window.openGuideEditorModal = openGuideEditorModal;

    window.previewGuideEditor = function () {
        window.saveGuideEditor();
        window.closeGuideEditorModal();
        openGuideContentModal(guideEditorState.key || 'usage_tips');
    };

    window.resetGuideContentLocalStorage = function () {
        const ok = confirm('이 가이드 로컬 저장 데이터를 초기화하고 기본값으로 되돌릴까?');
        if (!ok) return;
        try {
            localStorage.removeItem(GUIDE_CONTENT_STORAGE_KEY);
        } catch (e) {
            // ignore storage errors
        }
        guideContent = deepClone(GUIDE_CONTENT_DEFAULT);
        loadGuideEditorEntry(guideEditorState.key || 'usage_tips');
        setGuideEditorStatus('가이드 로컬 저장 초기화 완료');
    };

    window.openGuideContentModal = openGuideContentModal;
    window.renderGuideModalContent = renderGuideModalContent;
    window.getGuideModalPageCount = function () {
        return guideModalState ? cloneGuideEntry(guideModalState.key).pages.length : 0;
    };
    window.isGuideModalActive = function () {
        return !!guideModalState;
    };
    window.clearGuideModalState = function () {
        guideModalState = null;
    };
})();
