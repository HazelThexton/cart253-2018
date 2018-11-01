// EvilHeart
//
// A class to define how an evil heart behaves including bouncing on the top
// and bottom edges of the canvas, making the paddles not receive kisses (bounce
// the heart)

// EvilHeart constructor
//
// Sets the properties with the provided arguments
function EvilHeart(x,y,vx,vy,size,speed,image,sound) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.image = image;
  this.sound = sound;
  this.active = true;
  // Property which controls when the evil heart will become active again
  this.timer = 0;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edges, checks for going
// off left or right side.
EvilHeart.prototype.update = function () {
  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    this.vx = map(random(),0,1,-this.speed,this.speed);
    this.vy = map(random(),0,1,-this.speed,this.speed);

  }
  // Update position based on velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain x position to be on screen
  //  this.x = constrain(this.x,0,width-this.size);

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Constrain y position to be on screen
  this.x = constrain(this.x,0,width-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
  // Check for touching left or right edge and reverse velocity if so
  if (this.x === 0 || this.x + this.size === width) {
    this.vx = -this.vx;
  }


}

// display()
//
// Draw the heart as a rectangle on the screen
EvilHeart.prototype.display = function () {
  if (evilHeart.active === true) {
    image(this.image,this.x,this.y,this.size,this.size);
  }
}

// handleCollision(paddle)
//
// Check if this heart overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
EvilHeart.prototype.handleCollision = function(paddle) {
  // Check if the heart overlaps the paddle on x and y axis
  if (evilHeart.active === true && this.x + this.size > paddle.x && this.x < paddle.x + paddle.w && this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
    // If so, move heart back to previous position (by subtracting current velocity)
    this.x -= this.vx;
    this.y -= this.vy;
    paddle.heartbroken = true;
    this.active = false;
    paddle.timer = millis() + 4000;
  }
}

// reset()
//
// Set position back to the middle of the screen
EvilHeart.prototype.isActive = function () {
  if (this.active === true) {
    this.timer = millis() + 10000;
  }
  // If evil heart is inactive, waits 5 seconds and then resets it
  else if (millis() >= this.timer) {
    evilHeart.active = true
    this.x = random(width);
    this.y = random(height);
  }
}
