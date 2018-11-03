///////// NEW /////////
// Doubler
//
// A class to define how a doubler (lipstick) behaves, including when and where
// it appears and how it doubles the hearts onscreen

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
// Draw the doubler as an image on the screen (if it is active)
Doubler.prototype.display = function () {
  if (doubler.active === true) {
    image(this.image,this.x,this.y,this.width,this.height);
  }
}

// handleCollision()
//
// Check if the doubler overlaps the heart
// and if so disappears and enables an extra heart onscreen
Doubler.prototype.handleCollision = function() {
  // Check if the doubler overlaps the paddle on x and y axis
  if (doubler.active === true && this.x + this.width > heart[0].x && this.x < heart[0].x + heart[0].size && this.y + this.height > heart[0].y && this.y < heart[0].y + heart[0].size) {
    // If so, activate extra heart and disable doubler
    extraHeartActive = true;
    this.active = false;
    // Play the smooch sound effect
    this.sound.currentTime = 0;
    this.sound.play();
  }
}

// reset()
//
// If doubler is inactive, waits 10 seconds and then resets it to a random
// location
Doubler.prototype.isActive = function () {
  // Sets timer value
  if (this.active === true) {
    this.timer = millis() + 10000;
  }
  // Checks timer value against current time and activates the doubler at a
  // random spot/disables the extra heart if the time is up
  else if (millis() >= this.timer) {
    doubler.active = true;
    this.x = random(width);
    this.y = random(height);
    extraHeartActive = false;
  }
}
///////// END NEW /////////
