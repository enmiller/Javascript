var population;
var target;

var maxForce = 0.2;
var count = 0;
var cycle = 1;
var bestCompletionCount = 0;

var density = 100;
var lifespan = 400;
var mutationPercentage = 0.1;
var completedMutationPercentage = 0.05;

var controller;

function setup() {
    createCanvas(600, 600).parent('canvas-container');
    population = new Population();
    target = createVector(width / 2, 40);
    controller = new Controller();
}

function draw() {
    background(51);
    population.run();
    lifeParagraph.html('Life remaining: ' + (lifespan - count));
    count++;

    if (count === lifespan) {
        evaluatePopulation();
    }

    ellipse(target.x, target.y, 20, 20);
}

function resetExperiment() {
    count = 0;
    cycle = 1;
    density = densitySlider.value();
    lifespan = lifespanSlider.value();
    mutationPercentage = generalMutationSlider.value() / 100;
    completedMutationPercentage = completedMutationSlider.value() / 100;

    cycleParagraph.html('Cycle: ' + cycle);
    bestCompletionParagraph.html('Completion percentage: 0%');
    mutationCountParagraph.html('General mutation percentage: 0%');

    population = new Population();
}

function evaluatePopulation() {
    let completed = population.evaluate();
    population.darwin();
    count = 0;
    cycle++;

    cycleParagraph.html('Cycle: ' + cycle);

    var completion = (completed / density * 100);
    completion = Math.round((completion) * 100) / 100
    bestCompletionParagraph.html('Completion percentage: ' + completion + '%');
}