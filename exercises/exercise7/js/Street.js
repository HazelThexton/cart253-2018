// Street
//
// A class to define the street behaves. The "street" is composed of the sidewalk
// area, but mainly individual segments that loop around much like the buildings.

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
// Moves according to velocity
Street.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
}

// handleInput()
//
// Handles input for movement
Street.prototype.handleInput = function() {

  if (keyIsDown(this.rightKey) || mouseIsPressed) {
    this.vx = -this.speed;
  }
  else {
    this.vx = 0;
  }
}

// isOffScreen()
//
// Checks if the street segment has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Street.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  if (this.x + this.width < -50) {
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the street segment and sidewalk as a rectangle on the screen
Street.prototype.display = function () {
  push();
  fill(80);
  rect(0,height/2 + 150,windowWidth,60);
  pop();
  push();
  fill(255);
  rect(this.x, this.y, this.width, this.height);
  pop();
}


// reset()
//
// Set position back to right
Street.prototype.reset = function () {
  this.x = width + 50;
}
