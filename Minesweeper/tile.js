function Tile(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.bee = false;
    this.revealed = false;
    this.neighborCount = 0;
}

Tile.prototype.show = function() { 
    noFill();
    stroke(0);
    rect(this.x, this.y, w, w);

    if (this.revealed) {
        if (this.bee) {
            fill(150);
            ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w / 2);
        } else {
            fill(220);
            rect(this.x, this.y, w, w);

            if (this.neighborCount > 0) {
                fill(0);
                textAlign(CENTER);
                textSize(20);
                text(this.neighborCount, this.x + this.w / 2, this.y + this.w - 11);
            }
        }
    }
}

Tile.prototype.countBees = function() {
    if (this.bee) {
        return -1;
    }
}

Tile.prototype.contains = function(x, y) {
    if ((x > this.x && x < this.x + this.w) && 
        (y > this.y && y < this.y + this.w)) {
            return true;
    }
    return false;
}

Tile.prototype.reveal = function() {
    this.revealed = true;
}