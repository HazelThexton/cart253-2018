///////// NEW /////////
// Heartbreak
//
// A class to define how a heartbreak item behaves including randomized movement,
// bouncing on the top  and bottom edges of the canvas, making the paddles not
// receive kisses (collide with the heart)

// Heartbreak constructor
//
// Sets the properties with the provided arguments
function Heartbreak(x,y,vx,vy,size,speed,image,sound) {
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
Heartbreak.prototype.update = function () {
  // Changes direction 5% of the time
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
  this.x = constrain(this.x,0,width-this.size);

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

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
// Draw the heartbreak as an image on the screen if it is currently active
Heartbreak.prototype.display = function () {
  if (heartbreak.active === true) {
    image(this.image,this.x,this.y,this.size,this.size);
  }
}

// handleCollision(paddle)
//
// Check if this heartbreak overlaps the paddle passed as an argument
// and if so reverse x and y velocity to bounce
Heartbreak.prototype.handleCollision = function(paddle) {
  // Check if the heartbreak overlaps the paddle on x and y axis and if it is active
  if (heartbreak.active === true && this.x + this.size > paddle.x && this.x < paddle.x + paddle.w && this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
    // If so, bounce heartbreak back
    this.x -= this.vx;
    this.y -= this.vy;
    // If so, activate the paddle's heartbroken state and set a timer for it,
    // and disable the heartbreak object
    paddle.heartbroken = true;
    this.active = false;
    paddle.timer = millis() + 4000;
    // Play the heartbreak sound effect
    this.sound.currentTime = 0;
    this.sound.play();
  }
}

// reset()
//
// If heartbreak is inactive, waits 10 seconds and then resets it to a random
// location
Heartbreak.prototype.isActive = function () {
  // Sets timer value
  if (this.active === true) {
    this.timer = millis() + 10000;
  }
  // Checks timer value against current time and activates the heartbreak at a
  // random spot if the time is up
  else if (millis() >= this.timer) {
    heartbreak.active = true
    this.x = random(width);
    this.y = random(height);
  }
}
///////// END NEW /////////
