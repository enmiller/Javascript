var board;
var w = 40;
var beeCount = 10;
var radioButtons;

function setup() {
    createCanvas(401, 401);
    newGame();

    var restartButton = createButton('New Game');
    restartButton.position(20, 420);
    restartButton.mousePressed(newGame);

    var quitButton = createButton('Forfeit');
    quitButton.position(100, 420);
    quitButton.mousePressed(quit);

    radioButtons = createRadio();
    radioButtons.option('10');
    radioButtons.option('20');
    radioButtons.option('30');
    radioButtons.option('40');
    radioButtons.position(20, 450);
    radioButtons.style('width', '50px');
    radioButtons.value('10');
    radioButtons.changed(beeCountChanged);
    beeCount = radioButtons.value();
}

function newGame() {
    board = new Board(w, beeCount);
    board.checkNeighbors();
}

function quit() {
    board.gameOver();
}

function draw() {
    background(255);
    board.show();
}

function mousePressed() {
    board.revealAt(mouseX, mouseY);
}

function beeCountChanged() {
    beeCount = radioButtons.value();
    newGame();
}