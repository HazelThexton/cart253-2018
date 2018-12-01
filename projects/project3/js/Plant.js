// Plant
//
// A class to define how a plant behaves. Randomized # of windows, size, etc.
// Resets to the right with new random values when it scrolls off screen.

// Plant constructor
//
// Sets the properties with the provided arguments
function Plant(x,y,vy,width,height,speed) {
  this.x = x;
  this.y = y;
  this.vy = vy;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.branches = [];
}

// update()
//
// Moves plant according to velocity
Plant.prototype.update = function () {
  // Update position with velocity
  this.height += this.vy;
}

// handleInput()
//
// Handles keyboard input
Plant.prototype.handleInput = function() {
  if (mouseIsPressed) {
    this.vy = this.speed;
    if (random() < 0.1){
      this.branches.push(new Branch(this.x,this.y,this.vy,this.width,0,this.speed));
    }
  }
  else {
    this.vy = 0;
  }
}

// display()
//
// Draw the plant as a rectangle on the screen.
Plant.prototype.display = function () {
  for (var i = 0; i < this.branches.length; i++) {
this.branches[i].display();
this.branches[i].update();
this.branches[i].handleInput();
}
}
