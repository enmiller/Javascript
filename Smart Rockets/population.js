function Population() {
    this.rockets = [];
    this.matingPool = [];

    for (var i = 0; i < density; i++) {
        this.rockets.push(new Rocket());
    }
}

Population.prototype.run = function() {
    for (var i = 0; i < density; i++) {
        this.rockets[i].update();
        this.rockets[i].show();
    }
}

Population.prototype.evaluate = function() {
    var maxFitness = 0;
    var completedCount = 0;
    for (var i = 0; i < density; i++) {
        this.rockets[i].evaluate();
        if (this.rockets[i].fitness > maxFitness) {
            maxFitness = this.rockets[i].fitness;
        }
        if (this.rockets[i].completed) {
            completedCount++;
        }
    }

    for (var i = 0; i < density; i++) {
        this.rockets[i].fitness /= maxFitness;
    }

    this.matingpool = [];
    for (var i = 0; i < density; i++) {
        if (this.rockets[i].completed) {
            var n = this.rockets[i].fitness * 5;
            for (g = 0; g < n; g++) {
                this.matingPool.push(this.rockets[i]);
            }
        }
    }
    if (this.matingPool.length == 0) {
        for (var i = 0; i < density; i++) {
            this.matingPool.push(new Rocket());
        }
    }

    return completedCount;
}

Population.prototype.darwin = function() {
    var newRockets = [];
    var generalMutationCount = 0;
    var failedCount = 0;
    var completedMutationCount = 0;
    for (var i = 0; i < this.rockets.length; i++) {
        var parentA = random(this.matingPool).dna;
        var parentB = random(this.matingPool).dna;
        var child = parentA.crossover(parentB);
        if (!this.rockets[i].completed) {
            failedCount++;
            if (random(1) < mutationPercentage) {
                child.mutation();
                generalMutationCount++;
            }
        } else if (random(1) < completedMutationPercentage) {
            child.mutation();
            completedMutationCount++;
        }
        newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;

    var rounded = 0;
    if (failedCount > 0) {
        rounded = Math.round(((generalMutationCount / failedCount) * 100) * 100) / 100
    }
    mutationCountParagraph.html('General mutation percentage: ' + rounded + '%');

    var completion = 0;
    if (density - failedCount > 0) {
        completion = (completedMutationCount / (density - failedCount)) * 100
        completion = Math.round((completion) * 100) / 100;
    }
    completedMutationCountParagraph.html('General mutation percentage: ' + completion + '%');
}