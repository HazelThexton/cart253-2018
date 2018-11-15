// Street
//
// A class to define how a building behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Street constructor
//
// Sets the properties with the provided arguments
function Star(x,y,size) {
  this.x = x;
  this.y = y;
  this.size = size;
}

// display()
//
// Draw the building as a rectangle on the screen
Star.prototype.display = function () {
  //////////////// FIXED
  rect(this.x, this.y, this.size, this.size);
}
