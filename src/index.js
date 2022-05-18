import TileMap from './TileMap.js';

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const tileSize = 32;
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman();
const ghost = tileMap.getGhost();

function game(){
    tileMap.draw(ctx);
    pacman.draw(ctx, pause());
    for (let i = 0; i < 4; i++) {
        ghost[i].draw(ctx, pause());
    }
    isGameOver();
}

function pause(){
    return isGameOver() === true;
}

function isGameOver(){
    return ghost.some(
        ghost => ghost.collideWith(pacman)
    );
}

tileMap.setCanvasSize(canvas);
// calling the game function 75 times per second (1000 ms)
setInterval(game, 1000 / 100);


