var tree;
var numberCount = 10;

function setup() {
    createCanvas(600, 400);
    background(51);

    tree = new Tree();
    for (var i = 0; i < numberCount; i++) {
        tree.addValue(floor(random(0, 100)));
    }

    tree.traverse();
}

function draw() {
}