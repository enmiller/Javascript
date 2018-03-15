function Board(w, beeCount) {
    this.cols = floor(width / w);
    this.rows = floor(height / w);
    this.grid = make2DArray(this.cols, this.rows);

    function make2DArray(cols, rows) {
        arr = new Array(cols);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }

    var options = [];
    for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
            this.grid[i][j] = new Tile(i * w, j * w, w);
            options.push([i, j]);
        }
    }

    this.placeBees(options, beeCount);
}

Board.prototype.show = function() {
    for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
            this.grid[i][j].show();
        }
    }
}

Board.prototype.revealAt = function(x, y) {
    for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
            var tile = this.grid[i][j];
            if (tile.contains(x, y)) {
                tile.reveal();
                if (tile.bee) {
                    this.gameOver();
                } else if (!tile.bee) {
                    this.floodFill(i, j);
                }
            }
        }
    }
}

Board.prototype.placeBees = function(options, beeCount) {
    for (var b = 0; b < beeCount; b++) {
        let index = floor(random(options.length));
        let i = options[index][0];
        let j = options[index][1];
        this.grid[i][j].bee = true;
        options.splice(index, 1);
    }
}

Board.prototype.checkNeighbors = function() {
    for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {

            // Does the tile contain a bee?
            if (!this.grid[i][j].bee) {        
                var total = 0;

                // Look for bees in the 8 adjacent neighboring tiles.
                for (var xoff = -1; xoff <= 1; xoff++) {
                    for (var yoff = -1; yoff <= 1; yoff++) {
                        let e = i + xoff;
                        let f = j + yoff;

                        // Check for board edge cases.
                        if (e > -1 && e < this.cols && f > -1 && f < this.rows) {
                            var neighbor = this.grid[e][f];
                            if (neighbor.bee) {
                                total++;
                            }
                        }
                    }
                }
                this.grid[i][j].neighborCount = total;
            }
        }
    }
}

Board.prototype.floodFill = function(i, j) {
    var tile = this.grid[i][j];
    if (!tile.bee && tile.neighborCount == 0) {        
        // Look for bees in the 8 adjacent neighboring tiles.
        for (var xoff = -1; xoff <= 1; xoff++) {
            for (var yoff = -1; yoff <= 1; yoff++) {
                let e = i + xoff;
                let f = j + yoff;

                // Check for board edge cases.
                if (e > -1 && e < this.cols && f > -1 && f < this.rows) {
                    var neighbor = this.grid[e][f];
                    if (!neighbor.bee && !neighbor.revealed) {
                        neighbor.reveal();
                        this.floodFill(e, f);
                    }
                }
            }
        }
    }
}

Board.prototype.gameOver = function() {
    for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
            this.grid[i][j].revealed = true;
        }
    }
}