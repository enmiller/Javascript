function Node(val, x, y) {
    this.value = val;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;

    this.level = 0;
}

Node.prototype.addNode = function(n) {
    if (n.value < this.value) {
        if (this.left == null) {
            this.left = n;
            this.left.level = this.level + 1;
            this.left.x = this.x - (80/this.left.level);
            this.left.y = this.y + 20;
        } else {
            this.left.addNode(n);
        }
    } else if (n.value > this.value) {
        if (this.right == null) {
            this.right = n;
            this.right.level = this.level + 1;
            this.right.x = this.x + (80/this.right.level);
            this.right.y = this.y + 20;
        } else {
            this.right.addNode(n);
        }
    }
}


Node.prototype.visit = function(parent) {
    if (this.left != null) {
        this.left.visit(this);
    }
    if (this.right != null) {
        this.right.visit(this);
    }
    this.drawNode(parent);
}

Node.prototype.drawNode = function(parent) {
    stroke(255);
    if (parent) {
        line(parent.x, parent.y, this.x, this.y);
    }
    fill(51);
    ellipse(this.x, this.y, 25, 25);

    noFill();
    textAlign(CENTER);
    text(this.value, this.x, this.y + 4);
}