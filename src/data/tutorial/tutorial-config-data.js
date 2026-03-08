// Extracted from app-static-data.js to keep static data grouped by purpose.

window.APP_TUTORIAL_CONFIG_DEFAULT = {
  "1": {
    "title": "기초 1. 주전원 배선용차단기(MCCB) 연결",
    "desc": [
      "단자대에서 차단기(MCCB) 1차측으로<br>전원을 연결하는 가장 기초적인 작업입니다.<br><br>회로도의  R(갈), S(흑), T(회)상의 <span style=\"color:#dc3545;\">색상</span>을 확인하고 연결하세요."
    ],
    "img": "./images/t01-01.png",
    "targetIds": [
      "TB_Top_L",
      "TB_Top_R",
      "MCCB",
      "EOCR",
      "FUSE"
    ]
  },
  "t2": {
    "title": "기초 2. MCCB와 FUSE 연결하기",
    "desc": [
      "MCCB에서 퓨즈(FUSE)를 거쳐<br>EOCR의 전원부까지 연결하는 과정입니다.<br><br>점으로 표시된 부분은 전선이 연결되어있다는 표시이며<br><br>한 단자에 두 선을 넣어서 결속하면 됩니다.<br><br><span style=\"color:#dc3545;\">재생버튼</span>을 눌러 확인하세요."
    ],
    "img": "./images/t01-02.png",
    "targetIds": [
      "MCCB",
      "FUSE",
      "EOCR"
    ]
  },
  "t3": {
    "title": "기초 3. EOCR과 MC1,MC2 결선하기",
    "desc": [
      "<br><br>EOCR  7,8,9번에서 나온 각 선은<br> <br><b>MC1에서 MC2로</b> 혹은<br> <b>MC2에서 MC1</b> 으로<br><br>두가지 방법중 전선의 길이를 최소화하는 방법으로 선택하면 됩니다."
    ],
    "img": "./images/t01-03.png",
    "targetIds": [
      "FR",
      "EOCR"
    ]
  },
  "t4": {
    "title": "기초 4. MC1,MC2 출력과 단자대 연결하기",
    "desc": [
      "<b>MC1, MC2</b> 7,8,9 번에서 나온 각 선들은<br><br><b>단자대 TB2, TB3</b>로 각각 결선해주면 됩니다."
    ],
    "img": "./images/t01-04.png",
    "targetIds": [
      "X",
      "T",
      "MC1",
      "TB_Top_L"
    ]
  },
  "t5": {
    "title": "기초 5. 접지선 결선하기",
    "desc": [
      "도면의 <b>모든 접지는 모두</b> 연결하세요"
    ],
    "img": "./images/t01-05.png",
    "targetIds": [
      "FUSE",
      "EOCR",
      "TB_Top_L",
      "X",
      "MC1",
      "MC2"
    ]
  },
  "t6": {
    "title": "기초 6. 보조회로 STEP.1 (FUSE, EOCR)",
    "desc": [
      "퓨즈(+)과 연결된 부품들의 핀번호를 확인하고<br>결선하세요. (EOCR 10번은 공통)"
    ],
    "img": "./images/t01-06.png",
    "targetIds": [
      "FUSE",
      "EOCR",
      "FR",
      "TB_Top_L",
      "FLS",
      "X",
      "T",
      "MC1",
      "MC2",
      "TB_Bot_L",
      "TB_Bot_R"
    ]
  },
  "t7": {
    "title": "기초 7. 보조회로 STEP.2 (EOCR, FR)",
    "desc": [
      "EOCR과 FR 연결하기"
    ],
    "img": "./images/t01-07.png",
    "targetIds": [
      "FUSE",
      "EOCR",
      "FR",
      "TB_Top_L",
      "FLS",
      "X",
      "T",
      "MC1",
      "MC2",
      "TB_Bot_L",
      "TB_Bot_R"
    ]
  },
  "t8": {
    "title": "기초 8. 보조회로 STEP.3 (EOCR, SS, X, MC1, MC2 결선)",
    "desc": [
      "EOCR 4번에서 출발하여 많은 부품이 연결된 부분입니다.<br><br>실전에선 단자대자석 등으로 표시를 하여<br><br>실수없게 결선합니다.<br><br>시작부분 상관없이 가능한 최단거리로 모든 부분이 연결되면 됩니다."
    ],
    "img": "./images/t01-08.png",
    "targetIds": [
      "FUSE",
      "EOCR",
      "FR",
      "TB_Top_L",
      "FLS",
      "X",
      "T",
      "MC1",
      "MC2",
      "TB_Bot_L",
      "TB_Bot_R"
    ]
  },
  "t9": {
    "title": "기초 9. 보조회로 STEP.4 (SS, FLS 결선)",
    "desc": [
      "단자대와 FLS 결선입니다"
    ],
    "img": "./images/t01-09.png",
    "targetIds": [
      "TB_Top_L",
      "TB_Top_R",
      "MCCB",
      "EOCR",
      "FUSE"
    ]
  },
  "t10": {
    "title": "기초 10. 보조회로 STEP.5 (자잘한 결선과 FLS E1,2,3)",
    "desc": [
      "이제 좌측에 빼먹기 쉬운 간단한 결선들을 할 차례입니다.<br><br>결선시에는 도면에 형광펜으로 칠하며 실수로 빼먹는 부분 없이<br>결선해주세요.<br><br>FLS E1,E2,E3는 단자대로 갑니다. <br>특히 E1은 접지선이 같이 연결되는 곳이며 <br><br><span style=\"color:#dc3545;\"><b>접지선 연결이 끝</b></span>나는 곳입니다. <br><br>단자대 반대편은 노란선으로 짧게 하나씩 빼주면 됩니다."
    ],
    "img": "./images/t01-10.png",
    "targetIds": [
      "TB_Top_L",
      "TB_Top_R",
      "MCCB",
      "EOCR",
      "FUSE"
    ]
  },
  "t11": {
    "title": "기초 11. 보조회로 STEP.6 (PB1, X, T, MC1)",
    "desc": [
      "릴레이(X)는 회로가 이어져있어 1번을 공통단자로 씁니다.<br><br>총 5곳을 결선합니다. <br>형광펜으로 표시하며 꼼꼼히 결선하세요."
    ],
    "img": "./images/t01-11.png",
    "targetIds": [
      "TB_Top_L",
      "TB_Top_R",
      "MCCB",
      "EOCR",
      "FUSE"
    ]
  },
  "t12": {
    "title": "기초 12. 보조회로 STEP.7 (SS, PB0, T, MC1,2 GL,RL)",
    "desc": [
      "결선된 곳은 형광펜으로 칠하며 실수없이 결선하세요."
    ],
    "img": "./images/t01-12.png",
    "targetIds": [
      "TB_Top_L",
      "TB_Top_R",
      "MCCB",
      "EOCR",
      "FUSE"
    ]
  },
    "t13": {
    "title": "기초 13. 보조회로 STEP.8 (퓨즈 -극에 연결된 모든부품)",
    "desc": [
      "<b>제어판 마지막</b><br><br>퓨즈(-)극에서 시작하여 순서 상관없이 <br>모든 <span style=\"color:#dc3545;\">부품들이 전기적으로 연결</span>되면 됩니다.<br><br>(동영상 순서 외에도 다양한 방법이 있을수 있으니 참고해주세요)<br><br>고생하셨습니다."
    ],
    "img": "./images/t01-13.png",
    "targetIds": [
      "TB_Top_L",
      "TB_Top_R",
      "MCCB",
      "EOCR",
      "FUSE"
    ]
  },
    "t14": {
    "title": "STEP.1 FUSE EOCR",
    "desc": [
      "<span style=\"color:#dc3545;\">퓨즈(+)</span>와 EOCR 전원단(<span style=\"color:#dc3545;\">6번</span>)과 A,B접점의 공통단(<span style=\"color:#dc3545;\">10번</span>)을 결선"
    ],
    "img": "./images/t06-01.png",
    "targetIds": [],
    "category": "public_6:1"
  },
  "t15": {
    "title": "STEP.2 EOCR SS X",
    "desc": [
      "EOCR B접점(<span style=\"color:#dc3545;\">4번</span>) 과 단자대 SS 공통단(<span style=\"color:#dc3545;\">N</span>), 릴레이의 A접점(<span style=\"color:#dc3545;\">3번</span>)"
    ],
    "img": "./images/t06-02.png",
    "targetIds": [],
    "category": "public_6:2"
  },
  "t16": {
    "title": "STEP.3 SS FLS",
    "desc": [
      "SS(A), FLS 전원부(5번), A접점(3번)을 결선합니다"
    ],
    "img": "./images/t06-03.png",
    "targetIds": [],
    "category": "public_6:3"
  },
  "t17": {
    "title": "STEP.4 EOCR X FLS YL BZ",
    "desc": [
      "EOCR 이상전류 발생시 YL점등과 부저를 작동시킵니다.<br>(YLBZ는 배관작업시 같은극끼리 결선, 제어판결선을 간결하게 합니다)<br><br>FLS와 단자대를 결선하고 <b>단자대 반대편에 수위감지선</b>을 달아줍니다.<br><br>(<span style=\"color:#dc3545;\">E3는 도면내 모든 접지선 4개를 연결한 마지막 지점이됩니다.</span>)"
    ],
    "img": "./images/t06-04.png",
    "targetIds": [],
    "category": "public_6:4"
  },
  "t18": {
    "title": "STEP.5 PB1,X,T,FR",
    "desc": [
      "<span style=\"color:#dc3545;\">공통단자</span>를 연습하기 좋은 도면입니다.<br><br>회로를 형광펜으로 그리는 중 <span style=\"color:#dc3545;\">같은부품이 2개</span> 존재한다면 공통단자를 찾아보세요."
    ],
    "img": "./images/t06-05.png",
    "targetIds": [],
    "category": "public_6:5"
  },
  "t19": {
    "title": "STEP.6 FR, MC1, RL",
    "desc": [
      "FR B접점(5번), MC1 전원단(6번), RL(+)를 결선합니다.<br><br>동작시험시 FR 점등에 따라 간헐적으로 MC1과 RL을 동작시킵니다."
    ],
    "img": "./images/t06-06.png",
    "targetIds": [],
    "category": "public_6:6"
  },
  "t20": {
    "title": "STEP.7 FR, T, MC2, Gl",
    "desc": [
      "한시동작 순시복귀B(일정시간뒤 동작 타이머 소자시 즉시복귀)와<br>FR A접(6번), MC2(6번), GL(+)를 결선합니다.<br><br>동작시험시 타이머B접점으로 MC2와 GL은 즉시 동작하고 <br><br>일정시간뒤 타이머는 개방되어 FR이 간헐적으로 단락시에만 MC2,GL을 동작시킵니다."
    ],
    "img": "./images/t06-07.png",
    "targetIds": [],
    "category": "public_6:7"
  },
  "t21": {
    "title": "STEP.8 SS,PB0,1, X, T, FR",
    "desc": [
      "도면우측 자잘한 결선을 펜으로 표시해가며 꼼꼼히 결선합니다."
    ],
    "img": "./images/t06-08.png",
    "targetIds": [],
    "category": "public_6:8"
  },
  "t22": {
    "title": "STEP.9 Final FUSE(-)",
    "desc": [
      "퓨즈(-)에서 나온 전선이 가급적 최단길이로 연결되도록 결선합니다.<br>(결선후 벨테스터로 퓨즈(-)와 부품하나씩 체크하세요)"
    ],
    "img": "./images/t06-09.png",
    "targetIds": [],
    "category": "public_6:9"
  }

};

