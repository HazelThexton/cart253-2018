// Star
//
// A class to define how stars behave. All they do is be displayed at
// random locations

// Star constructor
//
// Sets the properties with the provided arguments
function Star(x,y,size) {
  this.x = x;
  this.y = y;
  this.size = size;
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
