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




