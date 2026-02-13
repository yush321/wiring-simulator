    function generatePins(comp) {
        const topY = comp.y; const botY = comp.y + comp.h;
        if (comp.type === 'terminal') {
            const gap = comp.w / 10;
            comp.pins.forEach((p, i) => {
                if (p.n !== '$') {
                    let pinY = (comp.y < 300) ? botY : topY;
                    addPin(comp, comp.startNum + i, p.n, comp.x + gap/2 + i*gap, pinY);
                }
            });
        } else {
            if(comp.topArr) {
                const gap = comp.w / comp.topArr.length;
                comp.topArr.forEach((item, idx) => { if(item.n !== '$') addPin(comp, item.n, item.l, comp.x + gap/2 + idx*gap, topY); });
            }
            if(comp.botArr) {
                const gap = comp.w / comp.botArr.length;
                comp.botArr.forEach((item, idx) => { if(item.n !== '$') addPin(comp, item.n, item.l, comp.x + gap/2 + idx*gap, botY); });
            }
        }
    }

    function addPin(comp, pinNum, label, x, y) {
        allPins.push({ id: `${comp.id}_${pinNum}`, parentId: comp.id, num: pinNum, label: label, x: x, y: y, connections: 0 });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (!TUTORIAL_CONFIG[currentLayoutId]) {
            ctx.beginPath(); ctx.strokeStyle = '#eee'; ctx.lineWidth = 10;
            [DUCTS.TOP, DUCTS.MID, DUCTS.BOT].forEach(y => { ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); });
            ctx.moveTo(DUCTS.LEFT_X, 0); ctx.lineTo(DUCTS.LEFT_X, canvas.height);
            ctx.moveTo(DUCTS.RIGHT_X, 0); ctx.lineTo(DUCTS.RIGHT_X, canvas.height);
            ctx.stroke();
        }

        const ans = DB_ANSWERS[currentLayoutId];

        if (isAdminMode && ans) {
            ans.targets.forEach(info => {
                const s = allPins.find(p => p.id === info[0]); const e = allPins.find(p => p.id === info[1]);
                if (s && e) drawDuctWire(s, e, info[2], '#dc3545', 2);
            });
            ans.commons.forEach(group => {
                if (group.visuals) {
                    group.visuals.forEach(info => {
                        const s = allPins.find(p => p.id === info[0]); const e = allPins.find(p => p.id === info[1]);
                        if (s && e) drawDuctWire(s, e, info[2], group.color, 2);
                    });
                }
            });
        }

        if (isGradingMode && focusedGroup) {
            if (focusedGroup.type === 'target') {
                const s = allPins.find(p => p.id === focusedGroup.data[0]);
                const e = allPins.find(p => p.id === focusedGroup.data[1]);
                if(s && e) { ctx.setLineDash([5, 5]); drawDuctWire(s, e, focusedGroup.data[2], '#00ff00', 2); ctx.setLineDash([]); }
            } 
            else if (focusedGroup.type === 'common') {
                if(focusedGroup.data.visuals) {
                    ctx.setLineDash([5, 5]);
                    focusedGroup.data.visuals.forEach(v => {
                        const s = allPins.find(p => p.id === v[0]); const e = allPins.find(p => p.id === v[1]);
                        if(s && e) drawDuctWire(s, e, v[2], focusedGroup.data.color, 2);
                    });
                    ctx.setLineDash([]);
                }
            }
        }

        wires.forEach(w => {
            let color = '#e6b800'; 
            let alpha = 1.0;
            if (isGradingMode) {
                if (focusedGroup) {
                    if (w.matchedGroup !== focusedGroup.data) { alpha = 0.1; color = '#ccc'; } 
                    else { color = w.gradingColor; }
                } else { if (w.gradingColor) color = w.gradingColor; }
            }
            ctx.globalAlpha = alpha;
            drawDuctWire(w.start, w.end, w.offset, color, 3);
            ctx.globalAlpha = 1.0;
        });

        currentComponents.forEach(c => {
            ctx.fillStyle = '#fff'; ctx.fillRect(c.x, c.y, c.w, c.h);
            ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.strokeRect(c.x, c.y, c.w, c.h);
            ctx.fillStyle = '#000'; ctx.font = 'bold 14px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            if (c.type !== 'terminal') ctx.fillText(c.label, c.x + c.w/2, c.y + c.h/2);

            if (c.type === 'terminal') {
                const gap = c.w / 10;
                ctx.beginPath(); ctx.moveTo(c.x, c.y + c.h/2); ctx.lineTo(c.x + c.w, c.y + c.h/2); ctx.stroke();
                c.pins.forEach((p, i) => {
                    const cellX = c.x + i*gap;
                    if (i > 0) { ctx.beginPath(); ctx.moveTo(cellX, c.y); ctx.lineTo(cellX, c.y + c.h); ctx.stroke(); }
                    if (p.n !== '$') {
                        ctx.fillStyle='#d9534f'; ctx.font='10px Arial'; ctx.fillText(p.g, cellX+gap/2, c.y+c.h/4);
                        ctx.fillStyle='#000'; ctx.font='11px Arial'; ctx.fillText(p.n, cellX+gap/2, c.y+(c.h*3)/4);
                        ctx.fillStyle='#007bff'; ctx.font='10px Arial'; 
                        if(c.y<300) ctx.fillText(c.startNum+i, cellX+gap/2, c.y-8); else ctx.fillText(c.startNum+i, cellX+gap/2, c.y+c.h+10);
                    }
                });
            } else {
                if(c.topArr) {
                    const gap = c.w / c.topArr.length;
                    c.topArr.forEach((item, i) => {
                        const cellX = c.x + gap * i;
                        ctx.beginPath(); ctx.rect(cellX, c.y, gap, GRID_H*2); ctx.stroke();
                        if(item.n!=='$') { ctx.fillStyle='#000'; ctx.font='12px Arial'; ctx.fillText(item.n, cellX+gap/2, c.y+GRID_H/2); if(item.l) { ctx.fillStyle='blue'; ctx.font='11px Arial'; ctx.fillText(item.l, cellX+gap/2, c.y+GRID_H*1.5); } }
                    });
                }
                if(c.botArr) {
                    const yBase = c.y + c.h;
                    const gap = c.w / c.botArr.length;
                    c.botArr.forEach((item, i) => {
                        const cellX = c.x + gap * i;
                        ctx.beginPath(); ctx.rect(cellX, yBase-GRID_H*2, gap, GRID_H*2); ctx.stroke();
                        if(item.n!=='$') { ctx.fillStyle='#000'; ctx.font='12px Arial'; ctx.fillText(item.n, cellX+gap/2, yBase-GRID_H/2); if(item.l) { ctx.fillStyle='blue'; ctx.font='11px Arial'; ctx.fillText(item.l, cellX+gap/2, yBase-GRID_H*1.5); } }
                    });
                }
            }
        });

        allPins.forEach(p => {
            ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, Math.PI*2);
            let fill = (p === selectedPin) ? '#ff0000' : (p.connections>=2 ? '#333' : '#fff');
            if (isAdminMode && ans) { ans.commons.forEach(g => { if (g.pins.includes(p.id)) fill = g.color; }); }
            ctx.fillStyle = fill; ctx.strokeStyle = '#007bff'; ctx.lineWidth = 2; ctx.fill(); ctx.stroke();
        });
    }

    function drawDuctWire(start, end, offset, color, width) {
        ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = 'round';
        let startDuctY = getNearestDuctY(start.y); let endDuctY = getNearestDuctY(end.y);
        
        // 튜토리얼이면 단순 연결 (옵션)
        if(TUTORIAL_CONFIG[currentLayoutId]) {
             // 필요시 덕트 무시 로직 추가
        }

        const sy = startDuctY + offset; const ey = endDuctY + offset;
        ctx.moveTo(start.x, start.y);
        if (startDuctY === endDuctY) { ctx.lineTo(start.x, sy); ctx.lineTo(end.x, sy); ctx.lineTo(end.x, end.y); } 
        else {
            const midX = (start.x + end.x) / 2;
            const sideX = (midX < 350) ? DUCTS.LEFT_X : DUCTS.RIGHT_X;
            const sx = sideX + (sideX === DUCTS.LEFT_X ? -offset : offset); 
            ctx.lineTo(start.x, sy); ctx.lineTo(sx, sy); ctx.lineTo(sx, ey); ctx.lineTo(end.x, ey); ctx.lineTo(end.x, end.y);
        }
        ctx.stroke();
    }
    
    function getNearestDuctY(y) {
        const dists = [ { val: DUCTS.TOP, dist: Math.abs(y - DUCTS.TOP) }, { val: DUCTS.MID, dist: Math.abs(y - DUCTS.MID) }, { val: DUCTS.BOT, dist: Math.abs(y - DUCTS.BOT) } ];
        dists.sort((a, b) => a.dist - b.dist);
        return dists[0].val;
    }

