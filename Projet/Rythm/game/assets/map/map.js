import { generateTiles } from './tiles.js';
import { loadJsonData } from '../addon/JsonReader.js';
import rhythm from './rhythm.js';

const CHUNK_SIZE = 256;

class Map {
    constructor() {
        this.tiles = [];
        this.jsonLoaded = false;
    }

    async loadLevel(level) {
        try {
            const data = await loadJsonData(level);

            const tiles = await generateTiles(data);
            
            this.tiles = tiles;
            this.jsonLoaded = true;
            console.log("Tiles loaded:", this.tiles);
        } catch (error) {
            console.error('Error loading tiles:', error);
        }
    }

    getVisibleChunks(camera) {
        const startChunkX = Math.floor((camera.x - window.innerWidth) / CHUNK_SIZE);
        const endChunkX = Math.ceil((camera.x + window.innerWidth) / CHUNK_SIZE);
        const startChunkY = Math.floor((camera.y - window.innerHeight) / CHUNK_SIZE);
        const endChunkY = Math.ceil((camera.y + window.innerHeight) / CHUNK_SIZE);

        let visibleChunks = [];
        for (let x = startChunkX; x <= endChunkX; x++) {
            for (let y = startChunkY; y <= endChunkY; y++) {
                visibleChunks.push({ x, y });
            }
        }
        return visibleChunks;
    }

    updateTiles() {
        if (!this.jsonLoaded) {
            console.warn('Tiles not loaded yet');
            return;
        }
    
        const currentTile = rhythm.getCurrentTile();
    
        if (!currentTile) {
            console.warn('No current tile available');
            return;
        }
    
        const currentTileId = currentTile.id;
    
        this.tiles.forEach((tile) => {
            if (tile.id < currentTileId && tile.fadding !== 0) {
                if (tile.fadding > 0.1) {
                    tile.fadding -= 0.05;
                } else {
                    tile.fadding = 0;
                }
            }
        });
    }
    
    getTile(id) {
        if (!this.jsonLoaded) {
            console.warn('Tiles not loaded yet');
            return null;
        }
        return this.tiles[id];
    }

    getAllTiles() {
        if (!this.jsonLoaded) {
            console.warn('Tiles not loaded yet');
            return [];
        }
        return this.tiles;
    }

}

const map = new Map();
export default map;
