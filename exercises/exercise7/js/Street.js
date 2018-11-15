// Street
//
// A class to define how a building behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Street constructor
//
// Sets the properties with the provided arguments
function Street(x,y,vx,width,height,speed,rightKey) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.rightKey = rightKey;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edges, checks for going
// off left or right side.
//////////////// FIXED
Street.prototype.update = function () {
  // Update position with velocity
  //////////////// FIXED
  this.x += this.vx;
}

Street.prototype.handleInput = function() {
  //////////////// FIXED
  if (keyIsDown(this.rightKey)) {
    this.vx = -this.speed;
  }
  //////////////// FIXED
  else {
    this.vx = 0;
  }
}

// isOffScreen()
//
// Checks if the building has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Street.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  //////////////// FIXED
  if (this.x + this.size < -50 || this.x > width + 50) {
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the building as a rectangle on the screen
Street.prototype.display = function () {
  //////////////// FIXED
push();
  fill(100);
  rect(this.x, this.y, this.width, this.height);
}
pop();

// reset()
//
// Set position back to the middle of the screen
//////////////// FIXED
Street.prototype.reset = function () {
  this.x = width;
  this.y = height/2;
}
