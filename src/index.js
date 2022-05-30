import TileMap from './TileMap.js';

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const tileSize = 32;
const tileMap = new TileMap(tileSize);
let pacman = tileMap.getPacman();
const ghosts = tileMap.getGhost();
const pointsHTMLElement = document.getElementById("points");
const pacLivesHTMLElement = document.getElementById("pacLives");
let pacLives = 2;
const retryBtn = document.getElementById("retryBtn");
retryBtn.style.display = "none";
let retry = false;

function game(){
    tileMap.draw(ctx);
    if (!pacmanHasNoLives()){
        pacman.draw(ctx, pause(), ghosts, pointsHTMLElement);
    }
    ghosts.forEach((ghost) => ghost.draw(ctx, pause(), pacman));
    isGameOver();
    isGameWon();
    if (!retry) {
        drawGameOver();
    }
}

function pause(){
    return isGameOver() === true || pacman.eatingGhost === true;
}

function isGameOver(){
    return !pacman.pinkDotActive && pacmanHasNoLives()
}

function pacmanHasNoLives(){
    if (ghosts.some(ghost => ghost.collideWith(pacman)) && !pacman.pinkDotActive){
        if (pacLives === 0){
            return true;
        } else {
            pacLives--;
            tileMap.map[15][10] = 4;
            pacman = tileMap.getPacman();
            pacLivesHTMLElement.innerHTML = pacLives.toString();
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
        // retry:
        ctx.font = "30px pixelfont";
        ctx.fontFamily = "pixelfont";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("retry", canvas.width / 2, canvas.height / 1.75); //width=640, height=640
        canvas.addEventListener('click', checkClick, false);
    }
}

function checkClick(e){
    let mousePos = getMousePos(e);

    if (mousePos.x >= 284 && mousePos.x <= 352 &&
        mousePos.y >= 348 && mousePos.y <= 372) {

        location.reload();
    }
}

function getMousePos(e){
    let r = canvas.getBoundingClientRect();
    return {
        x: e.clientX - r.left,
        y: e.clientY - r.top
    };
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