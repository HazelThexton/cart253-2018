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



// setup()
//
// Creates the building and paddles
function setup() {
  //////////////// FIXED
  createCanvas(640,480);
  noStroke();
  // Create a building
  //////////////// FIXED
  for (var i = 0; i < 7; i++) {
    bgBuilding[i] = new Building(width - 120*[i],height/2 + 80,0,random(30,180),random(80,400),5,RIGHT_ARROW,2);
  }
  for (var i = 0; i < 7; i++) {
    building[i] = new Building(width - 100*[i],height/2 + 80,0,random(30,180),random(80,400),5,RIGHT_ARROW,1);
  }
}


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  for (var i = 0; i < 7; i++) {
    bgBuilding[i].handleInput();
  }
  for (var i = 0; i < 7; i++) {
    bgBuilding[i].update();
  }
  for (var i = 0; i < 7; i++) {
    if (bgBuilding[i].isOffScreen()) {
      //////////////// FIXED
      bgBuilding[i].reset();
    }
  }
  for (var i = 0; i < 6; i++) {
    bgBuilding[i].display();
  }
  for (var i = 0; i < 7; i++) {
    building[i].handleInput();
  }
  for (var i = 0; i < 7; i++) {
    building[i].update();
  }

  for (var i = 0; i < 7; i++) {
    if (building[i].isOffScreen()) {
      //////////////// FIXED
      building[i].reset();
    }
  }

  for (var i = 0; i < 6; i++) {
    building[i].display();
  }


}
