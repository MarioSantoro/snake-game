let snake;
let scl = 20;
let food;
let gameOver = false;
let gameoverElement = document.querySelector('div.gameover');
let buttonPlay = document.getElementById('play');
buttonPlay = document.addEventListener('click', function () {
    gameoverElement.classList.remove('active');
    gameOver = false;
    snake.clear();
})

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
    background(32, 40, 54);
    snake.update();
    snake.show()

    fill(255, 0, 10);
    rect(food.x, food.y, scl, scl, 20)

    if (snake.eat(food)) {
        pickLocation();
    };
}

function keyPressed() {
    if (keyCode === UP_ARROW && snake.yspeed != 1) {
        snake.dir(0, -1);
    } else if (keyCode === DOWN_ARROW && snake.yspeed != -1) {
        snake.dir(0, 1);
    } else if (keyCode === LEFT_ARROW && snake.xspeed != 1) {
        snake.dir(-1, 0);
    } else if (keyCode === RIGHT_ARROW && snake.xspeed != -1) {
        snake.dir(1, 0);
    }
}

function drawApple(x, y) {
    noStroke();
    push();
    translate(x, y);
    fill(204, 55, 51);
    ellipseMode(CENTER);
    ellipse(0, 0, 80, 75);
    stroke(78, 38, 0);
    strokeWeight(5);
    line(-5, -50, 0, -25);
    noStroke();
    rotate(radians(-30));
    fill(39, 166, 21);
    ellipse(7, -33, 15, 25)
    pop();
}

function Snake() {
    this.x = 200;
    this.y = 200;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 1;
    this.tail = [];
    this.scorePoint = 0;
    let score = document.getElementById('score');

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.clear = function () {
        this.x = 200;
        this.y = 200;
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 1;
        this.tail = [];
        this.scorePoint = 0;
        score.innerHTML = `Score : 0`;
        pickLocation();
    }

    this.update = function () {
        if (gameOver) {
            return;
        }
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

        if ((this.x <= 0) || (this.x >= width) || (this.y <= 0) || (this.y >= height)) {
            gameOver = true;
            console.log('gameover')
            gameoverElement.classList.add('active');
        }

        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                console.log('gameover');
                gameOver = true;
                gameoverElement.classList.add('active');
            }

        }
    }

    this.show = function () {
        noStroke();
        for (let i = 0; i < this.tail.length; i++) {
            fill(0, 255, 0);
            if (keyCode === UP_ARROW && this.eat) {
                if (i == this.tail.length - 1) {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl, 5, 5, 0, 0);
                } else if (i == 0) {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl, 0, 0, 5, 5);
                } else {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl);
                }
            } else if (keyCode === DOWN_ARROW && this.eat) {
                if (i == this.tail.length - 1) {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl, 0, 0, 5, 5);
                } else if (i == 0) {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl, 5, 5, 0, 0);
                } else {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl);
                }
            } else if (keyCode === LEFT_ARROW && this.eat) {
                if (i == this.tail.length - 1) {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl, 5, 0, 0, 5);
                } else if (i == 0) {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl, 0, 5, 5, 0);
                } else {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl);
                }
            } else if (keyCode === RIGHT_ARROW && this.eat) {
                if (i == this.tail.length - 1) {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl, 0, 5, 5, 0);
                } else if (i == 0) {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl, 5, 0, 0, 5);
                } else {
                    rect(this.tail[i].x, this.tail[i].y, scl, scl);
                }
            } else {
                rect(this.tail[i].x, this.tail[i].y, scl, scl);
            }
        }
        fill(25, 67, 167)
        rect(this.x, this.y, scl, scl, 10);
    }

    this.eat = function (pos) {
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            this.scorePoint++;
            score.innerHTML = `Score : ${this.scorePoint}`;
            return true;
        } else {
            return false;
        }
    }
}

