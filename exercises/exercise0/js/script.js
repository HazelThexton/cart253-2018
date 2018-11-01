var sunAngle = 0.0;
var earthAngle = 0.0;
var moonAngle = 0.0;

function setup() {
  createCanvas(500,500,WEBGL);
}

function draw() {
  background(0);
  push();
  rotateY(sunAngle);
  fill(255,205,0);
  box(100);
  translate(150,0,0);
  rotateY(earthAngle);
  fill(0,0,205);
  box(50);
  translate(80,0,0);
  rotateY(moonAngle);
  fill(200,200,200);
  box(20);
  sunAngle += 0.01;
  earthAngle += 0.05;
  moonAngle -= 0.015;
}
