class Drive implements Behavior {
    public car : Car;

    constructor(c:Car){
        this.car = c;
    }

    public update(){
        console.log("drive-update");
    }

    // voer ren code uit
    public performBehavior(){
        console.log("drive-performBehavior");
        this.car.x += this.car.speed;
    }

    public faster(){
        if(this.car.speed >= 1){
            this.car.speed = 1;
        }else{
            this.car.speed += 1;
        }
    }

    public slower(){
        if(this.car.speed <= -1){
            this.car.speed = -1;
        }else{
            this.car.speed += -1;
        }
    }
}