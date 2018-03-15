var tree = [];

function setup() {
    createCanvas(600, 600);

    var len = 150;
    var begin = createVector(width / 2, height);
    var end = createVector(width / 2, height - len);
    var rootBranch = new Branch(begin, end);
    tree[0] = rootBranch;

    setInterval(growTree, 300);
}

function draw() {
    background(51);
    stroke(255);

    for (var i = 0; i < tree.length; i++) {
        tree[i].show();
    }
}

function growTree() {
    for (var i = tree.length - 1; i >= 0; i--) {
        if (!tree[i].finished && tree[i].length > 4) {
            tree.push(tree[i].rightBranch());
            tree.push(tree[i].leftBranch());
            tree[i].finished = true
        }
    }
}