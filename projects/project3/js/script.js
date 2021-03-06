// Take a Breath
// by Hazel Thexton
//
// A series of interactive experiences meant to be calming/therapeutic to the
// player.
//
// Fears: Allows the player to input their fears as text, then whisk them away with the
// mouse, with visual and sound effects.
//
// Steps: Prompts the player to click to maintain the movement of the calming cityscape
// with randomized buildings and music.
//
// Drawings: Lets the player draw in multiple colours and save their image as
// a screenshot.
//
// Wishes: Prompts the player to click to grow a flower, then blow on their microphone
// to simulate the scattering effect of a dandelion.
//
// Reviews: Creates randomized positive "reviews" of the player based on their own input
//
// Uses primarily mouse but also keyboard and microphone input.
//
// Written with JavaScript OOP.
//
// Font source:
// https://www.dafont.com/minecraft.font
//
// Sound source:
// http://soundbible.com/749-Pitch-Baseball.html

// Variables to contain all our objects
// Fears objects
var fears = [];
var input;
// Steps objects
var backBuilding = [];
var midBuilding = [];
var frontBuilding = [];
var star = [];
var street = [];
// Drawings object
var board;
// Wishes objects
var plant;
var mic;
// Reviews objects
var fiveStars;
var review = [];

// Variables for our buttons
// Global buttons
var nextButton;
var backButton;
// Start screen buttons
var fearsButton;
var stepsButton;
var drawingsButton;
var wishesButton;
var reviewButton;
// Drawing game buttons
var redButton;
var purpleButton;
var blueButton;
var greenButton;
var yellowButton;
var orangeButton;
var resetButton;
var saveButton;
// Variables for the timer on our save button (to avoid many simultaneous clicks)
var timer;
var saveActive = true;

// Variables for our text
var startText;
var start2Text;
var fearsGameText;
var stepsGameText;
var wishesGameText;
var reviewGameText;

// Variable to contain our font
var pixelFont;

// Variables to contain our sound
var bgMusic;
var wooshSound;

// Variables for determining which screen is showing
var startScreen = true;
var fearsActive = false;
var stepsActive = false;
var drawingsActive = false;
var wishesActive = false;
var wishesScreen = 1;
var reviewActive = false;
var reviewScreen = 1;

// preload()
//
// Preloads our font, image and music
function preload() {
  // Assigns the image to its variable
  fiveStars = loadImage("assets/images/stars.png");
  // Assigns the font to its variable
  pixelFont = loadFont('assets/fonts/pixelfont.ttf');
  // Assigns the sounds to their variables
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

  // Creates the input field, which we use for fears and reviews
  input = createInput();
  input.position(width/2 - input.width/2, 200);

  // Create an Audio input
  mic = new p5.AudioIn();

  // Creates the onscreen text
  startText = new OnscreenText(width/2,height/8,60,pixelFont,255);
  start2Text = new OnscreenText(width/2,height/8+50,30,pixelFont,255);
  fearsGameText = new OnscreenText(width/2,height/9 + 20,50,pixelFont,255);
  stepsGameText = new OnscreenText(width/2, height/2 + 250,40,pixelFont,255);
  wishesGameText = new OnscreenText(width/2,height/9,50,pixelFont,255);
  reviewGameText = new OnscreenText(width/2,height/9,50,pixelFont,255);

  // Creates buttons
  // Global buttons
  backButton = new Button(width/15*14,height/12,20,"go back",255);
  nextButton = new Button(width/2,height/2,50,"next",255);
  // Start screen buttons
  fearsButton = new Button(width/5*2,height/12*5,50,"fears",255);
  stepsButton = new Button(width/5*3,height/12*5,50,"steps",255);
  drawingsButton = new Button(width/5*2.5,height/12*7,50,"drawings",255);
  wishesButton = new Button(width/5*2,height/12*9,50,"wishes",255);
  reviewButton = new Button(width/5*3,height/12*9,50,"reviews",255);
  // Drawing game buttons
  redButton = new Button(width/9*2,height/12*9,20,"red",'#f44242');
  purpleButton = new Button(width/9*3,height/12*9,20,"purple",'#b54fff');
  blueButton = new Button(width/9*4,height/12*9,20,"blue",'#4f5dff');
  greenButton = new Button(width/9*5,height/12*9,20,"green",'#78f45d');
  yellowButton = new Button(width/9*6,height/12*9,20,"yellow",'#f4e75d');
  orangeButton = new Button(width/9*7,height/12*9,20,"orange",'#f7972a');
  resetButton = new Button(width/9*4,height/12*11,20,"clear",255);
  saveButton = new Button(width/9*5,height/12*11,20,"save",255);

  // Creates blank fears (we will fill them later based on player input)
  for (var i = 0; i < 10; i++) {
    fears[i] = new Fear(" ",50,pixelFont);
  }

  // Creates buildings. Each building has a random size, random number of window columns/rows within a range.
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

  // Creates the board for the drawing game
  board = new Board(0);

  // Creates a plant for the wishes game
  plant = new Plant(width/2,height,10,100,0.1);

  // Creates new reviews (we will fill them later based on player input)
  for (var i = 0; i < 3; i++) {
    review[i] = new Review(width/2,height/12*(i*3 + 3.5),fiveStars);
  }
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
  else if (stepsActive === true){
    stepsGame();
  }
  else if (drawingsActive === true){
    drawingsGame();
  }
  else if (wishesActive === true){
    wishesGame();
  }
  else if (reviewActive === true){
    reviewGame();
  }
}

