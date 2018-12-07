// Petal
//
// A class to define how a petal behaves. Grow around a central origin when the
// mouse is pressed, scatter when the microphone is blown into (or really any noise)

// Petal constructor
//
// Sets the properties with the provided arguments
function Petal(x,y,width,height,speed,rotation,color,maxHeight) {
  this.x = x;
  this.y = y;
  // Velocity of the upwards growth of the petals
  this.vyHeight = 0;
  // Variables for the blowing movement
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.rotation = rotation;
  this.color = color;
  this.maxHeight = maxHeight;
}

// update()
//
// Moves/grows petal according to velocity
Petal.prototype.update = function () {
  // Update height with height velocity (affected by mouse input below)
  this.height = constrain(this.height + this.vyHeight,0,this.maxHeight);

  // Apply acceleration to velocity
  this.vx += this.ax;
  this.vy += this.ay;

  // Set position based on velocity
  this.x += this.vx;
  this.y += this.vy;

  // Apply drag to the acceleration so it rapidly approaches 0
  this.ax = constrain(this.ax * 0.01,-1,1);
  this.ay = constrain(this.ay * 0.01,-1,1);
}

// handleInput()
//
// Handles mouse input
Petal.prototype.handleInput = function() {
  // If the mouse is pressed the petals grow
  if (mouseIsPressed) {
    this.vyHeight += this.speed;
  }
  else {
    this.vyHeight = 0;
  }
}

// blow()
//
// Handles mic input
Petal.prototype.blow = function() {
  // Assigns acceleration to the petal based on the amplitude of the mic's input
  // (above a 0.4 threshhold to avoid random noise setting it off)
  if (mic.getLevel() >= 0.4) {
    this.ax += random(-mic.getLevel()*2,mic.getLevel()*2);
    this.ay += random(-mic.getLevel()*2,mic.getLevel()*2);
  }
}

// display()
//
// Draw the petal as a rounded rectangle on the screen.
Petal.prototype.display = function () {
  // Rotates the petals so they grow around the stem's end
  push();
  rectMode(CORNERS);
  // Applies a nice semi-opaque stroke which creates that dandelion effect
  stroke(255,90);
  strokeWeight(20);
  // Sets the petal color
  fill(this.color);
  translate(this.x,this.y);
  rotate(this.rotation);
  // Draws the petal with rounded edges
  rect(0,0, this.width, this.height, 50);
  pop();
}
