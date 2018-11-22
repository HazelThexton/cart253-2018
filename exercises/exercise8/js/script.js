// Fear destroyer
// by Hazel Thexton
//
// An interactive "experience" that lets the player input their fears and then
// erase it from the screen with the mouse.
//
// Intended to be part of a series of connected semi-autobiographical interactive
// vignettes/scenes using different modes of interaction in each scene.
// In the style of/inspired by Dys4ia by Anna Anthropy.
//
// Type and press enter to create a new fear, move your mouse across the fears
// to destroy them
//
// Written with JavaScript OOP.
//
// Font source:
// https://www.dafont.com/minecraft.font

// Array containing our fear objects
var fears = [];

// Variable to contain our font
var pixelFont;

// Variable for our onscreen text object
var onscreenText;

// Variable for our input field
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
// Creates the text object, the input field and the fears
function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
  textAlign(CENTER,CENTER);

  // Creates the onscreen text
  onscreenText = new OnscreenText(width/2,height/9,50,pixelFont);

  // Creates the input field
  input = createInput();
  input.position(width/2 - input.width/2, 200);

  // Creates blank fears (we will fill them later based on player input)
  for (var i = 0; i < 10; i++) {
    fears[i] = new Fear(" ",50,pixelFont);
  }
}

// draw()
//
// Handles input, updates all the elements
// and displays everything.
function draw() {
  background(0);

  // Plays music
  bgMusic.play();
  bgMusic.loop = true;

  // Displays the onscreen text
  onscreenText.display("type in your fears,\nthen destroy them.");

  // Sets up the fears based on player input
  for (var i = 0; i < 10; i++) {
    if (keyIsDown(ENTER)){
      fears[i].setup(input.value());
      input.value('');
    }
  }

  // Displays the fears
  for (var i = 0; i < 10; i++) {
    fears[i].display();
  }

}
