// Broken Basic OO Pong
// by Pippin Barr
//
// A broken primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our building and paddles
//////////////// FIXED
var building = [];
var bgBuilding = [];
var frontBuilding = [];



// setup()
//
// Creates the building and paddles
function setup() {
  //////////////// FIXED
  createCanvas(windowWidth,windowHeight);
  noStroke();
  // Create a building
  //////////////// FIXED
  for (var i = 0; i < 15; i++) {
    bgBuilding[i] = new Building(width - width/15*[i],height/2 + 150,0,random(30,180),random(80,400),3,RIGHT_ARROW,3,int(random(4)));
    building[i] = new Building(width - width/15*[i],height/2 + 170,0,random(30,180),random(80,400),4.5,RIGHT_ARROW,2,int(random(4)));
    frontBuilding[i] = new Building(width - width/15*[i],height/2 + 190,0,random(30,180),random(80,400),6,RIGHT_ARROW,1,int(random(4)));
  }
}


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  for (var i = 0; i < 15; i++) {
    bgBuilding[i].handleInput();
  }
  for (var i = 0; i < 15; i++) {
    bgBuilding[i].update();
  }
  for (var i = 0; i < 15; i++) {
    if (bgBuilding[i].isOffScreen()) {
      //////////////// FIXED
      bgBuilding[i].reset();
    }
  }
  for (var i = 0; i < 15; i++) {
    bgBuilding[i].display();
  }
  for (var i = 0; i < 15; i++) {
    building[i].handleInput();
  }
  for (var i = 0; i < 15; i++) {
    building[i].update();
  }

  for (var i = 0; i < 15; i++) {
    if (building[i].isOffScreen()) {
      //////////////// FIXED
      building[i].reset();
    }
  }

  for (var i = 0; i < 15; i++) {
    building[i].display();
  }
  for (var i = 0; i < 15; i++) {
    frontBuilding[i].handleInput();
  }
  for (var i = 0; i < 15; i++) {
    frontBuilding[i].update();
  }

  for (var i = 0; i < 15; i++) {
    if (frontBuilding[i].isOffScreen()) {
      //////////////// FIXED
      frontBuilding[i].reset();
    }
  }

  for (var i = 0; i < 15; i++) {
    frontBuilding[i].display();
  }

}
