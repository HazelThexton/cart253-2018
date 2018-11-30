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
//
// Sound sources:
// http://soundbible.com/749-Pitch-Baseball.html

// Variables to contain the objects representing our buildings, stars, and street
// segments

var backBuilding = [];
var midBuilding = [];
var frontBuilding = [];
var star = [];
var street = [];
var fears = [];
var input;
var fiveStars;
var review = [];

// Variables for our buttons
var fearsButton;
var continueButton;
var growthButton;
var reviewButton;
var nextButton;

// Variables for our text
var fearsGameText;
var continueGameText;
var reviewGameText;
var startText;
var start2Text;

// Variable to contain our font
var pixelFont;

// Variable to contain our music
var bgMusic;
var wooshSound;

var startScreen = true;
var fearsActive = false;
var continueActive = false;
var growthActive = false;
var reviewActive = false;
var reviewScreen = 1;

// preload()
//
// Preloads our font and music
function preload() {

  fiveStars = loadImage("assets/images/stars.png");
  // Assigns the font to its variable
  pixelFont = loadFont('assets/fonts/pixelfont.ttf');

  bgMusic = new Audio("assets/sounds/bg.mp3");
  wooshSound = new Audio("assets/sounds/woosh.mp3");
}

// setup()
//
// Creates the buildings, stars, and street.
function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
  textAlign(CENTER,CENTER);

  // Creates the input field
  input = createInput();
  input.position(width/2 - input.width/2, 200);

  // Creates the onscreen text
  fearsGameText = new OnscreenText(width/2,height/9,50,pixelFont);
  continueGameText = new OnscreenText(width/2, height/2 + 250,40,pixelFont);
  reviewGameText = new OnscreenText(width/2,height/9,50,pixelFont);
  startText = new OnscreenText(width/2,height/8,60,pixelFont);
  start2Text = new OnscreenText(width/2,height/8+50,30,pixelFont);

  for (var i = 0; i < 3; i++) {
    review[i] = new Review(width/2,height/12*(i*3 + 3.5),fiveStars);
  }

  // Creates blank fears (we will fill them later based on player input)
  for (var i = 0; i < 10; i++) {
    fears[i] = new Fear(" ",50,pixelFont);
  }

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

  // Create buttons
  fearsButton = new Button(width/5*2,height/12*4,50,"fears");
  continueButton = new Button(width/5*2,height/12*6,50,"continue");
  growthButton = new Button(width/5*2,height/12*8,50,"growth");
  reviewButton = new Button(width/5*3,height/12*4,50,"review");
  backButton = new Button(width/15*14,height/12,20,"go back");
  nextButton = new Button(width/2,height/2,50,"next");
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  if (startScreen === true){
    start();
  }
  else if (fearsActive === true){
    fearsGame();
  }
  else if (continueActive === true){
    continueGame();
  }
  else if (growthActive === true){
    growthGame();
  }
  else if (reviewActive === true){
    reviewGame();
  }
}
// start()
//
// Plays the fears game
function start() {
  background(0);
  bgMusic.pause();
  input.hide();
  // Displays the onscreen text
  startText.display("life can wait");
  start2Text.display("a game for chillin out");

  fearsButton.display();
  if (fearsButton.clicked()){
    startScreen = false;
    fearsActive = true;
  }
  continueButton.display();
  if (continueButton.clicked()){
    startScreen = false;
    continueActive = true;
  }
  growthButton.display();
  if (growthButton.clicked()){
    startScreen = false;
    growthActive = true;
  }
  reviewButton.display();
  if (reviewButton.clicked()){
    reviewScreen = 1;
    startScreen = false;
    reviewActive = true;
  }
}

// fearsGame()
//
// Plays the fears game
function fearsGame() {
  background(0);

  input.show();

  // Displays the onscreen text
  fearsGameText.display("type in your fears,\nthen destroy them.");

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

  backButton.display();
  if (backButton.clicked()){
    startScreen = true;
    fearsActive = false;
  }
}

// continueGame()
//
// Plays the continue game
function continueGame() {
  background(0);

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

    backButton.display();
    if (backButton.clicked()){
      startScreen = true;
      continueActive = false;
    }
  }

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
  if (keyIsDown(RIGHT_ARROW) || mouseIsPressed) {
  }
  else {
    fill(0);
    rect(width/2 - 152, height/2 + 220, 303, 500);
    textAlign(CENTER,CENTER);
    continueGameText.display("just keep going");
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

// growthGame()
//
// Plays the fears game
function growthGame() {
  background(0);
  backButton.display();
  if (backButton.clicked()){
    startScreen = true;
    growthActive = false;
  }
}

// reviewGame()
//
// Plays the review game
function reviewGame() {
  background(0);
  if (reviewScreen === 1) {
    reviewScreen1();
  }
  else if (reviewScreen === 2) {
    reviewScreen2();
  }
  else if (reviewScreen === 3) {
    reviewScreen3();
  }
  else if (reviewScreen === 4) {
    reviewScreen4();
  }
  backButton.display();
  if (backButton.clicked()){
    startScreen = true;
    reviewActive = false;
  }
}

function reviewScreen1() {
  reviewGameText.display("tell me your name:");
  input.show();
  if (input.value() === "") {
  }
  else{
    nextButton.display();
    if (nextButton.clicked()){
      for (var i = 0; i < 3; i++) {
        var r = int(random(20));
        review[i].name = input.value();
        review[i].randomAdjective = r;
      }
      console.log(review[1].randomAdjective);
      input.value("");
      reviewScreen = 2;
    }
  }
}
function reviewScreen2() {
  reviewGameText.display("tell me your personal pronoun\n(he, she, they, etc.):");
  if (input.value() === "") {
  }
  else {
    nextButton.display();
    if (nextButton.clicked()){
      for (var i = 0; i < 3; i++) {
        var r = int(random(6));
        review[i].pronoun = input.value();
        review[i].randomSentence = r;
      }
      input.value("");
      reviewScreen = 3;
    }
  }
}
function reviewScreen3() {
  reviewGameText.display("tell me your occupation:");
  if (input.value() === "") {
  }
  else {
    nextButton.display();
    if (nextButton.clicked()){
      for (var i = 0; i < 3; i++) {
        var r = int(random(9));
        review[i].randomAuthor = r;
        review[i].occupation = input.value();
      }
      input.value("");
      reviewScreen = 4;
    }
  }
}

function reviewScreen4() {
  reviewGameText.display(review[1].name + " reviews:");
  input.hide();
  for (var i = 0; i < 3; i++) {
    review[i].display();
  }

}
