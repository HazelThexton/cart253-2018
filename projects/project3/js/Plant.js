// Plant
//
// A class to define how a plant behaves. Randomized # of windows, size, etc.
// Resets to the right with new random values when it scrolls off screen.

// Plant constructor
//
// Sets the properties with the provided arguments
function Plant(x,y,width,height,speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.petals = [];
  this.stem = new Stem(this.x,this.y+20,5,10,this.speed,255);
}

// handleInput()
//
// Handles keyboard input
Plant.prototype.handleInput = function() {
  if (this.stem.height >= height/2 + 20) {
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].blow();
    }
    if (mouseIsPressed && random() < 0.1) {
      for (var i = 0; i < 10; i++) {
        this.petals.push(new Petal(this.x - this.stem.width/2,this.y - this.stem.height +20,5,0,this.speed,random()+36*i,random(100,255),random(100)));
      }
    }
  }
}

// display()
//
// Draw the plant as a rectangle on the screen.
Plant.prototype.display = function () {
  this.stem.display();
  this.stem.update();
  this.stem.handleInput();

  if (this.stem.height >= height/2 + 20) {
  for (var i = 0; i < this.petals.length; i++) {
    this.petals[i].display();
    this.petals[i].update();
    this.petals[i].handleInput();
  }
}
}

// display()
//
// Draw the plant as a rectangle on the screen.
Plant.prototype.reset = function () {
  this.stem.height = 10;
  this.stem.width = 5;
  for (var i = 0; i < this.petals.length; i++) {
    this.petals[i].height = 0;
  }
}
