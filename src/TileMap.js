import Pacman from "./Pacman.js";
import Ghost from "./Ghost.js";

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

        this.twoHundred = new Image();
        this.twoHundred.src = "../images/200.png";

        this.ghostWall = new Image();
        this.ghostWall.src = "../images/ghostWall.png";

        this.movingDirection = {
            up: 0,
            down: 1,
            left: 2,
            right: 3
        };
    }

    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 3, 1, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 3, 1, 3, 3, 3, 1, 9, 9, 1, 3, 3, 3, 1, 1, 1, 3, 3, 1],
        [1, 3, 3, 1, 3, 3, 3, 1, 5, 6, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 3, 1, 3, 3, 3, 1, 7, 8, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 3, 1, 3, 3, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 3, 3, 1],
        [1, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1],
        [1, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1],
        [1, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 1, 3, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 3, 1],
        [1, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 1, 3, 1],
        [1, 3, 3, 0, 3, 3, 0, 0, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 1, 1, 1, 3, 0, 0, 0, 4, 0, 0, 0, 3, 1, 3, 3, 3, 3, 1],
        [1, 3, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 1],
        [1, 3, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
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
                } else if (tile === 9){
                    ctx.drawImage(this.ghostWall, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
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

    getGhost() {
        let ghosts = [];
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 5 || tile === 6 || tile === 7 || tile === 8) {
                    this.map[row][column] = 0;
                    ghosts[tile - 5] = new Ghost(column * this.tileSize, row * this.tileSize, this.tileSize, this.map, tile - 5);
                }
            }
        }
        return ghosts;
    }

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }
}
