/// <reference path="wheel.ts"/>

class Car {

    public speed: number;
    public div: HTMLElement;
    private game: Game;
    public x: number;
    public y: number;
    public width : number;
    public height: number;
    public wheel1: Wheel;
    public wheel2: Wheel;
    public state: number;
    public jumpDirection: number;
    public score : number;

    private _behavior : Behavior;

    public get behavior(){
        return this._behavior;
    }

    public set behavior(b: Behavior){
        this._behavior = b;
    }

    constructor(parent: HTMLElement, g: Game) {
        this.div = document.createElement("car");
        parent.appendChild(this.div);
        this.game = g;
        this.score = 1;

        this.speed = 0;
        this.jumpDirection = -3;
        this.x = 100;
        this.y = 220;
        this.width = 145;
        this.height = 45;

        this.wheel1 = new Wheel(this.div, 20);
        this.wheel2 = new Wheel(this.div, 100);

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));

        this._behavior = new Drive(this);
    }


    private onKeyDown(e: KeyboardEvent): void {
        console.log(e.key);
        
        if(e.key == ' ') {
            this.jumpDirection = -3;
            this.jumping();
        } else if(e.key == 'a'){
            this.slower();
        } else if(e.key == 'd'){
            this.faster();
        }
    }

    // het rennen (wordt standaard uitgevoerd)
    public driving(): void{
        this._behavior = new Drive(this);
    }

    // wanneer het karakter harder gaat (D)
    public faster(): void{
        this._behavior.faster();
    }

    // wanneer het karakter langzamer gaat (A)
    public slower(): void{
        this._behavior.slower();
    }

    // wanneer het karakter sprint (spatie)
    public jumping(): void{
        this._behavior = new Jump(this);
    }

    // wanneer het karakter in aanraking komt met de rots
    public crashing(): void{
        this._behavior = new Crash(this);
    }

    public draw(): void {

        this._behavior.performBehavior();

        // Check collision functie
        if(!this.game.checkCollision()){
            this.score += 0.0314;
        }

        // Wanneer de speler uit het scherm gaat, laat het scherm Game Over zien met 0 punten
        // Rechts te ver uit het scherm
        if(this.x >= 780){
            this.game.endGame(0);
        }
        // Links te ver uit het scherm
        if(this.x <= -100){
            this.game.endGame(0);
        }

        // Score teller
        document.getElementById("score").innerHTML = "Score: " + Math.floor(this.score);
        console.log(this.x);

        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.wheel1.draw();
        this.wheel2.draw();
    } 


}