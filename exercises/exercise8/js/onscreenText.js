// OnscreenText
//
// A class to define how displayed text looks and changes. Taken from my
// Project 2.

// Text constructor
//
// Sets the properties with the provided arguments
function OnscreenText(x,y,size,font) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.font = font;
}

// display()
//
// Display the text onscreen
OnscreenText.prototype.display = function (string) {
  this.format();
  text(string,this.x,this.y);
}

// textFormat()
//
// Text size, color, etc.
OnscreenText.prototype.format = function () {
  textAlign(CENTER,CENTER);
  textFont(this.font);
  textSize(this.size);
  fill(255);
}
