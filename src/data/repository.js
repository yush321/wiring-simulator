    const DUCTS = { TOP: 100, MID: 320, BOT: 550, LEFT_X: 30, RIGHT_X: 670 };
    const GRID_H = 20;
    const PALETTE = ["#007bff", "#28a745", "#fd7e14", "#8B4513", "#6f42c1", "#17a2b8"];

    //////////////////////////////////"결선 붙여넣기 시작"
    let TUTORIAL_CONFIG = {
  "t1": {
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
    "title": "기초 6. 보조회로 결선 STEP.1",
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
  }
}
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

    // ==========================================
    // 2. 정답 데이터 (덮어씌우는 곳)
    // ==========================================
let DB_ANSWERS = {
  "1": {
    "targets": [],
    "commons": []
  },
  "2": {
    "targets": [],
    "commons": []
  },
  "3": {
    "targets": [],
    "commons": []
  },
  "4": {
    "targets": [],
    "commons": []
  },
  "5": {
    "targets": [],
    "commons": []
  },
  "6": {
    "targets": [],
    "commons": []
  },
  "7": {
    "targets": [],
    "commons": []
  },
  "8": {
    "targets": [],
    "commons": []
  },
  "9": {
    "targets": [],
    "commons": []
  },
  "10": {
    "targets": [],
    "commons": []
  },
  "11": {
    "targets": [],
    "commons": []
  },
  "12": {
    "targets": [],
    "commons": []
  },
  "13": {
    "targets": [],
    "commons": []
  },
  "14": {
    "targets": [],
    "commons": []
  },
  "15": {
    "targets": [],
    "commons": []
  },
  "16": {
    "targets": [],
    "commons": []
  },
  "17": {
    "targets": [],
    "commons": []
  },
  "18": {
    "targets": [],
    "commons": []
  },
  "t1": {
    "targets": [],
    "commons": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "TB_Top_L_9",
          "MCCB_1"
        ],
        "visuals": [
          [
            "TB_Top_L_9",
            "MCCB_1",
            6.050435428984084
          ]
        ]
      },
      {
        "name": "2",
        "color": "#28a745",
        "pins": [
          "TB_Top_L_10",
          "MCCB_2"
        ],
        "visuals": [
          [
            "TB_Top_L_10",
            "MCCB_2",
            3.6646900243013203
          ]
        ]
      },
      {
        "name": "3",
        "color": "#fd7e14",
        "pins": [
          "TB_Top_R_11",
          "MCCB_3"
        ],
        "visuals": [
          [
            "TB_Top_R_11",
            "MCCB_3",
            -3.1523829420431735
          ]
        ]
      }
    ],
    "nodes": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "TB_Top_L_9",
          "MCCB_1"
        ],
        "visuals": [
          [
            "TB_Top_L_9",
            "MCCB_1",
            6.050435428984084
          ]
        ]
      },
      {
        "name": "2",
        "color": "#28a745",
        "pins": [
          "TB_Top_L_10",
          "MCCB_2"
        ],
        "visuals": [
          [
            "TB_Top_L_10",
            "MCCB_2",
            3.6646900243013203
          ]
        ]
      },
      {
        "name": "3",
        "color": "#fd7e14",
        "pins": [
          "TB_Top_R_11",
          "MCCB_3"
        ],
        "visuals": [
          [
            "TB_Top_R_11",
            "MCCB_3",
            -3.1523829420431735
          ]
        ]
      }
    ],
    "tutorialFlow": [
      {
        "from": "TB_Top_L_9",
        "to": "MCCB_1",
        "offset": 6.050435428984084
      },
      {
        "from": "TB_Top_L_10",
        "to": "MCCB_2",
        "offset": 3.6646900243013203
      },
      {
        "from": "TB_Top_R_11",
        "to": "MCCB_3",
        "offset": -3.1523829420431735
      }
    ],
    "componentFilter": []
  },
  "t2": {
    "targets": [],
    "commons": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "MCCB_7",
          "EOCR_1",
          "FUSE_+1"
        ],
        "visuals": [
          [
            "MCCB_7",
            "EOCR_1",
            -0.8041552965342191
          ],
          [
            "EOCR_1",
            "FUSE_+1",
            -3.482260123737932
          ]
        ]
      },
      {
        "name": "2",
        "color": "#28a745",
        "pins": [
          "MCCB_8",
          "EOCR_2"
        ],
        "visuals": [
          [
            "MCCB_8",
            "EOCR_2",
            -4.525864857724585
          ]
        ]
      },
      {
        "name": "3",
        "color": "#fd7e14",
        "pins": [
          "MCCB_9",
          "EOCR_3",
          "FUSE_-1"
        ],
        "visuals": [
          [
            "MCCB_9",
            "EOCR_3",
            6.415203031886213
          ],
          [
            "EOCR_3",
            "FUSE_-1",
            -3.743862919906155
          ]
        ]
      }
    ],
    "nodes": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "MCCB_7",
          "EOCR_1",
          "FUSE_+1"
        ],
        "visuals": [
          [
            "MCCB_7",
            "EOCR_1",
            -0.8041552965342191
          ],
          [
            "EOCR_1",
            "FUSE_+1",
            -3.482260123737932
          ]
        ]
      },
      {
        "name": "2",
        "color": "#28a745",
        "pins": [
          "MCCB_8",
          "EOCR_2"
        ],
        "visuals": [
          [
            "MCCB_8",
            "EOCR_2",
            -4.525864857724585
          ]
        ]
      },
      {
        "name": "3",
        "color": "#fd7e14",
        "pins": [
          "MCCB_9",
          "EOCR_3",
          "FUSE_-1"
        ],
        "visuals": [
          [
            "MCCB_9",
            "EOCR_3",
            6.415203031886213
          ],
          [
            "EOCR_3",
            "FUSE_-1",
            -3.743862919906155
          ]
        ]
      }
    ],
    "tutorialFlow": [
      {
        "from": "MCCB_7",
        "to": "EOCR_1",
        "offset": -0.8041552965342191
      },
      {
        "from": "EOCR_1",
        "to": "FUSE_+1",
        "offset": -3.482260123737932
      },
      {
        "from": "MCCB_8",
        "to": "EOCR_2",
        "offset": -4.525864857724585
      },
      {
        "from": "MCCB_9",
        "to": "EOCR_3",
        "offset": 6.415203031886213
      },
      {
        "from": "EOCR_3",
        "to": "FUSE_-1",
        "offset": -3.743862919906155
      }
    ]
  },
  "t3": {
    "targets": [],
    "commons": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "EOCR_7",
          "MC1_1",
          "MC2_1"
        ],
        "visuals": [
          [
            "EOCR_7",
            "MC1_1",
            0
          ],
          [
            "MC1_1",
            "MC2_1",
            5
          ]
        ]
      },
      {
        "name": "2",
        "color": "#28a745",
        "pins": [
          "EOCR_8",
          "MC1_2",
          "MC2_2"
        ],
        "visuals": [
          [
            "EOCR_8",
            "MC1_2",
            -5
          ],
          [
            "MC1_2",
            "MC2_2",
            -5
          ]
        ]
      },
      {
        "name": "3",
        "color": "#fd7e14",
        "pins": [
          "EOCR_9",
          "MC1_3",
          "MC2_3"
        ],
        "visuals": [
          [
            "EOCR_9",
            "MC1_3",
            -10
          ],
          [
            "MC1_3",
            "MC2_3",
            10
          ]
        ]
      }
    ],
    "nodes": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "EOCR_7",
          "MC1_1",
          "MC2_1"
        ],
        "visuals": [
          [
            "EOCR_7",
            "MC1_1",
            0
          ],
          [
            "MC1_1",
            "MC2_1",
            5
          ]
        ]
      },
      {
        "name": "2",
        "color": "#28a745",
        "pins": [
          "EOCR_8",
          "MC1_2",
          "MC2_2"
        ],
        "visuals": [
          [
            "EOCR_8",
            "MC1_2",
            -5
          ],
          [
            "MC1_2",
            "MC2_2",
            -5
          ]
        ]
      },
      {
        "name": "3",
        "color": "#fd7e14",
        "pins": [
          "EOCR_9",
          "MC1_3",
          "MC2_3"
        ],
        "visuals": [
          [
            "EOCR_9",
            "MC1_3",
            -10
          ],
          [
            "MC1_3",
            "MC2_3",
            10
          ]
        ]
      }
    ],
    "tutorialFlow": [
      {
        "from": "EOCR_7",
        "to": "MC1_1",
        "offset": 0
      },
      {
        "from": "MC1_1",
        "to": "MC2_1",
        "offset": 5
      },
      {
        "from": "EOCR_8",
        "to": "MC1_2",
        "offset": -5
      },
      {
        "from": "MC1_2",
        "to": "MC2_2",
        "offset": -5
      },
      {
        "from": "EOCR_9",
        "to": "MC1_3",
        "offset": -10
      },
      {
        "from": "MC1_3",
        "to": "MC2_3",
        "offset": 10
      }
    ],
    "componentFilter": [
      "EOCR",
      "MC1",
      "MC2"
    ]
  },
  "t4": {
    "targets": [],
    "commons": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "TB_Bot_L_7",
          "MC1_7"
        ],
        "visuals": [
          [
            "TB_Bot_L_7",
            "MC1_7",
            0
          ]
        ]
      },
      {
        "name": "2",
        "color": "#28a745",
        "pins": [
          "MC1_8",
          "TB_Bot_L_8"
        ],
        "visuals": [
          [
            "MC1_8",
            "TB_Bot_L_8",
            5
          ]
        ]
      },
      {
        "name": "3",
        "color": "#fd7e14",
        "pins": [
          "MC1_9",
          "TB_Bot_L_9"
        ],
        "visuals": [
          [
            "MC1_9",
            "TB_Bot_L_9",
            -5
          ]
        ]
      },
      {
        "name": "4",
        "color": "#8B4513",
        "pins": [
          "MC2_7",
          "TB_Bot_R_17"
        ],
        "visuals": [
          [
            "MC2_7",
            "TB_Bot_R_17",
            0
          ]
        ]
      },
      {
        "name": "5",
        "color": "#6f42c1",
        "pins": [
          "MC2_8",
          "TB_Bot_R_18"
        ],
        "visuals": [
          [
            "MC2_8",
            "TB_Bot_R_18",
            5
          ]
        ]
      },
      {
        "name": "6",
        "color": "#17a2b8",
        "pins": [
          "MC2_9",
          "TB_Bot_R_19"
        ],
        "visuals": [
          [
            "MC2_9",
            "TB_Bot_R_19",
            -5
          ]
        ]
      }
    ],
    "nodes": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "TB_Bot_L_7",
          "MC1_7"
        ],
        "visuals": [
          [
            "TB_Bot_L_7",
            "MC1_7",
            0
          ]
        ]
      },
      {
        "name": "2",
        "color": "#28a745",
        "pins": [
          "MC1_8",
          "TB_Bot_L_8"
        ],
        "visuals": [
          [
            "MC1_8",
            "TB_Bot_L_8",
            5
          ]
        ]
      },
      {
        "name": "3",
        "color": "#fd7e14",
        "pins": [
          "MC1_9",
          "TB_Bot_L_9"
        ],
        "visuals": [
          [
            "MC1_9",
            "TB_Bot_L_9",
            -5
          ]
        ]
      },
      {
        "name": "4",
        "color": "#8B4513",
        "pins": [
          "MC2_7",
          "TB_Bot_R_17"
        ],
        "visuals": [
          [
            "MC2_7",
            "TB_Bot_R_17",
            0
          ]
        ]
      },
      {
        "name": "5",
        "color": "#6f42c1",
        "pins": [
          "MC2_8",
          "TB_Bot_R_18"
        ],
        "visuals": [
          [
            "MC2_8",
            "TB_Bot_R_18",
            5
          ]
        ]
      },
      {
        "name": "6",
        "color": "#17a2b8",
        "pins": [
          "MC2_9",
          "TB_Bot_R_19"
        ],
        "visuals": [
          [
            "MC2_9",
            "TB_Bot_R_19",
            -5
          ]
        ]
      }
    ],
    "tutorialFlow": [
      {
        "from": "TB_Bot_L_7",
        "to": "MC1_7",
        "offset": 0
      },
      {
        "from": "MC1_8",
        "to": "TB_Bot_L_8",
        "offset": 5
      },
      {
        "from": "MC1_9",
        "to": "TB_Bot_L_9",
        "offset": -5
      },
      {
        "from": "MC2_7",
        "to": "TB_Bot_R_17",
        "offset": 0
      },
      {
        "from": "MC2_8",
        "to": "TB_Bot_R_18",
        "offset": 5
      },
      {
        "from": "MC2_9",
        "to": "TB_Bot_R_19",
        "offset": -5
      }
    ],
    "componentFilter": [
      "MC1",
      "MC2",
      "TB_Bot_L",
      "TB_Bot_R"
    ]
  },
  "t5": {
    "targets": [],
    "commons": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "TB_Top_R_12",
          "TB_Bot_R_20",
          "TB_Bot_L_10"
        ],
        "visuals": [
          [
            "TB_Top_R_12",
            "TB_Bot_R_20",
            0
          ],
          [
            "TB_Bot_R_20",
            "TB_Bot_L_10",
            5
          ]
        ]
      }
    ],
    "nodes": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "TB_Top_R_12",
          "TB_Bot_R_20",
          "TB_Bot_L_10"
        ],
        "visuals": [
          [
            "TB_Top_R_12",
            "TB_Bot_R_20",
            0
          ],
          [
            "TB_Bot_R_20",
            "TB_Bot_L_10",
            5
          ]
        ]
      }
    ],
    "tutorialFlow": [
      {
        "from": "TB_Top_R_12",
        "to": "TB_Bot_R_20",
        "offset": 0
      },
      {
        "from": "TB_Bot_R_20",
        "to": "TB_Bot_L_10",
        "offset": 5
      }
    ],
    "componentFilter": [
      "TB_Top_L",
      "TB_Top_R",
      "TB_Bot_L",
      "TB_Bot_R"
    ]
  },
  "t6": {
    "targets": [],
    "commons": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "FUSE_+2",
          "EOCR_10",
          "EOCR_6"
        ],
        "visuals": [
          [
            "FUSE_+2",
            "EOCR_10",
            0
          ],
          [
            "EOCR_10",
            "EOCR_6",
            5
          ]
        ]
      }
    ],
    "nodes": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "FUSE_+2",
          "EOCR_10",
          "EOCR_6"
        ],
        "visuals": [
          [
            "FUSE_+2",
            "EOCR_10",
            0
          ],
          [
            "EOCR_10",
            "EOCR_6",
            5
          ]
        ]
      }
    ],
    "tutorialFlow": [
      {
        "from": "FUSE_+2",
        "to": "EOCR_10",
        "offset": 0
      },
      {
        "from": "EOCR_10",
        "to": "EOCR_6",
        "offset": 5
      }
    ],
    "componentFilter": [
      "FUSE",
      "EOCR"
    ]
  },
  "t7": {
    "targets": [],
    "commons": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "EOCR_5",
          "FR_2",
          "FR_8"
        ],
        "visuals": [
          [
            "EOCR_5",
            "FR_2",
            0
          ],
          [
            "FR_2",
            "FR_8",
            5
          ]
        ]
      }
    ],
    "nodes": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "EOCR_5",
          "FR_2",
          "FR_8"
        ],
        "visuals": [
          [
            "EOCR_5",
            "FR_2",
            0
          ],
          [
            "FR_2",
            "FR_8",
            5
          ]
        ]
      }
    ],
    "tutorialFlow": [
      {
        "from": "EOCR_5",
        "to": "FR_2",
        "offset": 0
      },
      {
        "from": "FR_2",
        "to": "FR_8",
        "offset": 5
      }
    ],
    "componentFilter": [
      "EOCR",
      "FR"
    ]
  },
  "t8": {
    "targets": [],
    "commons": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "EOCR_4",
          "TB_Top_L_5",
          "X_3",
          "MC2_4",
          "MC1_4"
        ],
        "visuals": [
          [
            "EOCR_4",
            "TB_Top_L_5",
            0
          ],
          [
            "TB_Top_L_5",
            "X_3",
            5
          ],
          [
            "X_3",
            "MC2_4",
            5
          ],
          [
            "MC2_4",
            "MC1_4",
            5
          ]
        ]
      }
    ],
    "nodes": [
      {
        "name": "1",
        "color": "#007bff",
        "pins": [
          "EOCR_4",
          "TB_Top_L_5",
          "X_3",
          "MC2_4",
          "MC1_4"
        ],
        "visuals": [
          [
            "EOCR_4",
            "TB_Top_L_5",
            0
          ],
          [
            "TB_Top_L_5",
            "X_3",
            5
          ],
          [
            "X_3",
            "MC2_4",
            5
          ],
          [
            "MC2_4",
            "MC1_4",
            5
          ]
        ]
      }
    ],
    "tutorialFlow": [
      {
        "from": "EOCR_4",
        "to": "TB_Top_L_5",
        "offset": 0
      },
      {
        "from": "TB_Top_L_5",
        "to": "X_3",
        "offset": 5
      },
      {
        "from": "X_3",
        "to": "MC2_4",
        "offset": 5
      },
      {
        "from": "MC2_4",
        "to": "MC1_4",
        "offset": 5
      }
    ],
    "componentFilter": [
      "TB_Top_L",
      "EOCR",
      "X",
      "MC1",
      "MC2"
    ]
  }
};
    // ==========================================
    // 3. 변수 및 초기화
    // ==========================================
    const canvas = document.getElementById('simCanvas');
    const ctx = canvas.getContext('2d');
    const statusMsg = document.getElementById('statusMsg');
    const btnCheck = document.getElementById('btnCheck');
    const adminInfo = document.getElementById('adminInfo');
    const saveStatus = document.getElementById('saveStatus');
    const groupIndexInput = document.getElementById('groupIndexInput');
    const exportArea = document.getElementById('exportArea');
    const layoutSelect = document.getElementById('layoutSelect');
    const currentLayoutNumSpan = document.getElementById('currentLayoutNum');
    
    const infoModal = document.getElementById('infoModal');
    const successModal = document.getElementById('successModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const btnNumbering = document.getElementById('btnNumbering');
    const numberingModal = document.getElementById('numberingModal');
    const numberingList = document.getElementById('numberingList');
    const numberingResult = document.getElementById('numberingResult');
    const numberingGuideText = document.getElementById('numberingGuideText');
    const numberingStageInfo = document.getElementById('numberingStageInfo');
    const numberingQuestion = document.getElementById('numberingQuestion');
    const numberingComponentMock = document.getElementById('numberingComponentMock');
    const numberingChoices = document.getElementById('numberingChoices');
    const numberingProgressText = document.getElementById('numberingProgressText');
    const numberingProgressFill = document.getElementById('numberingProgressFill');
    const numberingImage = document.getElementById('numberingImage');
    const numberingFocusRect = document.getElementById('numberingFocusRect');
    const numberingAnswerOverlay = document.getElementById('numberingAnswerOverlay');
    const numberingReverseState = document.getElementById('numberingReverseState');
    const numberingInputWrap = document.getElementById('numberingInputWrap');
    const numberingAnswerInput = document.getElementById('numberingAnswerInput');

    const numberingEditorModal = document.getElementById('numberingEditorModal');
    const numberingEditorImage = document.getElementById('numberingEditorImage');
    const numberingEditorRect = document.getElementById('numberingEditorRect');
    const numberingEditorJson = document.getElementById('numberingEditorJson');
    const editorRectInfo = document.getElementById('editorRectInfo');
    const editorImageUrl = document.getElementById('editorImageUrl');
    const editorStageSelect = document.getElementById('editorStageSelect');
    const editorStageTitle = document.getElementById('editorStageTitle');
    const editorComponentId = document.getElementById('editorComponentId');
    const editorStageWarning = document.getElementById('editorStageWarning');
    const editorPinPreset = document.getElementById('editorPinPreset');
    const editorInputMode = document.getElementById('editorInputMode');
    const editorGuideText = document.getElementById('editorGuideText');
    const editorQuestionLabel = document.getElementById('editorQuestionLabel');
    const editorQuestionAnswer = document.getElementById('editorQuestionAnswer');
    const editorQuestionSelect = document.getElementById('editorQuestionSelect');
    const editorAllowReverse = document.getElementById('editorAllowReverse');
    const editorOrderMode = document.getElementById('editorOrderMode');
    const editorPinDisplayCsv = document.getElementById('editorPinDisplayCsv');
    const editorQuestionChoices = document.getElementById('editorQuestionChoices');
    const tutorialEditorModal = document.getElementById('tutorialEditorModal');
    const wiringEditorTitle = document.getElementById('wiringEditorTitle');
    const wiringEditorImage = document.getElementById('wiringEditorImage');
    const wiringEditorPageCount = document.getElementById('wiringEditorPageCount');
    const wiringEditorPageTabs = document.getElementById('wiringEditorPageTabs');
    const wiringEditorActivePageLabel = document.getElementById('wiringEditorActivePageLabel');
    const wiringEditorPageText = document.getElementById('wiringEditorPageText');
    const wiringEditorPreview = document.getElementById('wiringEditorPreview');
    const wiringEditorStatus = document.getElementById('wiringEditorStatus');
    const wiringEditorJson = document.getElementById('wiringEditorJson');
    const playbackControls = document.getElementById('playbackControls');
    const playbackProgress = document.getElementById('playbackProgress');
    const componentFilterWrap = document.getElementById('componentFilterWrap');
    const componentFilterList = document.getElementById('componentFilterList');

    let currentLayoutId = "t1"; 
    let currentComponents = [];
    let allPins = [], wires = [], historyStack = [];
    let selectedPin = null; 
    let isGradingMode = false;
    let isAdminMode = false; 
    let focusedGroup = null; 
    let isNumberingMode = false;
    let numberingAnswers = {};
    let numberingPinSnapshot = [];
    let numberingSession = null;
    const NUMBERING_STORAGE_KEY = 'numbering_scenarios_v2';

    // Paste exported numbering JSON here.
    // The editor now exports in this shape:
    // {
    //   "t1": { "image": "...", "stages": [ ... ] },
    //   "t2": { "image": "...", "stages": [ ... ] }
    // }
    // Tip:
    // 1) key must match layout id (t1, t2, ...).
    // 2) each stage should include at least one question.
    let NUMBERING_SCENARIOS_DEFAULT = {
  "t1": {
    "image": "./images/open1.png",
    "stages": [
      {
        "title": "EOCR B접점",
        "componentId": "EOCR",
        "pinPreset": "EOCR_12",
        "guide": "EOCR B접점입니다(평상시 정상전류를 통전하고 이상전류 발생시 접점이 떨어지며 전류를 차단합니다.), EOCR A접점과 회로가 이어져있어서 10번을 공통으로 사용해야 됩니다",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.11301775147928994,
          "y": 0.028033147740515345,
          "w": 0.06272189349112425,
          "h": 0.09737148776382235
        },
        "questions": [
          {
            "pinId": "NEW_1771055926650",
            "label": "B접점",
            "answer": "10,4",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "EOCR A접점",
        "componentId": "EOCR",
        "pinPreset": "EOCR_12",
        "guide": "EOCR A접점입니다.(평상시 전류는 차단되어있지만 이상전류발생시 전류가 통전되며 노랑램프와 부저를 작동시킵니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.142603550295858,
          "y": 0.42580603392464067,
          "w": 0.037869822485207094,
          "h": 0.1077301566748673
        },
        "questions": [
          {
            "pinId": "NEW_1771056781285",
            "label": "A 접점",
            "answer": "10,5",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "EOCR 전원",
        "componentId": "EOCR",
        "pinPreset": "EOCR_12",
        "guide": "EOCR에 전원을 넣어줍니다.(결선을 최단거리로 하기 위해 역순결선 하기도 합니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.06686390532544378,
          "y": 0.7324226336915707,
          "w": 0.04852071005917161,
          "h": 0.1201605593681212
        },
        "questions": [
          {
            "pinId": "NEW_1771056843140",
            "label": "EOCR 전원",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "FR(플리커) 전원",
        "componentId": "FR",
        "pinPreset": "FR_8",
        "guide": "FR(플리커)는 설정 시간에 따라 접점을 주기적으로 투입·차단시키는 타이머입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.1366863905325444,
          "y": 0.7179204972161077,
          "w": 0.04852071005917158,
          "h": 0.15745176744788292
        },
        "questions": [
          {
            "pinId": "NEW_1771072246493",
            "label": "전원",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "FR (A접점)",
        "componentId": "FR",
        "pinPreset": "FR_8",
        "guide": "FR의 A접점입니다. B접점과 공통단자(8번)를 공유하므로 단자 연결에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.21479289940828403,
          "y": 0.5853295351547326,
          "w": 0.043786982248520706,
          "h": 0.13673442962579307
        },
        "questions": [
          {
            "pinId": "NEW_1771072462211",
            "label": "A접점",
            "answer": "8,6",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "FR  (B접점)",
        "componentId": "FR",
        "pinPreset": "FR_8",
        "guide": "FR의 B접점입니다. A접점과 공통단자(8번)를 공유하므로 단자 연결에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.28579881656804734,
          "y": 0.5894730027191506,
          "w": 0.05088757396449706,
          "h": 0.11601709180370323
        },
        "questions": [
          {
            "pinId": "NEW_1771072551184",
            "label": "B접점",
            "answer": "8,5",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "YL 노란색램프",
        "componentId": "WL",
        "pinPreset": "WL_2",
        "guide": "YL은 극성이 없으며, 부저와 공통 전원선(-)을 사용하여 결선합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.20887573964497042,
          "y": 0.7324226336915707,
          "w": 0.04852071005917158,
          "h": 0.15330829988346495
        },
        "questions": [
          {
            "pinId": "NEW_1771073049897",
            "label": "전원",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "BZ 부저",
        "componentId": "BZ",
        "pinPreset": "BZ_2",
        "guide": "BZ는 극성이 없으며, YL와 공통 전원선을 사용하여 결선합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.27633136094674554,
          "y": 0.7324226336915707,
          "w": 0.05325443786982248,
          "h": 0.1512365661012559
        },
        "questions": [
          {
            "pinId": "NEW_1771073131888",
            "label": "전원",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "SS 셀랙트스위치(수동,자동 전환스위치)",
        "componentId": "SS",
        "pinPreset": "SS_3",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다.스위치 내부 N단자 2개를 서로 점프 연결한 후, M과 A,N단자를 단자대에서 맞게 결선합니다. (주의: 스위치 위치 왼쪽 M, 오른쪽 A)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.4846153846153846,
          "y": 0.0943286287712029,
          "w": 0.05325443786982248,
          "h": 0.18438430661659977
        },
        "questions": [
          {
            "pinId": "NEW_1771073722013",
            "label": "A (자동)",
            "answer": "N,A",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "SS 셀렉트스위치 M(수동)",
        "componentId": "SS",
        "pinPreset": "SS_3",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. N은 공통단자를 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.5615384615384615,
          "y": 0.08604169364236695,
          "w": 0.053254437869822535,
          "h": 0.147093098536838
        },
        "questions": [
          {
            "pinId": "NEW_1771073882605",
            "label": "M (수동)",
            "answer": "N,M",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "PB0",
        "componentId": "PB0",
        "pinPreset": "PB0_2",
        "guide": "PB0는 B접점으로 평상시 도통, 누르면 개방됩니다. PB1과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.5686390532544379,
          "y": 0.25592386378350385,
          "w": 0.07218934911242603,
          "h": 0.08908455263498638
        },
        "questions": [
          {
            "pinId": "NEW_1771074161555",
            "label": "PB B접점",
            "answer": "C,N",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "PB1",
        "componentId": "PB1",
        "pinPreset": "PB1_2",
        "guide": "PB1은 A접점(NO)으로 평상시 개방, 누르면 통전됩니다. PB0과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.5662721893491124,
          "y": 0.4113038974491778,
          "w": 0.06982248520710066,
          "h": 0.13673442962579313
        },
        "questions": [
          {
            "pinId": "NEW_1771074327728",
            "label": "PB A접점",
            "answer": "N,O",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "타이머 (순시동작)",
        "componentId": "T",
        "pinPreset": "T_8",
        "guide": "타이머 A접점, 순시동작으로 전원 인가 시 즉시 도통되며, 자기유지 회로에 사용된다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.6420118343195266,
          "y": 0.4071604298847598,
          "w": 0.05207100591715985,
          "h": 0.15745176744788297
        },
        "questions": [
          {
            "pinId": "NEW_1771074737578",
            "label": "A접점",
            "answer": "1,3",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "X 릴레이 B접점",
        "componentId": "X",
        "pinPreset": "X_8",
        "guide": "릴레이 A·B접점은 동일한 접점 세트의 공통단자(1번)를 공유한다. 본 회로에서는 1번을 공통으로 사용하여 결선한다. (다른 세트인 5(B)-6(A)-8(C)번을 사용해도 가능하다.)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.5662721893491124,
          "y": 0.5998316716301956,
          "w": 0.04852071005917169,
          "h": 0.11187362423928515
        },
        "questions": [
          {
            "pinId": "NEW_1771076078386",
            "label": "B접점",
            "answer": "1,4",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "타이머 전원",
        "componentId": "T",
        "pinPreset": "T_8",
        "guide": "타이머 전원으로 2,7번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.5627218934911242,
          "y": 0.7324226336915707,
          "w": 0.04615384615384621,
          "h": 0.1512365661012559
        },
        "questions": [
          {
            "pinId": "NEW_1771076144169",
            "label": "전원",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "릴레이 A접점",
        "componentId": "X",
        "pinPreset": "X_8",
        "guide": "릴레이 A·B접점은 동일한 접점 세트의 공통단자(1번)를 공유한다. 본 회로에서는 1번을 공통으로 사용하여 결선한다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.691715976331361,
          "y": 0.12126116793991971,
          "w": 0.06390532544378702,
          "h": 0.10980189045707626
        },
        "questions": [
          {
            "pinId": "NEW_1771076235896",
            "label": "A접점",
            "answer": "3,1",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "타이머 한시동작순시복귀 A접점",
        "componentId": "T",
        "pinPreset": "T_8",
        "guide": "타이머 A접점은 설정 시간 후 동작하여 통전되고, 전원을 차단하면 즉시 원상태로 복귀합니다. 6-8번 단자를 사용해요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.7781065088757396,
          "y": 0.5874012689369416,
          "w": 0.05088757396449706,
          "h": 0.11808882558591227
        },
        "questions": [
          {
            "pinId": "NEW_1771076506403",
            "label": "A접점",
            "answer": "6,8",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "MC1 전원",
        "componentId": "MC1",
        "pinPreset": "MC1_12",
        "guide": "MC1은 모터1 제어용 전자접촉기이며, 코일 단자 6-12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.6988165680473373,
          "y": 0.7220639647805257,
          "w": 0.05207100591715974,
          "h": 0.15123656610125602
        },
        "questions": [
          {
            "pinId": "NEW_1771076657725",
            "label": "전원",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "MC2",
        "componentId": "MC2",
        "pinPreset": "MC2_12",
        "guide": "MC2은 모터2 제어용 전자접촉기이며, 코일 단자 6-12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.7662721893491125,
          "y": 0.7220639647805257,
          "w": 0.05443786982248522,
          "h": 0.15123656610125602
        },
        "questions": [
          {
            "pinId": "NEW_1771076704728",
            "label": "전원",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "FLS Floatless switch 수위(물,액체)감지용 부품",
        "componentId": "FLS",
        "pinPreset": "FLS_8",
        "guide": "FLS 전원은 5,6번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.3520710059171598,
          "y": 0.7241356985627347,
          "w": 0.04023668639053252,
          "h": 0.1512365661012559
        },
        "questions": [
          {
            "pinId": "NEW_1771077290561",
            "label": "전원",
            "answer": "5,6",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "FLS E1,E2,E3",
        "componentId": "FLS",
        "pinPreset": "FLS_8",
        "guide": "E1·E2·E3는 FLS 7·8·1번 단자에 연결되며, 서로 다른 높이에 설치된 전극입니다. 물이 닿으면 전극 간 전류가 흐르며 수위를 감지합니다. * E3에는 접지선을 연결한다. 도면에서 접지 기호가 표시된 부분은 공통 접지로 결선합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.3994082840236686,
          "y": 0.8898744011394536,
          "w": 0.05798816568047338,
          "h": 0.09737148776382232
        },
        "questions": [
          {
            "pinId": "NEW_1771077935112",
            "label": "수위감지",
            "answer": "7,8,1",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "MC1 A접점",
        "componentId": "MC1",
        "pinPreset": "MC1_12",
        "guide": "MC1 A단자로 4,10번을 사용합니다",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.8384615384615385,
          "y": 0.10261556390003884,
          "w": 0.0745562130177515,
          "h": 0.1201605593681212
        },
        "questions": [
          {
            "pinId": "NEW_1771078015221",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "MC2 A접점",
        "componentId": "MC2",
        "pinPreset": "MC2_12",
        "guide": "MC2 A접점으로 4,10번을 사용합니다",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.9201183431952663,
          "y": 0.11711770037550175,
          "w": 0.06982248520710055,
          "h": 0.12016055936812119
        },
        "questions": [
          {
            "pinId": "NEW_1771078075948",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "RL 전원",
        "componentId": "RL",
        "pinPreset": "RL_2",
        "guide": "RL 램프는 모터1 동작 시 점등되며, GL과 공통(-)단자를 공유한다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.840828402366864,
          "y": 0.7344943674737796,
          "w": 0.04970414201183426,
          "h": 0.13880616340800211
        },
        "questions": [
          {
            "pinId": "NEW_1771078254692",
            "label": "전원",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "GL 전원",
        "componentId": "GL",
        "pinPreset": "GL_2",
        "guide": "GL 램프는 모터2 동작 시 점등되며, RL과 공통(-)단자를 공유한다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.9059171597633137,
          "y": 0.7324226336915707,
          "w": 0.05798816568047327,
          "h": 0.145021364754629
        },
        "questions": [
          {
            "pinId": "NEW_1771078314468",
            "label": "전원",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "새 단계 26",
        "componentId": "NEW",
        "pinPreset": "",
        "guide": "설명 문구를 입력하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "pinDisplayCsv": "",
        "rect": null,
        "questions": []
      }
    ]
  }
};
    let NUMBERING_SCENARIOS = { ...NUMBERING_SCENARIOS_DEFAULT };
    let numberingEditorState = {
        rectMode: false,
        dragging: false,
        startX: 0,
        startY: 0,
        currentRect: null,
        stageIndex: -1,
        questionIndex: -1
    };

    try {
        const saved = localStorage.getItem(NUMBERING_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved) || {};
            const merged = { ...NUMBERING_SCENARIOS_DEFAULT };
            Object.keys(parsed).forEach(layoutId => {
                const candidate = parsed[layoutId];
                const hasQuestions = Array.isArray(candidate?.stages)
                    && candidate.stages.some(stage => Array.isArray(stage?.questions) && stage.questions.length > 0);
                if (hasQuestions || !merged[layoutId]) {
                    const baseLayout = merged[layoutId];
                    const baseStages = Array.isArray(baseLayout?.stages) ? baseLayout.stages : [];
                    const candidateStages = Array.isArray(candidate?.stages) ? candidate.stages : [];

                    const patchedStages = candidateStages.map(stage => {
                        const qCount = Array.isArray(stage?.questions) ? stage.questions.length : 0;
                        const backup = baseStages.find(s =>
                            s?.componentId === stage?.componentId
                            && Array.isArray(s?.questions)
                            && s.questions.length > 0
                        );
                        // Authoring priority: if admin already authored questions, keep them as-is.
                        if (qCount > 0) {
                            return {
                                ...stage,
                                allowReverse: typeof stage?.allowReverse === 'boolean'
                                    ? stage.allowReverse
                                    : backup?.allowReverse,
                                orderMode: stage?.orderMode || backup?.orderMode || 'horizontal'
                            };
                        }
                        if (!backup) return stage;

                        return {
                            ...stage,
                            allowReverse: typeof stage?.allowReverse === 'boolean'
                                ? stage.allowReverse
                                : backup.allowReverse,
                            orderMode: stage?.orderMode || backup.orderMode || 'horizontal',
                            rect: stage?.rect || backup.rect || null,
                            questions: backup.questions.map(q => ({ ...q }))
                        };
                    });

                    merged[layoutId] = {
                        ...(baseLayout || {}),
                        ...(candidate || {}),
                        // Keep authored stage list from storage; do not append repository defaults.
                        stages: patchedStages
                    };
                }
            });
            NUMBERING_SCENARIOS = merged;
        }
    } catch (e) {
        NUMBERING_SCENARIOS = { ...NUMBERING_SCENARIOS_DEFAULT };
    }
    let lastSavedAction = null;