// start()
//
// Displays the start screen
function start() {
  background(0);
  // Stops any music playing from another game
  bgMusic.pause();
  // Hides the input field
  input.hide();

  // Displays the onscreen text
  startText.display("take a breath");
  start2Text.display("a game for chillin out");

  // Displays and handles clicking for the start screen buttons to each game
  fearsButton.display();
  if (fearsButton.clicked()){
    startScreen = false;
    fearsActive = true;
  }
  stepsButton.display();
  if (stepsButton.clicked()){
    startScreen = false;
    stepsActive = true;
  }
  wishesButton.display();
  if (wishesButton.clicked()){
    wishesScreen = 1;
    startScreen = false;
    wishesActive = true;
  }
  reviewButton.display();
  if (reviewButton.clicked()){
    reviewScreen = 1;
    startScreen = false;
    reviewActive = true;
  }
  drawingsButton.display();
  if (drawingsButton.clicked()){
    board.reset();
    startScreen = false;
    drawingsActive = true;
  }
}

// fearsGame()
//
// Plays the fears game
function fearsGame() {
  background(0);

  // Show the input field
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

  // Displays and handles clicking for the back button
  backButton.display();
  if (backButton.clicked()){
    startScreen = true;
    fearsActive = false;
  }
}

// stepsGame()
//
// Plays the steps game
function stepsGame() {
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

    // Displays and handles clicking for the back button
    backButton.display();
    if (backButton.clicked()){
      startScreen = true;
      stepsActive = false;
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
    stepsGameText.display("just keep going");
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

// drawingsGame()
//
// Plays the drawings game
function drawingsGame() {
  // Displays the drawing board
  board.display();

  // Displays and handles clicking for the save button
  if (saveActive === true){
    saveButton.display();
    if (saveButton.clicked()){
      // Covers up the buttons and saves the image, then sets a timer to avoid
      // multiple clicks in a row
      board.screenshot();
      timer = millis() + 1000;
      saveActive = false;
    }
  }
  // Activates the save button again if the time is up
  else if (millis() >= timer) {
    saveActive = true;
  }

  // Displays and handles clicking for the colour buttons, which determine what
  // colour the player is drawing with
  redButton.display();
  if (redButton.clicked()){
    board.color = '#f44242';
  }
  purpleButton.display();
  if (purpleButton.clicked()){
    board.color = '#b54fff';
  }
  blueButton.display();
  if (blueButton.clicked()){
    board.color = '#4f5dff';
  }
  greenButton.display();
  if (greenButton.clicked()){
    board.color = '#78f45d';
  }
  yellowButton.display();
  if (yellowButton.clicked()){
    board.color = '#f4e75d';
  }
  orangeButton.display();
  if (orangeButton.clicked()){
    board.color = '#f7972a';
  }
  // Displays and handles clicking for the back button
  backButton.display();
  if (backButton.clicked()){
    startScreen = true;
    drawingsActive = false;
  }

  // Displays and handles clicking for the reset button, which clears the board
  resetButton.display();
  if (resetButton.clicked()){
    board.reset();
  }

}

// wishesGame()
//
// Plays the wishes game
function wishesGame() {

  background(0);
  // Determines which screen of the wishes game to be on
  if (wishesScreen === 1) {
    wishesScreen1();
  }
  else if (wishesScreen === 2) {
    wishesScreen2();
  }
}

// wishesScreen1()
//
// Displays the first screen of wishes
function wishesScreen1() {
  // Displays the text
  wishesGameText.display("\n\n'wishes' uses the microphone.\nplease make sure you're in a quiet location\n& that your browser hasn't blocked permissions");

  // Displays and handles clicking for the back button
  if (backButton.clicked()){
    startScreen = true;
    wishesActive = false;
  }
  // Start the Audio Input.
  mic.start();

  // Displays and handles clicking for the next button
  nextButton.display();
  if (nextButton.clicked()){
    // Goes to the next screen
    wishesScreen = 2;
  }

  // Displays and handles clicking for the back button
  backButton.display();
  if (backButton.clicked()){
    startScreen = true;
    wishesActive = false;
  }
}

// wishesScreen2()
//
// Displays the second screen of wishes
function wishesScreen2() {
  background(0);
  // Display the text
  wishesGameText.display("click & hold to grow the flower\nand blow to make a wish");

  // Displays and handles input for the plant
  plant.display();
  plant.handleInput();

  // Displays and handles clicking for the back button
  backButton.display();
  if (backButton.clicked()){
    plant.reset();
    startScreen = true;
    wishesActive = false;
  }
}

// reviewGame()
//
// Plays the reviews game
function reviewGame() {
  background(0);

  // Determines which screen of the reviews game to be on
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

  // Displays and handles clicking for the back button
  backButton.display();
  if (backButton.clicked()){
    startScreen = true;
    reviewActive = false;
  }
}

// reviewScreen1()
//
// Displays the first screen of reviews
function reviewScreen1() {
  // Displays the text at the top of the screen
  reviewGameText.display("tell me your name:");
  // Shows the input object
  input.show();
  // Only shows the next button if the player has input text
  if (input.value() != "") {
    // Displays and handles clicking for the next button
    nextButton.display();
    if (nextButton.clicked()){
      // Assigns the player's name to all the reviews, and assigns each review
      // a random adjective from the array
      for (var i = 0; i < 3; i++) {
        var r = int(random(20));
        review[i].name = input.value();
        review[i].randomAdjective = r;
      }
      // Erases the input text
      input.value("");
      // Goes to the next screen
      reviewScreen = 2;
    }
  }
}

// reviewScreen2()
//
// Displays the second screen of reviews
function reviewScreen2() {
  // Displays the text at the top of the screen
  reviewGameText.display("tell me your personal pronoun\n(he, she, they, etc.):");
  // Only shows the next button if the player has input text
  if (input.value() != "") {
    // Displays and handles clicking for the next button
    nextButton.display();
    if (nextButton.clicked()){
      // Assigns the player's pronoun to all the reviews, and assigns each review
      // a random sentence type from the array
      for (var i = 0; i < 3; i++) {
        var r = int(random(6));
        review[i].pronoun = input.value();
        review[i].randomSentence = r;
      }
      // Erases the input text
      input.value("");
      // Goes to the next screen
      reviewScreen = 3;
    }
  }
}

// reviewScreen3()
//
// Displays the third screen of reviews
function reviewScreen3() {
  // Displays the text at the top of the screen
  reviewGameText.display("tell me your occupation:");
  // Only shows the next button if the player has input text
  if (input.value() != "") {
    // Displays and handles clicking for the next button
    nextButton.display();
    if (nextButton.clicked()){
      // Assigns the player's occupation to all the reviews, and assigns each review
      // a random author from the array
      for (var i = 0; i < 3; i++) {
        var r = int(random(12));
        review[i].randomAuthor = r;
        review[i].occupation = input.value();
      }
      // Erases the input text
      input.value("");
      // Goes to the next screen
      reviewScreen = 4;
    }
  }
}

// reviewScreen4()
//
// Displays the last screen of reviews
function reviewScreen4() {
  // Displays the text at the top of the screen with the player's name
  reviewGameText.display(review[1].name + " reviews:");
  // Hides the input object
  input.hide();
  // Displays the reviews
  for (var i = 0; i < 3; i++) {
    review[i].display();
  }
}
