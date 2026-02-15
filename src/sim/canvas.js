    const PIN_RADIUS = 8;
    const PIN_HALO_RADIUS = 14;
    const TERMINAL_PIN_OFFSET = 6;
    const PIN_STROKE_COLOR = '#1d4ed8';
    const COMPONENT_RADIUS = 8;
    const BODY_BG = '#111827';
    const BODY_STROKE = '#020617';
    const CELL_BG = '#1f2937';
    const CELL_STROKE = '#374151';
    const TEXT_MAIN = '#f8fafc';
    const TEXT_SUB = '#cbd5e1';

    function roundedRectPath(x, y, w, h, r) {
        const radius = Math.max(0, Math.min(r, Math.min(w, h) / 2));
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + w, y, x + w, y + h, radius);
        ctx.arcTo(x + w, y + h, x, y + h, radius);
        ctx.arcTo(x, y + h, x, y, radius);
        ctx.arcTo(x, y, x + w, y, radius);
        ctx.closePath();
    }

    function getActiveDucts() {
        return {
            top: DUCTS.TOP + 20,
            mid: DUCTS.MID,
            bot: DUCTS.BOT,
            leftX: DUCTS.LEFT_X,
            rightX: DUCTS.RIGHT_X
        };
    }

    function generatePins(comp) {
        const topY = comp.y;
        const botY = comp.y + comp.h;
        if (comp.type === 'terminal') {
            const gap = comp.w / 10;
            comp.pins.forEach((p, i) => {
                if (p.n !== '$') {
                    const pinY = (comp.y < 300)
                        ? (botY + TERMINAL_PIN_OFFSET)
                        : (topY - TERMINAL_PIN_OFFSET);
                    addPin(comp, comp.startNum + i, p.n, comp.x + gap / 2 + i * gap, pinY);
                }
            });
        } else {
            if (comp.topArr) {
                const gap = comp.w / comp.topArr.length;
                comp.topArr.forEach((item, idx) => {
                    if (item.n !== '$') addPin(comp, item.n, item.l, comp.x + gap / 2 + idx * gap, topY);
                });
            }
            if (comp.botArr) {
                const gap = comp.w / comp.botArr.length;
                comp.botArr.forEach((item, idx) => {
                    if (item.n !== '$') addPin(comp, item.n, item.l, comp.x + gap / 2 + idx * gap, botY);
                });
            }
        }
    }

    function addPin(comp, pinNum, label, x, y) {
        allPins.push({ id: `${comp.id}_${pinNum}`, parentId: comp.id, num: pinNum, label, x, y, connections: 0 });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const ducts = getActiveDucts();

        if (!TUTORIAL_CONFIG[currentLayoutId]) {
            ctx.beginPath();
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 10;
            [ducts.top, ducts.mid, ducts.bot].forEach(y => {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            });
            ctx.moveTo(ducts.leftX, 0);
            ctx.lineTo(ducts.leftX, canvas.height);
            ctx.moveTo(ducts.rightX, 0);
            ctx.lineTo(ducts.rightX, canvas.height);
            ctx.stroke();
        }

        const ans = DB_ANSWERS[currentLayoutId];

        if (isAdminMode && ans) {
            ans.targets.forEach(info => {
                const s = allPins.find(p => p.id === info[0]);
                const e = allPins.find(p => p.id === info[1]);
                if (s && e) drawDuctWire(s, e, info[2], '#dc3545', 2);
            });
            ans.commons.forEach(group => {
                if (group.visuals) {
                    group.visuals.forEach(info => {
                        const s = allPins.find(p => p.id === info[0]);
                        const e = allPins.find(p => p.id === info[1]);
                        if (s && e) drawDuctWire(s, e, info[2], group.color, 2);
                    });
                }
            });
        }

        if (isGradingMode && focusedGroup) {
            if (focusedGroup.type === 'target') {
                const s = allPins.find(p => p.id === focusedGroup.data[0]);
                const e = allPins.find(p => p.id === focusedGroup.data[1]);
                if (s && e) {
                    ctx.setLineDash([5, 5]);
                    drawDuctWire(s, e, focusedGroup.data[2], '#00ff00', 2);
                    ctx.setLineDash([]);
                }
            } else if (focusedGroup.type === 'common') {
                if (focusedGroup.data.visuals) {
                    ctx.setLineDash([5, 5]);
                    focusedGroup.data.visuals.forEach(v => {
                        const s = allPins.find(p => p.id === v[0]);
                        const e = allPins.find(p => p.id === v[1]);
                        if (s && e) drawDuctWire(s, e, v[2], focusedGroup.data.color, 2);
                    });
                    ctx.setLineDash([]);
                }
            } else if (focusedGroup.type === 'node') {
                if (focusedGroup.data.visuals) {
                    ctx.setLineDash([5, 5]);
                    focusedGroup.data.visuals.forEach(v => {
                        const s = allPins.find(p => p.id === v[0]);
                        const e = allPins.find(p => p.id === v[1]);
                        if (s && e) drawDuctWire(s, e, v[2], focusedGroup.data.color || '#28a745', 2);
                    });
                    ctx.setLineDash([]);
                }
            }
        }

        wires.forEach(w => {
            let color = '#fde047';
            let alpha = 1.0;
            if (isGradingMode) {
                if (focusedGroup) {
                    if (w.matchedGroup !== focusedGroup.data) {
                        alpha = 0.1;
                        color = '#94a3b8';
                    } else {
                        color = w.gradingColor;
                    }
                } else if (w.gradingColor) {
                    color = w.gradingColor;
                }
            }
            ctx.globalAlpha = alpha;
            drawDuctWire(w.start, w.end, w.offset, color, 3);
            ctx.globalAlpha = 1.0;
        });

        currentComponents.forEach(c => {
            roundedRectPath(c.x, c.y, c.w, c.h, COMPONENT_RADIUS);
            ctx.fillStyle = BODY_BG;
            ctx.fill();
            ctx.strokeStyle = BODY_STROKE;
            ctx.lineWidth = 1.8;
            ctx.stroke();

            ctx.fillStyle = TEXT_MAIN;
            ctx.font = '700 13px Malgun Gothic, Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (c.type !== 'terminal') ctx.fillText(c.label, c.x + c.w / 2, c.y + c.h / 2);

            if (c.type === 'terminal') {
                const gap = c.w / 10;
                ctx.beginPath();
                ctx.strokeStyle = '#475569';
                ctx.lineWidth = 1;
                ctx.moveTo(c.x, c.y + c.h / 2);
                ctx.lineTo(c.x + c.w, c.y + c.h / 2);
                ctx.stroke();

                c.pins.forEach((p, i) => {
                    const cellX = c.x + i * gap;
                    if (i > 0) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#334155';
                        ctx.lineWidth = 1;
                        ctx.moveTo(cellX, c.y);
                        ctx.lineTo(cellX, c.y + c.h);
                        ctx.stroke();
                    }
                    if (p.n !== '$') {
                        ctx.fillStyle = '#94a3b8';
                        ctx.font = '600 10px Malgun Gothic, Arial';
                        ctx.fillText(p.g, cellX + gap / 2, c.y + c.h / 4);

                        ctx.fillStyle = TEXT_MAIN;
                        ctx.font = '700 12px Malgun Gothic, Arial';
                        ctx.fillText(p.n, cellX + gap / 2, c.y + (c.h * 0.78));

                        ctx.fillStyle = '#38bdf8';
                        ctx.font = '700 10px Malgun Gothic, Arial';
                        if (c.y < 300) ctx.fillText(c.startNum + i, cellX + gap / 2, c.y - 9);
                        else ctx.fillText(c.startNum + i, cellX + gap / 2, c.y + c.h + 11);
                    }
                });
            } else {
                if (c.topArr) {
                    const gap = c.w / c.topArr.length;
                    c.topArr.forEach((item, i) => {
                        const cellX = c.x + gap * i;
                        ctx.beginPath();
                        ctx.rect(cellX, c.y, gap, GRID_H * 2);
                        ctx.fillStyle = CELL_BG;
                        ctx.fill();
                        ctx.strokeStyle = CELL_STROKE;
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        if (item.n !== '$') {
                            ctx.fillStyle = TEXT_MAIN;
                            ctx.font = '700 12px Malgun Gothic, Arial';
                            ctx.fillText(item.n, cellX + gap / 2, c.y + (GRID_H * 0.78));
                            if (item.l) {
                                ctx.fillStyle = TEXT_SUB;
                                ctx.font = '700 11px Malgun Gothic, Arial';
                                ctx.fillText(item.l, cellX + gap / 2, c.y + GRID_H * 1.5);
                            }
                        }
                    });
                }
                if (c.botArr) {
                    const yBase = c.y + c.h;
                    const gap = c.w / c.botArr.length;
                    c.botArr.forEach((item, i) => {
                        const cellX = c.x + gap * i;
                        ctx.beginPath();
                        ctx.rect(cellX, yBase - GRID_H * 2, gap, GRID_H * 2);
                        ctx.fillStyle = CELL_BG;
                        ctx.fill();
                        ctx.strokeStyle = CELL_STROKE;
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        if (item.n !== '$') {
                            ctx.fillStyle = TEXT_MAIN;
                            ctx.font = '700 12px Malgun Gothic, Arial';
                            ctx.fillText(item.n, cellX + gap / 2, yBase - GRID_H * 0.9);
                            if (item.l) {
                                ctx.fillStyle = TEXT_SUB;
                                ctx.font = '700 11px Malgun Gothic, Arial';
                                ctx.fillText(item.l, cellX + gap / 2, yBase - GRID_H * 1.5);
                            }
                        }
                    });
                }
            }
        });

        allPins.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, PIN_HALO_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(59, 130, 246, 0.12)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, PIN_RADIUS, 0, Math.PI * 2);
            let fill = (p === selectedPin) ? '#ff0000' : (p.connections >= 2 ? '#333' : '#fff');
            if (isAdminMode && ans) {
                ans.commons.forEach(g => {
                    if (g.pins.includes(p.id)) fill = g.color;
                });
            }
            ctx.fillStyle = fill;
            ctx.strokeStyle = PIN_STROKE_COLOR;
            ctx.lineWidth = 2.5;
            ctx.fill();
            ctx.stroke();
        });
    }

    function drawDuctWire(start, end, offset, color, width) {
        const drawPath = () => {
            ctx.moveTo(start.x, start.y);
            if (startDuctY === endDuctY) {
                ctx.lineTo(start.x, sy);
                ctx.lineTo(end.x, sy);
                ctx.lineTo(end.x, end.y);
            } else {
                const midX = (start.x + end.x) / 2;
                const ducts = getActiveDucts();
                const sideX = (midX < 350) ? ducts.leftX : ducts.rightX;
                const sx = sideX + (sideX === DUCTS.LEFT_X ? -offset : offset);
                ctx.lineTo(start.x, sy);
                ctx.lineTo(sx, sy);
                ctx.lineTo(sx, ey);
                ctx.lineTo(end.x, ey);
                ctx.lineTo(end.x, end.y);
            }
        };

        let startDuctY = getNearestDuctY(start.y);
        let endDuctY = getNearestDuctY(end.y);

        // 튜토리얼이면 단순 연결 (옵션)
        if (TUTORIAL_CONFIG[currentLayoutId]) {
            // 필요시 덕트 무시 로직 추가
        }

        const sy = startDuctY + offset;
        const ey = endDuctY + offset;

        // Thin outline improves contrast over bright wooden background.
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.lineWidth = width + 1;
        ctx.lineJoin = 'round';
        drawPath();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineJoin = 'round';
        drawPath();
        ctx.stroke();
    }

    function getNearestDuctY(y) {
        const ducts = getActiveDucts();
        const dists = [
            { val: ducts.top, dist: Math.abs(y - ducts.top) },
            { val: ducts.mid, dist: Math.abs(y - ducts.mid) },
            { val: ducts.bot, dist: Math.abs(y - ducts.bot) }
        ];
        dists.sort((a, b) => a.dist - b.dist);
        return dists[0].val;
    }
