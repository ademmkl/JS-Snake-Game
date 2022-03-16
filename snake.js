class SnakeGame{
    constructor(){
        this.canvas= document.getElementById("snakeGameCanvas");
        this.context= this.canvas.getContext("2d");
        document.addEventListener("keydown",(event) => this.onKeyPress(event));
    }

    init(){
        this.gridSize = this.tileCount = 20;
        this.positionX = Math.floor(Math.random()*30);
        this.positionY = Math.floor(Math.random()*30);
        this.appleX = this.appleY = Math.floor(Math.random()*30);
        this.tailSize= 5;
        this.trail = [];
        this.velocityX = 0
        this.velocityY = -1;
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
        
        if (this.positionX < 0){
            this.positionX += 30;
        }else if (this.positionY < 0){
            this.positionY += 30;
        }else if (this.positionX > 29){
            this.positionX -= 30;
        } else if (this.positionY > 29){
            this.positionY -= 30;
        }

        this.trail.forEach((t)=>{
            if (this.positionX === t.positionX && this.positionY === t.positionY){
                this.reset();
            }
        });

        if (this.positionX == this.appleX && this.positionY == this.appleY){
            this.appleX = this.appleY= Math.floor(Math.random()*30);
            this.tailSize++;
        }

        this.trail.push({positionX: this.positionX, positionY: this.positionY});

        while (this.trail.length > this.tailSize){
            this.trail.shift();
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

    reset = () => {
        clearInterval(this.time);
        this.init();
    }
}

const mySnakeGame= new SnakeGame();
window.onload = () => mySnakeGame.init();