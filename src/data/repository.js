    const DUCTS = { TOP: 100, MID: 320, BOT: 550, LEFT_X: 30, RIGHT_X: 670 };
    const GRID_H = 20;
    const PALETTE = ["#007bff", "#28a745", "#fd7e14", "#8B4513", "#6f42c1", "#17a2b8"];

    //////////////////////////////////"결선 붙여넣기 시작"
    let TUTORIAL_CONFIG = JSON.parse(JSON.stringify(window.APP_TUTORIAL_CONFIG_DEFAULT || {}));
    let DB_ANSWERS = JSON.parse(JSON.stringify(window.APP_DB_ANSWERS_DEFAULT || {}));
    const NUMBERING_STORAGE_KEY = 'numbering_scenarios_v2';
    let NUMBERING_SCENARIOS_DEFAULT = JSON.parse(JSON.stringify(window.APP_NUMBERING_SCENARIOS_DEFAULT || {}));

    function applyAppDataOverrides() {
        const src = (typeof window !== 'undefined' && window.APP_DATA_OVERRIDES && typeof window.APP_DATA_OVERRIDES === 'object')
            ? window.APP_DATA_OVERRIDES
            : null;
        if (!src) return;

        if (src.tutorial && typeof src.tutorial === 'object' && !Array.isArray(src.tutorial)) {
            TUTORIAL_CONFIG = { ...TUTORIAL_CONFIG, ...src.tutorial };
        }
        if (src.numbering && typeof src.numbering === 'object' && !Array.isArray(src.numbering)) {
            NUMBERING_SCENARIOS_DEFAULT = { ...NUMBERING_SCENARIOS_DEFAULT, ...src.numbering };
        }
        if (src.answers && typeof src.answers === 'object' && !Array.isArray(src.answers)) {
            DB_ANSWERS = { ...DB_ANSWERS, ...src.answers };
        }
    }

    applyAppDataOverrides();
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
    const layoutCategorySelect = document.getElementById('layoutCategorySelect');
    const layoutSelect = document.getElementById('layoutSelect');
    const practiceFlowTargetWrap = document.getElementById('practiceFlowTargetWrap');
    const practiceFlowTargetSelect = document.getElementById('practiceFlowTargetSelect');
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
    const editorNumberingLayoutId = document.getElementById('editorNumberingLayoutId');
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
    const wiringEditorCategory = document.getElementById('wiringEditorCategory');
    const wiringEditorSubcategory = document.getElementById('wiringEditorSubcategory');
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
