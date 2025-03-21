import { generateTiles } from './tiles.js';
import { loadJsonData } from '../addon/JsonReader.js';
import rhythm from './rhythm.js';

const CHUNK_SIZE = 256;

class Map {
    constructor() {
        this.tiles = []; // Stores all tiles of the level
        this.jsonLoaded = false; // Indicates if JSON data has been loaded
    }

    async loadLevel(level) {
        try {
            const data = await loadJsonData(level); // Loads level data from JSON
            const tiles = await generateTiles(data); // Generates tiles from the data
            this.tiles = tiles;
            this.jsonLoaded = true;
            console.log("Tiles loaded:", this.tiles);
        } catch (error) {
            console.error('Error loading tiles:', error);
        }
    }

    getVisibleChunks(camera) {
        // Calculates the visible chunks based on the camera position
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
    
        const currentTile = rhythm.getCurrentTile(); // Gets the current tile from rhythm
        if (!currentTile) {
            console.warn('No current tile available');
            return;
        }
    
        const currentTileId = currentTile.id;

        // Fades out tiles that have already been passed for a transition effect
        this.tiles.forEach((tile) => {
            if (tile.id < currentTileId && tile.fadding !== 0) {
                tile.fadding = Math.max(0, tile.fadding - 0.05);
            }
        });
    }
    
    getTile(id) {
        if (!this.jsonLoaded) {
            console.warn('Tiles not loaded yet');
            return null;
        }
        return this.tiles[id]; // Returns the tile with the given ID
    }

    getAllTiles() {
        if (!this.jsonLoaded) {
            console.warn('Tiles not loaded yet');
            return [];
        }
        return this.tiles; // Returns all tiles
    }
}

const map = new Map();
export default map;
