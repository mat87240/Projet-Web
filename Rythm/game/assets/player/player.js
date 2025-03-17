import rhythm from "../map/rhythm.js";

class Player {
    constructor(x = 0, y = 0, fixed = false, targetX = 0, targetY = 0) {
        this.x = x;
        this.y = y;
        this.x2 = 0;
        this.y2 = 0;
        this.fixed = fixed;
        this.targetX = targetX;
        this.targetY = targetY;
    }

    updatePosition(deltaTime) {
        const currentTile = rhythm.getCurrentTile();
        const prevTile = rhythm.getPrevTile();
        const nextTile = rhythm.getNextTile();

        const { centerX, centerY } = this.calculateTileCenter(currentTile);
        const { centerX: prevCenterX, centerY: prevCenterY } = this.calculateTileCenter(prevTile);
        const { centerX: nextCenterX, centerY: nextCenterY } = this.calculateTileCenter(nextTile);
    }

    calculateTileCenter(tile) {
        let centerX, centerY;

        if (tile.points.length === 4) {
            const p1 = tile.points[0];
            const p2 = tile.points[1];
            const p3 = tile.points[2];
            const p4 = tile.points[3];

            centerX = (p1.x + p2.x + p3.x + p4.x) / 4;
            centerY = (p1.y + p2.y + p3.y + p4.y) / 4;
        } else {
            const p2 = tile.points[2];
            const p3 = tile.points[3];
            const p6 = tile.points[6];

            const center = this.findCircumcenter(p2, p3, p6);

            centerX = center.x;
            centerY = center.y;
        }

        return { centerX, centerY };
    }

    findCircumcenter(P2, P3, P6) {
        const M1 = { x: (P2.x + P3.x) / 2, y: (P2.y + P3.y) / 2 };
        const M2 = { x: (P3.x + P6.x) / 2, y: (P3.y + P6.y) / 2 };

        const mP2P3 = (P3.y - P2.y) / (P3.x - P2.x);
        const mP3P6 = (P6.y - P3.y) / (P6.x - P3.x);

        const mPerp1 = -1 / mP2P3;
        const mPerp2 = -1 / mP3P6;

        const b1 = M1.y - mPerp1 * M1.x;
        const b2 = M2.y - mPerp2 * M2.x;

        const centerX = (b2 - b1) / (mPerp1 - mPerp2);
        const centerY = mPerp1 * centerX + b1;

        return { x: centerX, y: centerY };
    }
}

export default Player;
