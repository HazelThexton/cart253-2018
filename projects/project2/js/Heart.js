// Heart
//
// A class to define how a heart behaves including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Heart constructor
//
// Sets the properties with the provided arguments
///////// NEW /////////
function Heart(x,y,vx,vy,size,speed,image,sound) {
  ///////// END NEW /////////
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  ///////// NEW /////////
  this.image = image;
  this.sound = sound;
  ///////// END NEW /////////
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edges, checks for going
// off left or right side.
Heart.prototype.update = function () {
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

// isOffScreen()
//
// Checks if the heart has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Heart.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the heart as an image on the screen
///////// NEW /////////
Heart.prototype.display = function () {
  image(this.image,this.x,this.y,this.size,this.size);
}
///////// END NEW /////////

// handleCollision(paddle)
//
// Check if this heart overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Heart.prototype.handleCollision = function(paddle) {
  ///////// NEW /////////
  // Check if the heart overlaps the paddle on x and y axis AND if the paddle is
  // "heartbroken" (collisions disabled)
  if (paddle.heartbroken === false && this.x + this.size > paddle.x && this.x < paddle.x + paddle.w && this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
    ///////// END NEW /////////
    // If so, move heart back to previous position (by subtracting current velocity)
    this.x -= this.vx;
    this.y -= this.vy;
    // Reverse x velocity to bounce
    this.vx = -this.vx;
    ///////// NEW /////////
    // Update the score
    scoring();
    // Play the collision kiss sound effect
    this.sound.currentTime = 0;
    this.sound.play();
    ///////// END NEW /////////
  }
}

// reset()
//
// Set position back to the middle of the screen
Heart.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
  ///////// NEW /////////
  // Reverse x velocity to go towards the last side to score and randomize y velocity
  this.vx = -this.vx;
  this.vy = random(-10,10);
  // Reset the score
  score = 0;
}
///////// END NEW /////////
