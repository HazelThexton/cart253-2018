// Branch
//
// A class to define how a branch behaves. Randomized # of windows, size, etc.
// Resets to the right with new random values when it scrolls off screen.

// Branch constructor
//
// Sets the properties with the provided arguments
function Branch(x,y,vy,width,height,speed) {
  this.x = x;
  this.y = y;
  this.vy = vy;
  this.width = width;
  this.height = height;
  this.speed = speed;
}

// update()
//
// Moves branch according to velocity
Branch.prototype.update = function () {
  // Update position with velocity
  this.height = constrain(this.height + this.vy,0,200);
}

// handleInput()
//
// Handles keyboard input
Branch.prototype.handleInput = function() {
  if (mouseIsPressed) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// display()
//
// Draw the branch as a rectangle on the screen.
Branch.prototype.display = function () {
  // Mirror the shapes vertically so we can draw branchs from the ground up
  push();
  translate(this.x,this.y - this.height);
  scale(-1,1);

  // Set the branch color
  fill(255);

  // Draw the branch at the new origin (so, up from the ground)
  rect(0, 0, this.width, this.height,10);

  pop();
}
