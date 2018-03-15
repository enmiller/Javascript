function Rocket(dna) {
    this.position = createVector(width / 2, height - 50);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.fitness = 0;
    this.completed = false;
    this.completionTime = lifespan;
    this.crashed = false;

    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
}

Rocket.prototype.update = function() {
    this.applyForce(this.dna.genes[count]);

    if (this.position.x < 0 || this.position.x > width || this.position.y < 0 || this.position.y > height) {
        this.crashed = true;
    }

    if (this.distanceFromTarget() < 10) {
        this.completed = true;
        if (this.completionTime === lifespan) {
            this.completionTime = count;
        }
        this.position = target.copy();
    }

    if (!this.completed && !this.crashed) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.limit(4);
    }
}

Rocket.prototype.show = function() {
    push();
    noStroke();
    fill(0, 200, 0, 75);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
}

Rocket.prototype.applyForce = function(force) {
    this.acceleration.add(force);
}

Rocket.prototype.evaluate = function() {
    var d = this.distanceFromTarget();
    this.fitness = map(d, 0, width, width, 0);
    if (this.crashed) {
        this.fitness = 0;
    }
    if (this.completed) {
        this.fitness *= (10 * ((lifespan - this.completionTime) * 0.4));
    }
}

Rocket.prototype.distanceFromTarget = function() {
    return dist(this.position.x, this.position.y, target.x, target.y);
}