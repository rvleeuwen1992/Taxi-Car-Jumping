/// <reference path="wheel.ts"/>

class CarSwitch {

    private speed:number;
    private div:HTMLElement;
    private x:number;
    private y:number;
    private wheel1:Wheel;
    private wheel2:Wheel;
    private state:number;
    private jumpDirection:number;
            
    constructor(parent:HTMLElement) {
        this.div = document.createElement("car");
        parent.appendChild(this.div);

        this.state = 1;

        this.speed = 2;
        this.jumpDirection = -3;
        this.x = 0;
        this.y = 220;

        this.wheel1 = new Wheel(this.div, 20);
        this.wheel2 = new Wheel(this.div, 100);
        
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
    }


    private onKeyDown(e:KeyboardEvent):void {
        if(this.state == 1){
            this.state = 2;
        }
    }

    public draw():void {
        // kijken welke state actief is
        switch(this.state) {
        case 1:
            this.driving();
            break;
        case 2:
            this.jumping();
            break;
        case 3:
            this.crashing();
            break;
        }

        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
        this.wheel1.draw();
        this.wheel2.draw();
    } 

    public driving():void {
        this.x += this.speed;
    } 

    public jumping():void {
        /*this.x += this.speed;
        this.y += this.jumpDirection;
        if(this.y < 140) this.jumpDirection = 3;
        if(this.y > 217) this.state = 3;*/
    }

    public crashing():void {
        this.wheel1.speed = -2;
        this.wheel2.speed = 2;
        this.div.classList.add("crashed");

        // gameOver functie van game aanroepen via singleton
        document.getElementById("plateau").classList.add("animationpaused");
        document.getElementById("sky").classList.add("animationpaused");
    }

}