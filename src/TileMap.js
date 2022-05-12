import Pacman from "./Pacman.js";

export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;

        this.yelloDot = new Image();
        this.yelloDot.src = "../images/yellowDot.png";

        this.pinkDot = new Image();
        this.pinkDot.src = "../images/pinkDot.png";

        this.wall = new Image();
        this.wall.src = "../images/wall.png";

        this.black = new Image();
        this.black.src = "../images/black.png";

        this.blueGhost = new Image();
        this.blueGhost.src = "../images/blueGhost.png";

        this.pinkGhost = new Image();
        this.pinkGhost.src = "../images/pinkGhost.png";

        this.redGhost = new Image();
        this.redGhost.src = "../images/redGhost.png";

        this.yellowGhost = new Image();
        this.yellowGhost.src = "../images/yellowGhost.png";

        this.movingDirection = {
            up: 0,
            down: 1,
            left: 2,
            right: 3
        };
    }

    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];


    draw(ctx) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 1) {
                    ctx.drawImage(this.wall, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                    //(image, x space to wall, y space to wall, image height, image width)
                } else if (tile === 0) {
                    ctx.drawImage(this.yelloDot, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                } else if (tile === 2){
                    ctx.drawImage(this.black, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                } else if (tile === 3){
                    ctx.drawImage(this.pinkDot, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                } else if (tile === 5){
                    ctx.drawImage(this.blueGhost, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                } else if (tile === 6){
                    ctx.drawImage(this.pinkGhost, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                } else if (tile === 7){
                    ctx.drawImage(this.redGhost, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                } else if (tile === 8){
                    ctx.drawImage(this.yellowGhost, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    }

    getPacman() {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 4){
                    this.map[row][column] = 2;
                    return new Pacman(column*this.tileSize, row*this.tileSize, this.tileSize, this.map);
                }
            }
        }
    }

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }
}
