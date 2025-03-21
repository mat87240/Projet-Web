import rhythm from "../map/rhythm.js";

class Player {
    constructor(x = 50, y = 25, fixed = false, targetX = 0, targetY = 0, autoPlayer = true, tiles = []) {
        this.x = x;
        this.y = y;
        this.x2 = x + 50;
        this.y2 = y;
        this.fixed = fixed; // Defines if the player is fixed to one position
        this.targetX = targetX;
        this.targetY = targetY;
        this.blueAngle = 0; // Angle for blue movement
        this.redAngle = 0; // Angle for red movement
        this.lastFrameTime = performance.now(); // Timestamp for frame updates
        this.autoPlayer = autoPlayer; // Enables automatic movement
        this.tiles = tiles; // Stores the array of tiles
        this.currentTileIndex = 0; // Start on the first tile
    }

    updatePosition() {
        const currentTime = performance.now();
        const elapsedTime = (currentTime - this.lastFrameTime) / 1000; // Time since the last frame
        this.lastFrameTime = currentTime;
    
        const bpm = rhythm.getCurrentBPM(); // Get current BPM for rhythm
        const rotationSpeed = Math.PI * (bpm / 60); // Calculate rotation speed based on BPM
    
        // Update player position based on whether the player is fixed or moving
        if (!this.fixed) {
            this.blueAngle += elapsedTime * rotationSpeed;
            this.x2 = this.x + 100 * Math.cos(this.blueAngle);
            this.y2 = this.y + 100 * Math.sin(this.blueAngle);
        } else {
            this.redAngle += elapsedTime * rotationSpeed;
            this.x = this.x2 + 100 * Math.cos(this.redAngle);
            this.y = this.y2 + 100 * Math.sin(this.redAngle);
        }

        // If autoPlayer is enabled, move to the next tile based on BPM
        if (this.autoPlayer) {
            this.autoMove();
        }
    }

    invert() {
        // Inverts the movement direction
        if (!this.fixed) {
            const dx = this.x - this.x2;
            const dy = this.y - this.y2;
            this.redAngle = Math.atan2(dy, dx); // Calculate angle for red movement
            this.x = this.x2 + 100 * Math.cos(this.redAngle);
            this.y = this.y2 + 100 * Math.sin(this.redAngle);
        } else {
            const dx = this.x2 - this.x;
            const dy = this.y2 - this.y;
            this.blueAngle = Math.atan2(dy, dx); // Calculate angle for blue movement
            this.x2 = this.x + 100 * Math.cos(this.blueAngle);
            this.y2 = this.y + 100 * Math.sin(this.blueAngle);
        }
        this.y2 = 25; // Reset y-coordinate for y2
        this.y = 25;  // Reset y-coordinate for y
        this.fixed = !this.fixed; // Toggle the fixed state
    }

    autoMove() {
        const nextTile = rhythm.getNextTile(); // Get the next tile
        if (!nextTile) return; // Return if no tile is found
    
        const snapThreshold = 10; // Distance threshold for snapping to the tile
        let distanceToTile;
    
        // Calculate distance to the next tile based on fixed state
        if (this.fixed) {
            distanceToTile = Math.sqrt(Math.pow(this.x - nextTile.x - 50, 2) + Math.pow(this.y - nextTile.y - 25, 2));
        } else {
            distanceToTile = Math.sqrt(Math.pow(this.x2 - nextTile.x - 50, 2) + Math.pow(this.y2 - nextTile.y - 25, 2));
        }
    
        // If the player is close enough to the tile, invert position and move to the next tile
        if (distanceToTile < snapThreshold) {
            this.invert();
            rhythm.forward(1); // Move forward in rhythm
        }
    }

    // Calculates the center of a tile
    calculateTileCenter(tile) {
        let centerX, centerY;

        // For quadrilateral tiles (4 points), calculate center as average of all points
        if (tile.points.length === 4) {
            const p1 = tile.points[0];
            const p2 = tile.points[1];
            const p3 = tile.points[2];
            const p4 = tile.points[3];

            centerX = (p1.x + p2.x + p3.x + p4.x) / 4;
            centerY = (p1.y + p2.y + p3.y + p4.y) / 4;
        } else {
            // For tiles with non-quadrilateral shapes, assume three points
            const p2 = tile.points[2];
            const p3 = tile.points[3];
            const p6 = tile.points[6];

            // Get the circumcenter of the three points
            const circumcenter = this.findCircumcenter(p2, p3, p6);
            centerX = circumcenter.x;
            centerY = circumcenter.y;
        }

        return { centerX, centerY };
    }

    // Finds the circumcenter (center of the circumcircle) of a triangle formed by P2, P3, and P6
    findCircumcenter(P2, P3, P6) {
        const M1 = { x: (P2.x + P3.x) / 2, y: (P2.y + P3.y) / 2 };
        const M2 = { x: (P3.x + P6.x) / 2, y: (P3.y + P6.y) / 2 };
    
        let mP2P3 = (P3.x !== P2.x) ? (P3.y - P2.y) / (P3.x - P2.x) : Infinity;
        let mP3P6 = (P6.x !== P3.x) ? (P6.y - P3.y) / (P6.x - P3.x) : Infinity;
        
        const mPerp1 = mP2P3 !== Infinity ? -1 / mP2P3 : Infinity;
        const mPerp2 = mP3P6 !== Infinity ? -1 / mP3P6 : Infinity;
    
        // If the perpendicular slopes are equal, return NaN (no circumcenter)
        if (mPerp1 === mPerp2) return { x: NaN, y: NaN };
    
        // Calculate the circumcenter coordinates
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
