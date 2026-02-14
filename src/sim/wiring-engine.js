    function init() {
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

        document.addEventListener('keydown', handleKeyInput);
        canvas.addEventListener('mousedown', (e) => handleInput(e.clientX, e.clientY));
        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleInput(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
        
        changeLayout();
    }

    function changeLayout() {
        currentLayoutId = layoutSelect.value;
        currentLayoutNumSpan.innerText = currentLayoutId;
        
        if (TUTORIAL_CONFIG[currentLayoutId]) {
            const targetIds = TUTORIAL_CONFIG[currentLayoutId].targetIds;
            currentComponents = PUBLIC_LAYOUT_BASE.filter(comp => targetIds.includes(comp.id));
            currentComponents = JSON.parse(JSON.stringify(currentComponents));
            openModal();
        } else {
            currentComponents = JSON.parse(JSON.stringify(PUBLIC_LAYOUT_BASE));
        }
        
        allPins = [];
        currentComponents.forEach(comp => generatePins(comp));
        resetWires();
        statusMsg.textContent = `${currentLayoutId} 준비완료`;
    }


    function toggleAdminMode() {
        isAdminMode = !isAdminMode;
        if(isAdminMode) {
            adminInfo.style.display = 'block';
            statusMsg.textContent = `[관리자] ${currentLayoutId} 작업 중`;
            statusMsg.style.color = "#007bff";
            wires = []; draw();
        } else {
            adminInfo.style.display = 'none';
            statusMsg.textContent = "대기 중";
            statusMsg.style.color = "#fff";
            wires = []; draw();
        }
    }

    function handleKeyInput(e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undoLastAction(); return; }
        if (isAdminMode) {
            const key = e.key.toLowerCase();
            if (key === 't') {
                saveTargetsFromWires();
            }
            else if (key === 'f') {
                saveCommonsFromWires();
            }
        }
    }

    function calculateGrading() {
        wires.forEach(w => { w.gradingColor = null; w.matchedGroup = null; });
        const userGroups = getUserConnectedGroups();
        const ans = DB_ANSWERS[currentLayoutId]; 
        
        let correctTargetCount = 0;
        let correctCommonGroups = 0; // 그룹 단위 성공 체크
        let wrongWireCount = 0;

        if(ans) {
            // Target 채점
            ans.targets.forEach(info => {
                const foundWire = wires.find(w => (w.start.id === info[0] && w.end.id === info[1]) || (w.start.id === info[1] && w.end.id === info[0]));
                if (foundWire) { 
                    foundWire.gradingColor = '#28a745'; 
                    foundWire.matchedGroup = info;
                    correctTargetCount++;
                }
            });

            // Common 채점 (집합 비교)
            ans.commons.forEach(commonGroup => {
                const targetSet = new Set(commonGroup.pins);
                const matchedUserGroup = userGroups.find(userSet => {
                    let hasIntersection = false;
                    for (let p of targetSet) { if (userSet.has(p)) { hasIntersection = true; break; } }
                    return hasIntersection;
                });

                if (matchedUserGroup) {
                    const isMissing = !commonGroup.pins.every(p => matchedUserGroup.has(p));
                    const isExtra = matchedUserGroup.size !== targetSet.size;

                    if (!isMissing && !isExtra) {
                        // 성공한 그룹
                        correctCommonGroups++;
                        wires.forEach(w => {
                            if (matchedUserGroup.has(w.start.id) && matchedUserGroup.has(w.end.id)) {
                                w.gradingColor = commonGroup.color; w.matchedGroup = commonGroup;
                            }
                        });
                    }
                }
            });
        }
        
        wires.forEach(w => { 
            if (!w.gradingColor) { 
                w.gradingColor = '#ff0000'; 
                wrongWireCount++;
            } 
        });

        if(ans) {
            const totalTargets = ans.targets.length;
            const totalCommons = ans.commons.length;
            
            if (correctTargetCount === totalTargets && correctCommonGroups === totalCommons && wrongWireCount === 0) {
                setTimeout(() => { successModal.style.display = "flex"; }, 300);
            }
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

    function handleInput(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width; const scaleY = canvas.height / rect.height;
        const x = (clientX - rect.left) * scaleX; const y = (clientY - rect.top) * scaleY;
        if (isGradingMode) {
            let clickedPin = null;
            for(let p of allPins) { if (Math.sqrt((x - p.x)**2 + (y - p.y)**2) < 20) { clickedPin = p; break; } }
            if (clickedPin) {
                const wire = wires.find(w => w.start === clickedPin || w.end === clickedPin);
                if (wire && wire.matchedGroup) {
                    focusedGroup = { type: wire.matchedGroup.visuals ? 'common' : 'target', data: wire.matchedGroup };
                    statusMsg.textContent = "집중 모드";
                } else {
                    const ans = DB_ANSWERS[currentLayoutId];
                    if (ans) {
                        const common = ans.commons.find(g => g.pins.includes(clickedPin.id));
                        if(common) focusedGroup = { type: 'common', data: common };
                        else {
                            const target = ans.targets.find(t => t[0] === clickedPin.id || t[1] === clickedPin.id);
                            if(target) focusedGroup = { type: 'target', data: target };
                        }
                    }
                }
                draw(); return;
            } else { focusedGroup = null; statusMsg.textContent = "채점 완료"; draw(); return; }
        }
        if (isAdminMode) { } else { if(isGradingMode) return; }
        let clickedPin = null;
        for(let p of allPins) { if (Math.sqrt((x - p.x)**2 + (y - p.y)**2) < 20) { clickedPin = p; break; } }
        if (!clickedPin) { selectedPin = null; statusMsg.textContent = "취소"; draw(); return; }
        if (selectedPin === null) {
            if (clickedPin.connections >= 2) { alert("2선 초과"); return; }
            selectedPin = clickedPin; statusMsg.textContent = "목표 선택"; statusMsg.style.color = "red"; draw();
        } else {
            if (selectedPin === clickedPin) { selectedPin = null; statusMsg.textContent = "취소"; draw(); return; }
            if (clickedPin.connections >= 2) { alert("연결 불가"); return; }
            saveHistory();
            wires.push({ start: selectedPin, end: clickedPin, offset: (Math.random() * 30) - 15 });
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
    function resetWires() { wires = []; historyStack = []; allPins.forEach(p => p.connections = 0); selectedPin = null; isGradingMode = false; focusedGroup = null; if(!isAdminMode) updateUI(); if (isNumberingMode) statusMsg.textContent = "넘버링 모드"; draw(); }
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
        if(confirm("현재 도면 정답 삭제?")) { DB_ANSWERS[currentLayoutId] = { targets: [], commons: [] }; wires = []; groupIndexInput.value = 1; draw(); showSaveStatus("삭제됨"); }
    }
    function exportAllData() {
        const json = JSON.stringify(DB_ANSWERS, null, 4);
        exportArea.style.display = 'block'; exportArea.value = "let DB_ANSWERS = " + json + ";"; exportArea.select(); document.execCommand('copy'); alert("복사됨");
    }
    function showSaveStatus(msg) { saveStatus.textContent = msg; setTimeout(() => { saveStatus.textContent = ""; }, 3000); }

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

    function saveTargetsFromWires() {
        if (!isAdminMode) return alert("관리자 모드에서만 저장 가능합니다.");
        const currentAnswers = DB_ANSWERS[currentLayoutId];
        if (!currentAnswers) return alert("현재 도면 데이터가 없습니다.");
        if (wires.length === 0) return alert("선 없음");
        const added = wires.map(w => [w.start.id, w.end.id, w.offset]);
        currentAnswers.targets.push(...added);
        lastSavedAction = { type: 'targets', count: added.length };
        showSaveStatus(`${currentLayoutId}: 정밀(빨강) ${added.length}개 저장됨!`);
        wires = [];
        draw();
    }

    function saveCommonsFromWires() {
        if (!isAdminMode) return alert("관리자 모드에서만 저장 가능합니다.");
        const currentAnswers = DB_ANSWERS[currentLayoutId];
        if (!currentAnswers) return alert("현재 도면 데이터가 없습니다.");
        if (wires.length === 0) return alert("선 없음");
        const pinSet = new Set();
        const visualWires = [];
        wires.forEach(w => {
            pinSet.add(w.start.id);
            pinSet.add(w.end.id);
            visualWires.push([w.start.id, w.end.id, w.offset]);
        });
        const groupNum = parseInt(groupIndexInput.value);
        const color = PALETTE[(groupNum - 1) % PALETTE.length];
        const item = { name: groupNum.toString(), color: color, pins: Array.from(pinSet), visuals: visualWires };
        currentAnswers.commons.push(item);
        lastSavedAction = { type: 'commons', count: 1 };
        showSaveStatus(`${currentLayoutId}: 공통 ${groupNum}번 저장됨!`);
        groupIndexInput.value = groupNum + 1;
        wires = [];
        draw();
    }

    function removeLastSavedAnswer() {
        if (!isAdminMode) return alert("관리자 모드에서만 사용할 수 있습니다.");
        const currentAnswers = DB_ANSWERS[currentLayoutId];
        if (!currentAnswers || !lastSavedAction) return alert("취소할 저장 기록이 없습니다.");

        if (lastSavedAction.type === 'targets') {
            currentAnswers.targets.splice(-lastSavedAction.count, lastSavedAction.count);
            showSaveStatus("최근 정밀 저장 취소됨");
        } else if (lastSavedAction.type === 'commons') {
            currentAnswers.commons.pop();
            const n = Math.max(1, parseInt(groupIndexInput.value) - 1);
            groupIndexInput.value = n;
            showSaveStatus("최근 공통 저장 취소됨");
        }
        lastSavedAction = null;
        draw();
    }

    init();


