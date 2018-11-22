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


var onscreenText;

var input;

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
  textAlign(CENTER,CENTER);
  onscreenText = new OnscreenText(width/2,50,50,pixelFont);
  input = createInput();
  input.position(width/2 - input.width/2, 200);
  for (var i = 0; i < 10; i++) {
    fears[i] = new Fear(" ",50,pixelFont);
  }
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  bgMusic.play();
  bgMusic.loop = true;
  for (var i = 0; i < 10; i++) {
    if (keyIsDown(ENTER)){
      fears[i].setup(input.value());
      input.value('');
    }
  }

  onscreenText.display("type in your fears.",width/2, 50);

  // Handles the input, updates, and displays the midground buildings
  for (var i = 0; i < 10; i++) {
    fears[i].display();
  }

}
