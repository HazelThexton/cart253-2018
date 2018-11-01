// Doubler
//
// A class to define how a doubler behaves including when it appears and
// how it doubles the kisses

// Doubler constructor
//
// Sets the properties with the provided arguments
function Doubler(x,y,vx,vy,size,speed,image,sound) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.image = image;
  this.sound = sound;
  this.active = true;
  // Property which controls when the doubler will become active again
  this.timer = 0;
}

// display()
//
// Draw the heart as a rectangle on the screen
Doubler.prototype.display = function () {
  if (doubler.active === true) {
    image(this.image,this.x,this.y,this.size,this.size);
  }
}

// handleCollision(paddle)
//
// Check if this heart overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Doubler.prototype.handleCollision = function(paddle) {
  // Check if the heart overlaps the paddle on x and y axis
  if (doubler.active === true && this.x + this.size > paddle.x && this.x < paddle.x + paddle.w && this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
    // If so, move heart back to previous position (by subtracting current velocity)
    this.x -= this.vx;
    this.y -= this.vy;
    paddle.unhappy = true;
    this.active = false;
    paddle.timer = millis() + 4000;
  }
}

// reset()
//
// Set position back to the middle of the screen
Doubler.prototype.isActive = function () {
  if (this.active === true) {
    this.timer = millis() + 10000;
  }
  // If doubler is inactive, waits 5 seconds and then resets it
  else if (millis() >= this.timer) {
    doubler.active = true
    this.x = random(width);
    this.y = random(height);
  }
}
