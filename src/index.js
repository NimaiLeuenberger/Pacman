import TileMap from './TileMap.js';

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const tileSize = 32;
const tileMap = new TileMap(tileSize);
let pacman = tileMap.getPacman();
let ghosts = tileMap.getGhost();
const pointsHTMLElement = document.getElementById("points");
let points = 0;
const pacLivesHTMLElement = document.getElementById("pacLives");
let pacLives = 2;
let ghostRespawnTimeout = false;
let eatenGhost = ghosts[0];

const retryBtn = document.getElementById("retry");

function game(){
    tileMap.draw(ctx);
    if (!pacmanHasNoLives()){
        pacman.draw(ctx, pause(), ghosts, pointsHTMLElement);
    }
    ghosts.forEach(function (ghost) {
        if (ghost.ghostNumber === eatenGhost.ghostNumber){
            ghost.draw(ctx, pauseGhost(), pacman);
        } else {
            ghost.draw(ctx, pause(), pacman);
        }
    });
    isGameOver();
    isGameWon();
    drawGameOver();
    eatGhost();
    console.log(tileMap.map[ghosts[0].originalPos.row][ghosts[0].originalPos.column]);
}

function pause(){
    return isGameOver() === true || pacman.eatingGhost === true || window.location.href.includes("edit.html") === true;
}

function pauseGhost(){
    return isGameOver() === true || pacman.eatingGhost === true || ghostRespawnTimeout === true || window.location.href.includes("edit.html") === true;
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
            points = pacman.pointsCntr;
            pacman = tileMap.getPacman();
            pacman.pointsCntr = points;
            pacLivesHTMLElement.innerHTML = pacLives.toString();
            return false;
        }
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
        // retry:
        ctx.font = "30px pixelfont";
        ctx.fontFamily = "pixelfont";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("retry", canvas.width / 2, canvas.height / 1.75); //width=640, height=640
        canvas.addEventListener('click', checkClick, false);
        return true;
    }
}

function eatGhost(){
    if (pacman.eatingGhost){
        const collideGhosts = ghosts.filter(function (ghost) {
            ghost.collideWith(pacman);
            if (ghost.collideWith(pacman)) {
                tileMap.map[ghost.originalPos.row][ghost.originalPos.column] = ghost.ghostNumber+5;
                ghosts[ghost.ghostNumber] = tileMap.getGhost()[ghost.ghostNumber];
                ghostRespawnTimeout = true;
                setTimeout(() => {ghostRespawnTimeout = false;}, 3000);
                eatenGhost = ghost;
            }
        });
    }
}

tileMap.setCanvasSize(canvas);
// calling the game function 75 times per second (1000 ms)
setInterval(game, 1000 / 100);

retryBtn.onclick = function (){
    location.reload();
}


import SelectionArea from "https://cdn.jsdelivr.net/npm/@viselect/vanilla/lib/viselect.esm.js";
const app = document.querySelector<HTMLDivElement>(".container");
for (let i = 0; i < 20; i++) {
    app?.appendChild(document.createElement("div"));
}

const selection = new SelectionArea({
    selectables: [".container > div"],
    boundaries: [".container"]
})
    .on("start", ({ store, event }) => {
            for (const el of store.stored) {
                el.classList.remove("selected");
            }
            selection.clearSelection();
    })
    .on(
        "move",
        ({
             store: {
                 changed: { added, removed }
             }
         }) => {
            for (const el of added) {
                el.classList.add("selected");
            }

            for (const el of removed) {
                el.classList.remove("selected");
            }
        }
    )
    .on("stop", ({ store: { stored } }) => console.log(stored.length));
