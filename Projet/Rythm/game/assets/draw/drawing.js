import rhythm from '../map/rhythm.js';
import Camera from '../player/camera.js';
import { player } from '../../main.js';
import map from '../map/map.js';

const CHUNK_SIZE = 256;

function cartesianToJS(x, y, camera) {
    return {
        screenX: x - camera.x + window.innerWidth / 2,
        screenY: (y - camera.y) + window.innerHeight / 2
    };
}

let tileColors = {};

export function drawTiles(tiles, camera) {
    const gameArea = document.querySelector('.gameplay');
    gameArea.innerHTML = '';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    gameArea.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const currentTile = rhythm.getCurrentTile();
    
    if (!currentTile) {
        console.warn('No current tile available');
        return;
    }
    
    const currentTileId = currentTile.id;

    tiles.forEach((tile) => {
        if (!tile || !tile.id) return;
        if (tile.id <= currentTileId.id && tile.fadding === 1) return;
        const points = tile.points.map(p => cartesianToJS(p.x, p.y, camera));

        if (!tileColors[tile.id]) {
            tileColors[tile.id] = (Object.keys(tileColors).length % 2 === 0)
                ? 'rgba(153, 102, 51, 1.0)'
                : 'rgba(102, 51, 0, 1.0)';
        }

        const fillColor = tileColors[tile.id];

        const visibleChunks = map.getVisibleChunks(camera);

        const tileChunkX = Math.floor(tile.x / CHUNK_SIZE);
        const tileChunkY = Math.floor(tile.y / CHUNK_SIZE);

        if (visibleChunks.some(chunk => chunk.x === tileChunkX && chunk.y === tileChunkY)) {
            let alpha = 1.0;
            if (tile.fadding === 0) {
                alpha = 0.0;
            } else if (tile.fadding === 1) {
                alpha = 1.0;
            } else {
                alpha = tile.fadding;
            }

            ctx.globalAlpha = alpha;

            if (tile.points.length === 4) {
                ctx.beginPath();
                ctx.moveTo(points[0].screenX, points[0].screenY);

                points.slice(1).forEach(point => {
                    ctx.lineTo(point.screenX, point.screenY);
                });

                ctx.closePath();
                ctx.fillStyle = fillColor;
                ctx.fill();
                if (tile.points.length === 4) {
                    ctx.beginPath();
                    ctx.moveTo(points[0].screenX, points[0].screenY);
                
                    for (let i = 1; i < points.length; i++) {
                        ctx.lineTo(points[i].screenX, points[i].screenY);
                    }
                
                    ctx.lineTo(points[0].screenX, points[0].screenY);
                
                    ctx.stroke();
                }

            } else if (tile.points.length === 7) {

                // First polygon (points 0, 1, 2, 3)
                ctx.beginPath();
                ctx.moveTo(points[0].screenX, points[0].screenY);
                ctx.lineTo(points[1].screenX, points[1].screenY);
                ctx.lineTo(points[2].screenX, points[2].screenY);
                ctx.lineTo(points[3].screenX, points[3].screenY);
                ctx.closePath();

                ctx.lineWidth = 2;
                ctx.fillStyle = fillColor;
                ctx.fill();

                // Second polygon (points 3, 4, 5, 6)
                ctx.beginPath();
                ctx.moveTo(points[3].screenX, points[3].screenY);
                ctx.lineTo(points[4].screenX, points[4].screenY);
                ctx.lineTo(points[5].screenX, points[5].screenY);
                ctx.lineTo(points[6].screenX, points[6].screenY);
                ctx.closePath();

                ctx.fill();

                // Draw the partial circle from P2 to P6 centered at P3
                const centerX = points[3].screenX;
                const centerY = points[3].screenY;

                const radius = Math.sqrt(
                    (points[3].screenX - points[2].screenX) ** 2 +
                    (points[3].screenY - points[2].screenY) ** 2
                );

                const startAngle = Math.atan2(
                    points[2].screenY - centerY,
                    points[2].screenX - centerX
                );
                const endAngle = Math.atan2(
                    points[6].screenY - centerY,
                    points[6].screenX - centerX
                );

                ctx.beginPath();
                ctx.moveTo(points[3].screenX, points[3].screenY);
                ctx.lineTo(points[2].screenX, points[2].screenY);
                ctx.arc(
                    points[3].screenX, points[3].screenY,
                    radius, 
                    Math.atan2(points[6].screenY - points[3].screenY, points[6].screenX - points[3].screenX), // Start at P2
                    Math.atan2(points[6].screenY - points[3].screenY, points[6].screenX - points[3].screenX), // End at P6
                );

                ctx.lineTo(points[3].screenX, points[3].screenY);
                ctx.closePath();

                ctx.fillStyle = fillColor;
                ctx.fill();

                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.moveTo(points[0].screenX, points[0].screenY);
                ctx.lineTo(points[1].screenX, points[1].screenY);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.moveTo(points[0].screenX, points[0].screenY);
                ctx.lineTo(points[3].screenX, points[3].screenY);
                ctx.stroke();

                
                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.moveTo(points[3].screenX, points[3].screenY);
                ctx.lineTo(points[4].screenX, points[4].screenY);
                ctx.stroke();
                }
                
            ctx.globalAlpha = 1.0;
        }
    });

    const radius = 20;
    const playerScreenPos = cartesianToJS(player.x, player.y, camera);
    const nextTileScreenPos = cartesianToJS(player.x2, player.y2, camera);
    
    // Draw blue circle for current tile (x, y)
    ctx.beginPath();
    ctx.arc(playerScreenPos.screenX, playerScreenPos.screenY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
    
    // Draw red circle for next tile (x2, y2)
    ctx.beginPath();
    ctx.arc(nextTileScreenPos.screenX, nextTileScreenPos.screenY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
    
    
}

