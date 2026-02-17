    const ANSWER_STORAGE_KEY = 'wiring_answers_v1';

    const DROPIN_BASE_PATH = './src/data/dropin/';
    const DROPIN_MANIFEST_PATH = `${DROPIN_BASE_PATH}manifest.json`;
    const DROPIN_DEFAULT_FILES = {
        tutorial: 'tutorial.json',
        numbering: 'numbering.json',
        answers: 'answers.json'
    };

    function isPlainObject(value) {
        return !!value && typeof value === 'object' && !Array.isArray(value);
    }

    function getRuntimeConfig() {
        if (typeof window === 'undefined' || !isPlainObject(window.APP_RUNTIME_CONFIG)) return {};
        return window.APP_RUNTIME_CONFIG;
    }

    function shouldLoadAnswerStorageOverride() {
        const cfg = getRuntimeConfig();
        return cfg.enableAnswerStorageOverride === true;
    }

    function persistAnswerData() {
        try {
            localStorage.setItem(ANSWER_STORAGE_KEY, JSON.stringify(DB_ANSWERS));
        } catch (e) {}
    }

    function loadAnswerDataFromStorage() {
        try {
            const raw = localStorage.getItem(ANSWER_STORAGE_KEY);
            if (!raw) return;
            const parsed = normalizeAnswersPayload(JSON.parse(raw));
            if (!parsed) return;
            Object.keys(parsed).forEach(k => {
                DB_ANSWERS[k] = {
                    ...(normalizeAnswerEntry(DB_ANSWERS[k])),
                    ...(parsed[k] || {})
                };
            });
        } catch (e) {}
    }

    function ensureLayoutAnswer(layoutId) {
        const key = String(layoutId || currentLayoutId || '');
        if (!key) return null;
        if (!DB_ANSWERS[key]) DB_ANSWERS[key] = { targets: [], commons: [], nodes: [], tutorialFlow: [], componentFilter: [] };
        if (!Array.isArray(DB_ANSWERS[key].targets)) DB_ANSWERS[key].targets = [];
        if (!Array.isArray(DB_ANSWERS[key].commons)) DB_ANSWERS[key].commons = [];
        if (!Array.isArray(DB_ANSWERS[key].nodes)) DB_ANSWERS[key].nodes = [];
        if (!Array.isArray(DB_ANSWERS[key].tutorialFlow)) DB_ANSWERS[key].tutorialFlow = [];
        if (!Array.isArray(DB_ANSWERS[key].componentFilter)) DB_ANSWERS[key].componentFilter = [];
        return DB_ANSWERS[key];
    }

    function parseLooseJsonPayload(rawText) {
        const text = String(rawText || '').trim();
        if (!text) return null;
        try {
            return JSON.parse(text);
        } catch (jsonErr) {
            const matched = text.match(/(?:let|const|var)\s+[A-Za-z_$][\w$]*\s*=\s*([\s\S]*?)\s*;?\s*$/);
            const objectText = matched ? matched[1] : text;
            return JSON.parse(objectText);
        }
    }

    function toDropinPath(fileName) {
        const normalized = String(fileName || '').trim().replace(/^\.?\/*/, '');
        return `${DROPIN_BASE_PATH}${normalized || ''}`;
    }

    function normalizeAnswerEntry(raw) {
        const src = isPlainObject(raw) ? raw : {};
        return {
            targets: Array.isArray(src.targets) ? src.targets : [],
            commons: Array.isArray(src.commons) ? src.commons : [],
            nodes: Array.isArray(src.nodes) ? src.nodes : [],
            tutorialFlow: Array.isArray(src.tutorialFlow) ? src.tutorialFlow : [],
            componentFilter: Array.isArray(src.componentFilter) ? src.componentFilter : []
        };
    }

    function normalizeAnswersPayload(raw) {
        let src = raw;
        if (isPlainObject(src) && isPlainObject(src.DB_ANSWERS)) src = src.DB_ANSWERS;
        if (!isPlainObject(src)) return null;
        const normalized = {};
        Object.keys(src).forEach(layoutId => {
            if (!String(layoutId).trim()) return;
            normalized[String(layoutId)] = normalizeAnswerEntry(src[layoutId]);
        });
        return Object.keys(normalized).length ? normalized : null;
    }

    function normalizeTutorialEntry(raw) {
        if (!isPlainObject(raw) || typeof raw.title !== 'string' || !raw.title.trim()) return null;
        const descList = Array.isArray(raw.desc) ? raw.desc : [raw.desc];
        return {
            title: String(raw.title),
            desc: descList.map(v => String(v ?? '')),
            img: String(raw.img || ''),
            targetIds: Array.isArray(raw.targetIds) ? raw.targetIds.map(v => String(v)) : [],
            category: String(raw.category || '')
        };
    }

    function normalizeTutorialPayload(raw) {
        if (!isPlainObject(raw)) return null;
        const normalized = {};
        Object.keys(raw).forEach(layoutId => {
            const entry = normalizeTutorialEntry(raw[layoutId]);
            if (!entry) return;
            normalized[String(layoutId)] = entry;
        });
        return Object.keys(normalized).length ? normalized : null;
    }

    function normalizeNumberingPayload(raw) {
        if (!isPlainObject(raw)) return null;
        return raw;
    }

    function parseManifestPayload(raw) {
        if (!isPlainObject(raw)) return {};
        const files = isPlainObject(raw.files) ? raw.files : raw;
        const picked = {};
        ['tutorial', 'numbering', 'answers'].forEach(kind => {
            const name = String(files[kind] || '').trim();
            if (!name || !/\.json$/i.test(name)) return;
            picked[kind] = name;
        });
        return picked;
    }

    async function discoverDropinFiles() {
        const defaults = {
            tutorial: toDropinPath(DROPIN_DEFAULT_FILES.tutorial),
            numbering: toDropinPath(DROPIN_DEFAULT_FILES.numbering),
            answers: toDropinPath(DROPIN_DEFAULT_FILES.answers)
        };
        try {
            const res = await fetch(`${DROPIN_MANIFEST_PATH}?v=${Date.now()}`, { cache: 'no-store' });
            if (!res.ok) return defaults;
            const manifest = parseManifestPayload(parseLooseJsonPayload(await res.text()));
            return {
                tutorial: manifest.tutorial ? toDropinPath(manifest.tutorial) : defaults.tutorial,
                numbering: manifest.numbering ? toDropinPath(manifest.numbering) : defaults.numbering,
                answers: manifest.answers ? toDropinPath(manifest.answers) : defaults.answers
            };
        } catch (e) {
            return defaults;
        }
    }

    async function loadDropinOverrides() {
        const discovered = await discoverDropinFiles();
        const files = [
            { kind: 'tutorial', path: discovered.tutorial },
            { kind: 'numbering', path: discovered.numbering },
            { kind: 'answers', path: discovered.answers }
        ];
        for (const item of files) {
            try {
                const res = await fetch(`${item.path}?v=${Date.now()}`, { cache: 'no-store' });
                if (!res.ok) continue;
                const parsed = parseLooseJsonPayload(await res.text());
                if (item.kind === 'tutorial') {
                    const normalized = normalizeTutorialPayload(parsed);
                    if (normalized) Object.assign(TUTORIAL_CONFIG, normalized);
                } else if (item.kind === 'numbering') {
                    const normalized = normalizeNumberingPayload(parsed);
                    if (!normalized) continue;
                    Object.assign(NUMBERING_SCENARIOS_DEFAULT, normalized);
                    Object.assign(NUMBERING_SCENARIOS, normalized);
                } else if (item.kind === 'answers') {
                    const normalized = normalizeAnswersPayload(parsed);
                    if (normalized) Object.assign(DB_ANSWERS, normalized);
                }
            } catch (e) {
                // Ignore missing file/fetch errors.
            }
        }
    }
    function init() {
        if (typeof rebuildLayoutSelectOptions === 'function') {
            rebuildLayoutSelectOptions(currentLayoutId || 't1');
        } else {
            const grp1 = document.createElement('optgroup'); grp1.label = "--- 기초 튜토리얼 ---";
            for(let k in TUTORIAL_CONFIG) {
                const opt = document.createElement('option'); opt.value = k; opt.innerText = TUTORIAL_CONFIG[k].title;
                grp1.appendChild(opt);
            }
            layoutSelect.appendChild(grp1);

            const grp2 = document.createElement('optgroup'); grp2.label = "--- 실전 연습 ---";
            for(let i=1; i<=18; i++) {
                const opt = document.createElement('option'); opt.value = i; opt.innerText = `공개도면 ${i}번`;
                grp2.appendChild(opt);
            }
            layoutSelect.appendChild(grp2);
        }

        document.addEventListener('keydown', handleKeyInput);
        canvas.addEventListener('mousedown', (e) => handleInput(e.clientX, e.clientY));
        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleInput(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
        if (shouldLoadAnswerStorageOverride()) loadAnswerDataFromStorage();
        changeLayout();
    }

    function changeLayout() {
        if (typeof stopTutorialFlowPlayback === 'function') stopTutorialFlowPlayback();
        currentLayoutId = layoutSelect.value;
        currentLayoutNumSpan.innerText = currentLayoutId;
        const answer = ensureLayoutAnswer(currentLayoutId);
        const savedFilter = Array.isArray(answer?.componentFilter) ? answer.componentFilter : [];
        
        const tutorial = TUTORIAL_CONFIG[currentLayoutId];
        const hasCustomFilter = savedFilter.length > 0;
        const tutorialTargetIds = Array.isArray(tutorial?.targetIds) ? tutorial.targetIds : [];
        const targetIds = hasCustomFilter ? savedFilter : tutorialTargetIds;

        if (tutorial) {
            if (targetIds.length > 0) {
                currentComponents = PUBLIC_LAYOUT_BASE.filter(comp => targetIds.includes(comp.id));
            } else {
                currentComponents = JSON.parse(JSON.stringify(PUBLIC_LAYOUT_BASE));
            }
            currentComponents = JSON.parse(JSON.stringify(currentComponents));
            openModal();
        } else {
            if (targetIds.length > 0) {
                currentComponents = JSON.parse(JSON.stringify(PUBLIC_LAYOUT_BASE.filter(comp => targetIds.includes(comp.id))));
            } else {
                currentComponents = JSON.parse(JSON.stringify(PUBLIC_LAYOUT_BASE));
            }
        }
        
        allPins = [];
        currentComponents.forEach(comp => generatePins(comp));
        resetWires();
        statusMsg.textContent = `${currentLayoutId} 준비완료`;
        if (isAdminMode) renderComponentFilterPanel();
    }


    function toggleAdminMode() {
        isAdminMode = !isAdminMode;
        if(isAdminMode) {
            adminInfo.style.display = 'block';
            renderComponentFilterPanel();
            allPins.forEach(p => p.connections = 0);
            selectedPin = null;
            wires = [];
            historyStack = [];
            statusMsg.textContent = `[관리자] ${currentLayoutId} 작업 중`;
            statusMsg.style.color = "#007bff";
            draw();
        } else {
            adminInfo.style.display = 'none';
            if (componentFilterWrap) componentFilterWrap.style.display = 'none';
            allPins.forEach(p => p.connections = 0);
            selectedPin = null;
            wires = [];
            historyStack = [];
            statusMsg.textContent = "대기 중";
            statusMsg.style.color = "#fff";
            draw();
        }
    }

    function handleKeyInput(e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undoLastAction(); return; }
        // T/F shortcut removed. Admin saving is now done by one explicit button.
    }

    function getPinCodeMap() {
        const ids = allPins.map(p => String(p.id)).sort();
        const map = new Map();
        ids.forEach((id, idx) => map.set(id, idx + 1));
        return map;
    }

    function canonicalPinSetKey(pinSetLike, pinCodeMap) {
        const arr = Array.from(pinSetLike || [])
            .map(String)
            .map(id => pinCodeMap?.get(id) || 0)
            .filter(n => Number.isFinite(n) && n > 0)
            .sort((a, b) => a - b);
        return arr.join('|');
    }

    function buildGroupsFromVisualWires(visuals) {
        const byId = new Map();
        (visuals || []).forEach(v => {
            const a = String(v[0] || '');
            const b = String(v[1] || '');
            if (!a || !b) return;
            if (!byId.has(a)) byId.set(a, []);
            if (!byId.has(b)) byId.set(b, []);
            byId.get(a).push(b);
            byId.get(b).push(a);
        });
        const visited = new Set();
        const out = [];
        byId.forEach((_, id) => {
            if (visited.has(id)) return;
            const queue = [id];
            const pins = new Set();
            visited.add(id);
            while (queue.length) {
                const curr = queue.shift();
                pins.add(curr);
                (byId.get(curr) || []).forEach(next => {
                    if (visited.has(next)) return;
                    visited.add(next);
                    queue.push(next);
                });
            }
            out.push(pins);
        });
        return out;
    }

    function getExpectedNodesForLayout() {
        const ans = DB_ANSWERS[currentLayoutId] || { targets: [], commons: [] };
        if (Array.isArray(ans.nodes) && ans.nodes.length) {
            return ans.nodes.map((n, idx) => ({
                name: n.name || String(idx + 1),
                color: n.color || PALETTE[idx % PALETTE.length],
                pins: Array.from(new Set((n.pins || []).map(String))),
                visuals: Array.isArray(n.visuals) ? n.visuals.slice() : []
            }));
        }

        const nodes = [];
        // Backward compatibility: old commons already represent node groups.
        (ans.commons || []).forEach((g, idx) => {
            const pins = Array.from(new Set((g.pins || []).map(String)));
            if (!pins.length) return;
            nodes.push({
                name: g.name || String(idx + 1),
                color: g.color || PALETTE[idx % PALETTE.length],
                pins,
                visuals: Array.isArray(g.visuals) ? g.visuals.slice() : []
            });
        });

        // Backward compatibility: old targets are individual 2-pin node requirements.
        const targetVisuals = (ans.targets || []).filter(t => Array.isArray(t) && t.length >= 2);
        if (targetVisuals.length) {
            const targetGroups = buildGroupsFromVisualWires(targetVisuals);
            targetGroups.forEach((setPins, idx) => {
                const pins = Array.from(setPins).map(String);
                if (!pins.length) return;
                nodes.push({
                    name: `T${idx + 1}`,
                    color: '#28a745',
                    pins,
                    visuals: targetVisuals.filter(v => setPins.has(String(v[0])) && setPins.has(String(v[1])))
                });
            });
        }
        return nodes;
    }

    function calculateGrading() {
        wires.forEach(w => { w.gradingColor = null; w.matchedGroup = null; });
        const ans = DB_ANSWERS[currentLayoutId] || { targets: [], commons: [], nodes: [] };
        const hasLegacyTargets = Array.isArray(ans.targets) && ans.targets.length > 0;
        const hasLegacyCommons = Array.isArray(ans.commons) && ans.commons.length > 0;
        const hasNodes = Array.isArray(ans.nodes) && ans.nodes.length > 0;
        const pinCodeMap = getPinCodeMap();

        // Legacy fallback: target edges are interpreted as connectivity constraints.
        // Any wiring inside the same expected node group is accepted.
        if (!hasNodes && hasLegacyTargets && !hasLegacyCommons) {
            const targetVisuals = (ans.targets || []).filter(t => Array.isArray(t) && t.length >= 2);
            const expectedGroups = buildGroupsFromVisualWires(targetVisuals);
            const expectedNodes = expectedGroups.map((pins, idx) => ({
                name: `T${idx + 1}`,
                color: '#28a745',
                pins: Array.from(pins).map(String),
                visuals: targetVisuals.filter(v => pins.has(String(v[0])) && pins.has(String(v[1])))
            }));

            let satisfiedTargets = 0;
            targetVisuals.forEach(info => {
                const a = String(info[0]);
                const b = String(info[1]);
                const ok = getUserConnectedGroups().some(setPins => setPins.has(a) && setPins.has(b));
                if (ok) satisfiedTargets++;
            });

            let wrongWireCount = 0;
            wires.forEach(w => {
                const matched = expectedNodes.find(n => n.pins.includes(w.start.id) && n.pins.includes(w.end.id));
                if (matched) {
                    w.gradingColor = matched.color;
                    w.matchedGroup = matched;
                } else {
                    w.gradingColor = '#ff0000';
                    wrongWireCount++;
                }
            });

            const userKeys = Array.from(new Set(getUserConnectedGroups().map(s => canonicalPinSetKey(s, pinCodeMap)))).sort();
            const expectedKeys = Array.from(new Set(expectedNodes.map(n => canonicalPinSetKey(n.pins, pinCodeMap)))).sort();
            const keysEqual = expectedKeys.length === userKeys.length && expectedKeys.every((k, i) => k === userKeys[i]);

            if (satisfiedTargets === targetVisuals.length && keysEqual && wrongWireCount === 0) {
                setTimeout(() => { successModal.style.display = "flex"; }, 300);
            }
            return;
        }

        const userGroups = getUserConnectedGroups();
        const expectedNodes = getExpectedNodesForLayout();
        const expectedByKey = new Map(expectedNodes.map(n => [canonicalPinSetKey(n.pins, pinCodeMap), n]));
        const userByKey = new Map(userGroups.map(s => [canonicalPinSetKey(s, pinCodeMap), s]));

        let wrongWireCount = 0;
        wires.forEach(w => {
            const matched = expectedNodes.find(n => n.pins.includes(w.start.id) && n.pins.includes(w.end.id));
            if (matched) {
                w.gradingColor = matched.color || '#28a745';
                w.matchedGroup = matched;
            } else {
                w.gradingColor = '#ff0000';
                wrongWireCount++;
            }
        });

        const expectedKeys = Array.from(expectedByKey.keys()).sort();
        const userKeys = Array.from(userByKey.keys()).sort();
        const keysEqual = expectedKeys.length === userKeys.length && expectedKeys.every((k, i) => k === userKeys[i]);

        if (keysEqual && wrongWireCount === 0) {
            setTimeout(() => { successModal.style.display = "flex"; }, 300);
        }
    }

    function getUserConnectedGroups() {
        const groups = []; const visited = new Set(); const adj = {};
        allPins.forEach(p => adj[p.id] = []);
        wires.forEach(w => { adj[w.start.id].push(w.end.id); adj[w.end.id].push(w.start.id); });
        allPins.forEach(pin => {
            if (!visited.has(pin.id) && pin.connections > 0) {
                const group = new Set(); const queue = [pin.id]; visited.add(pin.id); group.add(pin.id);
                while(queue.length > 0) {
                    const curr = queue.shift();
                    adj[curr].forEach(neighbor => { if (!visited.has(neighbor)) { visited.add(neighbor); group.add(neighbor); queue.push(neighbor); } });
                }
                groups.push(group);
            }
        });
        return groups;
    }

    function getAlternatingOffset(rank, gap = 5) {
        if (rank <= 0) return 0;
        const step = Math.ceil(rank / 2);
        const sign = (rank % 2 === 1) ? 1 : -1;
        return sign * step * gap;
    }

    function getWireHorizontalSegments(startPin, endPin) {
        if (typeof getNearestDuctY !== 'function') return [];
        const startDuct = getNearestDuctY(startPin.y);
        const endDuct = getNearestDuctY(endPin.y);
        if (startDuct === endDuct) {
            return [{
                ductY: startDuct,
                minX: Math.min(startPin.x, endPin.x),
                maxX: Math.max(startPin.x, endPin.x)
            }];
        }

        const ducts = (typeof getActiveDucts === 'function') ? getActiveDucts() : DUCTS;
        const midX = (startPin.x + endPin.x) / 2;
        const sideX = (midX < 350) ? ducts.leftX : ducts.rightX;
        return [
            {
                ductY: startDuct,
                minX: Math.min(startPin.x, sideX),
                maxX: Math.max(startPin.x, sideX)
            },
            {
                ductY: endDuct,
                minX: Math.min(endPin.x, sideX),
                maxX: Math.max(endPin.x, sideX)
            }
        ];
    }

    function getHorizontalOverlapRank(startPin, endPin) {
        const candidateSegments = getWireHorizontalSegments(startPin, endPin);
        if (!candidateSegments.length) return 0;

        let rank = 0;
        wires.forEach(w => {
            const existingSegments = getWireHorizontalSegments(w.start, w.end);
            const overlaps = candidateSegments.some(cs =>
                existingSegments.some(es =>
                    es.ductY === cs.ductY && Math.max(es.minX, cs.minX) <= Math.min(es.maxX, cs.maxX)
                )
            );
            if (overlaps) rank++;
        });
        return rank;
    }

    function getRecommendedWireOffset(startPin, endPin) {
        const rank = getHorizontalOverlapRank(startPin, endPin);
        return getAlternatingOffset(rank, 5);
    }

    function handleInput(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width; const scaleY = canvas.height / rect.height;
        const x = (clientX - rect.left) * scaleX; const y = (clientY - rect.top) * scaleY;
        const pickPin = () => {
            let best = null;
            let bestDist = Infinity;
            allPins.forEach(p => {
                const d = Math.hypot(x - p.x, y - p.y);
                if (d < PIN_HIT_RADIUS && d < bestDist) {
                    best = p;
                    bestDist = d;
                }
            });
            return best;
        };

        if (isGradingMode) {
            const clickedPin = pickPin();
            if (clickedPin) {
                const wire = wires.find(w => w.start === clickedPin || w.end === clickedPin);
                if (wire && wire.matchedGroup) {
                    focusedGroup = { type: 'node', data: wire.matchedGroup };
                    statusMsg.textContent = "집중 모드";
                } else {
                    const node = getExpectedNodesForLayout().find(n => (n.pins || []).includes(clickedPin.id));
                    if (node) focusedGroup = { type: 'node', data: node };
                }
                draw(); return;
            } else { focusedGroup = null; statusMsg.textContent = "채점 완료"; draw(); return; }
        }
        if (isAdminMode) { } else { if(isGradingMode) return; }
        const clickedPin = pickPin();
        if (!clickedPin) { selectedPin = null; statusMsg.textContent = "취소"; draw(); return; }
        if (selectedPin === null) {
            if (clickedPin.connections >= 2) { alert("2선 초과"); return; }
            selectedPin = clickedPin; statusMsg.textContent = "목표 선택"; statusMsg.style.color = "red"; draw();
        } else {
            if (selectedPin === clickedPin) { selectedPin = null; statusMsg.textContent = "취소"; draw(); return; }
            if (clickedPin.connections >= 2) { alert("연결 불가"); return; }
            saveHistory();
            const offset = getRecommendedWireOffset(selectedPin, clickedPin);
            wires.push({ start: selectedPin, end: clickedPin, offset });
            selectedPin.connections++; clickedPin.connections++; selectedPin = null; 
            statusMsg.textContent = "완료"; statusMsg.style.color = "#007bff"; draw();
        }
    }

    function saveHistory() { historyStack.push(wires.map(w => ({ s: w.start.id, e: w.end.id, o: w.offset }))); if(historyStack.length > 50) historyStack.shift(); }
    function undoLastAction() {
        if(historyStack.length === 0) return statusMsg.innerText = "취소할 작업 없음";
        const prev = historyStack.pop();
        wires = []; allPins.forEach(p => p.connections = 0);
        prev.forEach(item => { const s = allPins.find(p => p.id === item.s); const e = allPins.find(p => p.id === item.e); if(s && e) { wires.push({ start: s, end: e, offset: item.o }); s.connections++; e.connections++; } });
        selectedPin = null; draw();
    }
    function resetWires() {
        if (typeof stopTutorialFlowPlayback === 'function') stopTutorialFlowPlayback();
        wires = [];
        historyStack = [];
        allPins.forEach(p => p.connections = 0);
        selectedPin = null;
        isGradingMode = false;
        focusedGroup = null;
        if(!isAdminMode) updateUI();
        if (isNumberingMode) statusMsg.textContent = "넘버링 모드";
        draw();
    }
    function toggleGrading() {
        if(isAdminMode) { alert("관리자 모드를 끄세요."); return; }
        if(wires.length === 0) { alert("결선 내용 없음"); return; }
        isGradingMode = !isGradingMode;
        if(isGradingMode) { calculateGrading(); statusMsg.textContent = "채점 완료"; btnCheck.textContent = "편집"; btnCheck.classList.add('active'); } 
        else { updateUI(); }
        draw();
    }
    function updateUI() { btnCheck.classList.remove('active'); statusMsg.textContent = "대기 중"; btnCheck.textContent = "채점 하기"; }
    function clearCurrentLayoutData() {
        if(confirm("현재 도면 정답 삭제?")) {
            ensureLayoutAnswer(currentLayoutId);
            DB_ANSWERS[currentLayoutId] = { targets: [], commons: [], nodes: [], tutorialFlow: [], componentFilter: [] };
            persistAnswerData();
            wires = [];
            draw();
            showSaveStatus("삭제됨");
        }
    }
    function exportAllData() {
        persistAnswerData();
        const json = JSON.stringify(DB_ANSWERS, null, 4);
        exportArea.style.display = 'block'; exportArea.value = json; exportArea.select(); document.execCommand('copy'); alert("복사됨");
    }

    function downloadAnswerJsonFile() {
        persistAnswerData();
        const payload = JSON.stringify(DB_ANSWERS, null, 2);
        const blob = new Blob([payload], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const now = new Date();
        const stamp = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0')
        ].join('') + '-' + [
            String(now.getHours()).padStart(2, '0'),
            String(now.getMinutes()).padStart(2, '0'),
            String(now.getSeconds()).padStart(2, '0')
        ].join('');
        const fileName = `answers-all-${stamp}.json`;
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showSaveStatus(`정답 JSON 다운로드 완료 (${fileName})`);
    }

    function triggerAnswerJsonImport() {
        const input = document.getElementById('answerJsonInput');
        if (!input) return;
        input.value = '';
        input.click();
    }

    function handleAnswerJsonFileChange(evt) {
        const file = evt?.target?.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const rawText = String(reader.result || '').replace(/^\uFEFF/, '').trim();
                let parsed = null;
                try {
                    parsed = JSON.parse(rawText);
                } catch (jsonErr) {
                    const assignMatched = rawText.match(/(?:let|const|var)\s+DB_ANSWERS\s*=\s*([\s\S]*?)\s*;?\s*$/);
                    if (assignMatched && assignMatched[1]) {
                        parsed = JSON.parse(assignMatched[1]);
                    } else {
                        const genericAssign = rawText.match(/(?:let|const|var)\s+[A-Za-z_$][\w$]*\s*=\s*([\s\S]*?)\s*;?\s*$/);
                        parsed = JSON.parse(genericAssign ? genericAssign[1] : rawText);
                    }
                }
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && parsed.DB_ANSWERS && typeof parsed.DB_ANSWERS === 'object') {
                    parsed = parsed.DB_ANSWERS;
                }
                const normalized = normalizeAnswersPayload(parsed);
                if (!normalized) {
                    alert('JSON 형식이 올바르지 않습니다.');
                    return;
                }
                DB_ANSWERS = normalized;
                // Ensure active layout has minimum shape.
                ensureLayoutAnswer(currentLayoutId);
                persistAnswerData();
                wires = [];
                draw();
                showSaveStatus('정답 JSON 불러오기 완료');
            } catch (e) {
                alert(`JSON 파싱 실패: ${e?.message || '파일 내용을 확인해 주세요.'}`);
            }
        };
        reader.readAsText(file, 'utf-8');
    }

    function showSaveStatus(msg) { saveStatus.textContent = msg; setTimeout(() => { saveStatus.textContent = ""; }, 3000); }

    function getComponentLabelById(id) {
        const found = PUBLIC_LAYOUT_BASE.find(c => c.id === id);
        return found ? `${found.id} (${found.label})` : id;
    }

    function renderComponentFilterPanel() {
        if (!componentFilterList) return;
        const ans = ensureLayoutAnswer(currentLayoutId);
        const selected = new Set(Array.isArray(ans?.componentFilter) ? ans.componentFilter : []);
        const comps = (PUBLIC_LAYOUT_BASE || []).map(c => ({ id: c.id, label: c.label || c.id }));
        componentFilterList.innerHTML = comps.map(item => `
            <label class="component-filter-item">
                <input type="checkbox" data-comp-id="${item.id}" ${selected.has(item.id) ? 'checked' : ''}>
                <span>${item.id} (${item.label})</span>
            </label>
        `).join('');
    }

    function toggleComponentFilterPanel() {
        if (!isAdminMode) return alert("관리자 모드에서만 사용할 수 있습니다.");
        if (!componentFilterWrap) return;
        const isOpen = componentFilterWrap.style.display !== 'none';
        componentFilterWrap.style.display = isOpen ? 'none' : 'block';
        if (!isOpen) renderComponentFilterPanel();
    }

    function getCheckedComponentIdsFromPanel() {
        if (!componentFilterList) return [];
        return Array.from(componentFilterList.querySelectorAll('input[type="checkbox"][data-comp-id]'))
            .filter(chk => chk.checked)
            .map(chk => chk.getAttribute('data-comp-id'))
            .filter(Boolean);
    }

    function selectAllComponentFilter() {
        if (!componentFilterList) return;
        componentFilterList.querySelectorAll('input[type="checkbox"][data-comp-id]').forEach(chk => { chk.checked = true; });
    }

    function clearAllComponentFilter() {
        if (!componentFilterList) return;
        componentFilterList.querySelectorAll('input[type="checkbox"][data-comp-id]').forEach(chk => { chk.checked = false; });
    }

    function applyComponentFilterForCurrentLayout() {
        if (!isAdminMode) return alert("관리자 모드에서만 사용할 수 있습니다.");
        const selected = getCheckedComponentIdsFromPanel();
        if (selected.length === 0) {
            alert("최소 1개 부품을 선택해 주세요.");
            return;
        }
        const ans = ensureLayoutAnswer(currentLayoutId);
        ans.componentFilter = selected;
        persistAnswerData();
        showSaveStatus(`${currentLayoutId}: 부품 세팅 ${selected.length}개 적용`);
        changeLayout();
        statusMsg.textContent = `[관리자] ${currentLayoutId} 부품 세팅 적용`;
        statusMsg.style.color = "#007bff";
    }

    function resetComponentFilterForCurrentLayout() {
        if (!isAdminMode) return alert("관리자 모드에서만 사용할 수 있습니다.");
        const ans = ensureLayoutAnswer(currentLayoutId);
        ans.componentFilter = [];
        persistAnswerData();
        showSaveStatus(`${currentLayoutId}: 부품 세팅 기본값 복원`);
        changeLayout();
        statusMsg.textContent = `[관리자] ${currentLayoutId} 기본 부품 복원`;
        statusMsg.style.color = "#007bff";
    }

    function continueAfterSuccess() {
        if (typeof closeModal === 'function') closeModal('successModal');
        if (!layoutSelect) return;

        const idx = Number(layoutSelect.selectedIndex);
        const nextIdx = idx + 1;
        if (!Number.isInteger(idx) || nextIdx >= layoutSelect.options.length) {
            statusMsg.textContent = '마지막 도면입니다.';
            statusMsg.style.color = '#17a2b8';
            return;
        }

        layoutSelect.selectedIndex = nextIdx;
        changeLayout();
    }

    function toggleNumberingMode() {
        isNumberingMode = !isNumberingMode;
        if (isNumberingMode) {
            isGradingMode = false;
            focusedGroup = null;
            statusMsg.textContent = "넘버링 모드";
            statusMsg.style.color = "#c823e0";
            btnNumbering.classList.add('active');
            openNumberingModal();
        } else {
            btnNumbering.classList.remove('active');
            statusMsg.style.color = "#fff";
            statusMsg.textContent = "대기 중";
            closeNumberingModal(false);
        }
        draw();
    }

    function saveNodeAnswersFromWires() {
        if (!isAdminMode) return alert("관리자 모드에서만 저장 가능합니다.");
        const currentAnswers = ensureLayoutAnswer(currentLayoutId);
        if (!currentAnswers) return alert("현재 도면 데이터가 없습니다.");
        if (wires.length === 0) return alert("선 없음");
        const beforeSnapshot = JSON.stringify(currentAnswers);
        const visualWires = wires.map(w => [w.start.id, w.end.id, w.offset]);
        const groups = buildGroupsFromVisualWires(visualWires);
        const nodes = groups.map((setPins, idx) => {
            const pins = Array.from(setPins);
            return {
                name: String(idx + 1),
                color: PALETTE[idx % PALETTE.length],
                pins,
                visuals: visualWires.filter(v => setPins.has(String(v[0])) && setPins.has(String(v[1])))
            };
        });

        currentAnswers.nodes = nodes;
        // keep compatibility fields so existing admin/focus visuals still work.
        currentAnswers.targets = [];
        currentAnswers.commons = nodes.map(n => ({ ...n }));
        persistAnswerData();
        lastSavedAction = { type: 'nodes', snapshot: beforeSnapshot };
        showSaveStatus(`${currentLayoutId}: 노드 기준 ${nodes.length}개 저장됨!`);
        wires = [];
        draw();
    }

    function saveTutorialFlowFromWires() {
        if (!isAdminMode) return alert("관리자 모드에서만 저장 가능합니다.");
        const currentAnswers = ensureLayoutAnswer(currentLayoutId);
        if (!currentAnswers) return alert("현재 도면 데이터가 없습니다.");
        if (wires.length === 0) return alert("저장할 선이 없습니다.");

        const visualWires = wires.map(w => [w.start.id, w.end.id, w.offset]);
        const groups = buildGroupsFromVisualWires(visualWires);
        const nodes = groups.map((setPins, idx) => {
            const pins = Array.from(setPins);
            return {
                name: String(idx + 1),
                color: PALETTE[idx % PALETTE.length],
                pins,
                visuals: visualWires.filter(v => setPins.has(String(v[0])) && setPins.has(String(v[1])))
            };
        });

        const flow = wires.map(w => ({
            from: String(w.start.id),
            to: String(w.end.id),
            offset: Number(w.offset || 0)
        }));
        currentAnswers.nodes = nodes;
        currentAnswers.targets = [];
        currentAnswers.commons = nodes.map(n => ({ ...n }));
        currentAnswers.tutorialFlow = flow;
        persistAnswerData();
        showSaveStatus(`${currentLayoutId}: 정답노드 ${nodes.length}개 + 재생순서 ${flow.length}개 저장됨`);
    }

    function clearTutorialFlow() {
        if (!isAdminMode) return alert("관리자 모드에서만 사용할 수 있습니다.");
        const currentAnswers = ensureLayoutAnswer(currentLayoutId);
        if (!currentAnswers) return;
        currentAnswers.tutorialFlow = [];
        persistAnswerData();
        showSaveStatus(`${currentLayoutId}: 재생 순서 초기화`);
    }

    function removeLastSavedAnswer() {
        if (!isAdminMode) return alert("관리자 모드에서만 사용할 수 있습니다.");
        const currentAnswers = ensureLayoutAnswer(currentLayoutId);
        if (!currentAnswers || !lastSavedAction) return alert("취소할 저장 기록이 없습니다.");

        if (lastSavedAction.type === 'nodes') {
            const prev = JSON.parse(lastSavedAction.snapshot || '{}');
            DB_ANSWERS[currentLayoutId] = prev;
            persistAnswerData();
            showSaveStatus("최근 노드 저장 취소됨");
        }
        lastSavedAction = null;
        draw();
    }

    (async () => {
        await loadDropinOverrides();
        init();
    })();


    const PIN_HIT_RADIUS = 26;

