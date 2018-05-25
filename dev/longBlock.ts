class LongBlock {

    public speed:number;
    public div:HTMLElement;
    private game : Game;
    public x:number;
    public y:number;
    public width: number;
    public height: number;
            
    constructor(parent:HTMLElement, g: Game) {
        this.div = document.createElement("long_block");
        parent.appendChild(this.div);
        this.game = g;
        this.speed = -4;
        this.x = 1200;
        this.y = 240;

        this.width = 64;
        this.height = 32;
    }

    public draw():void {
        this.x += this.speed;
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";

        if(this.x <= -93){
            this.x = 1283;
        }
    }
}