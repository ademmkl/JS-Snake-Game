class SnakeGame{
    constructor(){
        this.canvas= document.getElementById("snakeGameCanvas");
        this.context= this.canvas.getContext("2d");
        document.addEventListener("keydown",(event) => this.onKeyPress(event));
    }

    init(){
        this.gridSize = this.tileCount = 20;
        this.positionX = this.positionY= Math.floor(Math.random()*this.gridSize);
        this.appleX = this.appleY= 5;
        this.tailSize= 5;
        this.trail = [];
        this.velocityX = this.velocityY = 0;
        this.time = setInterval(this.loop, 1000/10);
        this.context.fillStyle = "#000";
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

    }

    onKeyPress = (event) => {
        if ((event.code == "KeyA" || event.code == "ArrowLeft") && this.velocityX != 1){
            this.velocityX = -1;
            this.velocityY = 0; 
        }else if ((event.code == "KeyD" || event.code == "ArrowRight") && this.velocityX != -1){
            this.velocityX = 1;
            this.velocityY = 0;
        }else if ((event.code == "KeyW" || event.code == "ArrowUp") && this.velocityY != 1){
            this.velocityX = 0;
            this.velocityY = -1;
        }else if ((event.code == "KeyS" || event.code == "ArrowDown") && this.velocityY != -1){
            this.velocityX = 0;
            this.velocityY = 1;
        }
    }

    loop = () => {
        this.update();
        this.draw();
    }

    update = () => {
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        /*if (this.trail.length <= this.tailSize){
            this.trail.push({positionX: this.positionX, positionY: this.positionY});   
        }

        if (this.velocityX != 0 || this.velocityY != 0){
            this.trail.shift();
        }*/

        this.trail.push({positionX: this.positionX, positionY: this.positionY});

        if (this.trail.length > this.tailSize){
            this.trail.shift();
        }

        if (this.trail[this.trail.length - 1].positionX == this.appleX && this.trail[this.trail.length - 1].positionY == this.appleY){
            this.appleX = this.appleY= Math.floor(Math.random()*this.gridSize);
            this.tailSize++;
        }
    }

    draw = () => {
        this.context.fillStyle = "#000";
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

        this.context.fillStyle = "#fff"
        this.context.font = "20px Times New Roman";
        this.context.fillText(this.tailSize - 5, 20, 40) 

        this.context.fillStyle = "#33cc33";
        this.trail.forEach((t) => {
            this.context.fillRect(t.positionX*this.gridSize, t.positionY*this.gridSize, this.gridSize - 2, this.gridSize - 2);
        });

        this.context.fillStyle = "#f00";
        this.context.fillRect(this.appleY*this.gridSize,this.appleX*this.gridSize, this.gridSize - 2, this.gridSize - 2);
    }
}

const mySnakeGame= new SnakeGame();
window.onload = () => mySnakeGame.init();