// Plant
//
// A class to define how a plant behaves. Randomized # of windows, size, etc.
// Resets to the right with new random values when it scrolls off screen.

// Plant constructor
//
// Sets the properties with the provided arguments
function Board(x,y,width,height,color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
}

// display()
//
// Draw the plant as a rectangle on the screen.
Board.prototype.display = function () {
  //  push();
  //  fill(0,0);
  //  rectMode(CENTER);
  //  stroke(255);
  //  rect(width/2,height/2,500,200);
  //  pop();
  fill(this.color);
  if (mouseIsPressed){
    ellipse(mouseX,mouseY,15,15);
  }
}
// display()
//
// Draw the plant as a rectangle on the screen.
Board.prototype.reset = function () {
  background(0);
}
// display()
//
// Draw the plant as a rectangle on the screen.
Board.prototype.screenshot = function () {
  save('bestdrawingever.png');
  return;
}
