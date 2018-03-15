var bird;
var pipes = [];

function setup() {
    createCanvas(400, 600);
    bird = new Bird();
    // pipes.push(new Pipe());
}

function draw() {
    background(51);

    bird.update();
    bird.show();

    if (frameCount % 100 == 0) {
        pipes.push(new Pipe());
    }

    updatePipes();
    checkCollision();
}

function keyPressed() {
    if (key == ' ') {
        bird.up();
    }
}

function updatePipes() {
    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show()
        pipes[i].update();
        if (pipes[i].isOffscreen()) {
            pipes.splice(i, 1);
        }
    }
}

function checkCollision() {
    for (var i = 0; i < pipes.length; i++) {
        if (pipes[i].hits(bird)) {
        }
    }
}