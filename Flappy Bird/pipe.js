function Pipe() {
    this.top = random(height / 2);
    this.bottom = random(height / 2);
    this.x = width - 30.0;
    this.w = 20;
    this.speed = 2;

    this.highlight = false;
}

Pipe.prototype.show = function() {
    fill(200);
    if (this.highlight) {
        fill(255,0,0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
}

Pipe.prototype.update = function() {
    this.x -= this.speed;
}

Pipe.prototype.isOffscreen = function() {
    return this.x < -this.w;
}

Pipe.prototype.hits = function(b) {
    if ((b.y < this.top || b.y > height - this.bottom) && 
        (b.x > this.x && b.x < this.x + this.w)) {
            this.highlight = true;
            return true;
    }
    this.highlight = false;
    return false;
}