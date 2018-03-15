function DNA(genes) {
    if (genes) {
        this.genes = genes;
    } else {
        this.genes = [];
        for (var i = 0; i < lifespan; i++) {
            var vector = p5.Vector.random2D();
            vector.setMag(maxForce);
            this.genes[i] = vector;
        }
    }
}

DNA.prototype.crossover = function(parent) {
    var newGenes = [];
    var mid = floor(random(this.genes));
    for (var i = 0; i < lifespan; i++) {
        if (i < mid) {
            newGenes[i] = this.genes[i];
        } else {
            newGenes[i] = parent.genes[i];
        }
    }

    return new DNA(newGenes);
}

DNA.prototype.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
        // if random number less than 0.01, new gene is then random vector
        if (random(1) < 0.01) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxForce);
        }
    }
}