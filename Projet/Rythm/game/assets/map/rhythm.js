import map from "./map.js";

class Rhythm {
    constructor() {
        this.currentTileId = 1;
        this.currentBPM = 0;
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
        if (this.currentTileId === null || this.currentTileId - 1 <= map.tiles.length) {
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
}

const rhythm = new Rhythm();
export default rhythm;