// Building
//
// A class to define how a building behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Building constructor
//
// Sets the properties with the provided arguments
function Building(x,y,vx,width,height,speed,rightKey,position) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.rightKey = rightKey;
  this.position = position;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edges, checks for going
// off left or right side.
//////////////// FIXED
Building.prototype.update = function () {
  // Update position with velocity
  //////////////// FIXED
  this.x += this.vx;
}

Building.prototype.handleInput = function() {
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
Building.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  //////////////// FIXED
  if (this.x < 20) {
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the building as a rectangle on the screen
Building.prototype.display = function () {
  //////////////// FIXED
  push();
  translate(this.x,this.y - this.height);
  scale(-1,1);
  if (this.position === 2){
    fill(90);
  }
  rect(0, 0, this.width, this.height);
  fill(0,80);
  rect(this.width - this.width/4,0,this.width/4,1000);
  rect(0,0,this.width/25,1000);
  pop();
}

// reset()
//
// Set position back
//////////////// FIXED
Building.prototype.reset = function () {
  this.x = width + 100;
  this.y = height/2 + 80;
  this.width = random(30,180);
  this.height = random(80,400);
}
