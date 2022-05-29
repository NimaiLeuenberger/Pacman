

export default class Ghost{
    constructor(column, row, tileSize, tileMap, ghostNumber) {
        this.column = column;
        this.row = row;
        this.tileSize = tileSize;
        this.tileMap = tileMap;
        this.ghostNumber = ghostNumber;

        //images
        this.blueGhost = new Image();
        this.blueGhost.src = "../images/blueGhost.png";

        this.pinkGhost = new Image();
        this.pinkGhost.src = "../images/pinkGhost.png";

        this.redGhost = new Image();
        this.redGhost.src = "../images/redGhost.png";

        this.yellowGhost = new Image();
        this.yellowGhost.src = "../images/yellowGhost.png";

        this.pinkDotGhost = new Image();
        this.pinkDotGhost.src = "../images/pinkDotGhost.png";

        this.ghostImgs = [this.blueGhost, this.pinkGhost, this.redGhost, this.yellowGhost, this.pinkDotGhost];

        this.movingDirection = {
            up: 0,
            down: 1,
            left: 2,
            right: 3
        };

        this.currentDirection = null;
        this.requestDirection = null;

        this.directionTimer = 20;
    }

    draw(ctx, pause, pacman){
        if (pause === false) {
            this.move();
            this.direction();
        }

        this.setGhostImages(pacman, ctx);
    }

    move(){
        if (this.currentDirection !== this.requestDirection) {
            //console.log("current direction: " + this.currentDirection + " requested direction: " + this.requestDirection);
            if (this.rowColIsInteger(this.row / this.tileSize, this.column / this.tileSize)) {
                //console.log("is integer");
                if (this.isBorder(this.row, this.column, this.requestDirection) === false) {
                    this.currentDirection = this.requestDirection;
                    //console.log("isn't border " + this.currentDirection + " " + this.currentDirection);
                }
            }
        }
        if (this.isBorder(this.row, this.column, this.currentDirection) === true){return;}

        switch (this.currentDirection){
            case this.movingDirection.up:
                this.row -= 1;
                break;
            case this.movingDirection.down:
                this.row += 1;
                break;
            case this.movingDirection.left:
                this.column -= 1;
                break;
            case this.movingDirection.right:
                this.column += 1;
                break;
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
        //console.log("row: " + rowCopy + " column: " + columnCopy + " " + isInteger);
        if (isInteger === false){
            return;
        }
        if (isInteger === true){
            isInteger = false;
            //console.log(this.tileMap[rowCopy][columnCopy]);
            const tile = this.tileMap[rowCopy][columnCopy];
            return tile === 1 || tile === 4;
        }
    }

    rowColIsInteger(row, column){
        return Number.isInteger(column) === true && Number.isInteger(row) === true;
    }

    direction(){
        this.directionTimer--;
        if (this.directionTimer === 0 || this.isBorder(this.row, this.column, this.currentDirection)) {
            this.directionTimer = 50;
            let i = Math.floor(Math.random() * 4);
            switch (i) {
                case 0:
                    this.requestDirection = this.movingDirection.up;
                    break;
                case 1:
                    this.requestDirection = this.movingDirection.down;
                    break;
                case 2:
                    this.requestDirection = this.movingDirection.left;
                    break;
                case 3:
                    this.requestDirection = this.movingDirection.right;
                    break;
            }
        }
    }

    collideWith(pacman){
        if (
            this.row + this.tileSize > pacman.row &&
            this.row < pacman.row + this.tileSize &&
            this.column + this.tileSize > pacman.column &&
            this.column < pacman.column + this.tileSize
        ){
            return true;
        }
        else {
            return false;
        }
    }

    setGhostImages(pacman, ctx) {
        if (!pacman.pinkDotActive) {
            for (let i = 0; i < 4; i++) {
                ctx.drawImage(this.ghostImgs[this.ghostNumber], this.column, this.row, this.tileSize, this.tileSize);
            }
        }
        if (pacman.pinkDotActive){
            ctx.drawImage(this.ghostImgs[4], this.column, this.row, this.tileSize, this.tileSize);
        }
    }
}