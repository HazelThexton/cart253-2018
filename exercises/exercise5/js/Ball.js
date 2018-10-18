// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed,image) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  ///////// NEW /////////
  this.image = image;
}
///////// END NEW /////////

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edges, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}
///////// NEW /////////
// location()
//
// Checks where the ball is and returns a corresponding string
Ball.prototype.location = function () {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0) {
    return "left";
  }
  if (this.x > width) {
    return "right";
  }
  else {
    return "onscreen";
  }
}
///////// END NEW /////////

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  fill(255);
  image(this.image,this.x,this.y,this.size,this.size);
}
///////// NEW /////////
// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size/2 > paddle.x - paddle.w/2 && this.x - this.size/2 < paddle.x + paddle.w/2) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size/2 > paddle.y - paddle.h/2 && this.y - this.size/2 < paddle.y + paddle.h/2) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      // Play our bouncing sound effect by rewinding and then playing
      blaSFX.currentTime = 0;
      blaSFX.play();
    }
  }
}
///////// END NEW /////////

// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
}
