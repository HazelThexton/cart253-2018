// Stem
//
// A class to define how a stem behaves. Randomized # of windows, size, etc.
// Resets to the right with new random values when it scrolls off screen.

// Stem constructor
//
// Sets the properties with the provided arguments
function Stem(x,y,vy,vx,width,height,speed,color) {
  this.x = x;
  this.y = y;
  this.vy = vy;
  this.vx = vx;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.color = color;
}

// update()
//
// Moves stem according to velocity
Stem.prototype.update = function () {
  // Update position with velocity
  this.height = constrain(this.height + this.vy,0,height/2);
  this.width = constrain(this.width + this.vx,0,30);
  }

// handleInput()
//
// Handles keyboard input
Stem.prototype.handleInput = function() {
  if (mouseIsPressed) {
    this.vy += this.speed;
    this.vx += this.speed/10;
  }
  else {
    this.vy = 0;
    this.vx = 0;
  }
}

// display()
//
// Draw the stem as a rectangle on the screen.
Stem.prototype.display = function () {
  push();
  rectMode(CORNERS);
  translate(this.x,this.y - this.height);
  scale(-1,1);
  stroke(255,90);
  strokeWeight(20);
  // Set the branch color
  fill(this.color);
  // Draw the branch at the new origin (so, up from the ground)
  rect(0, 0,this.width,this.height);
  pop();
}
