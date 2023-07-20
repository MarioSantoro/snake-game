
let snake;
let scl = 20;
let food;
let gameOver = false;
let bestScore = 0;
let song;
let play = true;
let bestScoreElement = document.getElementById('bestscore');
let gameoverElement = document.querySelector('div.gameover');
let buttonRe_Play = document.getElementById('re-play');
let buttonMusicPlay = document.getElementById('play');
let buttonStopMusic = document.getElementById('stop');
buttonMusicPlay = document.addEventListener('click', function () {
    console.log('we')
    playmusic();
});

buttonRe_Play = document.addEventListener('click', function () {
    gameoverElement.classList.remove('active');
    gameOver = false;
    snake.clear();
})

function setup() {
    song = loadSound('song/Snake_Music.mp3');
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
function playmusic() {
    if (song.isPlaying()) {
        song.stop();
        song.loop()
    } else {
        song.loop();
    }
}

function stopmusic() {
    song.stop();
}
if (play) {
    console.log(play);
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

    function hightScore(points) {
        bestScore = points;
        bestScoreElement.innerHTML = `HightScore : ${bestScore}`;
    }


}




