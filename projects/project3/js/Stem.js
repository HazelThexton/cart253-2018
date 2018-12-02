// Stem
//
// A class to define how a stem behaves. Grows upwards and in width until limit.

// Stem constructor
//
// Sets the properties with the provided arguments
function Stem(x,y,width,height,speed,color) {
  this.x = x;
  this.y = y;
  this.vy = 0;
  this.vx = 0;
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
  this.height = constrain(this.height + this.vy,0,height/2 +50);
  this.width = constrain(this.width + this.vx,0,30);
  }

// handleInput()
//
// Handles keyboard input
Stem.prototype.handleInput = function() {
  if (mouseIsPressed) {
    this.vy += this.speed/10;
    this.vx += this.speed/20;
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
  // Mirror the shape vertically so we can draw the stem from the ground up
  rectMode(CORNERS);
  translate(this.x,this.y - this.height);
  scale(-1,1);
  // Set the stem color
  fill(this.color);
  // Draw the stem at the new origin (so, up from the ground)
  rect(0, 0,this.width,this.height, 50,50,0,0);
  pop();
}
