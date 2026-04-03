// Extracted from app-static-data.js to keep static data grouped by purpose.

window.APP_NUMBERING_SCENARIOS_DEFAULT = {
  "1": {
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
        "componentId": "YL",
        "pinPreset": "YL_2",
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
        "guide": "MC1은 모터1 제어용 전자접촉기이며, 전원부인 6-12번을 사용합니다.",
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
  },
  "2": {
    "image": "./images/num2.png",
    "stages": [
      {
        "title": "EOCR B접점",
        "componentId": "EOCR",
        "guide": "EOCR B접점입니다(평상시 정상전류를 통전하고 이상전류 발생시 접점이 떨어지며 전류를 차단합니다.), EOCR A접점과 회로가 이어져 있어 10번을 공통으로 사용해야 됩니다",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.11301775147928994,
          "y": 0.059741674946315826,
          "w": 0.042603550295857995,
          "h": 0.053331623986410684
        },
        "questions": [
          {
            "pinId": "NUM2_EOCR_B",
            "label": "B접점",
            "answer": "10,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
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
          "x": 0.1378698224852071,
          "y": 0.4987019646806192,
          "w": 0.03313609467455622,
          "h": 0.09230473382263382
        },
        "questions": [
          {
            "pinId": "NUM2_EOCR_A",
            "label": "A접점",
            "answer": "10,5",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "EOCR 전원부",
        "componentId": "EOCR",
        "guide": "EOCR에 전원을 넣어줍니다.(결선을 최단 거리로 하기 위해 역순으로 결선 하기도 합니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.05739644970414201,
          "y": 0.7079260280119227,
          "w": 0.046153846153846156,
          "h": 0.14358514150187496
        },
        "questions": [
          {
            "pinId": "EOCR_1772898415409",
            "label": "전원부",
            "answer": "12,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "YL (노란색 램프)",
        "componentId": "YL",
        "pinPreset": "YL_2",
        "guide": "YL은 극성이 없으며, 부저와 공통 전원선(-)을 사용하여 결선합니다. (배관작업에서 YL,BZ는 한 극을 점프하여 -극을 결선합니다. 공통을 잡지 않으면 전선은 4개가 들어가 입선이 힘들어집니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.13313609467455623,
          "y": 0.7222845421621102,
          "w": 0.04023668639053252,
          "h": 0.11897054581583921
        },
        "questions": [
          {
            "pinId": "YL_1772898437749",
            "label": "전원부",
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
          "x": 0.19822485207100593,
          "y": 0.7284381910836191,
          "w": 0.05443786982248522,
          "h": 0.11897054581583932
        },
        "questions": [
          {
            "pinId": "BZ_1772898461491",
            "label": "전원부",
            "answer": "+,-",
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
          "x": 0.2692307692307692,
          "y": 0.7222845421621102,
          "w": 0.046153846153846156,
          "h": 0.1230729784301785
        },
        "questions": [
          {
            "pinId": "FLS_1772898484966",
            "label": "전원부",
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
        "guide": "E1·E2·E3는 FLS 7·8·1번 단자에 연결되며 E3에는 접지선을 연결한다. 도면에서 접지 기호가 표시된 부분은 접지를 다 이어서 결선합니다. (배관시 단자대 반대편엔 보조회로용 전선을 각극에 연결해 수위감지용으로 10cm정도 빼줍니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.31420118343195264,
          "y": 0.8966379282715298,
          "w": 0.07218934911242608,
          "h": 0.086151084901125
        },
        "questions": [
          {
            "pinId": "FLS_1772898517018",
            "label": "E1,E2,E3",
            "answer": "7,8,1",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "SS 셀랙트스위치(수동,자동 전환스위치)",
        "componentId": "SS",
        "pinPreset": "SS_3",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. 배관 작업시 N단자 2개를 서로 점프 연결한 후, M과 A,N단자를 단자대에서 맞게 결선합니다. (주의: 스위치 위치 왼쪽 M, 오른쪽 A)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.42071005917159765,
          "y": 0.10486843370404794,
          "w": 0.03431952662721893,
          "h": 0.12307297843017853
        },
        "questions": [
          {
            "pinId": "SS_1772898545445",
            "label": "Auto",
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
          "x": 0.49644970414201184,
          "y": 0.11512451523989616,
          "w": 0.026035502958579926,
          "h": 0.09640716643697318
        },
        "questions": [
          {
            "pinId": "SS_1772898564571",
            "label": "Manual",
            "answer": "N,M",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "PB0 정지 버튼",
        "componentId": "PB0",
        "pinPreset": "PB0_2",
        "guide": "PB0는 B접점으로 평상시 도통, 누르면 개방됩니다. PB1과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.4976331360946746,
          "y": 0.2484535752059229,
          "w": 0.02248520710059171,
          "h": 0.0943559501298035
        },
        "questions": [
          {
            "pinId": "PB0_1772898604153",
            "label": "B접점",
            "answer": "C,N",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "PB1",
        "componentId": "PB1",
        "pinPreset": "",
        "guide": "PB1은 A접점(NO)으로 평상시 개방, 누르면 통전됩니다. PB0과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.49644970414201184,
          "y": 0.42690939392968175,
          "w": 0.037869822485207094,
          "h": 0.10256081535848205
        },
        "questions": [
          {
            "pinId": "PB1_1772898619405",
            "label": "A접점",
            "answer": "N,O",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "릴레이 A접점",
        "componentId": "X",
        "pinPreset": "X_8",
        "guide": "릴레이 A접점, 1,3 또는 6,8 번을 사용하며 역순으로 써도 됩니다. (본 도면에선 1,3 사용)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.5686390532544379,
          "y": 0.4248581776225121,
          "w": 0.028402366863905293,
          "h": 0.10871446427999099
        },
        "questions": [
          {
            "pinId": "X_1772898648852",
            "label": "A접점",
            "answer": "1,3",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "FLS A접점",
        "componentId": "FLS",
        "pinPreset": "FLS_8",
        "guide": "FLS A접점입니다. (동작설명: SS 오토모드시 E1,2,3에서 수위 감지시 단락되어 X,T 에 전류를 통하게 합니다)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.42662721893491123,
          "y": 0.4289606102368514,
          "w": 0.02840236686390535,
          "h": 0.1046120316656517
        },
        "questions": [
          {
            "pinId": "FLS_1772898671895",
            "label": "A접점",
            "answer": "3,4",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "X 릴레이 전원부",
        "componentId": "X",
        "pinPreset": "X_8",
        "guide": "X 릴레이 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.41597633136094675,
          "y": 0.734591840005128,
          "w": 0.043786982248520734,
          "h": 0.11076568058716074
        },
        "questions": [
          {
            "pinId": "X_1772898688285",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "T 타이머 전원",
        "componentId": "T",
        "pinPreset": "T_8",
        "guide": "타이머의 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.48698224852071004,
          "y": 0.7284381910836191,
          "w": 0.04260355029585805,
          "h": 0.11486811320150003
        },
        "questions": [
          {
            "pinId": "T_1772898701873",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "X 릴레이 A접점",
        "componentId": "X",
        "pinPreset": "X_8",
        "guide": "X A접점, (주의! 실수많음) 도면상 릴레이는 2곳에 떨어져 위치해서 다른 부품들과 연결되어 있습니다.이럴땐 이전에 쓴 핀번호를 쓴다면 모든부품이 같이 연결되는 결과와 같습니다. 1,3은 사용했으니 이번엔 다른 A접점 6,8을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.6372781065088757,
          "y": 0.1171757315470658,
          "w": 0.03076923076923077,
          "h": 0.10256081535848209
        },
        "questions": [
          {
            "pinId": "X_1772898740426",
            "label": "A접점",
            "answer": "6,8",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "타이머 한시동작순시복귀 A접점",
        "componentId": "T",
        "pinPreset": "T_8",
        "guide": "타이머 A접점은 설정 시간 후 동작하여 통전되고, 전원을 차단하면 즉시 원상태로 복귀합니다. 6,8번 단자를 사용해요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.6384615384615384,
          "y": 0.2443511425915836,
          "w": 0.03313609467455625,
          "h": 0.10256081535848208
        },
        "questions": [
          {
            "pinId": "T_1772898773173",
            "label": "A접점",
            "answer": "6,8",
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
          "x": 0.6254437869822486,
          "y": 0.7263869747764494,
          "w": 0.04852071005917158,
          "h": 0.11897054581583932
        },
        "questions": [
          {
            "pinId": "FR_1772898791811",
            "label": "전원부",
            "answer": "2,7",
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
          "x": 0.7035502958579881,
          "y": 0.6135700778821191,
          "w": 0.03076923076923077,
          "h": 0.1046120316656518
        },
        "questions": [
          {
            "pinId": "FR_1772898837826",
            "label": "B접점",
            "answer": "8,5",
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
          "x": 0.7816568047337278,
          "y": 0.6135700778821191,
          "w": 0.031952662721893565,
          "h": 0.10666324797282145
        },
        "questions": [
          {
            "pinId": "FR_1772898852191",
            "label": "A접점",
            "answer": "8,6",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "MC1 전원",
        "componentId": "MC1",
        "pinPreset": "MC1_12",
        "guide": "MC1은 모터1 제어용 전자접촉기이며, 전원부인 6-12번을 사용합니다",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.6988165680473373,
          "y": 0.7263869747764494,
          "w": 0.04615384615384621,
          "h": 0.11486811320150003
        },
        "questions": [
          {
            "pinId": "MC1_1772898869258",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "MC2 전원",
        "componentId": "MC2",
        "pinPreset": "MC2_12",
        "guide": "MC2은 모터2 제어용 전자접촉기이며, 전원부인 6-12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.7745562130177515,
          "y": 0.7427967052338066,
          "w": 0.04260355029585805,
          "h": 0.10256081535848216
        },
        "questions": [
          {
            "pinId": "MC2_1772898881283",
            "label": "전원부",
            "answer": "6,12",
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
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.8502958579881656,
          "y": 0.11512451523989616,
          "w": 0.03313609467455625,
          "h": 0.10666324797282138
        },
        "questions": [
          {
            "pinId": "MC1_1772898898063",
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
        "allowReverse": true,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.9224852071005917,
          "y": 0.12538059677574437,
          "w": 0.03431952662721893,
          "h": 0.08820230120829461
        },
        "questions": [
          {
            "pinId": "MC2_1772898918197",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "RL 레드램프",
        "componentId": "RL",
        "pinPreset": "RL_2",
        "guide": "RL 램프는 모터1 동작 시 점등되며, GL과 공통(-)단자를 공유한다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.8396449704142012,
          "y": 0.7284381910836191,
          "w": 0.05443786982248522,
          "h": 0.11076568058716074
        },
        "questions": [
          {
            "pinId": "RL_1772898936123",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "GL 녹색램프",
        "componentId": "GL",
        "pinPreset": "GL_2",
        "guide": "GL 램프는 모터2 동작 시 점등되며, RL과 공통(-)단자를 공유한다.\"",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "pinDisplayCsv": "",
        "rect": {
          "x": 0.9165680473372781,
          "y": 0.7325406236979584,
          "w": 0.04260355029585794,
          "h": 0.10256081535848216
        },
        "questions": [
          {
            "pinId": "GL_1772898959262",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ]
      },
      {
        "title": "새 단계",
        "componentId": "NEW",
        "guide": "설명 문구를 입력하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": null,
        "questions": [],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      }
    ]
  },

  "3": {
    "image": "./images/num3.png",
    "stages": [
      {
        "title": "EOCR B접점",
        "componentId": "EOCR",
        "guide": "EOCR B접점입니다. EOCR A접점과 회로가 이어져 있어서 10번을 공통으로 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.1319526627218935,
          "y": 0.053417028216252806,
          "w": 0.05325443786982248,
          "h": 0.05120157543309025
        },
        "questions": [
          {
            "pinId": "NEW_1773931174311",
            "label": "B접점",
            "answer": "10,4",
            "choices": [],
            "inputMode": "choice"
          },
          {
            "pinId": "NEW_1773935658608",
            "label": "B접점",
            "answer": "10,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR A접점",
        "componentId": "EOCR",
        "guide": "EOCR A접점입니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.16272189349112426,
          "y": 0.49256900212314225,
          "w": 0.03313609467455622,
          "h": 0.09255669405212463
        },
        "questions": [
          {
            "pinId": "NEW_1773931316335",
            "label": "A접점",
            "answer": "10,5",
            "choices": [],
            "inputMode": "choice"
          },
          {
            "pinId": "NEW_1773935818706",
            "label": "A접점",
            "answer": "10,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR 전원부",
        "componentId": "EOCR",
        "guide": "EOCR에 전원을 넣어줍니다.(결선을 최단거리로 하기 위해 역순결선 하기도 합니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.07988165680473373,
          "y": 0.719037508846426,
          "w": 0.043786982248520706,
          "h": 0.13194252130834794
        },
        "questions": [
          {
            "pinId": "NEW_1773931411676",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          },
          {
            "pinId": "NEW_1773935855112",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "YL 넘버링",
        "componentId": "YL",
        "guide": "YL은 극성이 없으며, 부저와 공통 전원선(-)을 사용하여 결선하면 배관입선시 전선이 줄어 편해집니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.1544378698224852,
          "y": 0.7150989261208037,
          "w": 0.044970414201183445,
          "h": 0.14375826948521497
        },
        "questions": [
          {
            "pinId": "NEW_1773931606008",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "YL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "BZ 넘버링",
        "componentId": "BZ",
        "guide": "BZ는 극성이 없으며, YL와 -극을 공통으로 사용해 결선합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.22781065088757396,
          "y": 0.7150989261208037,
          "w": 0.05088757396449706,
          "h": 0.13981968675959255
        },
        "questions": [
          {
            "pinId": "NEW_1773931697330",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "BZ_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "X 넘버링",
        "componentId": "X",
        "guide": "릴레이 A접점입니다.(본 회로에서는 M모드 PB1을 누르면 일정시간뒤 단락되어 MC1,2를 번갈아 작동시킵니다)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.3804733727810651,
          "y": 0.10658789501215422,
          "w": 0.048520710059171634,
          "h": 0.11028031631742514
        },
        "questions": [
          {
            "pinId": "NEW_1773932121281",
            "label": "A접점",
            "answer": "1,3",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR 넘버링",
        "componentId": "FR",
        "guide": "FR의 B접점입니다. A접점과 공통단자(8번)를 공유하므로 단자 연결에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.30355029585798815,
          "y": 0.6067879011661897,
          "w": 0.03076923076923077,
          "h": 0.09846456814055815
        },
        "questions": [
          {
            "pinId": "NEW_1773932232477",
            "label": "B접점",
            "answer": "8,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR A접점",
        "componentId": "FR",
        "guide": "FR의 A접점입니다. B접점과 공통단자(8번)를 공유하므로 단자 연결에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.38402366863905324,
          "y": 0.610726483891812,
          "w": 0.03550295857988167,
          "h": 0.09649527677774705
        },
        "questions": [
          {
            "pinId": "NEW_1773932277658",
            "label": "A접점",
            "answer": "8,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 넘버링",
        "componentId": "MC1",
        "guide": "MC1은 모터1 제어용 전자접촉기이며, 전원부인 6-12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.30118343195266273,
          "y": 0.7210068002092372,
          "w": 0.04970414201183432,
          "h": 0.13785039539678146
        },
        "questions": [
          {
            "pinId": "NEW_1773932356859",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 넘버링",
        "componentId": "MC2",
        "guide": "MC2은 모터2 제어용 전자접촉기이며, 단자 6-12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.37810650887573966,
          "y": 0.7288839656604819,
          "w": 0.04497041420118342,
          "h": 0.13391181267115915
        },
        "questions": [
          {
            "pinId": "NEW_1773932405774",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS 넘버링",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. *배관작업시 스위치 내부 N단자 2개를 서로 점프 연결한 후, M과 A,N단자를 단자대에서 맞게 결선합니다. (주의: 스위치 위치 왼쪽 M, 오른쪽 A)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.45857988165680474,
          "y": 0.11052647773777655,
          "w": 0.04260355029585794,
          "h": 0.0905874026893135
        },
        "questions": [
          {
            "pinId": "NEW_1773932635314",
            "label": "A모드",
            "answer": "N,A",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS 셀렉트스위치 M(수동)",
        "componentId": "NEW",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. 공통단자 N을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6751479289940828,
          "y": 0.11249576910058771,
          "w": 0.03076923076923077,
          "h": 0.08467952860088003
        },
        "questions": [
          {
            "pinId": "NEW_1773932718850",
            "label": "M모드",
            "answer": "N,M",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS Floatless switch 수위(물,액체)감지용 부품",
        "componentId": "FLS",
        "guide": "FLS A접점은 3,4번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.46331360946745564,
          "y": 0.29760915720483705,
          "w": 0.029585798816568032,
          "h": 0.10831102495461403
        },
        "questions": [
          {
            "pinId": "NEW_1773932909128",
            "label": "A접점",
            "answer": "3,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR 넘버링",
        "componentId": "FR",
        "guide": "플리커의 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.44911242603550294,
          "y": 0.7288839656604819,
          "w": 0.048520710059171634,
          "h": 0.12406535585710332
        },
        "questions": [
          {
            "pinId": "NEW_1773933015720",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS 넘버링",
        "componentId": "FLS",
        "guide": "FLS 전원은 5,6번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5236686390532544,
          "y": 0.7131296347579925,
          "w": 0.047337278106508895,
          "h": 0.13981968675959267
        },
        "questions": [
          {
            "pinId": "NEW_1773934174129",
            "label": "전원부",
            "answer": "5,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS E1,E2,E3",
        "componentId": "NEW",
        "guide": "E1·E2·E3는 FLS 7·8·1번 단자에 연결됩니다. (주의) E3에는 접지표시가 있습니다. 도면에서 접지 기호가 표시된 부분은 공통 접지로 결선합니다. 주결선에 접지와 모두 연결되게 결선하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.5745562130177515,
          "y": 0.8943044401366196,
          "w": 0.06153846153846154,
          "h": 0.05514015815871254
        },
        "questions": [
          {
            "pinId": "NEW_1773934378147",
            "label": "E1,E2,E3",
            "answer": "7,8,1",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB0 넘버링",
        "componentId": "PB0",
        "guide": "PB0는 B접점으로 평상시 도통, 누르면 개방됩니다. PB1과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.678698224852071,
          "y": 0.23853041632050218,
          "w": 0.028402366863905293,
          "h": 0.10437244222899164
        },
        "questions": [
          {
            "pinId": "NEW_1773934451544",
            "label": "B접점",
            "answer": "C,N",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB0_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB1 넘버링",
        "componentId": "PB1",
        "guide": "PB1은 A접점으로 평상시 개방, 누르면 통전됩니다. PB0과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6810650887573965,
          "y": 0.42955167851318504,
          "w": 0.04260355029585794,
          "h": 0.0984645681405581
        },
        "questions": [
          {
            "pinId": "NEW_1773934507106",
            "label": "A접점",
            "answer": "N,O",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB1_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "T A접점",
        "componentId": "T",
        "guide": "타이머 A접점으로, 순시동작으로 전원이 들어오면 즉시 단락되어 전류가 흐르게 합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7603550295857988,
          "y": 0.42955167851318504,
          "w": 0.04260355029585794,
          "h": 0.09452598541493579
        },
        "questions": [
          {
            "pinId": "T_1773936136322",
            "label": "A접점",
            "answer": "1,3",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "타이머 한시동작순시복귀 A접점",
        "componentId": "T",
        "guide": "타이머 A접점은 설정 시간 후 동작하여 통전되고, 전원을 차단하면 즉시 원상태로 복귀합니다. 6-8번 단자를 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7591715976331361,
          "y": 0.6048186098033785,
          "w": 0.03313609467455614,
          "h": 0.10634173359180288
        },
        "questions": [
          {
            "pinId": "NEW_1773934753816",
            "label": "한시동작순시복귀 A접점",
            "answer": "6,8",
            "choices": [],
            "inputMode": "choice"
          },
          {
            "pinId": "NEW_1773936167613",
            "label": "한시동작순시복귀 A접점",
            "answer": "6,8",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "타이머 전원부",
        "componentId": "T",
        "guide": "타이머 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6763313609467455,
          "y": 0.7249453829348596,
          "w": 0.04497041420118353,
          "h": 0.12406535585710332
        },
        "questions": [
          {
            "pinId": "NEW_1773934803677",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X 전원부",
        "componentId": "X",
        "guide": "릴레이 전원부",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7485207100591716,
          "y": 0.7288839656604819,
          "w": 0.047337278106508784,
          "h": 0.12209606449429211
        },
        "questions": [
          {
            "pinId": "NEW_1773934841792",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 A접점",
        "componentId": "MC1",
        "guide": "MC1 A접점으로 4,10번을 사용합니다",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8266272189349112,
          "y": 0.11643435182621004,
          "w": 0.04023668639053257,
          "h": 0.10240315086618049
        },
        "questions": [
          {
            "pinId": "NEW_1773934928929",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 A접점",
        "componentId": "MC2",
        "guide": "MC2 A접점으로 4,10번을 사용합니다",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.9071005917159763,
          "y": 0.11052647773777655,
          "w": 0.031952662721893454,
          "h": 0.11618819040585865
        },
        "questions": [
          {
            "pinId": "NEW_1773934966715",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "RL 전원부",
        "componentId": "RL",
        "guide": "RL 램프는 모터1 동작 시 점등되며, GL과 공통(-)단자를 공유합니다.(배관작업시 전선 수가 줄어 편합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8195266272189349,
          "y": 0.7328225483861042,
          "w": 0.053254437869822535,
          "h": 0.1142188990430475
        },
        "questions": [
          {
            "pinId": "NEW_1773935068373",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "RL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "GL 전원부",
        "componentId": "GL",
        "guide": "GL 램프는 모터2 동작 시 점등되며, RL과 공통(-)단자를 공유합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8988165680473372,
          "y": 0.7328225483861042,
          "w": 0.047337278106508895,
          "h": 0.10831102495461398
        },
        "questions": [
          {
            "pinId": "NEW_1773935121744",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "새 단계",
        "componentId": "NEW",
        "guide": "설명 문구를 입력하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.07988165680473373,
          "y": 0.719037508846426,
          "w": 0.043786982248520706,
          "h": 0.13194252130834794
        },
        "questions": [
          {
            "pinId": "NEW_1773931411676",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      }
    ]
  },

  "4": {
    "image": "./images/num4.png",
    "stages": [
      {
        "title": "EOCR B접점",
        "componentId": "EOCR",
        "guide": "EOCR B접점입니다. EOCR A접점과 회로가 이어져 있어서 왼쪽은 10번으로 쓰고 아랫쪽 EOCR A접점과 공통으로 단자를 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.12248520710059171,
          "y": 0.0750792332071756,
          "w": 0.043786982248520706,
          "h": 0.061048032247146056
        },
        "questions": [
          {
            "pinId": "NEW_1774363365137",
            "label": "B접점",
            "answer": "10,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR A접점",
        "componentId": "EOCR",
        "guide": "EOCR A접점입니다. 상단의 EOCR B접점과 10번 단자를 공통으로 사용하여 윗쪽 핀번호는 10번이 됩니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.14733727810650887,
          "y": 0.48863041939751994,
          "w": 0.03195266272189348,
          "h": 0.09452598541493584
        },
        "questions": [
          {
            "pinId": "NEW_1774363502362",
            "label": "A접점",
            "answer": "10,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR 전원부",
        "componentId": "EOCR",
        "guide": "EOCR에 전원을 넣어줍니다.(결선을 최단거리로 하기 위해 역순결선 하기도 합니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.06568047337278106,
          "y": 0.7111603433951814,
          "w": 0.04852071005917161,
          "h": 0.12603464721991442
        },
        "questions": [
          {
            "pinId": "NEW_1774363566318",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "YL 전원부",
        "componentId": "YL",
        "guide": "YL은 극성이 없으며, 부저와 공통 전원선(-)을 사용하여 결선하면 배관입선시 전선이 줄어 편해집니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.1378698224852071,
          "y": 0.7111603433951814,
          "w": 0.04733727810650887,
          "h": 0.1142188990430475
        },
        "questions": [
          {
            "pinId": "NEW_1774363650822",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "YL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "BZ 넘버링",
        "componentId": "BZ",
        "guide": "BZ는 극성이 없으며, YL와 -극을 공통으로 사용합니다. (결선시 10P 단자대에 YL,BZ 는 +,-,+ 3개로 표시하여 -는 공통단자로 사용합니다. 배관작업시 -극은 점프선으로 연결합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.20887573964497042,
          "y": 0.7111603433951814,
          "w": 0.05325443786982248,
          "h": 0.1181574817686698
        },
        "questions": [
          {
            "pinId": "BZ_1774367711066",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "BZ_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS Floatless switch 수위(물,액체)감지용 부품 전원",
        "componentId": "FLS",
        "guide": "FLS 전원은 5,6번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.2775147928994083,
          "y": 0.6993445952183144,
          "w": 0.046153846153846156,
          "h": 0.13588110403397036
        },
        "questions": [
          {
            "pinId": "NEW_1774364141133",
            "label": "전원부",
            "answer": "5,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS E1,E2,E3",
        "componentId": "FLS",
        "guide": "E1·E2·E3는 FLS 7·8·1번 단자에 연결됩니다. (주의) E3에는 접지표시가 있습니다. 도면에서 접지 기호가 표시된 부분은 공통 접지로 결선합니다. 주결선에 접지와 모두 연결되게 결선하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.3272189349112426,
          "y": 0.8667343610572633,
          "w": 0.06153846153846154,
          "h": 0.059078740884334846
        },
        "questions": [
          {
            "pinId": "NEW_1774364246433",
            "label": "E1,E2,E3",
            "answer": "7,8,1",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS Auto 모드",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. *배관작업시 스위치 내부 N단자 2개를 서로 점프 연결한 후, M과 A,N단자를 단자대에서 맞게 결선합니다. (주의: 스위치 위치 왼쪽 M, 오른쪽 A)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4301775147928994,
          "y": 0.12825010000307702,
          "w": 0.03431952662721893,
          "h": 0.09452598541493584
        },
        "questions": [
          {
            "pinId": "NEW_1774364381295",
            "label": "Auto 모드",
            "answer": "N,A",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS 셀렉트스위치 M(수동)",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. 공통단자 N을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5011834319526627,
          "y": 0.13218868272869935,
          "w": 0.023668639053254448,
          "h": 0.08271023723806886
        },
        "questions": [
          {
            "pinId": "NEW_1774365760908",
            "label": "SS M모드",
            "answer": "N,M",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS A접점",
        "componentId": "FLS",
        "guide": "FLS A접점은 3,4번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4301775147928994,
          "y": 0.4197052216991292,
          "w": 0.03076923076923077,
          "h": 0.1004338595033693
        },
        "questions": [
          {
            "pinId": "NEW_1774365855122",
            "label": "A접점",
            "answer": "3,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR 전원부",
        "componentId": "FR",
        "guide": "플리커의 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.42071005917159765,
          "y": 0.6973753038555033,
          "w": 0.04497041420118342,
          "h": 0.14178897812240376
        },
        "questions": [
          {
            "pinId": "NEW_1774365906809",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB0",
        "componentId": "PB0",
        "guide": "PB0는 B접점으로 평상시 도통, 누르면 개방됩니다. PB1과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.49644970414201184,
          "y": 0.2542847472229915,
          "w": 0.028402366863905293,
          "h": 0.08664881996369117
        },
        "questions": [
          {
            "pinId": "NEW_1774366020063",
            "label": "B접점",
            "answer": "C,N",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB0_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB1",
        "componentId": "PB1",
        "guide": "PB1은 A접점으로 평상시 개방, 누르면 통전됩니다. PB0과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4976331360946746,
          "y": 0.4197052216991292,
          "w": 0.03905325443786983,
          "h": 0.1004338595033693
        },
        "questions": [
          {
            "pinId": "NEW_1774366077027",
            "label": "A접점",
            "answer": "N,O",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB1_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "X A접점",
        "componentId": "X",
        "guide": "릴레이 A접점입니다. (도면에 X는 회로가 이어지지 않은 2곳에 있어서 공통 없이 A접점인 1,3 혹은 6,8 각각 하나씩 씁니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5686390532544379,
          "y": 0.41773593033631806,
          "w": 0.031952662721893454,
          "h": 0.10240315086618046
        },
        "questions": [
          {
            "pinId": "NEW_1774366683511",
            "label": "A접점",
            "answer": "1,3",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X A접점",
        "componentId": "X",
        "guide": "릴레이 A접점입니다. (앞서 1,3번을 사용했으니 6,8번을 사용합니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6337278106508876,
          "y": 0.1341579740915105,
          "w": 0.037869822485207094,
          "h": 0.09846456814055818
        },
        "questions": [
          {
            "pinId": "NEW_1774366796862",
            "label": "A접점",
            "answer": "6,8",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X 전원부",
        "componentId": "X",
        "guide": "릴레이 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.48698224852071004,
          "y": 0.6973753038555033,
          "w": 0.04852071005917158,
          "h": 0.12997322994553673
        },
        "questions": [
          {
            "pinId": "NEW_1774366835357",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR B접점",
        "componentId": "FR",
        "guide": "FR의 B접점입니다. A접점과 공통단자(8번)를 공유하므로 단자 연결에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6325443786982249,
          "y": 0.4256130957875627,
          "w": 0.03076923076923077,
          "h": 0.10240315086618046
        },
        "questions": [
          {
            "pinId": "NEW_1774366919506",
            "label": "B접점",
            "answer": "8,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR A접점",
        "componentId": "FR",
        "guide": "FR의 A접점입니다. B접점과 공통단자(8번)를 공유하므로 단자 연결에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7035502958579881,
          "y": 0.42955167851318504,
          "w": 0.037869822485207094,
          "h": 0.09058740268931348
        },
        "questions": [
          {
            "pinId": "NEW_1774366963812",
            "label": "A접점",
            "answer": "8,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 전원부",
        "componentId": "MC1",
        "guide": "MC1은 모터1 제어용 전자접촉기이며, 전원부는 6, 12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6313609467455621,
          "y": 0.7032831779439367,
          "w": 0.04497041420118342,
          "h": 0.12012677313148101
        },
        "questions": [
          {
            "pinId": "NEW_1774367035827",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "T 한시동작순시복귀 B접점",
        "componentId": "T",
        "guide": "한시동작순시복귀 B접점, 일정시간뒤 개방되며 타이머가 소자되면 즉시복귀합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7023668639053254,
          "y": 0.5949721529893227,
          "w": 0.03313609467455625,
          "h": 0.10043385950336936
        },
        "questions": [
          {
            "pinId": "NEW_1774367368914",
            "label": "B접점",
            "answer": "5,8",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 전원부",
        "componentId": "MC2",
        "guide": "MC2은 모터2 제어용 전자접촉기이며, 단자 6, 12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6988165680473373,
          "y": 0.7111603433951814,
          "w": 0.04852071005917158,
          "h": 0.12603464721991442
        },
        "questions": [
          {
            "pinId": "NEW_1774367415787",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "T 전원부",
        "componentId": "T",
        "guide": "타이머 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7662721893491125,
          "y": 0.7111603433951814,
          "w": 0.05443786982248522,
          "h": 0.1201267731314809
        },
        "questions": [
          {
            "pinId": "NEW_1774367455220",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 A접점",
        "componentId": "MC1",
        "guide": "MC1 A접점으로 4,10번을 사용합니다",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8443786982248521,
          "y": 0.12825010000307702,
          "w": 0.037869822485207094,
          "h": 0.10437244222899167
        },
        "questions": [
          {
            "pinId": "NEW_1774367530471",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 A접점",
        "componentId": "MC2",
        "guide": "MC2 A접점으로 4,10번을 사용합니다",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.9189349112426035,
          "y": 0.13218868272869935,
          "w": 0.031952662721893565,
          "h": 0.09255669405212466
        },
        "questions": [
          {
            "pinId": "NEW_1774367559424",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "RL 전원부",
        "componentId": "RL",
        "guide": "RL 램프는 모터1 동작 시 점등되며, GL과 공통(-)단자를 공유합니다.(배관작업시 전선 수가 줄어 편합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.840828402366864,
          "y": 0.7052524693067479,
          "w": 0.047337278106508784,
          "h": 0.11224960768023629
        },
        "questions": [
          {
            "pinId": "NEW_1774367622854",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "RL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "GL 전원부",
        "componentId": "GL",
        "guide": "GL 램프는 모터2 동작 시 점등되며, RL과 공통(-)단자를 공유합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.91301775147929,
          "y": 0.7032831779439367,
          "w": 0.041420118343195256,
          "h": 0.1122496076802364
        },
        "questions": [
          {
            "pinId": "NEW_1774367674791",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      }
    ]
  },
  
  "5": {
    "image": "./images/num5.png",
    "stages": [
      {
        "title": "EOCR B접점",
        "componentId": "EOCR",
        "guide": "EOCR B접점입니다. EOCR A접점과 회로가 이어져 있어서 왼쪽은 10번으로 쓰고 아랫쪽 EOCR A접점과 공통으로 단자를 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.10118343195266272,
          "y": 0.010092618234407212,
          "w": 0.05917159763313609,
          "h": 0.04726299270746792
        },
        "questions": [
          {
            "pinId": "NEW_1774444111475",
            "label": "B접점",
            "answer": "10,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR A접점",
        "componentId": "EOCR",
        "guide": "EOCR A접점입니다. 상단의 EOCR B접점과 10번 단자를 공통으로 사용하여 윗쪽 핀번호는 10번이 됩니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.13550295857988165,
          "y": 0.49256900212314225,
          "w": 0.03313609467455622,
          "h": 0.09846456814055815
        },
        "questions": [
          {
            "pinId": "NEW_1774444167366",
            "label": "A접점",
            "answer": "10,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR 전원부",
        "componentId": "EOCR",
        "guide": "EOCR에 전원을 넣어줍니다.(결선을 최단거리로 하기 위해 역순결선 하기도 합니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.05384615384615385,
          "y": 0.7091910520323702,
          "w": 0.04733727810650887,
          "h": 0.13588110403397025
        },
        "questions": [
          {
            "pinId": "NEW_1774444216049",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "YL 전원부",
        "componentId": "YL",
        "guide": "YL은 BZ와 -극을 공통으로 사용합니다. 부저와 공통 전원선(-)을 사용하여 결선하면 배관입선시 전선이 줄어 편해집니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.12248520710059171,
          "y": 0.7091910520323702,
          "w": 0.04970414201183432,
          "h": 0.12997322994553684
        },
        "questions": [
          {
            "pinId": "NEW_1774444333251",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "YL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "BZ(부저) 전원부",
        "componentId": "BZ",
        "guide": "YL와 -극을 공통으로 사용합니다. (결선시 10P 단자대에 YL,BZ 는 +,-,+ 3개로 표시하여 -는 공통단자로 사용합니다. 배관작업시 -극은 점프선으로 연결합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.19585798816568048,
          "y": 0.7170682174836149,
          "w": 0.05562130177514793,
          "h": 0.13194252130834794
        },
        "questions": [
          {
            "pinId": "NEW_1774444396825",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "BZ_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS 셀렉트스위치 A(자동)",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. *배관작업시 스위치 내부 N단자 2개를 서로 점프 연결한 후, M과 A,N단자를 단자대에서 맞게 결선합니다. (주의: 스위치 위치 왼쪽 M, 오른쪽 A)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.278698224852071,
          "y": 0.06720206775593095,
          "w": 0.036686390532544355,
          "h": 0.11028031631742514
        },
        "questions": [
          {
            "pinId": "NEW_1774444502167",
            "label": "A 자동",
            "answer": "N,A",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS 셀렉트스위치 M(수동)",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. 공통단자 N을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.48698224852071004,
          "y": 0.0809871072956091,
          "w": 0.029585798816568087,
          "h": 0.08074094587525771
        },
        "questions": [
          {
            "pinId": "NEW_1774444574314",
            "label": "SS M모드",
            "answer": "N,M",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS Floatless switch 수위(물,액체)감지용 부품 전원",
        "componentId": "FLS",
        "guide": "FLS 전원은 5,6번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.2644970414201183,
          "y": 0.7150989261208037,
          "w": 0.05088757396449706,
          "h": 0.12406535585710332
        },
        "questions": [
          {
            "pinId": "NEW_1774444641833",
            "label": "전원부",
            "answer": "5,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS E1,E2,E3",
        "componentId": "FLS",
        "guide": "E1·E2·E3는 FLS 7·8·1번 단자에 연결됩니다. (주의) E3에는 접지표시가 있습니다. 도면에서 접지 기호가 표시된 부분은 공통 접지로 결선합니다. 주결선에 접지와 모두 연결되게 결선하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.31420118343195264,
          "y": 0.8844579833225638,
          "w": 0.06745562130177518,
          "h": 0.04923228407027913
        },
        "questions": [
          {
            "pinId": "NEW_1774444901531",
            "label": "E1,E2,E3",
            "answer": "7,8,1",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS A접점",
        "componentId": "FLS",
        "guide": "FLS A접점은 3,4번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.414792899408284,
          "y": 0.36850364626603893,
          "w": 0.03905325443786983,
          "h": 0.10437244222899167
        },
        "questions": [
          {
            "pinId": "NEW_1774444978529",
            "label": "A접점",
            "answer": "3,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X 전원부",
        "componentId": "X",
        "guide": "릴레이 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4136094674556213,
          "y": 0.7229760915720483,
          "w": 0.046153846153846156,
          "h": 0.1161881904058587
        },
        "questions": [
          {
            "pinId": "NEW_1774445344883",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "T 전원부",
        "componentId": "T",
        "guide": "타이머 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4834319526627219,
          "y": 0.7288839656604819,
          "w": 0.04615384615384621,
          "h": 0.1161881904058586
        },
        "questions": [
          {
            "pinId": "NEW_1774445395155",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB0 넘버링",
        "componentId": "PB0",
        "guide": "PB0는 B접점으로 평상시 도통, 누르면 개방됩니다. PB1과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.48698224852071004,
          "y": 0.1932367149758454,
          "w": 0.029585798816568087,
          "h": 0.10043385950336933
        },
        "questions": [
          {
            "pinId": "NEW_1774445548908",
            "label": "B접점",
            "answer": "C,N",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB0_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB1 넘버링",
        "componentId": "PB1",
        "guide": "PB1은 A접점으로 평상시 개방, 누르면 통전됩니다. PB0과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4928994082840237,
          "y": 0.36850364626603893,
          "w": 0.03313609467455625,
          "h": 0.0984645681405582
        },
        "questions": [
          {
            "pinId": "NEW_1774445641268",
            "label": "A접점",
            "answer": "N,O",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB1_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "X A접점",
        "componentId": "X",
        "guide": "릴레이 A접점입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5650887573964497,
          "y": 0.3724422289916613,
          "w": 0.028402366863905293,
          "h": 0.10240315086618046
        },
        "questions": [
          {
            "pinId": "NEW_1774445855802",
            "label": "A접점",
            "answer": "1,3",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "타이머 한시동작순시복귀 B접점",
        "componentId": "T",
        "guide": "오른쪽 T A접점과 회로상 끊김없이 이어져있어 핀번호 8번을 공통으로 사용합니다. 윗쪽에 8번 아랫쪽에 5번이라 씁니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5615384615384615,
          "y": 0.5536170343702883,
          "w": 0.026035502958579926,
          "h": 0.08861811132650232
        },
        "questions": [
          {
            "pinId": "NEW_1774446174814",
            "label": "B접점",
            "answer": "8,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "타이머 한시동작순시복귀 A접점",
        "componentId": "T",
        "guide": "B접점과 8번을 공통으로 쓰기 때문에 윗부분을 8번, 아랫부분은 6번이라 씁니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7745562130177515,
          "y": 0.5477091602818548,
          "w": 0.03668639053254441,
          "h": 0.09649527677774705
        },
        "questions": [
          {
            "pinId": "NEW_1774446287514",
            "label": "A접점",
            "answer": "8,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR B접점",
        "componentId": "FR",
        "guide": "FR의 B접점입니다. A접점과 공통단자(8번)를 공유하므로 단자 연결에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.6289940828402367,
          "y": 0.5595249084587218,
          "w": 0.02721893491124261,
          "h": 0.0787716545124465
        },
        "questions": [
          {
            "pinId": "NEW_1774446369261",
            "label": "B접점",
            "answer": "8,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR A접점",
        "componentId": "FR",
        "guide": "FR의 A접점입니다. B접점과 공통단자(8번)를 공유합니다. 윗부분을 8번이라 씁니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7011834319526628,
          "y": 0.5477091602818548,
          "w": 0.037869822485207094,
          "h": 0.10043385950336936
        },
        "questions": [
          {
            "pinId": "NEW_1774446462669",
            "label": "A접점",
            "answer": "8,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR 전원부",
        "componentId": "FR",
        "guide": "FR 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5508875739644971,
          "y": 0.7249453829348596,
          "w": 0.047337278106508895,
          "h": 0.12209606449429211
        },
        "questions": [
          {
            "pinId": "NEW_1774446512641",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 전원부",
        "componentId": "MC1",
        "guide": "MC1은 모터1 제어용 전자접촉기이며, 전원부는 6,12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6254437869822486,
          "y": 0.7249453829348596,
          "w": 0.04497041420118342,
          "h": 0.1181574817686698
        },
        "questions": [
          {
            "pinId": "NEW_1774446563782",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 전원부",
        "componentId": "MC2",
        "guide": "MC2은 모터2 제어용 전자접촉기이며, 전원부는 단자 6,12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6976331360946746,
          "y": 0.7288839656604819,
          "w": 0.04497041420118342,
          "h": 0.11224960768023629
        },
        "questions": [
          {
            "pinId": "NEW_1774446613557",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 A접점",
        "componentId": "MC1",
        "guide": "MC1 A접점으로 4,10번을 사용합니다",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8467455621301775,
          "y": 0.07901781593279793,
          "w": 0.03313609467455625,
          "h": 0.09452598541493586
        },
        "questions": [
          {
            "pinId": "NEW_1774446667227",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 A접점",
        "componentId": "MC2",
        "guide": "MC2 A접점으로 4,10번을 사용합니다",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.9189349112426035,
          "y": 0.0750792332071756,
          "w": 0.03431952662721893,
          "h": 0.10043385950336933
        },
        "questions": [
          {
            "pinId": "NEW_1774446716095",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "RL 전원부",
        "componentId": "RL",
        "guide": "RL 램프는 모터1 동작 시 점등되며, GL과 공통(-)단자를 공유합니다.(배관작업시 전선 수가 줄어 편합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8313609467455622,
          "y": 0.7091910520323702,
          "w": 0.0556213017751479,
          "h": 0.12997322994553684
        },
        "questions": [
          {
            "pinId": "NEW_1774446777057",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "RL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "GL 전원부",
        "componentId": "GL",
        "guide": "GL 램프는 모터2 동작 시 점등되며, RL과 공통(-)단자를 공유합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.9118343195266272,
          "y": 0.7210068002092372,
          "w": 0.04497041420118342,
          "h": 0.10831102495461398
        },
        "questions": [
          {
            "pinId": "NEW_1774446820053",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "새 단계",
        "componentId": "NEW",
        "guide": "설명 문구를 입력하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": null,
        "questions": [],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      }
    ]
  },
  
  "6": {
    "image": "./images/num6.png",
    "stages": [
      {
        "title": "EOCR B접점",
        "componentId": "EOCR",
        "guide": "EOCR B접점입니다. EOCR A접점과 회로가 이어져 있어서 왼쪽은 10번으로 쓰고 아랫쪽 EOCR A접점과 공통으로 단자를 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.11065088757396449,
          "y": 0.061294193667497464,
          "w": 0.05207100591715977,
          "h": 0.059078740884334895
        },
        "questions": [
          {
            "pinId": "NEW_1774970882949",
            "label": "B접점",
            "answer": "10,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR A접점",
        "componentId": "EOCR",
        "guide": "EOCR A접점입니다. 상단의 EOCR B접점과 10번 단자를 공통으로 사용하여 윗쪽 핀번호는 10번이 됩니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.1437869822485207,
          "y": 0.47681467122065296,
          "w": 0.02840236686390532,
          "h": 0.10437244222899161
        },
        "questions": [
          {
            "pinId": "NEW_1774970944855",
            "label": "A접점",
            "answer": "10,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR 전원부",
        "componentId": "EOCR",
        "guide": "EOCR에 전원을 넣어줍니다.(결선을 최단거리로 하기 위해 역순결선 하기도 합니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.058579881656804736,
          "y": 0.7013138865811256,
          "w": 0.04733727810650887,
          "h": 0.1201267731314809
        },
        "questions": [
          {
            "pinId": "NEW_1774971010298",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "YL 전원부",
        "componentId": "YL",
        "guide": "YL은 BZ와 -극을 공통으로 사용합니다. 부저와 공통 전원선(-)을 사용하여 결선하면 배관입선시 전선이 줄어 편해집니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.13076923076923078,
          "y": 0.7131296347579925,
          "w": 0.046153846153846156,
          "h": 0.10634173359180288
        },
        "questions": [
          {
            "pinId": "NEW_1774971075899",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "YL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "BZ 전원부",
        "componentId": "BZ",
        "guide": "YL와 -극을 공통으로 사용합니다. (결선시 10P 단자대에 YL,BZ 는 +,-,+ 3개로 표시하여 -는 공통단자로 사용합니다. 배관작업시 -극은 점프선으로 연결합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.19940828402366864,
          "y": 0.7091910520323702,
          "w": 0.05443786982248519,
          "h": 0.1142188990430475
        },
        "questions": [
          {
            "pinId": "NEW_1774971126680",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "BZ_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS 셀렉트스위치 A(자동)",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. *배관작업시 스위치 내부 N단자 2개를 서로 점프 연결한 후, M과 A,N단자를 단자대에서 맞게 결선합니다. (주의: 스위치 위치 왼쪽 M, 오른쪽 A)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.28579881656804734,
          "y": 0.12825010000307702,
          "w": 0.033136094674556194,
          "h": 0.08467952860088002
        },
        "questions": [
          {
            "pinId": "NEW_1774971218086",
            "label": "A 자동",
            "answer": "N,A",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS 셀렉트스위치 M(수동)",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. 공통단자 N을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4928994082840237,
          "y": 0.12037293455183236,
          "w": 0.031952662721893454,
          "h": 0.08664881996369118
        },
        "questions": [
          {
            "pinId": "NEW_1774971297496",
            "label": "M 수동 모드",
            "answer": "N,M",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS Floatless switch 수위(물,액체)감지용 부품 전원",
        "componentId": "FLS",
        "guide": "FLS 전원은 5,6번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.2739644970414201,
          "y": 0.7111603433951814,
          "w": 0.043786982248520734,
          "h": 0.11028031631742508
        },
        "questions": [
          {
            "pinId": "NEW_1774971349324",
            "label": "전원부",
            "answer": "5,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS E1,E2,E3",
        "componentId": "FLS",
        "guide": "E1·E2·E3는 FLS 7·8·1번 단자에 연결됩니다. (주의) E3에는 접지표시가 있습니다. 도면에서 접지 기호가 표시된 부분은 공통 접지로 결선합니다. 주결선에 접지와 모두 연결되게 결선하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.32366863905325444,
          "y": 0.8687036524200744,
          "w": 0.05917159763313612,
          "h": 0.05514015815871265
        },
        "questions": [
          {
            "pinId": "NEW_1774971427856",
            "label": "E1,E2,E3",
            "answer": "7,8,1",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS A접점",
        "componentId": "FLS",
        "guide": "FLS A접점은 3,4번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4242603550295858,
          "y": 0.41182805624788454,
          "w": 0.03076923076923077,
          "h": 0.1161881904058586
        },
        "questions": [
          {
            "pinId": "NEW_1774971480970",
            "label": "A접점",
            "answer": "3,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X 전원부",
        "componentId": "X",
        "guide": "릴레이 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4171597633136095,
          "y": 0.7013138865811256,
          "w": 0.04378698224852068,
          "h": 0.13194252130834794
        },
        "questions": [
          {
            "pinId": "NEW_1774971534528",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB0 넘버링",
        "componentId": "PB0",
        "guide": "PB0는 B접점으로 평상시 도통, 누르면 개방됩니다. PB1과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4928994082840237,
          "y": 0.2542847472229915,
          "w": 0.026035502958579926,
          "h": 0.0787716545124465
        },
        "questions": [
          {
            "pinId": "NEW_1774971620999",
            "label": "B접점",
            "answer": "C,N",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB0_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB1 넘버링",
        "componentId": "PB1",
        "guide": "PB1은 A접점으로 평상시 개방, 누르면 통전됩니다. PB0과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4940828402366864,
          "y": 0.42167451306194037,
          "w": 0.03550295857988167,
          "h": 0.09452598541493584
        },
        "questions": [
          {
            "pinId": "NEW_1774971675244",
            "label": "A접점",
            "answer": "N,O",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB1_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "T A접점",
        "componentId": "T",
        "guide": "타이머 A접점입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.572189349112426,
          "y": 0.4197052216991292,
          "w": 0.02485207100591713,
          "h": 0.09452598541493579
        },
        "questions": [
          {
            "pinId": "NEW_1774971769026",
            "label": "A접점",
            "answer": "1,3",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X  릴레이 B접점",
        "componentId": "X",
        "guide": "릴레이 B접점입니다. 우측상단 릴레이와 회로가 끊기지 않고 이어지므로 넘버링은 윗쪽을 공통단자 1이라고 쓰고 단자를 공유합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4928994082840237,
          "y": 0.6008800270777562,
          "w": 0.028402366863905293,
          "h": 0.09058740268931353
        },
        "questions": [
          {
            "pinId": "NEW_1774972045274",
            "label": "B접점",
            "answer": "1,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "릴레이 A접점",
        "componentId": "X",
        "guide": "릴레이 A접점입니다. 좌측하단 릴레이와 회로가 끊기지 않고 이어지므로 넘버링은 아랫쪽을 1이라고 쓰고 단자를 공유합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6313609467455621,
          "y": 0.11643435182621004,
          "w": 0.037869822485207094,
          "h": 0.10437244222899167
        },
        "questions": [
          {
            "pinId": "NEW_1774972134257",
            "label": "A접점",
            "answer": "3,1",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "T 전원부",
        "componentId": "T",
        "guide": "타이머 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4905325443786982,
          "y": 0.7210068002092372,
          "w": 0.04023668639053257,
          "h": 0.10831102495461398
        },
        "questions": [
          {
            "pinId": "NEW_1774972182646",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "타이머 한시동작순시복귀 A접점",
        "componentId": "T",
        "guide": "B접점과 8번을 공통으로 쓰기 때문에 윗부분을 8번, 아랫부분은 6번이라 씁니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.636094674556213,
          "y": 0.5989107357149451,
          "w": 0.035502958579881616,
          "h": 0.09255669405212463
        },
        "questions": [
          {
            "pinId": "NEW_1774972296275",
            "label": "A접점",
            "answer": "8,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "타이머 한시동작순시복귀 B접점",
        "componentId": "T",
        "guide": "왼쪽 T A접점과 회로상 끊김없이 이어져있어 핀번호 8번을 공통으로 사용합니다. 윗쪽에 8번 아랫쪽에 5번이라 씁니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8455621301775148,
          "y": 0.42758238715037383,
          "w": 0.029585798816568087,
          "h": 0.07877165451244655
        },
        "questions": [
          {
            "pinId": "NEW_1774972407660",
            "label": "B접점",
            "answer": "8,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR 전원부",
        "componentId": "FR",
        "guide": "FR 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6289940828402367,
          "y": 0.7170682174836149,
          "w": 0.04378698224852062,
          "h": 0.11028031631742508
        },
        "questions": [
          {
            "pinId": "NEW_1774972471900",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR B접점",
        "componentId": "FR",
        "guide": "FR의 B접점입니다. A접점과 공통단자(8번)를 공유하므로 단자 연결에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7023668639053254,
          "y": 0.42167451306194037,
          "w": 0.029585798816568087,
          "h": 0.09649527677774705
        },
        "questions": [
          {
            "pinId": "NEW_1774972545634",
            "label": "B접점",
            "answer": "8,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR A접점",
        "componentId": "FR",
        "guide": "FR의 A접점입니다. B접점과 공통단자(8번)를 공유합니다. 윗부분을 8번이라 씁니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.9201183431952663,
          "y": 0.4315209698759962,
          "w": 0.035502958579881616,
          "h": 0.08074094587525771
        },
        "questions": [
          {
            "pinId": "NEW_1774972616401",
            "label": "A접점",
            "answer": "8,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 전원부",
        "componentId": "MC1",
        "guide": "MC1은 모터1 제어용 전자접촉기이며, 전원부는 6,12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7047337278106509,
          "y": 0.7091910520323702,
          "w": 0.04023668639053257,
          "h": 0.1181574817686698
        },
        "questions": [
          {
            "pinId": "NEW_1774972681066",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "RL 전원부",
        "componentId": "RL",
        "guide": "RL 램프는 모터1 동작 시 점등되며, GL과 공통(-)단자를 공유합니다.(배관작업시 전선 수가 줄어 편합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7710059171597633,
          "y": 0.7131296347579925,
          "w": 0.04615384615384621,
          "h": 0.10634173359180288
        },
        "questions": [
          {
            "pinId": "NEW_1774972753109",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "RL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "GL 전원부",
        "componentId": "GL",
        "guide": "GL 램프는 모터2 동작 시 점등되며, RL과 공통(-)단자를 공유합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8431952662721893,
          "y": 0.7072217606695591,
          "w": 0.04497041420118342,
          "h": 0.11224960768023629
        },
        "questions": [
          {
            "pinId": "NEW_1774972800844",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 전원부",
        "componentId": "MC2",
        "guide": "MC2은 모터2 제어용 전자접촉기이며, 전원부는 단자 6,12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.91301775147929,
          "y": 0.7111603433951814,
          "w": 0.04497041420118342,
          "h": 0.1142188990430475
        },
        "questions": [
          {
            "pinId": "NEW_1774972852833",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "새 단계",
        "componentId": "NEW",
        "guide": "설명 문구를 입력하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": null,
        "questions": [],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      }
    ]
  },
  
  "7": {
    "image": "./images/num7.png",
    "stages": [
      {
        "title": "EOCR B접점",
        "componentId": "EOCR",
        "guide": "EOCR B접점입니다. EOCR A접점과 회로가 이어져 있어서 왼쪽은 10번으로 쓰고 아랫쪽 EOCR A접점과 공통으로 단자를 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.11301775147928994,
          "y": 0.061294193667497464,
          "w": 0.04852071005917161,
          "h": 0.05710944952152374
        },
        "questions": [
          {
            "pinId": "NEW_1775135594831",
            "label": "B접점",
            "answer": "10,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR A접점",
        "componentId": "EOCR",
        "guide": "EOCR A접점입니다. 상단의 EOCR B접점과 10번 단자를 공통으로 사용하여 윗쪽 핀번호는 10번이 됩니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.142603550295858,
          "y": 0.47484537985784175,
          "w": 0.02840236686390532,
          "h": 0.10240315086618051
        },
        "questions": [
          {
            "pinId": "NEW_1775135652303",
            "label": "A접점",
            "answer": "10,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR 전원부",
        "componentId": "EOCR",
        "guide": "EOCR에 전원을 넣어줍니다.(결선을 최단거리로 하기 위해 역순결선 하기도 합니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.06331360946745562,
          "y": 0.7052524693067479,
          "w": 0.04260355029585798,
          "h": 0.12406535585710332
        },
        "questions": [
          {
            "pinId": "NEW_1775135704814",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "YL 전원부",
        "componentId": "YL",
        "guide": "YL은 BZ와 -극을 공통으로 사용합니다. 부저와 공통 전원선(-)을 사용하여 결선하면 배관입선시 전선이 줄어 편해집니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.1378698224852071,
          "y": 0.7032831779439367,
          "w": 0.035502958579881644,
          "h": 0.12997322994553684
        },
        "questions": [
          {
            "pinId": "NEW_1775135749873",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "YL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "BZ 전원부",
        "componentId": "BZ",
        "guide": "YL와 -극을 공통으로 사용합니다. (결선시 10P 단자대에 YL,BZ 는 +,-,+ 3개로 표시하여 -는 공통단자로 사용합니다. 배관작업시 -극은 점프선으로 연결합니다.)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.2017751479289941,
          "y": 0.7170682174836149,
          "w": 0.05088757396449706,
          "h": 0.11421889904304738
        },
        "questions": [
          {
            "pinId": "NEW_1775135806770",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "BZ_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS 셀렉트스위치 A(자동)",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. 10P 단자대에 M,N,A 라고 적고 올바르게 연결하면 됩니다. N은 공통단자로 이용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4254437869822485,
          "y": 0.12825010000307702,
          "w": 0.02840236686390535,
          "h": 0.08271023723806886
        },
        "questions": [
          {
            "pinId": "NEW_1775136082541",
            "label": "A 자동모드",
            "answer": "N,A",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS 셀렉트스위치 M(수동)",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. 10P 단자대 M,N,A 중 N,M에 알맞게 결선합니다",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.49644970414201184,
          "y": 0.1243115172774547,
          "w": 0.022485207100591764,
          "h": 0.08271023723806885
        },
        "questions": [
          {
            "pinId": "NEW_1775136234168",
            "label": "M 수동모드",
            "answer": "N,M",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB0",
        "componentId": "PB0",
        "guide": "PB0는 B접점으로 평상시 도통, 누르면 개방됩니다. PB1과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4881656804733728,
          "y": 0.24049970768331333,
          "w": 0.029585798816568032,
          "h": 0.0905874026893135
        },
        "questions": [
          {
            "pinId": "NEW_1775136995245",
            "label": "B접점",
            "answer": "C,N",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB0_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB1",
        "componentId": "PB1",
        "guide": "PB1은 A접점으로 평상시 개방, 누르면 통전됩니다. PB0과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.49644970414201184,
          "y": 0.41773593033631806,
          "w": 0.03313609467455625,
          "h": 0.10240315086618046
        },
        "questions": [
          {
            "pinId": "NEW_1775137107256",
            "label": "A접점",
            "answer": "N,O",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB1_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS Floatless switch 수위(물,액체)감지용 부품 전원",
        "componentId": "FLS",
        "guide": "FLS 전원은 5,6번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.27633136094674554,
          "y": 0.6993445952183144,
          "w": 0.042603550295857995,
          "h": 0.12406535585710332
        },
        "questions": [
          {
            "pinId": "NEW_1775137681462",
            "label": "전원부",
            "answer": "5,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS E1,E2,E3",
        "componentId": "FLS",
        "guide": "E1·E2·E3는 FLS 7·8·1번 단자에 연결됩니다. (주의) E3에는 접지표시가 있습니다. 도면에서 접지 기호가 표시된 부분은 공통 접지로 결선합니다. 주결선에 접지와 모두 연결되게 결선하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.321301775147929,
          "y": 0.8746115265085079,
          "w": 0.05680473372781064,
          "h": 0.05120157543309023
        },
        "questions": [
          {
            "pinId": "NEW_1775137783352",
            "label": "E1,E2,E3",
            "answer": "7,8,1",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS A접점",
        "componentId": "FLS",
        "guide": "FLS A접점은 3,4번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.42189349112426033,
          "y": 0.42758238715037383,
          "w": 0.03195266272189351,
          "h": 0.08861811132650238
        },
        "questions": [
          {
            "pinId": "NEW_1775137834102",
            "label": "A접점",
            "answer": "3,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR 전원부",
        "componentId": "FR",
        "guide": "FR 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.41834319526627217,
          "y": 0.7072217606695591,
          "w": 0.037869822485207094,
          "h": 0.1181574817686698
        },
        "questions": [
          {
            "pinId": "NEW_1775137903480",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X A접점",
        "componentId": "X",
        "guide": "릴레이 A접점입니다. 1,3 혹은 6,8을 씁니다.(이번 튜토리얼에선 1,3을 씁니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5674556213017752,
          "y": 0.42955167851318504,
          "w": 0.028402366863905293,
          "h": 0.08074094587525765
        },
        "questions": [
          {
            "pinId": "NEW_1775138033410",
            "label": "A접점",
            "answer": "1,3",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X 전원부",
        "componentId": "X",
        "guide": "릴레이 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4881656804733728,
          "y": 0.7210068002092372,
          "w": 0.04023668639053252,
          "h": 0.10831102495461398
        },
        "questions": [
          {
            "pinId": "NEW_1775138085708",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "릴레이 A접점",
        "componentId": "X",
        "guide": "또 다른 릴레이 A접점입니다. \"8핀 릴레이 내부에는 2세트의 접점이 있습니다.\n1번-3번(A접점)을 사용했다면, 다음엔 남은 6번-8번을 써야 합니다.\n※ 주의: 같은 핀 번호를 중복해서 사용하지 마세요!\"",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.636094674556213,
          "y": 0.13809655681713284,
          "w": 0.029585798816567976,
          "h": 0.0689251976983907
        },
        "questions": [
          {
            "pinId": "NEW_1775138632480",
            "label": "A접점",
            "answer": "6,8",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR B접점",
        "componentId": "FR",
        "guide": "FR의 B접점입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6313609467455621,
          "y": 0.42955167851318504,
          "w": 0.024852071005917242,
          "h": 0.08271023723806886
        },
        "questions": [
          {
            "pinId": "NEW_1775138728078",
            "label": "B접점",
            "answer": "5,8",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "T 전원부",
        "componentId": "T",
        "guide": "타이머 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6278106508875739,
          "y": 0.7111603433951814,
          "w": 0.04023668639053257,
          "h": 0.11224960768023629
        },
        "questions": [
          {
            "pinId": "NEW_1775138799472",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "타이머 한시동작순시복귀 B접점",
        "componentId": "T",
        "guide": "오른쪽 T A접점과 회로상 끊김없이 이어져있어 핀번호 8번을 공통으로 사용합니다. 윗쪽에 8번 아랫쪽에 5번이라 씁니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7047337278106509,
          "y": 0.6048186098033785,
          "w": 0.02485207100591713,
          "h": 0.08861811132650244
        },
        "questions": [
          {
            "pinId": "NEW_1775138897261",
            "label": "B접점",
            "answer": "8,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "타이머 한시동작순시복귀 A접점",
        "componentId": "T",
        "guide": "B접점과 8번을 공통으로 쓰기 때문에 윗부분을 8번, 아랫부분은 6번이라 씁니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7769230769230769,
          "y": 0.6087571925290008,
          "w": 0.031952662721893454,
          "h": 0.08271023723806892
        },
        "questions": [
          {
            "pinId": "NEW_1775138941572",
            "label": "A접점",
            "answer": "8,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 전원부",
        "componentId": "MC1",
        "guide": "MC1은 모터1 제어용 전자접촉기이며, 전원부는 6,12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7011834319526628,
          "y": 0.7091910520323702,
          "w": 0.0366863905325443,
          "h": 0.1142188990430475
        },
        "questions": [
          {
            "pinId": "NEW_1775139013827",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 전원부",
        "componentId": "MC2",
        "guide": "MC2은 모터2 제어용 전자접촉기이며, 전원부는 단자 6,12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7662721893491125,
          "y": 0.7170682174836149,
          "w": 0.0461538461538461,
          "h": 0.10240315086618046
        },
        "questions": [
          {
            "pinId": "NEW_1775139054544",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 A접점",
        "componentId": "MC1",
        "guide": "MC1 A접점입니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8384615384615385,
          "y": 0.12234222591464353,
          "w": 0.037869822485207094,
          "h": 0.09846456814055818
        },
        "questions": [
          {
            "pinId": "NEW_1775139196495",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 A접점",
        "componentId": "MC2",
        "guide": "MC2 A접점입니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.9165680473372781,
          "y": 0.13021939136588817,
          "w": 0.03076923076923077,
          "h": 0.09058740268931353
        },
        "questions": [
          {
            "pinId": "NEW_1775139231531",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "RL 전원부",
        "componentId": "RL",
        "guide": "RL 램프는 모터1 동작 시 점등되며, GL과 공통(-)단자를 공유합니다.(배관작업시 전선 수가 줄어 편합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.840828402366864,
          "y": 0.7170682174836149,
          "w": 0.04023668639053246,
          "h": 0.11421889904304738
        },
        "questions": [
          {
            "pinId": "NEW_1775139280530",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "RL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "GL 전원부",
        "componentId": "GL",
        "guide": "GL 램프는 모터2 동작 시 점등되며, RL과 공통(-)단자를 공유합니다.(10핀 단자대에 +,-,+ 이라고 쓰고 하단에 RLGL 써서 구분하세요)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.9071005917159763,
          "y": 0.7210068002092372,
          "w": 0.047337278106508895,
          "h": 0.10831102495461398
        },
        "questions": [
          {
            "pinId": "NEW_1775139398301",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "새 단계",
        "componentId": "NEW",
        "guide": "설명 문구를 입력하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": null,
        "questions": [],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      }
    ]
  },
  
  "8": {
    "image": "./images/num8.png",
    "stages": [
      {
        "title": "EOCR B접점",
        "componentId": "EOCR",
        "guide": "EOCR B접점입니다. EOCR A접점과 회로가 이어져 있어서 왼쪽은 10번으로 쓰고 아랫쪽 EOCR A접점과 공통으로 단자를 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.10946745562130178,
          "y": 0.061294193667497464,
          "w": 0.05443786982248519,
          "h": 0.059078740884334895
        },
        "questions": [
          {
            "pinId": "NEW_1775140885015",
            "label": "B접점",
            "answer": "10,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR A접점",
        "componentId": "EOCR",
        "guide": "EOCR A접점입니다. 상단의 EOCR B접점과 10번 단자를 공통으로 사용하여 윗쪽 핀번호는 10번이 됩니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.1366863905325444,
          "y": 0.6067879011661897,
          "w": 0.033136094674556194,
          "h": 0.08074094587525771
        },
        "questions": [
          {
            "pinId": "NEW_1775140929594",
            "label": "A접점",
            "answer": "10,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR 전원부",
        "componentId": "EOCR",
        "guide": "EOCR에 전원을 넣어줍니다.(결선을 최단거리로 하기 위해 역순결선 하기도 합니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.06094674556213018,
          "y": 0.7131296347579925,
          "w": 0.04378698224852071,
          "h": 0.12997322994553684
        },
        "questions": [
          {
            "pinId": "NEW_1775140972149",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "BZ 전원부",
        "componentId": "BZ",
        "guide": "BZ 전원부입니다 (10핀 단자대에 + - 라고 쓰고 하단에 BZ 쓴 후에 맞게 결선합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.12958579881656804,
          "y": 0.7229760915720483,
          "w": 0.05325443786982251,
          "h": 0.09649527677774705
        },
        "questions": [
          {
            "pinId": "NEW_1775141082144",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "BZ_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS 셀렉트스위치 A(자동)",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. 10P 단자대에 M,N,A 라고 적고 올바르게 연결하면 됩니다. N은 공통단자로 이용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.35798816568047337,
          "y": 0.13021939136588817,
          "w": 0.02721893491124261,
          "h": 0.0866488199636912
        },
        "questions": [
          {
            "pinId": "NEW_1775141166779",
            "label": "A 자동모드",
            "answer": "N,A",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS 셀렉트스위치 M(수동)",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. 10P 단자대 M,N,A 중 N,M에 알맞게 결선합니다",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5615384615384615,
          "y": 0.13218868272869935,
          "w": 0.028402366863905293,
          "h": 0.08074094587525768
        },
        "questions": [
          {
            "pinId": "NEW_1775141221030",
            "label": "M 수동모드",
            "answer": "N,M",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS A접점",
        "componentId": "FLS",
        "guide": "FLS A접점은 3,4번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.35325443786982247,
          "y": 0.42955167851318504,
          "w": 0.02840236686390535,
          "h": 0.08074094587525765
        },
        "questions": [
          {
            "pinId": "NEW_1775141289769",
            "label": "A접점",
            "answer": "3,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS Floatless switch 수위(물,액체)감지용 부품 전원",
        "componentId": "FLS",
        "guide": "FLS 전원은 5,6번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.2017751479289941,
          "y": 0.7111603433951814,
          "w": 0.04733727810650887,
          "h": 0.12406535585710332
        },
        "questions": [
          {
            "pinId": "NEW_1775141351006",
            "label": "전원부",
            "answer": "5,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS E1,E2,E3",
        "componentId": "FLS",
        "guide": "단자대에 E1,E2,E3 라고 쓰고 FLS 7,8,1과 연결합니다.(주의) E3에는 접지표시가 있습니다. 도면에서 접지 기호가 표시된 부분은 공통 접지로 결선합니다. 주결선에 접지와 모두 연결되게 결선하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.24911242603550296,
          "y": 0.8785501092341302,
          "w": 0.061538461538461514,
          "h": 0.04726299270746792
        },
        "questions": [
          {
            "pinId": "NEW_1775141491535",
            "label": "E1·E2·E3",
            "answer": "7,8,1",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X 전원부",
        "componentId": "X",
        "guide": "릴레이 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.34615384615384615,
          "y": 0.7150989261208037,
          "w": 0.041420118343195256,
          "h": 0.1142188990430475
        },
        "questions": [
          {
            "pinId": "NEW_1775141531063",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR 전원부",
        "componentId": "FR",
        "guide": "플리커 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4195266272189349,
          "y": 0.719037508846426,
          "w": 0.036686390532544355,
          "h": 0.10043385950336936
        },
        "questions": [
          {
            "pinId": "NEW_1775141570272",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR의 B접점",
        "componentId": "FR",
        "guide": "FR의 B접점입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.49171597633136094,
          "y": 0.5969414443521339,
          "w": 0.02840236686390535,
          "h": 0.10240315086618046
        },
        "questions": [
          {
            "pinId": "NEW_1775141635252",
            "label": "B접점",
            "answer": "5,8",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "YL 전원부",
        "componentId": "YL",
        "guide": "YL 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": null,
        "questions": [
          {
            "pinId": "NEW_1775141678406",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "YL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB0",
        "componentId": "PB0",
        "guide": "PB0는 B접점으로 평상시 도통, 누르면 개방됩니다. 단자대에 C,N,O 그리고 하단에 PB0,PB1라고 씁니다.  PB1과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5591715976331361,
          "y": 0.24640758177174682,
          "w": 0.02721893491124261,
          "h": 0.08664881996369117
        },
        "questions": [
          {
            "pinId": "NEW_1775142020172",
            "label": "B접점",
            "answer": "C,N",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB0_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB1",
        "componentId": "PB1",
        "guide": "PB1 A접점 단자대에 C,N,O 하단에 PB0,PB1라고 쓰고 알맞게 결선합니다. PB0과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5650887573964497,
          "y": 0.43349026123880735,
          "w": 0.03313609467455625,
          "h": 0.08271023723806886
        },
        "questions": [
          {
            "pinId": "NEW_1775142123568",
            "label": "A접점",
            "answer": "N,O",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB1_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "T A접점",
        "componentId": "T",
        "guide": "타이머 A접점입니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6337278106508876,
          "y": 0.4236438044247515,
          "w": 0.03313609467455625,
          "h": 0.0945259854149359
        },
        "questions": [
          {
            "pinId": "NEW_1775142173317",
            "label": "A접점",
            "answer": "1,3",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X B접점",
        "componentId": "X",
        "guide": "릴레이 B접점입니다. 우측 상단에 릴레이A접점과 끊김 없이 이어져 있으므로 공통단자로 1번을 사용하고 핀번호는 윗쪽을 1번 아래는 4번이 됩니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5627218934911242,
          "y": 0.6067879011661897,
          "w": 0.022485207100591764,
          "h": 0.09452598541493584
        },
        "questions": [
          {
            "pinId": "NEW_1775142346607",
            "label": "B접점",
            "answer": "1,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X A접점",
        "componentId": "X",
        "guide": "릴레이 A접점. 아래 릴레이와 끊김없이 이어져 있어 공통단자 1을 사용하고 핀번호는 윗쪽을 3번 아래를 1번이라고 씁니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7,
          "y": 0.1243115172774547,
          "w": 0.03668639053254441,
          "h": 0.10043385950336932
        },
        "questions": [
          {
            "pinId": "NEW_1775142438176",
            "label": "A접점",
            "answer": "3,1",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "T 전원부",
        "componentId": "T",
        "guide": "타이머 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.5568047337278107,
          "y": 0.7150989261208037,
          "w": 0.041420118343195256,
          "h": 0.12406535585710332
        },
        "questions": [
          {
            "pinId": "NEW_1775142475643",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "타이머 한시동작순시복귀 B접점",
        "componentId": "T",
        "guide": "타이머 한시동작순시복귀 B접점입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7745562130177515,
          "y": 0.42758238715037383,
          "w": 0.026035502958579926,
          "h": 0.0984645681405582
        },
        "questions": [
          {
            "pinId": "NEW_1775142584035",
            "label": "B접점",
            "answer": "5,8",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 전원부",
        "componentId": "MC1",
        "guide": "MC1은 모터1 제어용 전자접촉기이며, 전원부는 6,12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6940828402366864,
          "y": 0.7170682174836149,
          "w": 0.0461538461538461,
          "h": 0.11224960768023629
        },
        "questions": [
          {
            "pinId": "NEW_1775142621564",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 전원부",
        "componentId": "MC2",
        "guide": "MC2은 모터2 제어용 전자접촉기이며, 전원부는 단자 6,12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7662721893491125,
          "y": 0.719037508846426,
          "w": 0.0461538461538461,
          "h": 0.10043385950336936
        },
        "questions": [
          {
            "pinId": "NEW_1775142655277",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 A접점",
        "componentId": "MC1",
        "guide": "MC1 A접점입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8443786982248521,
          "y": 0.12825010000307702,
          "w": 0.031952662721893454,
          "h": 0.096495276777747
        },
        "questions": [
          {
            "pinId": "NEW_1775142693146",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 A접점",
        "componentId": "MC2",
        "guide": "MC2 A접점입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.9106508875739645,
          "y": 0.1243115172774547,
          "w": 0.03905325443786978,
          "h": 0.08861811132650234
        },
        "questions": [
          {
            "pinId": "NEW_1775142730641",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "RL 전원부",
        "componentId": "RL",
        "guide": "RL 램프는 모터1 동작 시 점등되며, 단자대에 +,-,+ 하단에 RLGL이라 쓰고 알맞게 결선합니다. GL 과 공통(-)단자를 공유합니다.(배관작업시 전선 수가 줄어 편합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.8420118343195266,
          "y": 0.7131296347579925,
          "w": 0.04023668639053257,
          "h": 0.12209606449429222
        },
        "questions": [
          {
            "pinId": "NEW_1775142838365",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "RL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "GL 전원부",
        "componentId": "GL",
        "guide": "GL 램프는 모터2 동작 시 점등되며, RL과 공통(-)단자를 공유합니다.(10핀 단자대에 +,-,+ 이라고 쓰고 하단에 RLGL 써서 구분하세요)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.9094674556213018,
          "y": 0.7229760915720483,
          "w": 0.04378698224852062,
          "h": 0.10634173359180288
        },
        "questions": [
          {
            "pinId": "NEW_1775142892808",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "새 단계",
        "componentId": "NEW",
        "guide": "설명 문구를 입력하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": null,
        "questions": [],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      }
    ]
  },
  
  "9": {
    "image": "./images/num9.png",
    "stages": [
      {
        "title": "EOCR B접점",
        "componentId": "EOCR",
        "guide": "EOCR B접점입니다. EOCR A접점과 회로가 이어져 있어서 왼쪽은 10번으로 쓰고 아랫쪽 EOCR A접점과 공통으로 단자를 사용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.10946745562130178,
          "y": 0.07310994184436444,
          "w": 0.05088757396449703,
          "h": 0.04726299270746792
        },
        "questions": [
          {
            "pinId": "NEW_1775227919205",
            "label": "B접점",
            "answer": "10,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR A접점",
        "componentId": "EOCR",
        "guide": "EOCR A접점입니다. 상단의 EOCR B접점과 10번 단자를 공통으로 사용하여 윗쪽 핀번호는 10번이 됩니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.13431952662721894,
          "y": 0.42167451306194037,
          "w": 0.037869822485207094,
          "h": 0.10240315086618046
        },
        "questions": [
          {
            "pinId": "EOCR_1775228257127",
            "label": "A접점",
            "answer": "10,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "EOCR 전원부",
        "componentId": "EOCR",
        "guide": "EOCR에 전원을 넣어줍니다.(결선을 최단거리로 하기 위해 역순결선 하기도 합니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.058579881656804736,
          "y": 0.7210068002092372,
          "w": 0.04497041420118343,
          "h": 0.10831102495461398
        },
        "questions": [
          {
            "pinId": "EOCR_1775228326667",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "EOCR_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR 전원부",
        "componentId": "FR",
        "guide": "FR 플리커 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.13431952662721894,
          "y": 0.719037508846426,
          "w": 0.039053254437869805,
          "h": 0.11028031631742519
        },
        "questions": [
          {
            "pinId": "FR_1775228352043",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR의 A접점",
        "componentId": "FR",
        "guide": "FR의 A접점입니다. B접점과 공통단자(8번)를 공유합니다. 윗부분을 8번이라 씁니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.21005917159763313,
          "y": 0.6028493184405674,
          "w": 0.02958579881656806,
          "h": 0.0827102372380688
        },
        "questions": [
          {
            "pinId": "FR_1775228384301",
            "label": "A접점",
            "answer": "8,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FR의 B접점",
        "componentId": "FR",
        "guide": "FR의 B접점입니다. A접점과 공통단자(8번)를 공유하므로 단자 연결에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": null,
        "questions": [
          {
            "pinId": "NEW_1775228190881",
            "label": "B접점",
            "answer": "8,5",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FR_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "YL 전원부",
        "componentId": "YL",
        "guide": "YL 전원부입니다 (10핀 단자대에 + - + 하단에 YLBZ 쓴 후 +,- 부분에 맞게 결선합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.2017751479289941,
          "y": 0.7150989261208037,
          "w": 0.041420118343195256,
          "h": 0.10831102495461398
        },
        "questions": [
          {
            "pinId": "YL_1775228669192",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "YL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "BZ 전원부",
        "componentId": "BZ",
        "guide": "BZ 전원부입니다 (10핀 단자대에 + - + , 하단에 YLBZ 쓴 후 -,+ 부분에 맞게 결선합니다)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.27041420118343196,
          "y": 0.7170682174836149,
          "w": 0.05325443786982248,
          "h": 0.10437244222899156
        },
        "questions": [
          {
            "pinId": "NEW_1775228615056",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "BZ_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "X A접점",
        "componentId": "X",
        "guide": "릴레이 A접점입니다. 1,3 혹은 6,8을 씁니다.(이번엔 1,3을 씁니다.)",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.3520710059171598,
          "y": 0.13612726545432166,
          "w": 0.028402366863905293,
          "h": 0.08861811132650235
        },
        "questions": [
          {
            "pinId": "NEW_1775228800658",
            "label": "A접점",
            "answer": "1,3",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS A 자동모드",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. 10P 단자대에 M,N,A 라고 적고 올바르게 연결하면 됩니다. N은 공통단자로 이용합니다.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.42071005917159765,
          "y": 0.12825010000307702,
          "w": 0.035502958579881616,
          "h": 0.08861811132650235
        },
        "questions": [
          {
            "pinId": "NEW_1775228905820",
            "label": "A 자동모드",
            "answer": "N,A",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "SS  M 수동모드",
        "componentId": "SS",
        "guide": "SS는 수동(M)과 자동(A)을 선택하는 스위치입니다. 10P 단자대 M,N,A 중 N,M에 알맞게 결선합니다",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6266272189349112,
          "y": 0.13612726545432166,
          "w": 0.02721893491124261,
          "h": 0.07483307178682422
        },
        "questions": [
          {
            "pinId": "NEW_1775228982187",
            "label": "M 수동모드",
            "answer": "N,M",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "SS_3",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS A접점",
        "componentId": "FLS",
        "guide": "FLS A접점은 3,4번을 사용함을 유의하세요.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4195266272189349,
          "y": 0.4315209698759962,
          "w": 0.03550295857988167,
          "h": 0.08861811132650232
        },
        "questions": [
          {
            "pinId": "NEW_1775229054684",
            "label": "A접점",
            "answer": "3,4",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 전원부",
        "componentId": "MC1",
        "guide": "MC1은 모터1 제어용 전자접촉기이며, 전원부는 6,12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4100591715976331,
          "y": 0.7210068002092372,
          "w": 0.04497041420118347,
          "h": 0.10240315086618046
        },
        "questions": [
          {
            "pinId": "NEW_1775229102418",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS Floatless switch 수위(물,액체)감지용 부품 전원",
        "componentId": "FLS",
        "guide": "FLS 전원은 5,6번을 사용함을 유의하세요",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.4834319526627219,
          "y": 0.6973753038555033,
          "w": 0.041420118343195256,
          "h": 0.12997322994553673
        },
        "questions": [
          {
            "pinId": "NEW_1775229162631",
            "label": "전원부",
            "answer": "5,6",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "FLS E1,E2,E3",
        "componentId": "FLS",
        "guide": "E1·E2·E3는 FLS 7·8·1번 단자에 연결됩니다. (주의) E3에는 접지표시가 있습니다. 도면에서 접지 기호가 표시된 부분은 공통 접지로 결선합니다. 주결선에 접지와 모두 연결되게 결선하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": {
          "x": 0.5307692307692308,
          "y": 0.8608264869688298,
          "w": 0.05798816568047338,
          "h": 0.05710944952152375
        },
        "questions": [
          {
            "pinId": "NEW_1775229207095",
            "label": "E1,E2,E3",
            "answer": "7,8,1",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "FLS_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB0 B접접",
        "componentId": "PB0",
        "guide": "PB0는 B접점으로 평상시 도통, 누르면 개방됩니다. 단자대에 C,N,O 그리고 하단에 PB0,PB1라고 씁니다.  PB1과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6218934911242604,
          "y": 0.25231545586018034,
          "w": 0.031952662721893454,
          "h": 0.08861811132650232
        },
        "questions": [
          {
            "pinId": "NEW_1775229336141",
            "label": "B접점",
            "answer": "C,N",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB0_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "PB1 A접점",
        "componentId": "PB1",
        "guide": "PB1 A접점 단자대에 C,N,O 하단에 PB0,PB1라고 쓰고 알맞게 결선합니다. PB0과 공통단자(N)를 공유하므로 결선에 주의하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6325443786982249,
          "y": 0.42955167851318504,
          "w": 0.031952662721893454,
          "h": 0.09255669405212469
        },
        "questions": [
          {
            "pinId": "NEW_1775229395520",
            "label": "A접점",
            "answer": "N,O",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "PB1_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "X A접점",
        "componentId": "X",
        "guide": "또 다른 릴레이 A접점입니다. \\\"8핀 릴레이 내부에는 2세트의 접점이 있습니다.\\n1번-3번(A접점)을 사용했다면, 다음엔 남은 6번-8번을 써야 합니다.\\n※ 주의: 같은 핀 번호를 중복해서 사용하지 마세요!\\",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7047337278106509,
          "y": 0.4315209698759962,
          "w": 0.028402366863905293,
          "h": 0.0827102372380688
        },
        "questions": [
          {
            "pinId": "NEW_1775229514130",
            "label": "A접점",
            "answer": "6,8",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "X 전원부",
        "componentId": "X",
        "guide": "릴레이 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6278106508875739,
          "y": 0.7170682174836149,
          "w": 0.037869822485207094,
          "h": 0.10831102495461398
        },
        "questions": [
          {
            "pinId": "NEW_1775229552138",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "X_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "T 전원부",
        "componentId": "T",
        "guide": "타이머 전원부입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.6940828402366864,
          "y": 0.7131296347579925,
          "w": 0.04260355029585794,
          "h": 0.12012677313148101
        },
        "questions": [
          {
            "pinId": "NEW_1775229584674",
            "label": "전원부",
            "answer": "2,7",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "타이머 한시동작순시복귀 A접점",
        "componentId": "T",
        "guide": "타이머 한시동작순시복귀 A접점입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7710059171597633,
          "y": 0.1341579740915105,
          "w": 0.03550295857988173,
          "h": 0.10437244222899167
        },
        "questions": [
          {
            "pinId": "NEW_1775229674724",
            "label": "A접점",
            "answer": "6,8",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "T_8",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 전원부",
        "componentId": "MC2",
        "guide": "MC2은 모터2 제어용 전자접촉기이며, 전원부는 단자 6,12번을 사용합니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.7674556213017751,
          "y": 0.7131296347579925,
          "w": 0.04023668639053257,
          "h": 0.1161881904058587
        },
        "questions": [
          {
            "pinId": "NEW_1775229706178",
            "label": "전원부",
            "answer": "6,12",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC1 A접점",
        "componentId": "MC1",
        "guide": "MC1 A접점입니다.",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8396449704142012,
          "y": 0.1341579740915105,
          "w": 0.03668639053254441,
          "h": 0.09255669405212469
        },
        "questions": [
          {
            "pinId": "NEW_1775229747337",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC1_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "MC2 A접점",
        "componentId": "MC2",
        "guide": "MC2 A접점",
        "inputMode": "choice",
        "allowReverse": true,
        "orderMode": "vertical",
        "rect": {
          "x": 0.9142011834319527,
          "y": 0.12825010000307702,
          "w": 0.03076923076923077,
          "h": 0.09452598541493584
        },
        "questions": [
          {
            "pinId": "NEW_1775229774356",
            "label": "A접점",
            "answer": "4,10",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "MC2_12",
        "pinDisplayCsv": ""
      },
      {
        "title": "RL 전원부",
        "componentId": "RL",
        "guide": "RL 램프는 모터1 동작 시 점등되며, GL과 공통(-)단자를 공유합니다.(단자대에 + - + , 하단에 RLGL 써서 +,-쪽에 결선하세요)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.8349112426035503,
          "y": 0.7131296347579925,
          "w": 0.04260355029585794,
          "h": 0.12012677313148101
        },
        "questions": [
          {
            "pinId": "NEW_1775229935414",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "RL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "GL 전원부",
        "componentId": "GL",
        "guide": "GL 램프는 모터2 동작 시 점등되며, RL과 공통(-)단자를 공유합니다.(단자대에 + - + , 하단에 RLGL 써서 -,+쪽에 결선하세요)",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "vertical",
        "rect": {
          "x": 0.9023668639053254,
          "y": 0.6993445952183144,
          "w": 0.04615384615384621,
          "h": 0.12603464721991453
        },
        "questions": [
          {
            "pinId": "NEW_1775229990655",
            "label": "전원부",
            "answer": "+,-",
            "choices": [],
            "inputMode": "choice"
          }
        ],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      },
      {
        "title": "새 단계",
        "componentId": "NEW",
        "guide": "설명 문구를 입력하세요.",
        "inputMode": "choice",
        "allowReverse": false,
        "orderMode": "horizontal",
        "rect": null,
        "questions": [],
        "pinPreset": "GL_2",
        "pinDisplayCsv": ""
      }
    ]
  }

}



