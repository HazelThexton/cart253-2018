var ball;

function setup() {
  createCanvas(640,480);
  ball = new Ball();
}

function draw() {
  background(0);
  ball.update();
  ball.display();
}
