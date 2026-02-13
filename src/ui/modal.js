    let currentModalPage = 0;

    function updateModalContent() {
        const data = TUTORIAL_CONFIG[currentLayoutId];
        if (!data) return;

        // [중요] desc가 배열이 아니면 배열로 만들어서 무조건 '리스트'로 취급함
        const pages = Array.isArray(data.desc) ? data.desc : [data.desc];

        // 현재 페이지 내용 출력
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = pages[currentModalPage];

        // 제목 및 페이지 번호 표시 (1/3 등)
        const modalTitle = document.getElementById('modalTitle');
        const indicator = document.getElementById('pageIndicator');
        
        if (pages.length > 1) {
            modalTitle.innerText = `${data.title} (${currentModalPage + 1}/${pages.length})`;
            indicator.innerText = `${currentModalPage + 1} / ${pages.length}`;
            indicator.style.display = "inline-block";
        } else {
            modalTitle.innerText = data.title;
            indicator.style.display = "none";
        }

        // 버튼 제어 로직 (페이지 수에 따라 자동 조절)
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const startBtn = document.getElementById('startBtn');

        // 1페이지뿐일 때
        if (pages.length <= 1) {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
            startBtn.style.display = "inline-block";
        } else {
            // 다중 페이지일 때
            prevBtn.style.display = (currentModalPage === 0) ? "none" : "inline-block";
            prevBtn.disabled = (currentModalPage === 0);

            if (currentModalPage === pages.length - 1) {
                nextBtn.style.display = "none";
                startBtn.style.display = "inline-block";
            } else {
                nextBtn.style.display = "inline-block";
                startBtn.style.display = "none";
            }
        }
    }

    // 이전/다음 버튼 공용 함수
    function changePage(direction) {
        const data = TUTORIAL_CONFIG[currentLayoutId];
        const pages = Array.isArray(data.desc) ? data.desc : [data.desc];
        
        currentModalPage += direction;
        
        // 범위를 벗어나지 않게 체크
        if (currentModalPage < 0) currentModalPage = 0;
        if (currentModalPage >= pages.length) currentModalPage = pages.length - 1;

        updateModalContent();
    }

    function openModal() {
    // 1. 현재 화면에 표시된 레이아웃 ID를 다시 한 번 정확히 가져옵니다.
    // (보통 왼쪽 메뉴나 설정에서 선택된 레이아웃 번호)
    currentLayoutId = document.getElementById('layoutSelect')?.value || currentLayoutId;

    // 2. 페이지 번호를 0(1페이지)으로 초기화합니다.
    currentModalPage = 0; 
    
    // 3. 데이터를 가져와서 화면을 그립니다.
    const data = TUTORIAL_CONFIG[currentLayoutId];
    
    if (data) {
        // [중요] 내용을 그리기 전에 기존에 남았던 흔적을 깨끗이 비웁니다.
        document.getElementById('modalBody').innerHTML = ""; 
        updateModalContent();
        document.getElementById('infoModal').style.display = "flex";
    } else {
        // 실전 모드 처리...
        modalTitle.innerText = `공개도면 ${currentLayoutId}번`;
        modalBody.innerHTML = `<p>실전 문제입니다. 전체 회로를 구성하세요.</p>`;
        document.getElementById('prevBtn').style.display = "none";
        document.getElementById('nextBtn').style.display = "none";
        document.getElementById('pageIndicator').style.display = "none";
        document.getElementById('startBtn').style.display = "inline-block";
        document.getElementById('infoModal').style.display = "flex";
    }
}
    function closeModal(id) { document.getElementById(id).style.display = "none"; }


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


    function openNumberingModal() {
        numberingPinSnapshot = getTutorialPinList();
        numberingList.innerHTML = '';
        numberingResult.textContent = '아직 채점 전';

        if (numberingPinSnapshot.length === 0) {
            numberingList.innerHTML = '<p>번호를 입력할 핀이 없습니다.</p>';
            numberingModal.style.display = 'flex';
            return;
        }

        numberingPinSnapshot.forEach((pin, idx) => {
            const row = document.createElement('div');
            row.className = 'numbering-item';
            row.innerHTML = `<label>${idx + 1}. <b>${pin.id}</b> (부품:${pin.parentId})</label><input data-pin-id="${pin.id}" value="${numberingAnswers[pin.id] || ''}" placeholder="번호 입력">`;
            numberingList.appendChild(row);
        });

        numberingModal.style.display = 'flex';
    }

    function gradeNumberingAnswers() {
        if (!numberingPinSnapshot.length) return;
        const inputs = numberingList.querySelectorAll('input[data-pin-id]');
        let total = 0;
        let correct = 0;

        inputs.forEach(input => {
            const pinId = input.dataset.pinId;
            const answer = (input.value || '').trim();
            if (!answer) {
                input.style.borderColor = '#bbb';
                return;
            }
            numberingAnswers[pinId] = answer;
            const target = numberingPinSnapshot.find(p => p.id === pinId);
            total++;
            if (target && answer === target.number) {
                correct++;
                input.style.borderColor = '#28a745';
            } else {
                input.style.borderColor = '#dc3545';
            }
        });

        numberingResult.textContent = total === 0
            ? '입력된 답이 없습니다.'
            : `번호학습 결과: ${correct}/${total} 정답`;
        statusMsg.textContent = total === 0 ? '번호학습 입력 대기' : `번호학습 ${correct}/${total}`;
    }

    function fillCorrectNumbers() {
        const inputs = numberingList.querySelectorAll('input[data-pin-id]');
        inputs.forEach(input => {
            const pinId = input.dataset.pinId;
            const target = numberingPinSnapshot.find(p => p.id === pinId);
            if (target) {
                input.value = target.number;
                numberingAnswers[pinId] = target.number;
                input.style.borderColor = '#28a745';
            }
        });
        numberingResult.textContent = '정답이 채워졌습니다. 교육용으로 활용하세요.';
        statusMsg.textContent = '번호학습 정답보기 완료';
    }

    function closeNumberingModal(turnOff = true) {
        numberingModal.style.display = 'none';
        if (turnOff && isNumberingMode) {
            isNumberingMode = false;
            btnNumbering.classList.remove('active');
            statusMsg.style.color = '#fff';
            statusMsg.textContent = '대기 중';
        }
    }

