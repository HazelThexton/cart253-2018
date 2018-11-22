// Fear
//
// A class to define how a fears behaves. Randomized # of windows, size, etc.
// Resets to the right with new random values when it scrolls off screen.

// Fear constructor
//
// Sets the properties with the provided arguments
function Fear(x,y,vx,width,height,speed,position,windowColumns,windowRows,rightKey,color) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.position = position;
  this.windowColumns = windowColumns;
  this.windowRows = windowRows;
  this.rightKey = rightKey;
  this.color = color;
}

// update()
//
// Moves fears according to velocity
Fear.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
}

// handleInput()
//
// Handles keyboard input
Fear.prototype.handleInput = function() {
  if (keyIsDown(this.rightKey) || mouseIsPressed) {
    this.vx = -this.speed;
  }
  else {
    this.vx = 0;
  }
}

// isOffScreen()
//
// Checks if the fears has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Fear.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  if (this.x + this.width < 0) {
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the fears as a rectangle on the screen, with other rectangles for windows.
Fear.prototype.display = function () {

  // Mirror the shapes vertically so we can draw fearss from the ground up
  push();
  translate(this.x,this.y - this.height);
  scale(-1,1);

  // Set the fears color
  fill(this.color);

  // Draw the fears at the new origin (so, up from the ground)
  rect(0, 0, this.width, this.height);

  // Add some shading on either side for depth/to distinguish it from
  // surrounding fearss
  fill(0,80);
  rect(this.width - this.width/4,0,this.width/4,this.height);
  rect(0,0,this.width/25,this.height);
  // Draw the windows
  this.windows();
  pop();
}

// windows()
//
// Draws the windows
Fear.prototype.windows = function () {
  // Draw a basic black rectangle as the background for the windows
  fill(0);
  rect(this.width/8, this.height/30, this.width/8*4, this.height/20*18);

  // Match the color of the columns/rows to the fears color
  fill(this.color);

  // Draws window columns based on the randomly chosen variable
  if (this.windowColumns === 2) {
    for (var i = 2; i < 5; i++) {
      rect(this.width/8*[i], this.height/70, this.width/50, this.height/70*69);
    }
  }
  else if (this.windowColumns === 1) {
    rect(this.width/8*3, this.height/70, this.width/50, this.height/70*69);
  }

  // Draws window rows based on the randomly chosen variable
  if (this.windowRows === 2) {
    for (var i = 6; i < 70; i += 5) {
      rect(this.width/8.3, this.height/70*[i], this.width/4*2.5, this.height/60);
    }
  }
  else if (this.windowRows === 1) {
    for (var i = 9; i < 70; i += 8) {
      rect(this.width/8.3, this.height/70*[i], this.width/4*2.5, this.height/40);
    }
  }
  else if (this.windowRows === 0) {
    for (var i = 5; i < 65; i += 5) {
      rect(this.width/8.3, this.height/70*[i], this.width/4*2.5, this.height/25);
    }
  }
}

// reset()
//
// Set position back to the right and randomize size/# of windows
Fear.prototype.reset = function () {
  this.x = width + 300;
  this.width = random(30,180);
  this.height = random(80,400);
  this.windowRows = int(random(3));
  this.windowColumns = int(random(3));
}
