function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
}

function draw() {
    background(51);

    let d = new Date();
    let hr = d.getHours() % 12;
    let min = d.getMinutes();
    let sec= d.getSeconds();
    let milSec = d.getMilliseconds();
    sec += milSec/1000

    translate(200, 200);
    rotate(-90);

    strokeWeight(8);
    // noFill();
    noStroke();
    fill(30, 100, 150);
    // stroke(30, 100, 150);
    let secEnd = map(sec, 0, 60, 0, 360);
    arc(0, 0, 100, 100, 0, secEnd);

    strokeWeight(8);
    // noFill();
    noStroke();
    fill(150, 35, 250);
    // stroke(150, 35, 250);
    let minEnd = map(min, 0, 60, 0, 360);
    arc(0, 0, 75, 75, 0, minEnd);

    strokeWeight(8);
    // noFill();
    noStroke();
    fill(255, 204, 0);
    // stroke(255, 204, 0);
    let hrEnd = map(hr, 0, 12, 0, 360);
    arc(0, 0, 50, 50, 0, hrEnd);


}