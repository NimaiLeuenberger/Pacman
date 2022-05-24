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
    drawGameOver();
}

function pause(){
    return isGameOver() === true;
}

function isGameOver(){
    return !pacman.pinkDotActive && ghost.some(
        ghost => ghost.collideWith(pacman)
    );
}

function drawGameOver(){
    if (isGameOver()){
        // rectangle:
        ctx.rect(0, canvas.height / 2.7, canvas.width, 120);
        ctx.fillStyle = "black";
        ctx.fill();
        // border:
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        ctx.stroke();
        // text:
        ctx.font = "75px comic sans";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
    }
}
tileMap.setCanvasSize(canvas);
// calling the game function 75 times per second (1000 ms)
setInterval(game, 1000 / 100);


