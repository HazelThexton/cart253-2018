// Fear
//
// A class to define how fears behave. Words composed of individual letters
// based on player input and placed at random locations on the screen.

// Fear constructor
//
// Sets the properties with the provided arguments
function Fear(string,size,font) {
  this.string = string;
  this.x = 0;
  this.y = 0;
  this.size = size;
  // The letters in the string
  this.letters = [];
  this.font = font;
}

// display()
//
// Draw the fears based on the player input at a random location, creates the letters
// Taken from physical letters class example
Fear.prototype.setup = function (string) {
  // Select a random onscreen location
  this.x = random(100,width-100);
  this.y = random(100,height-100);
  // Assign the player input to the string
  this.string = string;
  // Create our letter objects by looping through the string and creating new letters
  // Loop through each character in the string
  for (var i = 0; i < this.string.length; i++) {
    // Create a new letter
    this.letters.push(new Letter(this.string[i],this.x,this.y,this.size,this.font));
    // Shift the location of the next letter
    this.x += textWidth(this.string[i]);
  }
}

// display()
//
// Draw the fears as a rectangle on the screen, with other rectangles for windows.
Fear.prototype.display = function () {
  push();
  for (var i = 0; i < this.letters.length; i++) {
    this.letters[i].update();
    this.letters[i].display();
  }
  pop();
}
