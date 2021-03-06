//import PacmanMovement from './PacmanMovement.js';

export default class Pacman{
    constructor(column, row, tileSize, tileMap) {
        this.column = column;
        this.row = row;
        this.tileSize = tileSize;
        this.tileMap = tileMap;

        // images
        this.pac0 = new Image();
        this.pac0.src = "../images/pac0.png";

        this.pac1 = new Image();
        this.pac1.src = "../images/pac1.png";

        this.pac2 = new Image();
        this.pac2.src = "../images/pac2.png";

        this.pacImgs = [this.pac0, this.pac1, this.pac2];

        this.pacIndex = 0;
        this.pacAnimationTimer = 10;


        document.addEventListener("keydown", this.listener);

        this.movingDirection = {
            up: 0,
            down: 1,
            left: 2,
            right: 3
        };

        this.currentDirection = null;
        this.requestDirection = null;

        this.pacRotation = 0;

        this.pinkDotActive = false;

        this.pinkDotSoonInactive = false;

        this.pointsCntr = 0;

        this.eatingGhost = false;

        this.collideGhost = null;
    }

    draw(ctx, pause, ghosts, points){
            if (!pause){
                this.move();
                this.animation();
            }
            this.eatGhost(ghosts);
            points.innerHTML = this.pointsCntr.toString();

            const size = this.tileSize / 2;
            ctx.save();
            ctx.translate(this.column + size, this.row + size);
            // Verschiebt alles, was nach dem Aufrufen von translate gezeichnet wird, um die angegebenen Koordinaten.
            // Dies bedeutet, dass allen folgenden x-Koordinaten der Wert tx bzw. allen y-Koordinaten ty hinzuaddiert wird.
            ctx.rotate((this.pacRotation * 90 * Math.PI) / 180);
            ctx.drawImage(this.pacImgs[this.pacIndex], -size, -size, this.tileSize, this.tileSize);
            ctx.restore();
    }

    move(){
        if (this.currentDirection !== this.requestDirection) {
            if (this.rowColIsInteger(this.row / this.tileSize, this.column / this.tileSize)) {
                if (this.isBorder(this.row, this.column, this.requestDirection) === false) {
                    this.currentDirection = this.requestDirection;
                }
            }
        }
        if (this.isBorder(this.row, this.column, this.currentDirection) === true){return;}

        switch (this.currentDirection){
            case this.movingDirection.up:
                this.row -= 1;
                this.pacRotation = 3;
                break;
            case this.movingDirection.down:
                this.row += 1;
                this.pacRotation = 1;
                break;
            case this.movingDirection.left:
                this.column -= 1;
                this.pacRotation = 2;
                break;
            case this.movingDirection.right:
                this.column += 1;
                this.pacRotation = 0;
                break;
        }

        if (this.rowColIsInteger(this.row / this.tileSize, this.column / this.tileSize)){
            if (this.tileMap[this.row / this.tileSize][this.column / this.tileSize] === 3){
                this.eatPinkDot();
                this.pointsCntr += 50;
            } else {
                this.pointsCntr += 10;
            }
            this.tileMap[this.row / this.tileSize][this.column / this.tileSize] = 2;
        }
    }

    listener = (event) => {
        //up
        if (event.keyCode === 38){
            if (this.currentDirection === this.movingDirection.down)
                this.currentDirection = this.movingDirection.up;
            this.requestDirection = this.movingDirection.up;
        }
        //down
        if (event.keyCode === 40){
            if (this.currentDirection === this.movingDirection.up)
                this.currentDirection = this.movingDirection.down;
            this.requestDirection = this.movingDirection.down;
        }
        //left
        if (event.keyCode === 37){
            if (this.currentDirection === this.movingDirection.right)
                this.currentDirection = this.movingDirection.left;
            this.requestDirection = this.movingDirection.left;
        }
        //right
        if (event.keyCode === 39){
            if (this.currentDirection === this.movingDirection.left)
                this.currentDirection = this.movingDirection.right;
            this.requestDirection = this.movingDirection.right;
        }
    }

    animation(){
        this.pacAnimationTimer--;
        if (this.pacAnimationTimer === 0){
            this.pacAnimationTimer = 10;
            this.pacIndex++;
            if (this.pacIndex === this.pacImgs.length){
                this.pacIndex = 0;
            }
        }
    }

    isBorder(row, column, direction){
        let rowCopy = 0;
        let columnCopy = 0;
        let isInteger = false;

        switch (direction){
            case this.movingDirection.up:
                columnCopy = column / this.tileSize;
                rowCopy = (row - this.tileSize) / this.tileSize;
                break;
            case this.movingDirection.down:
                columnCopy = column / this.tileSize;
                rowCopy = (row + this.tileSize) / this.tileSize;
                break;
            case this.movingDirection.left:
                columnCopy = (column - this.tileSize) / this.tileSize;
                rowCopy = row / this.tileSize;
                break;
            case this.movingDirection.right:
                columnCopy = (column + this.tileSize) / this.tileSize;
                rowCopy = row / this.tileSize;
                break;
        }
        isInteger = this.rowColIsInteger(rowCopy, columnCopy);
        if (isInteger === false){
            return;
        }
        if (isInteger === true){
            isInteger = false;
            const tile = this.tileMap[rowCopy][columnCopy];
            return tile === 1 || tile === 9;
        }
    }

    rowColIsInteger(row, column){
        return Number.isInteger(column) === true && Number.isInteger(row) === true;
    }

    eatPinkDot(){
        this.pinkDotActive = true;
        this.pinkDotTimer = setTimeout(() => {
            this.pinkDotActive = false;
            this.pinkDotSoonInactive = false;
        }, 12000);
        this.pinkDotTimer = setTimeout(() => {
            this.pinkDotSoonInactive = true;
        }, 9000);
    }

    eatGhost(ghosts){
        if (this.pinkDotActive){
            // it filters the array "ghosts" and saves the ghost that collided with pacman in the const
            const collideGhosts = ghosts.filter((ghost) => ghost.collideWith(this));
            this.collideGhost = collideGhosts;
            collideGhosts.forEach((ghost) => {
                if (ghost != null){
                    this.pointsCntr += 200;
                    this.eatingGhost = true;
                    this.eatingGhostTimer = setTimeout(() => {this.eatingGhost = false}, 500);
                }
            });
        }
    }
}

/*static
test() {
    console.log("1, 1 should be true", Pacman.rowColIsInteger(1, 1));
    console.log("1.001, 1 should be false", Pacman.rowColIsInteger(1.001, 1));
    console.log("1, 1.999 should be false", Pacman.rowColIsInteger(1, 1.999));
}*/
/*if (direction === this.movingDirection.up){
    columnCopy = column;
    rowCopy = row - this.tileSize;
}
if (direction === this.movingDirection.down){
    columnCopy = column;
    rowCopy = row + this.tileSize;
}
if (direction === this.movingDirection.left){
    columnCopy = column - this.tileSize;
    rowCopy = row;
}
if (direction === this.movingDirection.right){
    columnCopy = column + this.tileSize;
    rowCopy = row;
}*/