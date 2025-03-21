// Import necessary modules
import { handleInput } from './assets/player/inputs.js';
import { drawTiles } from './assets/draw/drawing.js';
import Camera from './assets/player/camera.js';
import rhythm from './assets/map/rhythm.js';
import map from './assets/map/map.js';
import Player from './assets/player/player.js';
import { getLvlName } from "../globalAssets/transfer.js";

// Initialize frame time tracking and total time
let lastFrameTime = Date.now();
let totalTime = 0;

// Initialize camera and player objects
const camera = new Camera(window.innerWidth / 2, window.innerHeight / 2, 1);
export let player = new Player();

// Main game tick function
function tick() {
    const now = Date.now();
    const deltaTime = (now - lastFrameTime) / 1000; // Calculate elapsed time in seconds
    lastFrameTime = now;

    totalTime += deltaTime;

    const currentTile = rhythm.getCurrentTile();
    player.updatePosition(totalTime); // Update player position
    camera.update(totalTime, currentTile); // Update camera position

    map.updateTiles(); // Update map tiles
    drawTiles(map.getAllTiles(), camera); // Draw all tiles
}

// Main game loop that runs repeatedly
function gameLoop() {
    tick(); // Call tick to update game state
    requestAnimationFrame(gameLoop); // Request next animation frame
}

// Initialization function for setting up the game
async function init() {
    const levelName = getLvlName(); // Get level name
    await map.loadLevel(levelName); // Load the level

    rhythm.updateRhythm(120, 1); // Set rhythm (BPM and beat length)

    handleInput(); // Set up input handling
    loadBackground(levelName); // Load background image for the level
    requestAnimationFrame(gameLoop); // Start the game loop
}

// Load background image for the level
function loadBackground(levelName) {
    const filePath = `../globalAssets/levels/${levelName}/background.jpg`;
    document.body.style.backgroundImage = `url('${filePath}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}

// Initialize the game
init();
