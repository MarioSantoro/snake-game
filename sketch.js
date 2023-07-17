let snake;
let scl = 20;
let food;
function setup() {
    createCanvas(800, 800);
    snake = new Snake();
    frameRate(10)

    pickLocation();
}

function pickLocation() {
    let col = floor(width / scl);
    let row = floor(height / scl);
    food = createVector(floor(random(col)), floor(random(row)))
    food.mult(scl)
}

function draw() {
    background(221);
    snake.update();
    snake.show()

    fill(255, 0, 10);
    rect(food.x, food.y, scl, scl)

    if (snake.eat(food)) {
        pickLocation();
    };
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        snake.dir(0, 1);
    } else if (keyCode === LEFT_ARROW) {
        snake.dir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        snake.dir(1, 0);
    }
}

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.update = function () {
        if (this.total === this.tail.length) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl)
        this.y = constrain(this.y, 0, height - scl)
    }

    this.show = function () {
        fill(255);
        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }

    this.eat = function (pos) {
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }
}