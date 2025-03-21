import rhythm from '../map/rhythm.js';

class Camera {
    constructor(x, y, zoom = 1) {
        this.x = x; // Current camera position on the X-axis
        this.y = y; // Current camera position on the Y-axis
        this.zoom = zoom; // Zoom level (1 = normal scale)
        this.moveSpeed = 0.1; // Movement speed for smooth transitions
        this.targetX = x; // Target X position
        this.targetY = y; // Target Y position
    }

    /**
     * Updates the camera position by gradually moving towards 
     * the position of the current tile retrieved from rhythm.
     */
    update() {
        const tile = rhythm.getCurrentTile();
        
        if (tile && tile.x !== null && tile.y !== null) {
            this.targetX = tile.x;
            this.targetY = tile.y;
        
            const distX = this.targetX - this.x;
            const distY = this.targetY - this.y;
        
            // Apply smooth movement using linear interpolation
            this.x += distX * this.moveSpeed;
            this.y += distY * this.moveSpeed;
        }
    }
    
    /**
     * Converts Cartesian coordinates to screen coordinates 
     * based on the camera position and zoom level.
     */
    getScreenCoordinates(cartesianX, cartesianY) {
        const screenX = (cartesianX - this.x) * this.zoom + window.innerWidth / 2;
        const screenY = (cartesianY - this.y) * this.zoom + window.innerHeight / 2;
        return { screenX, screenY };
    }
}

export default Camera;
