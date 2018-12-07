// Plant
//
// A class to define how a plant behaves. The plant is mostly a container for its
// two components, the stem and the petals, which grow and move based on player input

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
// Handles input
Plant.prototype.handleInput = function() {
  // Allows the petals to spawn and use mic input (blow) if the stem is tall enough
  if (this.stem.height >= height/2 + 20) {
    // Calls the blow function for each petal in the array
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].blow();
    }
    // Creates new petals randomly around the end of the stem if the player is clicking
    if (mouseIsPressed && random() < 0.1) {
      for (var i = 0; i < 10; i++) {
        this.petals.push(new Petal(this.x - this.stem.width/2,this.y - this.stem.height +20,5,0,this.speed,random()+36*i,random(100,255),random(100)));
      }
    }
  }
}

// display()
//
// Displays and calls the functions of the plant's stem and petals
Plant.prototype.display = function () {
  this.stem.display();
  this.stem.update();
  this.stem.handleInput();

  // Petals are only displayed if the stem is tall enough
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
    this.petals[i].x = width/2 -15;
    this.petals[i].y = height/2-20;
    this.petals[i].vx = 0;
    this.petals[i].vy = 0;
  }
}