///////////////////////////////////////////"결선 붙여넣기 끝"


    const PUBLIC_LAYOUT_BASE = [
        { id: 'TB_Top_L', label: '', x: 50, y: 30, w: 280, h: 50, type: 'terminal', startNum: 1, pins: [ {n:'C', g:'PB01'}, {n:'N', g:'PB01'}, {n:'O', g:'PB01'}, {n:'M', g:'SS'}, {n:'C', g:'SS'}, {n:'A', g:'SS'}, {n:'$', g:'$'}, {n:'$', g:'$'}, {n:'갈', g:'TB1'}, {n:'흑', g:'TB1'} ] },
        { id: 'TB_Top_R', label: '', x: 370, y: 30, w: 280, h: 50, type: 'terminal', startNum: 11, pins: [ {n:'회', g:'TB1'}, {n:'녹', g:'TB1'}, {n:'$', g:'$'}, {n:'$', g:'$'}, {n:'$', g:'$'}, {n:'$', g:'$'}, {n:'$', g:'$'}, {n:'+', g:'RLGL'}, {n:'-', g:'RLGL'}, {n:'+', g:'RLGL'} ] },
        { id: 'FUSE', label: 'FUSE', x: 50, y: 160, w: 60, h: 110, type: 'fuse', topArr: [ {n:'+1', l:''}, {n:'-1', l:''} ], botArr: [ {n:'+2', l:''}, {n:'-2', l:''} ] },
        { id: 'EOCR', label: 'EOCR', x: 130, y: 160, w: 90, h: 110, type: 'custom', topArr: [ {n:'1',l:'a'}, {n:'2',l:'a'}, {n:'3',l:'a'}, {n:'4',l:'b'}, {n:'5',l:'a'}, {n:'6',l:'전'} ], botArr: [ {n:'7',l:'a'}, {n:'8',l:'a'}, {n:'9',l:'a'}, {n:'10',l:'c'}, {n:'$',l:'$'}, {n:'12',l:'원'} ] },
        { id: 'MCCB', label: 'MCCB', x: 240, y: 160, w: 80, h: 110, type: 'custom', topArr: [ {n:'1',l:''}, {n:'2',l:''}, {n:'3',l:''} ], botArr: [ {n:'7',l:''}, {n:'8',l:''}, {n:'9',l:''} ] },
        { id: 'X', label: 'X (8P)', x: 340, y: 160, w: 90, h: 110, type: 'custom', topArr: [ {n:'6',l:'A'}, {n:'5',l:'B'}, {n:'4',l:'b'}, {n:'3',l:'a'} ], botArr: [ {n:'7',l:'전'}, {n:'8',l:'C'}, {n:'1',l:'C'}, {n:'2',l:'원'} ] },
        { id: 'FR', label: 'FR (8P)', x: 450, y: 160, w: 90, h: 110, type: 'custom', topArr: [ {n:'6',l:'a'}, {n:'5',l:'b'}, {n:'$',l:'$'}, {n:'$',l:'$'} ], botArr: [ {n:'7',l:'전'}, {n:'8',l:'C'}, {n:'$',l:'$'}, {n:'2',l:'원'} ] },
        { id: 'T', label: 'Timer', x: 80, y: 390, w: 90, h: 110, type: 'custom', topArr: [ {n:'6',l:'A'}, {n:'5',l:'B'}, {n:'$',l:'$'}, {n:'3',l:'a'} ], botArr: [ {n:'7',l:'전'}, {n:'8',l:'C'}, {n:'1',l:'a'}, {n:'2',l:'원'} ] },
        { id: 'FLS', label: 'FLS', x: 190, y: 390, w: 90, h: 110, type: 'custom', topArr: [ {n:'6',l:'전'}, {n:'5',l:'원'}, {n:'4',l:'a'}, {n:'3',l:'C'} ], botArr: [ {n:'7',l:'E1'}, {n:'8',l:'E2'}, {n:'1',l:'E3'}, {n:'2',l:'b'} ] },
        { id: 'MC1', label: 'MC1', x: 300, y: 390, w: 100, h: 110, type: 'custom', topArr: [ {n:'1',l:'a'}, {n:'2',l:'a'}, {n:'3',l:'a'}, {n:'4',l:'a'}, {n:'5',l:'b'}, {n:'6',l:'전'} ], botArr: [ {n:'7',l:'a'}, {n:'8',l:'a'}, {n:'9',l:'a'}, {n:'10',l:'a'}, {n:'11',l:'b'}, {n:'12',l:'원'} ] },
        { id: 'MC2', label: 'MC2', x: 420, y: 390, w: 100, h: 110, type: 'custom', topArr: [ {n:'1',l:'a'}, {n:'2',l:'a'}, {n:'3',l:'a'}, {n:'4',l:'a'}, {n:'5',l:'b'}, {n:'6',l:'전'} ], botArr: [ {n:'7',l:'a'}, {n:'8',l:'a'}, {n:'9',l:'a'}, {n:'10',l:'a'}, {n:'11',l:'b'}, {n:'12',l:'원'} ] },
        { id: 'TB_Bot_L', label: '', x: 50, y: 600, w: 280, h: 50, type: 'terminal', startNum: 1, pins: [ {n:'Y', g:'YLBZ'}, {n:'C', g:'YLBZ'}, {n:'B', g:'YLBZ'}, {n:'$', g:'$'}, {n:'$', g:'$'}, {n:'$', g:'$'}, {n:'갈', g:'TB3'}, {n:'흑', g:'TB3'}, {n:'회', g:'TB3'}, {n:'녹', g:'TB3'} ] },
        { id: 'TB_Bot_R', label: '', x: 370, y: 600, w: 280, h: 50, type: 'terminal', startNum: 11, pins: [ {n:'E1', g:'TB4'}, {n:'E2', g:'TB4'}, {n:'E3', g:'TB4'}, {n:'$', g:'$'}, {n:'$', g:'$'}, {n:'$', g:'$'}, {n:'갈', g:'TB2'}, {n:'흑', g:'TB2'}, {n:'회', g:'TB2'}, {n:'녹', g:'TB2'} ] }
    ];
    const PUBLIC_LAYOUT_ROW_RULES = (() => {
        const rules = {};
        for (let i = 1; i <= 18; i++) {
            rules[String(i)] = {
                row2: ['FUSE', 'EOCR', 'MCCB', 'X', 'FR'],
                row3: ['T', 'FLS', 'MC1', 'MC2']
            };
        }
        rules["6"] = {
            row2: ['EOCR', 'MCCB', 'FUSE', 'X', 'FR'],
            row3: ['FLS', 'T', 'MC1', 'MC2']
        };
        return rules;
    })();
    const PUBLIC_LAYOUT_TERMINAL_OVERRIDES = {
        "6": {
            TB_Top_L: {
                pins: [
                    { n: '+', g: 'YLBZ' },
                    { n: '-', g: 'YLBZ' },
                    { n: '$', g: '$' },
                    { n: '$', g: '$' },
                    { n: '$', g: '$' },
                    { n: '$', g: '$' },
                    { n: '$', g: '$' },
                    { n: '$', g: '$' },
                    { n: '갈', g: '' },
                    { n: '검', g: '' }
                ]
            },
            TB_Top_R: {
                pins: [
                    { n: '회', g: '' },
                    { n: '녹', g: '' },
                    { n: '$', g: '$' },
                    { n: '+', g: 'RL' },
                    { n: '-', g: '공통' },
                    { n: '+', g: 'GL' },
                    { n: '$', g: '$' },
                    { n: 'M', g: '' },
                    { n: 'N', g: '' },
                    { n: 'A', g: '' }
                ]
            },
            TB_Bot_L: {
                pins: [
                    { n: 'O', g: 'PB1' },
                    { n: 'N', g: '' },
                    { n: 'C', g: 'PB0' },
                    { n: '$', g: '$' },
                    { n: '$', g: '$' },
                    { n: '$', g: '$' },
                    { n: '$', g: '$' },
                    { n: '$', g: '$' },
                    { n: '갈', g: '' },
                    { n: '검', g: '' }
                ]
            },
            TB_Bot_R: {
                pins: [
                    { n: '회', g: '' },
                    { n: '녹', g: '' },
                    { n: '$', g: '$' },
                    { n: 'E1', g: '' },
                    { n: 'E2', g: '' },
                    { n: 'E3', g: 'PE' },
                    { n: '갈', g: '' },
                    { n: '검', g: '' },
                    { n: '회', g: '' },
                    { n: '녹', g: '' }
                ]
            }
        }
    };

    function deepCloneLayout(layoutArr) {
        return JSON.parse(JSON.stringify(layoutArr || []));
    }

    function placePublicRow(componentMap, ids, y) {
        const rowIds = (ids || []).filter(Boolean);
        if (!rowIds.length) return;
        const items = rowIds
            .map(id => componentMap.get(id))
            .filter(Boolean);
        if (!items.length) return;
        const left = 50;
        const right = 650;
        const usableWidth = right - left;
        const widthSum = items.reduce((acc, comp) => acc + (Number(comp.w) || 0), 0);
        const gapCount = Math.max(1, items.length - 1);
        const baseGap = Math.max(10, (usableWidth - widthSum) / gapCount);
        let x = left;
        items.forEach((comp, idx) => {
            comp.x = Math.round(x);
            comp.y = y;
            x += (Number(comp.w) || 0) + (idx < items.length - 1 ? baseGap : 0);
        });
    }

    function applyTerminalOverride(componentMap, override) {
        if (!override || typeof override !== 'object') return;
        Object.keys(override).forEach(compId => {
            const comp = componentMap.get(compId);
            const patch = override[compId];
            if (!comp || !patch || typeof patch !== 'object') return;
            if (Array.isArray(patch.pins) && Array.isArray(comp.pins)) {
                patch.pins.forEach((p, idx) => {
                    if (!comp.pins[idx] || !p || typeof p !== 'object') return;
                    if (typeof p.n === 'string') comp.pins[idx].n = p.n;
                    if (typeof p.g === 'string') comp.pins[idx].g = p.g;
                });
            }
            if (Number.isFinite(patch.startNum)) comp.startNum = patch.startNum;
        });
    }

    function buildPublicLayoutById(layoutId) {
        const key = String(layoutId || '');
        if (key === '1') return deepCloneLayout(PUBLIC_LAYOUT_BASE);
        const rows = PUBLIC_LAYOUT_ROW_RULES[key];
        const layout = deepCloneLayout(PUBLIC_LAYOUT_BASE);
        const byId = new Map(layout.map(comp => [comp.id, comp]));
        if (rows) {
            placePublicRow(byId, rows.row2, 160);
            placePublicRow(byId, rows.row3, 390);
        }
        applyTerminalOverride(byId, PUBLIC_LAYOUT_TERMINAL_OVERRIDES[key]);
        return layout;
    }

    const PUBLIC_LAYOUT_BY_ID = (() => {
        const out = { "1": deepCloneLayout(PUBLIC_LAYOUT_BASE) };
        for (let i = 2; i <= 18; i++) {
            out[String(i)] = buildPublicLayoutById(String(i));
        }
        return out;
    })();

    function getPublicLayoutBase(layoutId) {
        const raw = String(layoutId || '').trim();
        let key = raw;
        if (!/^\d+$/.test(key)) {
            const category = String(TUTORIAL_CONFIG?.[raw]?.category || '').trim();
            const m = category.match(/^public_(\d+)/);
            if (m) key = String(parseInt(m[1], 10));
        }
        if (PUBLIC_LAYOUT_BY_ID[key]) return deepCloneLayout(PUBLIC_LAYOUT_BY_ID[key]);
        return deepCloneLayout(PUBLIC_LAYOUT_BASE);
    }

    // ==========================================
    // 2. 정답 데이터 (덮어씌우는 곳)
    // ==========================================

