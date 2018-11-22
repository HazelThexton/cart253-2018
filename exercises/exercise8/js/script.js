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

var midBuilding = [];
var fears = [];

// Variable to contain our font
var pixelFont;

// Variable to contain our music
var bgMusic;

//boolean
var writingScreen;

var onscreenText;

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
  onscreenText = new OnscreenText(0,0,0,pixelFont);
  // Create buildings. Each building has a random size, random number of window columns/rows within a range.
  for (var i = 0; i < 18; i++) {
    fears[i] = new Fear(width/15*[i],height/2 + 170,0,random(30,180),random(80,400),2,2,int(random(3)),int(random(3)),RIGHT_ARROW,180);
  }
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  // Plays the music
  music();


  // Handles the input, updates, and displays the midground buildings
  for (var i = 0; i < 18; i++) {
    fear[i].handleInput();
    fear[i].update();
    if (fear[i].isOffScreen()) {
      fear[i].reset();
    }
    fear[i].display();
  }

}

// onscreenText()
//
// Handles the onscreen text and when it appears
function onscreenText() {
  if (keyIsDown(RIGHT_ARROW) || mouseIsPressed) {
  }
  else {
    fill(0);
    rect(width/2 - 152, height/2 + 220, 303, 500);
    var continueText = "just keep going";
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
