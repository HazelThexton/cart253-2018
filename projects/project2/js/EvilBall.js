// EvilBall
//
// A class to define how an evil ball behaves including bouncing on the top
// and bottom edges of the canvas, making the paddles not receive kisses (bounce
// the ball)

// EvilBall constructor
//
// Sets the properties with the provided arguments
function EvilBall(x,y,vx,vy,size,speed,image,sound) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.image = image;
  this.sound = sound;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edges, checks for going
// off left or right side.
EvilBall.prototype.update = function () {
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
  // Draw the ball as a rectangle on the screen
  EvilBall.prototype.display = function () {
    image(this.image,this.x,this.y,this.size,this.size);
  }

  // handleCollision(paddle)
  //
  // Check if this ball overlaps the paddle passed as an argument
  // and if so reverse x velocity to bounce
  EvilBall.prototype.handleCollision = function(paddle) {
    // Check if the ball overlaps the paddle on x and y axis
    if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w && this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      scoring();
      this.sound.currentTime = 0;
      this.sound.play();
    }
  }

  // reset()
  //
  // Set position back to the middle of the screen
  EvilBall.prototype.reset = function () {
    this.x = width/2;
    this.y = height/2;
    // Reverse x velocity to go towards the last side to score and randomize y velocity
    this.vx = -this.vx;
    this.vy = random(-10,10);
  }
