let cols, rows;
let w = 20;
let grid = [];
let stack = [];
let current;

function setup() {
    createCanvas(800, 800);
    background(150);
    frameRate(30);

    cols = floor(width / w);
    rows = floor(height / w);
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            let cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    current = grid[0];
}

function draw() {
    for (var i = 0; i < stack.length; i++) {
        stack[i].highlight();
    }
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    // for (var i = 0; i < stack.length; i++) {
    //     stack[i].highlight();
    // }

    current.visited = true;
    current.select();

    let next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        stack.push(current);
        removeWalls(current, next);
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }
}

function removeWalls(c, n) {
    let x = c.i - n.i;
    let y = c.j - n.j;

    if (x === 1) {
        c.walls.l = false;
        n.walls.r = false;
    } else if (x === -1) {
        c.walls.r = false;
        n.walls.l = false;
    } else if (y === 1) {
        c.walls.t = false;
        n.walls.b = false;
    } else if (y === -1) {
        c.walls.b = false;
        n.walls.t = false;
    }
}