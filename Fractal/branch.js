function Branch(begin, end) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
    this.length = p5.Vector.sub(this.end, this.begin).mag();

    this.show = function() {
        stroke(255);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    this.rightBranch = function() {
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(PI / 4);
        dir.mult(0.67);
        var newEnd = p5.Vector.add(this.end, dir);
        var right = new Branch(this.end, newEnd);
        return right;
    }

    this.leftBranch = function() {
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(-PI / 4);
        dir.mult(0.67);
        var newEnd = p5.Vector.add(this.end, dir);
        var left = new Branch(this.end, newEnd);
        return left;
    }
}