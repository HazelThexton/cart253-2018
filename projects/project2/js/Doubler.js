// Doubler
//
// A class to define how a doubler behaves including when it appears and
// how it doubles the kisses

// Doubler constructor
//
// Sets the properties with the provided arguments
function Doubler(x,y,width,height,image,sound) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = image;
  this.sound = sound;
  this.active = true;
  // Property which controls when the doubler will become active again
  this.timer = 0;
}

// display()
//
// Draw the doubler as a rectangle on the screen
Doubler.prototype.display = function () {
  if (doubler.active === true) {
    image(this.image,this.x,this.y,this.width,this.height);
  }
}

// handleCollision(paddle)
//
// Check if this doubler overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Doubler.prototype.handleCollision = function() {
  // Check if the doubler overlaps the paddle on x and y axis
  if (doubler.active === true && this.x + this.width > heart.x && this.x < heart.x + heart.size && this.y + this.height > heart.y && this.y < heart.y + heart.size) {
    // If so, move doubler back
    heart2Active = true;
    this.active = false;
  }
  console.log(this.x + this.width > heart.x && this.x < heart.x + heart.size && this.y + this.height > heart.y && this.y < heart.y + heart.size);
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
    doubler.active = true;
    this.x = random(width);
    this.y = random(height);
    heart2Active = false;
  }
}
