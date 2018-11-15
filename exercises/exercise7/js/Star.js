// Star
//
// A class to define how stars behave. Just randomly placed rectangles that change
// size at certain intervals to simulate twinkling

// Star constructor
//
// Sets the properties with the provided arguments
function Star(x,y,size,rightKey) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.rightKey = rightKey;
  this.timer = 0;
}

// display()
//
// Draw the star as a square on the screen
Star.prototype.display = function () {
  push();
  fill(255);
  rect(this.x, this.y, this.size, this.size);
  pop();
}

// twinkle()
//
// Adds a time-constrained random twinkling effect (resizes the stars)
Star.prototype.twinkle = function () {
  if (keyIsDown(this.rightKey) || mouseIsPressed) {
    if (random() <= 0.005) {
      this.size = 3;
      this.timer = millis() + 2000;
    }
    else if (millis() >= this.timer){
      this.size = 2;
    }
  }
  else {
    this.size = 2;
  }
}
