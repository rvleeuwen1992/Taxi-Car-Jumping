class Game {

    private car : Car;
    private block : Block;
    private longblock : LongBlock;
    private coin : Coin;

    constructor() {
        let container = document.getElementById("container");
        this.car = new Car(container, this);
        this.block = new Block(container, this);
        this.longblock = new LongBlock(container, this);
        this.coin = new Coin(container, this);

        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.car.draw();
        this.block.draw();
        this.longblock.draw();
        this.coin.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    // Check collisions tussen speler en objecten
    public checkCollision(){

        // Check voor collision met kleine rots
        if(this.car.x < this.block.x + this.block.width &&
        this.car.x + this.car.width > this.block.x &&
        this.car.y < this.block.y + this.block.height &&
        this.car.height + this.car.y > this.block.y){

            this.endGame(Math.floor(this.car.score));
            this.car.score += 0;
            document.getElementById("plateau").classList.add("animationpaused");
            document.getElementById("sky").classList.add("animationpaused");
            document.getElementById("block").classList.add("animationpaused");
            document.getElementById("long_block").classList.add("animationpaused");
            return true;
        }

        // Check voor collision met de lange rots
        if(this.car.x < this.longblock.x + this.longblock.width &&
        this.car.x + this.car.width > this.longblock.x &&
        this.car.y < this.longblock.y + this.longblock.height &&
        this.car.height + this.car.y > this.longblock.y){

            this.endGame(Math.floor(this.car.score));
            this.car.score += 0;
            document.getElementById("plateau").classList.add("animationpaused");
            document.getElementById("sky").classList.add("animationpaused");
            document.getElementById("block").classList.add("animationpaused");
            document.getElementById("long_block").classList.add("animationpaused");
            return true;
        }

        // Check voor collision met coin
        if(this.car.x < this.coin.x + this.coin.width &&
        this.car.x + this.car.width > this.coin.x &&
        this.car.y < this.coin.y + this.coin.height &&
        this.car.height + this.car.y > this.coin.y){
            this.car.score += 5;
            this.coin.x = 1916;
        }
    }

    // Laat eindscore zien in het scherm
    public endGame(score : number){
        document.getElementById("score").innerHTML = "Game over! Score: " + score;
    }
} 


// load
window.addEventListener("load", function() {
    let g:Game = new Game();
});