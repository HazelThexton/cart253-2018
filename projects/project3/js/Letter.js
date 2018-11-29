/************************************************************************

Letter

A class for representing a single character as text on the screen that
reacts to mouse movement over it and moves and bounces around. Taken from
class example and modified.

************************************************************************/

// Letter(letter,x,y,fontSize)
//
// Construct the letter according to the argument
// Include various physical properties for moving around
function Letter(letter,x,y,fontSize,font) {
  // The character this object represents
  this.letter = letter;
  // Position, velocity, acceleration
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  // Deceleration per frame
  this.drag = 0.01;
  // Font size
  this.fontSize = fontSize;
  ///////// NEW /////////
  this.sizeChange = -2;
  ///////// END NEW /////////
  // Dimensions
  textSize(this.fontSize);
  this.width = textWidth(this.letter);
  this.height = textAscent() + textDescent();
  // Angle for rotation
  this.angle = 0;
  // How much the angle should change per update
  this.angleChange = 0;
  ///////// NEW /////////
  this.font = font;
  // The opacity and how much it should change per update
  this.opacity = 255;
  this.opacityChange = -20;
  ///////// END NEW /////////
}

// display()
//
// Draw the letter on screen based on position and rotation
Letter.prototype.display = function() {
  push();
  ///////// NEW /////////
  // Black stroke with opacity affected by mouse movement
  stroke(0,this.opacity);
  strokeWeight(3);
  ///////// END NEW /////////
  // Set the fontSize
  textSize(this.fontSize);
  ///////// NEW /////////
  textFont(this.font);
  ///////// END NEW /////////
  // Translate to the position of the letter, but add half width and height
  // so that we account for kerning
  translate(this.x + this.width/2,this.y + this.height/2);
  // Rotate
  rotate(this.angle);
  ///////// NEW /////////
  // White fill with opacity affected by mouse movement
  fill(255,this.opacity);
  ///////// END NEW /////////
  // Draw the text
  text(this.letter,0,0);
  pop();
}

// update()
//
// Update movement
Letter.prototype.update = function () {
  // Use p5.collide2d to check whether the line between the previous mouse position
  // (pmouseX,pmouseY) and the current mouse position (mouseX,mouseY) intersects the
  // bounding rectangle of this letter (based on its position and dimensions)
  // This allows us to check for "collisions" including frames where the mouse moves through the
  // letter without every explicitly overlapping it in any one frame
  if (collideLineRect(pmouseX,pmouseY,mouseX,mouseY,this.x,this.y,this.width,this.height)) {
    // If so, set the acceleration to be equivalent to the mouse movement
    // so it conveys a relative force to the speed of movement
    this.ax += (mouseX - pmouseX)*5;
    this.ay += (mouseY - pmouseY)*5;
    // And set the letter spinning based on the acceleration too
    // (The 2000 here is just a tested out value)
    this.angleChange = (this.ax + this.ay) / 2000;
    ///////// NEW /////////
    // Color and size changes for the letter (gets smaller/less opaque)
    this.opacity += this.opacityChange;
    this.fontSize += this.sizeChange;
    // Play sound effect
    wooshSound.currentTime = 0;
    wooshSound.play();
    ///////// END NEW /////////
  }

  // Apply drag to the acceleration so it rapidly approaches 0
  this.ax = constrain(this.ax * this.drag,-5,5);
  this.ay = constrain(this.ay * this.drag,-5,5);

  // Apply acceleration to velocity
  this.vx += this.ax;
  this.vy += this.ay;

  // Set position based on velocity
  this.x += this.vx;
  this.y += this.vy;

  // Increase the angle of rotation
  this.angle += this.angleChange;
}
