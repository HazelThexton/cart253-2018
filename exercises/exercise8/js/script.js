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
var inputText = [];

// Variable to contain our font
var pixelFont;

//boolean
var writingScreen;

var onscreenText;

// preload()
//
// Preloads our font and music
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
  textAlign(CENTER,CENTER);
  onscreenText = new OnscreenText(width/2,50,50,pixelFont);
  // Create fears
  for (var i = 0; i < 20; i++) {
    fears[i] = new Fear(inputText[i],width/2,height/2,0,textSize(20),5,pixelFont);
  }
  // Handles the input, updates, and displays the fears
  for (var i = 0; i < 18; i++) {
    fears[i].setup();
  }
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);


  // Handles the input, updates, and displays the midground buildings
  for (var i = 0; i < 18; i++) {
    fears[i].handleInput();
    fears[i].update();
    fears[i].display();
  }

  onscreenText.display(width/2, 50,"type in your fears.");

}
