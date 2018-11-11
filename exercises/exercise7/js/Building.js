// Building
//
// A class to define how a building behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Building constructor
//
// Sets the properties with the provided arguments
function Building(x,y,vx,width,height,speed,rightKey,position,windowColumns) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.rightKey = rightKey;
  this.position = position;
  this.windowColumns = windowColumns;
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
  if (this.position === 3){
    fill(90);
  }
  if (this.position === 2){
    fill(180);
  }
  rect(0, 0, this.width, this.height);
  fill(0,80);
  rect(this.width - this.width/4,0,this.width/4,1000);
  rect(0,0,this.width/25,1000);
  //windows
  fill(0);
  rect(this.width/8, this.height/30, this.width/8*4, this.height/20*18);
  if (this.position === 3){
    fill(90);
  }
  if (this.position === 2){
    fill(180);
  }
  if (this.position === 1){
    fill(255);
  }
  if (this.windowColumns === 3) {
    for (var i = 2; i < 5; i++) {
      rect(this.width/8*[i], this.height/70, this.width/50, this.height/70*69);
    }
  }
  else if (this.windowColumns === 2) {
    rect(this.width/8*3, this.height/70, this.width/50, this.height/70*69);
  }
  for (var i = 6; i < 70; i += 5) {
    rect(this.width/8.3, this.height/70*[i], this.width/4*2.5, this.height/60);
  }
  pop();
}

// reset()
//
// Set position back
//////////////// FIXED
Building.prototype.reset = function () {
  this.x = width + 100;
  if (this.position === 1){
    this.y = height/2 + 190;
  }
  else if (this.position === 2){
    this.y = height/2 + 170;
  }
  else {
    this.y = height/2 + 150;
  }
  this.width = random(30,180);
  this.height = random(80,400);
}
