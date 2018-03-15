var resetButton;
var densitySlider;
var lifespanSlider;
var generalMutationSlider;
var completedMutationSlider;

var densitySpan;
var lifespanSpan;
var generalMutationSpan;
var completedMutationSpan;

var lifeParagraph;
var cycleParagraph;
var bestCompletionParagraph;
var mutationCountParagraph;
var completedMutationCountParagraph;

function Controller() {
    resetButton = createButton('Reset Experiment').parent('reset-container');

    // Density
    densitySlider = createSlider(100, 500, 100, 50).parent('density-container');
    createSpan(' Population density: ').parent('density-container');
    densitySpan = createSpan(' ' + densitySlider.value()).parent('density-container');

    // Lifespan
    lifespanSlider = createSlider(100, 1000, 400, 100).parent('lifespan-container');
    createSpan(' Lifespan: ').parent('lifespan-container');
    lifespanSpan = createSpan(' ' + lifespanSlider.value()).parent('lifespan-container');
    lifeParagraph = createP().parent('info-container');

    // General population mutation
    generalMutationSlider = createSlider(0, 100, 30, 5).parent('general-mutation-container');
    createSpan(' General mutation percentage: ').parent('general-mutation-container');
    generalMutationSpan = createSpan(' ' + generalMutationSlider.value() + '%').parent('general-mutation-container');

    // Completed mutation
    completedMutationSlider = createSlider(0, 10, 1, 1).parent('completed-mutation-container');
    createSpan(' Completed mutation percentage: ').parent('completed-mutation-container');
    completedMutationSpan = createSpan(' ' + completedMutationSlider.value() + '%').parent('completed-mutation-container');

    // Cycle
    cycleParagraph = createP('Cycle: ' + cycle).parent('info-container');
    createP('Last Cycle Results:').parent('info-container');
    var infoDiv = createDiv('').parent('info-container');
    infoDiv.id('cycle-info-container');
    bestCompletionParagraph = createP().parent('cycle-info-container');
    bestCompletionParagraph.html('Completion percentage: 0%');

    mutationCountParagraph = createP().parent('cycle-info-container');
    mutationCountParagraph.html('General mutation percentage: 0%');

    completedMutationCountParagraph = createP().parent('cycle-info-container');
    completedMutationCountParagraph.html('Completed mutation percentage: 0%');

    this.addListeners();
}

Controller.prototype.addListeners = function() {
    resetButton.mousePressed(this.resetButtonPressed);
    densitySlider.input(this.densitySliderChanged);
    lifespanSlider.input(this.lifespanSliderChanged);
    generalMutationSlider.input(this.generalMutationSliderChanged);
    completedMutationSlider.input(this.completedMutationSliderChanged);
}

Controller.prototype.resetButtonPressed = function() {
    resetExperiment();
}

Controller.prototype.densitySliderChanged = function() {
    densitySpan.html(' ' + densitySlider.value());
}

Controller.prototype.lifespanSliderChanged = function() {
    lifespanSpan.html(' ' + lifespanSlider.value());
}

Controller.prototype.generalMutationSliderChanged = function() {
    generalMutationSpan.html(' ' + generalMutationSlider.value() + '%');
}

Controller.prototype.completedMutationSliderChanged = function() {
    completedMutationSpan.html(' ' + completedMutationSlider.value() + '%');
}