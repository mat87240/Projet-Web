import map from "./map.js";
import { player } from "../../main.js";

class Rhythm {
    constructor(bpm) {
        this.currentTileId = 1;
        this.currentBPM = bpm;
    }

    getCurrentTile() {

        if (this.currentTileId === null) {
            return map.getTile(0); 
        }
    
        return map.getTile(this.currentTileId);
    }

    getNextTile() {
        if (this.currentTileId === null || this.currentTileId + 1 >= map.tiles.length) {
            return map.getTile(0);
        }
        
        return map.getTile(this.currentTileId + 1);
    }

    getPrevTile() {
        if (this.currentTileId === null || this.currentTileId - 1 <= 0) {
            return map.getTile(0);
        }
        return map.getTile(this.currentTileId - 1);
    }

    setCurrentTile(tileID) {
        this.currentTileId = tileID;
    }

    getCurrentBPM() {
        return this.currentBPM;
    }

    setCurrentBPM(bpm) {
        this.currentBPM = bpm;
    }

    updateRhythm(bpm, tileID) {
        this.setCurrentBPM(bpm);
        this.setCurrentTile(tileID);
    }

    forward(x){
        this.currentTileId+=x;
    }

    checkSucces() {
        console.log("dfhdf;")
        const nextTile = this.getNextTile();
        if (!nextTile) return false;
    
        const movingX = player.fixed ? player.x : player.x2;
        const movingY = player.fixed ? player.y : player.y2;
    
        if (1==1) {
            const { centerX, centerY } = player.calculateTileCenter(nextTile);
            
            if (player.fixed) {
                player.x = centerX;
                player.y = centerY;
            } else {
                player.x2 = centerX;
                player.y2 = centerY;
            }
            
            return true;
        }
    
        return false;
    }
    
    isInsideTileWithBias(x, y, tile, biasDistance = 5) {
        const points = tile.points;
        let count = 0;
        const numPoints = points.length;
    
        for (let i = 0; i < numPoints; i++) {
            const p1 = points[i];
            const p2 = points[(i + 1) % numPoints];
    
            if (isEdgeIntersectingWithBias(p1, p2, x, y, biasDistance)) {
                count++;
            }
        }
    
        return count % 2 === 1;
    }
    
    isEdgeIntersectingWithBias(p1, p2, x, y, biasDistance) {
        const [x1, y1] = [p1.x, p1.y];
        const [x2, y2] = [p2.x, p2.y];
    
        // Check if the point (x, y) is between the y-coordinates of the edge
        if (y1 > y && y2 > y || y1 < y && y2 < y) {
            return false;  // No intersection if the point is not between the vertical bounds of the edge
        }
    
        // Calculate the x-coordinate of the intersection of the ray with the edge
        const intersectX = (x2 - x1) * (y - y1) / (y2 - y1) + x1;
    
        // Apply bias by extending the intersection threshold by 'biasDistance'
        return x < intersectX + biasDistance && x > intersectX - biasDistance;
    }
    
}

const rhythm = new Rhythm();
export default rhythm;