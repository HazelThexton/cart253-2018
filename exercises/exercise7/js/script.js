// Cityscape
// by Hazel Thexton
//
// An interactive "experience" that shows a randomly generated scrolling city.
// Intended to be part of a series of connected semi-autobiographical interactive
// vignettes/scenes using different modes of interaction in each scene.
// In the style of/inspired by Dys4ia by Anna Anthropy.
//
// Right arrow key or click/touch to move.
//
// Written with JavaScript OOP.
//
// Font source:
// https://www.dafont.com/minecraft.font

// Variables to contain the objects representing our buildings, stars, and street
// segments

var backBuilding = [];
var midBuilding = [];
var frontBuilding = [];
var star = [];
var street = [];

// Variable to contain our font
var pixelFont;

// Variable to contain our music
var bgMusic;

// preload()
//
// Preloads our font and music
function preload() {
  // Assigns the font to its variable
  pixelFont = loadFont('assets/fonts/pixelfont.ttf');

  bgMusic = new Audio("assets/sounds/bg.mp3");
}

// setup()
//
// Creates the buildings, stars, and street.
function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
  // Create buildings. Each building has a random size, random number of window columns/rows within a range.
  for (var i = 0; i < 18; i++) {
    midBuilding[i] = new Building(width/15*[i],height/2 + 170,0,random(30,180),random(80,400),2,2,int(random(3)),int(random(3)),RIGHT_ARROW,180);
    frontBuilding[i] = new Building(width/15*[i],height/2 + 190,0,random(30,180),random(80,400),3,1,int(random(3)),int(random(3)),RIGHT_ARROW,250);
  }
  for (var i = 0; i < 25; i++) {
    backBuilding[i] = new Building(width/19*[i],height/2 + 150,0,random(30,180),random(80,400),1,3,int(random(3)),int(random(3)),RIGHT_ARROW,90);
  }
  // Create stars. Each star is randomly placed in the sky.
  for (var i = 0; i < 200; i++) {
    star[i] = new Star(random(width),random(height/2),2,RIGHT_ARROW);
  }
  // Creates 15 individual street segments
  for (var i = 0; i < 15; i++) {
    street[i] = new Street(width/12.5*[i],height/2 + 250,0,width/20,10,3,RIGHT_ARROW);
  }
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  // Displays the text
  onscreenText();

  // Plays the music
  music();

  // Display the moon
  moon();

  // Displays the 200 stars
  for (var i = 0; i < 200; i++) {
    star[i].display();
    star[i].twinkle();
  }

  // Handles the input, updates, and displays the street
  for (var i = 0; i < 15; i++) {
    street[i].handleInput();

    street[i].update();

    if (street[i].isOffScreen()) {
      street[i].reset();
    }

    street[i].display();
  }

  // Handles the input, updates, and displays the background buildings
  for (var i = 0; i < 25; i++) {
    backBuilding[i].handleInput();
    backBuilding[i].update();
    if (backBuilding[i].isOffScreen()) {
      backBuilding[i].reset();
    }
    backBuilding[i].display();
  }


  // Handles the input, updates, and displays the midground buildings
  for (var i = 0; i < 18; i++) {
    midBuilding[i].handleInput();
    midBuilding[i].update();
    if (midBuilding[i].isOffScreen()) {
      midBuilding[i].reset();
    }
    midBuilding[i].display();
  }

  // Handles the input, updates, and displays the foreground buildings
  for (var i = 0; i < 18; i++) {
    frontBuilding[i].handleInput();
    frontBuilding[i].update();
    if (frontBuilding[i].isOffScreen()) {
      frontBuilding[i].reset();
    }
    frontBuilding[i].display();
  }
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
  if (keyIsDown(RIGHT_ARROW) || mouseIsPressed) {
  }
  else {
    var continueText = "continue?\n>>";
    textAlign(CENTER,CENTER);
    textFont(pixelFont);
    textSize(40);
    fill(255);
    text(continueText, width/2, height/2 + 250);
  }
}

// music()
//
// Handles the music and when it plays
function music() {
  if (keyIsDown(RIGHT_ARROW) || mouseIsPressed) {
    bgMusic.play();
    bgMusic.loop = true;
  }
  else {
    bgMusic.pause();
  }
}
