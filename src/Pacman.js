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
    }

    draw(ctx){
        this.move();
        this.animation();

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
            if (Number.isInteger(this.row / this.tileSize) && Number.isInteger(this.column / this.tileSize)) {
                if (this.isBorder() === false) {
                    this.currentDirection = this.requestDirection;
                }
            }
        }

        if (this.isBorder()){return;}

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

    isBorder(){
        if (this.currentDirection === this.movingDirection.up){
            let rowCopy = this.row;
            while (Number.isInteger(rowCopy / this.tileSize) === false){rowCopy--;}
            if (this.tileMap[rowCopy / this.tileSize][this.column / this.tileSize] === 1){return true}
        }
        if (this.currentDirection === this.movingDirection.down){
            let rowCopy = this.row;
            while (Number.isInteger(rowCopy / this.tileSize) === false){rowCopy++;}
            if (this.tileMap[rowCopy / this.tileSize][this.column / this.tileSize] === 1){return true}
        }
        if (this.currentDirection === this.movingDirection.left){
            let columnCopy = this.column;
            while (Number.isInteger(columnCopy / this.tileSize) === false){columnCopy--;}
            if (this.tileMap[this.row / this.tileSize][columnCopy / this.tileSize] === 1){return true}
        }
        if (this.currentDirection === this.movingDirection.right){
            let columnCopy = this.column;
            while (Number.isInteger(columnCopy / this.tileSize) === false){columnCopy++;}
            if (this.tileMap[this.row / this.tileSize][columnCopy / this.tileSize] === 1){return true}
        }
        else {return false}
    }
}
