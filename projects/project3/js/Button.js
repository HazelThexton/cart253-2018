// Button
//
// A class to define the button behaves. The "button" is composed of the sidewalk
// area, but mainly individual segments that loop around much like the buildings.

// Button constructor
//
// Sets the properties with the provided arguments
function Button(x,y,size,string) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.string = string;
  this.buttonText;
  this.width;
  this.height;
}

// display()
//
// Draw the button segment and sidewalk as a rectangle on the screen
Button.prototype.display = function () {
  this.assignValues();
  push();
  rectMode(CENTER);
  stroke(255);
  strokeWeight(5);
  fill(0);
  rect(this.x, this.y, this.width, this.height, 20);
  pop();
  this.buttonText.display(this.string);
}

// assignValues()
//
// Draw the button segment and sidewalk as a rectangle on the screen
Button.prototype.assignValues = function () {
  this.buttonText = new OnscreenText(this.x,this.y,this.size,pixelFont);
  this.width = textWidth(this.string) + 20;
  this.height = this.size + 20;
}

// clicked()
//
// Draw the button segment and sidewalk as a rectangle on the screen
Button.prototype.clicked = function () {
  if (mouseIsPressed && mouseX >= this.x - this.width/2 && mouseX <= this.x + this.width/2 && mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2){
    return true;
  }
  else {
    return false;
  }
}
