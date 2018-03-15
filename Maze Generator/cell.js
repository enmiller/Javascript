let Cell = function (i, j) {
    this.i = i;
    this.j = j;
    this.walls = {
        t: true,
        r: true,
        b: true,
        l: true
    };

    this.visited = false;

    this.select = function() {
        let x = i * w;
        let y = j * w;
        noStroke();
        fill(0, 0, 200);
        rect(x, y, w, w);
    }

    this.highlight = function() {
        let x = i * w;
        let y = j * w;
        noStroke();
        fill(0, 200, 200);
        rect(x, y, w, w);
    }

    this.show = function () {
        let x = i * w;
        let y = j * w;

        stroke(255);
        strokeWeight(2);

        if (this.walls.t) {
            line(x, y, x + w, y);
        }
        if (this.walls.r) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls.b) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls.l) {
            line(x, y + w, x, y);
        }

        if (this.visited) {
            fill(51, 51, 51, 100);
            noStroke();
            rect(x, y, w, w);
        }
    }

    function index(i, j) {
        if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
            return -1;
        }
        return i + j * cols;
    }

    this.checkNeighbors = function () {
        let neighbors = [];

        let top = grid[index(i, j - 1)];
        let right = grid[index(i + 1, j)];
        let bottom = grid[index(i, j + 1)];
        let left = grid[index(i - 1, j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            let r = floor(random(0, neighbors.length));
            return neighbors[r]
        } else {
            return undefined;
        }
    }
}