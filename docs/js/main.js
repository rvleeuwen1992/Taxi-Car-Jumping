var Block = (function () {
    function Block(parent, g) {
        this.div = document.createElement("block");
        parent.appendChild(this.div);
        this.game = g;
        this.speed = -4;
        this.x = 800;
        this.y = 240;
        this.width = 32;
        this.height = 31;
    }
    Block.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -93) {
            this.x = 1283;
        }
    };
    return Block;
}());
var Wheel = (function () {
    function Wheel(parent, offset) {
        this.div = document.createElement("wheel");
        parent.appendChild(this.div);
        this.x = offset;
        this.y = 30;
        this.speed = 0;
    }
    Wheel.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Wheel;
}());
var Car = (function () {
    function Car(parent, g) {
        var _this = this;
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
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this._behavior = new Drive(this);
    }
    Object.defineProperty(Car.prototype, "behavior", {
        get: function () {
            return this._behavior;
        },
        set: function (b) {
            this._behavior = b;
        },
        enumerable: true,
        configurable: true
    });
    Car.prototype.onKeyDown = function (e) {
        console.log(e.key);
        if (e.key == ' ') {
            this.jumpDirection = -3;
            this.jumping();
        }
        else if (e.key == 'a') {
            this.slower();
        }
        else if (e.key == 'd') {
            this.faster();
        }
    };
    Car.prototype.driving = function () {
        this._behavior = new Drive(this);
    };
    Car.prototype.faster = function () {
        this._behavior.faster();
    };
    Car.prototype.slower = function () {
        this._behavior.slower();
    };
    Car.prototype.jumping = function () {
        this._behavior = new Jump(this);
    };
    Car.prototype.crashing = function () {
        this._behavior = new Crash(this);
    };
    Car.prototype.draw = function () {
        this._behavior.performBehavior();
        if (!this.game.checkCollision()) {
            this.score += 0.0314;
        }
        if (this.x >= 780) {
            this.game.endGame(0);
        }
        if (this.x <= -100) {
            this.game.endGame(0);
        }
        document.getElementById("score").innerHTML = "Score: " + Math.floor(this.score);
        console.log(this.x);
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.wheel1.draw();
        this.wheel2.draw();
    };
    return Car;
}());
var CarSwitch = (function () {
    function CarSwitch(parent) {
        var _this = this;
        this.div = document.createElement("car");
        parent.appendChild(this.div);
        this.state = 1;
        this.speed = 2;
        this.jumpDirection = -3;
        this.x = 0;
        this.y = 220;
        this.wheel1 = new Wheel(this.div, 20);
        this.wheel2 = new Wheel(this.div, 100);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    CarSwitch.prototype.onKeyDown = function (e) {
        if (this.state == 1) {
            this.state = 2;
        }
    };
    CarSwitch.prototype.draw = function () {
        switch (this.state) {
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
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.wheel1.draw();
        this.wheel2.draw();
    };
    CarSwitch.prototype.driving = function () {
        this.x += this.speed;
    };
    CarSwitch.prototype.jumping = function () {
    };
    CarSwitch.prototype.crashing = function () {
        this.wheel1.speed = -2;
        this.wheel2.speed = 2;
        this.div.classList.add("crashed");
        document.getElementById("plateau").classList.add("animationpaused");
        document.getElementById("sky").classList.add("animationpaused");
    };
    return CarSwitch;
}());
var Coin = (function () {
    function Coin(parent, g) {
        this.div = document.createElement("coin");
        parent.appendChild(this.div);
        this.game = g;
        this.speed = -4;
        this.x = 700;
        this.y = 140;
        this.width = 32;
        this.height = 31;
    }
    Coin.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -93) {
            this.x = 1561;
        }
    };
    return Coin;
}());
var Crash = (function () {
    function Crash(c) {
        this.car = c;
    }
    Crash.prototype.update = function () {
        console.log("crash-update");
    };
    Crash.prototype.performBehavior = function () {
        console.log("crash-onHit");
        this.car.wheel1.speed = -2;
        this.car.wheel2.speed = 2;
        this.car.div.classList.add("crashed");
    };
    Crash.prototype.faster = function () {
    };
    Crash.prototype.slower = function () {
    };
    return Crash;
}());
var Drive = (function () {
    function Drive(c) {
        this.car = c;
    }
    Drive.prototype.update = function () {
        console.log("drive-update");
    };
    Drive.prototype.performBehavior = function () {
        console.log("drive-performBehavior");
        this.car.x += this.car.speed;
    };
    Drive.prototype.faster = function () {
        if (this.car.speed >= 1) {
            this.car.speed = 1;
        }
        else {
            this.car.speed += 1;
        }
    };
    Drive.prototype.slower = function () {
        if (this.car.speed <= -1) {
            this.car.speed = -1;
        }
        else {
            this.car.speed += -1;
        }
    };
    return Drive;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        var container = document.getElementById("container");
        this.car = new Car(container, this);
        this.block = new Block(container, this);
        this.longblock = new LongBlock(container, this);
        this.coin = new Coin(container, this);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.draw();
        this.block.draw();
        this.longblock.draw();
        this.coin.draw();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.checkCollision = function () {
        if (this.car.x < this.block.x + this.block.width &&
            this.car.x + this.car.width > this.block.x &&
            this.car.y < this.block.y + this.block.height &&
            this.car.height + this.car.y > this.block.y) {
            this.endGame(Math.floor(this.car.score));
            this.car.score += 0;
            document.getElementById("plateau").classList.add("animationpaused");
            document.getElementById("sky").classList.add("animationpaused");
            document.getElementById("block").classList.add("animationpaused");
            document.getElementById("long_block").classList.add("animationpaused");
            return true;
        }
        if (this.car.x < this.longblock.x + this.longblock.width &&
            this.car.x + this.car.width > this.longblock.x &&
            this.car.y < this.longblock.y + this.longblock.height &&
            this.car.height + this.car.y > this.longblock.y) {
            this.endGame(Math.floor(this.car.score));
            this.car.score += 0;
            document.getElementById("plateau").classList.add("animationpaused");
            document.getElementById("sky").classList.add("animationpaused");
            document.getElementById("block").classList.add("animationpaused");
            document.getElementById("long_block").classList.add("animationpaused");
            return true;
        }
        if (this.car.x < this.coin.x + this.coin.width &&
            this.car.x + this.car.width > this.coin.x &&
            this.car.y < this.coin.y + this.coin.height &&
            this.car.height + this.car.y > this.coin.y) {
            this.car.score += 5;
            this.coin.x = 1916;
        }
    };
    Game.prototype.endGame = function (score) {
        document.getElementById("score").innerHTML = "Game over! Score: " + score;
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = new Game();
});
var Jump = (function () {
    function Jump(c) {
        this.car = c;
    }
    Jump.prototype.update = function () {
        console.log("jump-update");
    };
    Jump.prototype.performBehavior = function () {
        console.log("jump-performBehavior");
        this.car.x += this.car.speed;
        this.car.y += this.car.jumpDirection;
        if (this.car.y < 120) {
            this.car.jumpDirection = 3;
            console.log("jump-onJump123");
        }
        if (this.car.y > 217) {
            this.car.jumpDirection = 0;
            this.car.driving();
        }
    };
    Jump.prototype.faster = function () {
    };
    Jump.prototype.slower = function () {
    };
    return Jump;
}());
var LongBlock = (function () {
    function LongBlock(parent, g) {
        this.div = document.createElement("long_block");
        parent.appendChild(this.div);
        this.game = g;
        this.speed = -4;
        this.x = 1200;
        this.y = 240;
        this.width = 64;
        this.height = 32;
    }
    LongBlock.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.x <= -93) {
            this.x = 1283;
        }
    };
    return LongBlock;
}());
//# sourceMappingURL=main.js.map