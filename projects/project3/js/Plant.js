// Plant
//
// A class to define how a plant behaves. Randomized # of windows, size, etc.
// Resets to the right with new random values when it scrolls off screen.

// Plant constructor
//
// Sets the properties with the provided arguments
function Plant(x,y,vy,vx,width,height,speed) {
  this.x = x;
  this.y = y;
  this.vy = vy;
  this.vx = vx;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.branches = [];
  this.stem = new Stem(this.x,this.y+20,this.vy,this.vx,0,50,this.speed,255);
}

// handleInput()
//
// Handles keyboard input
Plant.prototype.handleInput = function() {
  if (mouseIsPressed && random() < 0.1 && this.stem.height >= height/2) {
    for (var i = 0; i < 10; i++) {
      this.branches.push(new Branch(this.x - this.stem.width/2,this.y - this.stem.height +20,this.vy,this.vx,5,0,this.speed,random()+36*i,random(100,255),random(100)));
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

  for (var i = 0; i < this.branches.length; i++) {
    this.branches[i].display();
    this.branches[i].update();
    this.branches[i].handleInput();
  }
}
