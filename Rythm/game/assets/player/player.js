import rhythm from "../map/rhythm.js";

class Player {
    constructor(x = 50, y = 25, fixed = false, targetX = 0, targetY = 0) {
        this.x = x;
        this.y = y;
        this.x2 = x + 50;
        this.y2 = y;
        this.fixed = fixed;
        this.targetX = targetX;
        this.targetY = targetY;
        this.blueAngle = 0;
        this.redAngle = 0;
        this.lastFrameTime = performance.now();
    }

    updatePosition() {
        const currentTime = performance.now();
        const elapsedTime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;
    
        const bpm = rhythm.getCurrentBPM();
        const rotationSpeed = Math.PI * (bpm / 60);
    
        if (!this.fixed) {
            this.blueAngle += elapsedTime * rotationSpeed;
            this.x2 = this.x + 100 * Math.cos(this.blueAngle);
            this.y2 = this.y + 100 * Math.sin(this.blueAngle);
        } else {
            this.redAngle += elapsedTime * rotationSpeed;
            this.x = this.x2 + 100 * Math.cos(this.redAngle);
            this.y = this.y2 + 100 * Math.sin(this.redAngle);
        }
    }
    

    invert() {
        if (!this.fixed) {
            const dx = this.x - this.x2;
            const dy = this.y - this.y2;
            this.redAngle = Math.atan2(dy, dx);
            this.x = this.x2 + 100 * Math.cos(this.redAngle);
            this.y = this.y2 + 100 * Math.sin(this.redAngle);
        } else {
            const dx = this.x2 - this.x;
            const dy = this.y2 - this.y;
            this.blueAngle = Math.atan2(dy, dx);
            this.x2 = this.x + 100 * Math.cos(this.blueAngle);
            this.y2 = this.y + 100 * Math.sin(this.blueAngle);
        }
        this.fixed = !this.fixed;
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
    
        let mP2P3 = (P3.x !== P2.x) ? (P3.y - P2.y) / (P3.x - P2.x) : Infinity;
        let mP3P6 = (P6.x !== P3.x) ? (P6.y - P3.y) / (P6.x - P3.x) : Infinity;
        
        const mPerp1 = mP2P3 ? -1 / mP2P3 : Infinity;
        const mPerp2 = mP3P6 ? -1 / mP3P6 : Infinity;
    
        if (mPerp1 === mPerp2) return { x: NaN, y: NaN };
    
        const centerX = (mPerp1 === Infinity) ? M1.x 
                       : (mPerp2 === Infinity) ? M2.x
                       : ((M2.y - mPerp2 * M2.x) - (M1.y - mPerp1 * M1.x)) / (mPerp1 - mPerp2);
        
        const centerY = (mPerp1 === Infinity) ? (mPerp2 * centerX + M2.y - mPerp2 * M2.x)
                       : (mPerp2 === Infinity) ? (mPerp1 * centerX + M1.y - mPerp1 * M1.x)
                       : (mPerp1 * centerX + M1.y - mPerp1 * M1.x);
    
        return { x: centerX, y: centerY };
    }
    
    
    
}

export default Player;
