import TileMap from './TileMap.js';

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const tileSize = 32;
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman();
const ghosts = tileMap.getGhost();
const points = document.getElementById("points");
let pacLives = 2;

function game(){
    tileMap.draw(ctx);
    pacman.draw(ctx, pause(), ghosts, points);
    ghosts.forEach((ghost) => ghost.draw(ctx, pause(), pacman));
    isGameOver();
    isGameWon();
    drawGameOver();
}

function pause(){
    return isGameOver() === true || pacman.eatingGhost === true;
}

function isGameOver(){
    return !pacman.pinkDotActive && pacmanHasNoLives()
}

function pacmanHasNoLives(){
    if (ghosts.some(ghost => ghost.collideWith(pacman))){
        if (pacLives === 0){
            return true;
        } else {
            pacLives--;
            //tileMap.map[pacman.column / tileSize][pacman.row / tileSize] = 2;
            tileMap.map[10][15] = 4;
            console.log("collided");
            return false;
        }
    } else {
        return false;
    }
}

function drawGameOver(){
    if (isGameOver()){
        // rectangle:
        ctx.rect(0, canvas.height / 2.66, canvas.width, 160);
        ctx.fillStyle = "black";
        ctx.fill();
        // border:
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        ctx.stroke();
        // text:
        ctx.font = "60px pacfont";
        ctx.fontFamily = "pacfont";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("game over", canvas.width / 2, canvas.height / 2);
    }
}

function isGameWon(){
    if (!tileMap.map.some(row => row.includes(0))){
        // rectangle:
        ctx.rect(0, canvas.height / 2.7, canvas.width, 120);
        ctx.fillStyle = "black";
        ctx.fill();
        // border:
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        ctx.stroke();
        // text:
        ctx.font = "60px pacfont";
        ctx.fontFamily = "pacfont";
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        ctx.fillText("Game Won!", canvas.width / 2, canvas.height / 2);
        return true;
    }
}

tileMap.setCanvasSize(canvas);
// calling the game function 75 times per second (1000 ms)
setInterval(game, 1000 / 100);