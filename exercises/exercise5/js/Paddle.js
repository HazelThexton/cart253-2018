// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,image) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  ///////// NEW /////////
  this.score = 0;
  this.image = image;
  ///////// END NEW /////////
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(255);
  image(this.image,this.x,this.y,this.w,this.h);
}
///////// NEW /////////
// scoring()
//
// Update the score
Paddle.prototype.scoring = function() {
this.score += 1;
this.sizeChange();
}

// sizeChange(paddle)
//
// Makes the specified paddle smaller based on its score
// (the game gets harder for the winning side)
Paddle.prototype.sizeChange = function() {
  this.h = constrain(this.h - this.score, 10, 70);
}
///////// END NEW /////////
