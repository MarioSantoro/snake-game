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
            if (bestScore < this.scorePoint) {
                hightScore(this.scorePoint);
            }
            score.innerHTML = `Score : ${this.scorePoint}`;
            return true;
        } else {
            return false;
        }
    }
}