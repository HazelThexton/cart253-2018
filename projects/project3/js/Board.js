// Board
//
// A class to define how a board behaves. Lets the player draw in various
// colors, can be cleared, and can save the drawing.

// Board constructor
//
// Sets the properties with the provided arguments
function Board(color) {
  this.color = color;
}

// display()
//
// Draw the image by drawing a circle at the mouse position. Lack of background
// means the trail remains.
Board.prototype.display = function () {
  // Fills using the currently selected color
  fill(this.color);
  if (mouseIsPressed){
    ellipse(mouseX,mouseY,15);
  }
}

// reset()
//
// Resets the board by redrawing the background
Board.prototype.reset = function () {
  background(0);
}

// screenshot()
//
// Saves the drawing to the player's computer
Board.prototype.screenshot = function () {
  // Covers up the buttons with black rectangles for a cleaner image. 
  // (Hiding the buttons is not an option because the lack of background
  // preserves their image regardless)
  push();
  fill(0);
  rect(0,height/12*9-30,width,height/2);
  rect(width/15*13+10,0,300,90);
  pop();
  // Saves a screenshot of the drawing
  save('bestdrawingever.png');
  return;
}
