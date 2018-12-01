// Branch
//
// A class to define how a branch behaves. Randomized # of windows, size, etc.
// Resets to the right with new random values when it scrolls off screen.

// Branch constructor
//
// Sets the properties with the provided arguments
function Branch(x,y,vy,vx,width,height,speed,rotation,color) {
  this.x = x;
  this.y = y;
  this.vy = vy;
  this.vx = vx;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.rotation = rotation;
  this.color = color;
}

// update()
//
// Moves branch according to velocity
Branch.prototype.update = function () {
  // Update position with velocity
  this.height += this.vy;
  this.width = constrain(this.width + this.vx,0,30);
}

// handleInput()
//
// Handles keyboard input
Branch.prototype.handleInput = function() {
  if (mouseIsPressed) {
    this.vy = this.speed;
    this.vx = this.speed/10;
  }
  else {
    this.vy = 0;
    this.vx = 0;
  }
}

// display()
//
// Draw the branch as a rectangle on the screen.
Branch.prototype.display = function () {
  // Mirror the shapes vertically so we can draw branchs from the ground up
  push();
  rectMode(CORNERS);
  translate(this.x,this.y - this.height);
  scale(-1,1);
  stroke(255,90);
  strokeWeight(20);
  // Set the branch color
  fill(this.color);
  rotate(this.rotation);
  // Draw the branch at the new origin (so, up from the ground)
  rect(0, 0, this.width, this.height, 40,40,40,40);
  pop();
}
