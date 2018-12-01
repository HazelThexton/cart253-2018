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
  this.branches[0] = new Branch(this.x,this.y+20,this.vy,this.vx,5,5,this.speed,0,255);
}

// handleInput()
//
// Handles keyboard input
Plant.prototype.handleInput = function() {
  if (mouseIsPressed && random() < 0.05) {
      var r = radians(random(80,280));
      this.x = this.branches[0].x - this.branches[0].width/2;
      this.y = this.branches[0].y - random(this.branches[0].height);
      this.branches.push(new Branch(this.x,this.y,this.vy,this.vx,0,0,this.speed,r,random(150,255)));
  }
}

// display()
//
// Draw the plant as a rectangle on the screen.
Plant.prototype.display = function () {
  for (var i = 0; i < this.branches.length; i++) {

this.branches[i].display();
this.branches[i].update();
this.branches[i].handleInput();
}
}
