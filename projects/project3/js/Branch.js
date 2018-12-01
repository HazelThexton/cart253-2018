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
  this.height = constrain(this.height + this.vy,0,100);
  this.y = constrain(this.y - this.vy,height/2, height);
}

// handleInput()
//
// Handles keyboard input
Branch.prototype.handleInput = function() {
  if (mouseIsPressed) {
    this.vy += this.speed;

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
  stroke(255,90);
  strokeWeight(20);
  // Set the branch color
  fill(this.color);
  translate(this.x,this.y);
  rotate(this.rotation);
  rect(0,0, this.width, this.height, 20);
  pop();
}
