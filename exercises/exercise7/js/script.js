// Cityscape
// by Hazel Thexton
//
// An interactive "experience" that shows a randomly generated scrolling city.
//
// Right arrow key to move.
//
// Written with JavaScript OOP.

// Variables to contain the objects representing our buildings, stars, and street

var bgBuilding = [];
var building = [];
var frontBuilding = [];
var star = [];
var street;

// Variable to contain our font
var pixelFont;

// preload()
//
// Preloads our font
function preload() {
  // Assigns the font to its variable
  pixelFont = loadFont('assets/fonts/pixelfont.ttf');
}

// setup()
//
// Creates the buildings, stars, and street.
function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
  // Create buildings. Each building has a random size, random number of window columns/rows within a range.
  for (var i = 0; i < 15; i++) {
    bgBuilding[i] = new Building(width - width/15*[i],height/2 + 150,0,random(30,180),random(80,400),1,RIGHT_ARROW,3,int(random(4)),int(random(3)));
    building[i] = new Building(width - width/15*[i],height/2 + 170,0,random(30,180),random(80,400),2,RIGHT_ARROW,2,int(random(4)),int(random(3)));
    frontBuilding[i] = new Building(width - width/15*[i],height/2 + 190,0,random(30,180),random(80,400),3,RIGHT_ARROW,1,int(random(4)),int(random(3)));
  }

  // Create stars. Each star is randomly placed in the sky.
  for (var i = 0; i < 200; i++) {
    star[i] = new Star(random(width),random(height/2),2);
  }
  street = new Street(0,height/2 + 185,0,windowWidth,20,3,RIGHT_ARROW);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  // Display the moon
  moon();

  // Display the 200 stars
  for (var i = 0; i < 200; i++) {
    star[i].display();
  }

  // Handles the input, updates, and displays the background buildings
  for (var i = 0; i < 15; i++) {
    bgBuilding[i].handleInput();
  }
  for (var i = 0; i < 15; i++) {
    bgBuilding[i].update();
  }
  for (var i = 0; i < 15; i++) {
    (bgBuilding[i].isOffScreen();
  }

  // Handles the input, updates, and displays the midground buildings
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
    (building[i].isOffScreen();
  }

  // Handles the input, updates, and displays the foreground buildings

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
    (frontBuilding[i].isOffScreen()
  }

  for (var i = 0; i < 15; i++) {
    frontBuilding[i].display();
  }

  // Displays the street
  street.display();

  // Displays the text
  onscreenText();
}

// moon()
//
// Draws the moon
function moon() {
  push();
  fill(255);
  ellipse(100,70,100);
  pop();
}

// onscreenText()
//
// Handles the onscreen text and when it appears
function onscreenText() {
  if (keyIsDown(RIGHT_ARROW)) {
  }
  else {
    var continueText = "continue?\n>>";
    textAlign(CENTER,CENTER);
    textFont(pixelFont);
    textSize(40);
    fill(255);
    text(continueText, width/2, height/2 + 260);
  }
}
