// Petal
//
// A class to define how a petal behaves. Randomized # of windows, size, etc.
// Resets to the right with new random values when it scrolls off screen.

// Petal constructor
//
// Sets the properties with the provided arguments
function Petal(x,y,width,height,speed,rotation,color,maxLength) {
  this.x = x;
  this.y = y;
  this.vHeight = 0;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.rotation = rotation;
  this.color = color;
  this.maxLength = maxLength;
}

// update()
//
// Moves petal according to velocity
Petal.prototype.update = function () {
  // Update position with velocity
  this.height = constrain(this.height + this.vHeight,0,this.maxLength);
  //this.y = constrain(this.y - this.vy,height/2-50, height);


  // Apply acceleration to velocity
  this.vx += this.ax;
  this.vy += this.ay;
  // Set position based on velocity
  this.x += this.vx;
  this.y += this.vy;
  // Apply drag to the acceleration so it rapidly approaches 0
  this.ax = constrain(this.ax * 0.01,-1,1);
  this.ay = constrain(this.ay * 0.01,-1,1);
}

// handleInput()
//
// Handles keyboard input
Petal.prototype.handleInput = function() {
  if (mouseIsPressed) {
    this.vHeight += this.speed;
  }
  else {
    this.vHeight = 0;
  }
}

// blow()
//
// Handles keyboard input
Petal.prototype.blow = function() {

  if (mic.getLevel() >= 0.4) {
    this.ax += random(-mic.getLevel()*2,mic.getLevel()*2);
    this.ay += random(-mic.getLevel()*2,mic.getLevel()*2);
  }

}



// display()
//
// Draw the petal as a rectangle on the screen.
Petal.prototype.display = function () {
  // Mirror the shapes vertically so we can draw petals from the ground up
  push();
  rectMode(CORNERS);
  stroke(255,90);
  strokeWeight(20);
  // Set the petal color
  fill(this.color);
  translate(this.x,this.y);
  rotate(this.rotation);
  rect(0,0, this.width, this.height, 50);
  pop();
}
