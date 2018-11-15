// Building
//
// A class to define how a building behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Building constructor
//
// Sets the properties with the provided arguments
function Building(x,y,vx,width,height,speed,rightKey,position,windowColumns,windowRows) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.rightKey = rightKey;
  this.position = position;
  this.windowColumns = windowColumns;
  this.windowRows = windowRows;
  this.color = 255;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edges, checks for going
// off left or right side.
Building.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
}

Building.prototype.handleInput = function() {
  if (keyIsDown(this.rightKey)) {
    this.vx = -this.speed;
  }
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
  // Mirror the shapes vertically so we can draw buildings from the ground up
  push();
  translate(this.x,this.y - this.height);
  scale(-1,1);

  // Set the building color
    this.color = this.buildingColor();
    fill(this.color);

  rect(0, 0, this.width, this.height);
  fill(0,80);
  rect(this.width - this.width/4,0,this.width/4,1000);
  rect(0,0,this.width/25,1000);
  this.windows();
  pop();
}

// reset()
//
// Set position back
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

// windows()
//
// Set position back
Building.prototype.windows = function () {
  // Draw a basic black rectangle as the background for the windows
  fill(0);
  rect(this.width/8, this.height/30, this.width/8*4, this.height/20*18);

// Match the color of the columns/rows to the building color
  this.color = this.buildingColor();
  fill(this.color);
// Draws window columns based on the randomly chosen variable
  if (this.windowColumns === 3) {
    for (var i = 2; i < 5; i++) {
      rect(this.width/8*[i], this.height/70, this.width/50, this.height/70*69);
    }
  }
  else if (this.windowColumns === 2) {
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

// buildingColor()
//
// Set position back
Building.prototype.buildingColor = function () {
  if (this.position === 3) {
    return 90;
  }
  else if (this.position === 2){
    return 180;
  }
  else {
    return 255;
  }
}
