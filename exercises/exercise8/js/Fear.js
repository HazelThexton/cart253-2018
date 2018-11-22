// Fear
//
// A class to define how a fears behaves. Randomized # of windows, size, etc.
// Resets to the right with new random values when it scrolls off screen.

// Fear constructor
//
// Sets the properties with the provided arguments
function Fear(string,startX,startY,vx,size,speed,font) {
  this.string = string;
  this.startX = startX;
  this.startY = startY;
  this.x = 0;
  this.y = 0;
  this.vx = vx;
  this.size = size;
  this.speed = speed;
  this.letters = [];
  this.font = font;
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

// display()
//
// Draw the fears as a rectangle on the screen, with other rectangles for windows.
Fear.prototype.setup = function () {
  // Create our letter objects by looping through the string and creating new letters
// Note that we can treat a string like an array here, with individual characters being
// the array elements
this.x = this.startX;
this.y = this.startY;
// Loop through each character in the string
for (var i = 0; i < this.string.length; i++) {
  // Create a new letter
  this.letters.push(new Letter(this.string[i],this.x,this.y,this.size,this.font));
  // Shift the location of the next letter
  this.x += textWidth(this.string[i]);
}
}

// display()
//
// Draw the fears as a rectangle on the screen, with other rectangles for windows.
Fear.prototype.display = function () {
  push();
  for (var i = 0; i < this.letters.length; i++) {
  this.letters[i].update();
  this.letters[i].display();
}
  pop();
}
