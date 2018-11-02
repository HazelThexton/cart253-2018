// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
///////// NEW /////////
function Paddle(x,y,w,h,speed,downKey,upKey,image,lipstickImage) {
  ///////// END NEW /////////
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
  this.image = image;
  this.lipstickImage = lipstickImage;
  this.heartbroken = false;
  this.timer = 0;
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
  ///////// NEW /////////
  // Checks if the paddle should currently be heartbroken
  this.heartbrokenTimer();
  ///////// END NEW /////////
}

// display()
//
// Draw the paddle as the selected face, flips it if it is the right paddle
///////// NEW /////////
Paddle.prototype.display = function(paddle) {
  push();
  // If the paddle is heartbroken, it is displayed at lowered opacity
  if (this.heartbroken === true){
    tint(255,50);
  }
  else {
    tint(255);
  }
  // If the paddle is on the right, its image is flipped horizontally
  if (paddle === rightPaddle) {
    translate(this.x,this.y);
    scale(-1,1);
    image(this.image,0,0,this.w,this.h);
  }
  else {
    image(this.image,this.x,this.y,this.w,this.h);
  }
  pop();
}

// distanceChange()
//
// Makes the paddles get closer as they score
Paddle.prototype.distanceChange = function(sign) {
  this.x = constrain(this.x + (5 * sign),0,width);
}

// heartbrokenTimer()
//
// Tracks whether the heartbroken effect should be currently active or not
// based on the time limit set in the heartbreak object
Paddle.prototype.heartbrokenTimer = function() {
  if (this.heartbroken === true) {
    if (millis() >= this.timer){
      this.heartbroken = false;
    }
  }
}

// lipstickDisplay()
//
// Displays lipstick on the paddles if the extra heart is currently active
Paddle.prototype.lipstickDisplay = function(paddle) {
  if (extraHeartActive === true){
    image(this.lipstickImage,this.x,this.y,this.w,this.h);
  }
}
///////// END NEW /////////
