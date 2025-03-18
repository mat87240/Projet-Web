import rhythm from '../map/rhythm.js';

class Camera {
    constructor(x, y, zoom = 1) {
        this.x = x;
        this.y = y;
        this.zoom = zoom;
        this.moveSpeed = 0.1;
        this.targetX = x;
        this.targetY = y;
    }

    update() {
        const tile = rhythm.getCurrentTile();
        
        if (tile && tile.x !== null && tile.y !== null) {
            this.targetX = tile.x;
            this.targetY = tile.y;
        
            const distX = this.targetX - this.x;
            const distY = this.targetY - this.y;
        
            this.x += distX * this.moveSpeed;
            this.y += distY * this.moveSpeed;
        }
    }
    
    getScreenCoordinates(cartesianX, cartesianY) {
        const screenX = (cartesianX - this.x) * this.zoom + window.innerWidth / 2;
        const screenY = (cartesianY - this.y) * this.zoom + window.innerHeight / 2;
        return { screenX, screenY };
    }
}

export default Camera;
