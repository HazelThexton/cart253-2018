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
  this.image = image;
  this.unhappy = false;
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
  this.unhappinessTimer();
}

// display()
//
// Draw the paddle as the selected face, flips it if it is the right paddle
Paddle.prototype.display = function(paddle) {
  push();
  if (this.unhappy === true){
    tint(255,50);
  }
  if (paddle === rightPaddle) {
    push();
    translate(this.x,this.y);
    scale(-1,1);
    image(this.image,0,0,this.w,this.h);
  }
  else {
    image(this.image,this.x,this.y,this.w,this.h);
  }
  pop();
}
///////// NEW /////////
// distanceChange()
//
// Makes the paddles get closer as they score
Paddle.prototype.distanceChange = function(sign) {
  this.x = constrain(this.x + (5 * sign),0,width);
}
// unhappinessTimer()
//
// Makes the paddles get closer as they score
Paddle.prototype.unhappinessTimer = function() {
  if (this.unhappy === true) {
    if (millis() >= this.timer){
      this.unhappy = false;
    }
  }
}
///////// END NEW /////////
