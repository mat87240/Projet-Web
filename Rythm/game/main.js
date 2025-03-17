import { handleInput } from './assets/player/inputs.js';
import { drawTiles } from './assets/draw/drawing.js';
import Camera from './assets/player/camera.js';
import rhythm from './assets/map/rhythm.js';
import map from './assets/map/map.js';
import Player from './assets/player/player.js';
import { getLvlName } from "../globalAssets/transfer.js";

let lastFrameTime = Date.now();
let totalTime = 0;

const camera = new Camera(window.innerWidth / 2, window.innerHeight / 2, 1);
export let player = new Player();

function tick() {
    const now = Date.now();
    const deltaTime = (now - lastFrameTime) / 1000;
    lastFrameTime = now;

    totalTime += deltaTime;

    const currentTile = rhythm.getCurrentTile();
    player.updatePosition(totalTime);
    camera.update(totalTime, currentTile);

    map.updateTiles();
    drawTiles(map.getAllTiles(), camera);
}

function gameLoop() {
    tick();
    requestAnimationFrame(gameLoop);
}

async function init() {
    const levelName = getLvlName(); 
    await map.loadLevel(levelName);
    rhythm.updateRhythm(120, 1);
    handleInput();
    loadBackground(levelName);
    requestAnimationFrame(gameLoop);
}

function loadBackground(levelName) {
    const filePath = `../globalAssets/levels/${levelName}/background.jpg`;
    document.body.style.backgroundImage = `url('${filePath}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}


init();