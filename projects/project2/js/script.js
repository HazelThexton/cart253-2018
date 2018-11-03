///////// NEW /////////
// Kiss Pong
// by Hazel Thexton
//
// A collab version of pong where two faces bounce a "kiss" back and forth.
//
// Featuring randomized faces for the paddles, a tube of lipstick that doubles
// the amount of kisses onscreen for a short time, and a broken heart item that
// prevents one paddle from bouncing a kiss for a short time.
//
// At the end of the game, the players can see how many times in a row they
// successfully managed to exchange kisses.
/////////// END NEW /////////
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.
//
///////// NEW /////////
//
// Sound sources:
// www.freesoundeffects.com/free-track/smoochy-kiss-428522/
// www.partnersinrhyme.com/soundfx/human_sounds/human_kiss2_wav.shtml
// www.partnersinrhyme.com/soundfx/WEB-DESIGN-SOUNDS/SPOKEN_sounds/spoken_oh-ho_wav.shtml
//
// Font source:
// https://www.dafont.com/minecraft.font

// Variables to contain the objects representing our hearts, paddles,
// and power-ups/obstacles.
var heart = [];
///////// END NEW /////////
var leftPaddle;
var rightPaddle;
///////// NEW /////////
var heartbreak;
var doubler;

// Number of successful bounces in a row
var score = 0;
// Highest score within a game
var maxScore = 0;
// Variable tracking whether the game is over
var gameOver = false;
// Variable tracking whether the game has started
var startScreen = true;
// Variable tracking whether the game has started
var instructionsScreenActive = false;
// Variable tracking whether the extra heart is active
var extraHeartActive = false;

var playerTimeSet = false;
var playerTime = 0;

// Variables for our various images
var leftImage;
var rightImage;
var paddleArray = [];
var shuffledPaddleArray = [];
var leftPaddleLipstick;
var rightPaddleLipstick;
var heartImage;
var heartbreakImage;
var doublerImage;
var winImage;

// Variables for our various sounds
var kissSound;
var winSound;

// Variables for our various text elements
var scoreText;
var winText;
var win2Text;
var win3Text;
var startText;
var instructionsText;
var instructions2Text;

// Variable for our font
var pixelFont;

// preload()
//
// Loads the audio, text font, and images for the heart, paddles, power up and obstacle
function preload() {
  // Assigns each of the paddle images to a spot in the image array
  for (var i = 0; i < 5; i++) {
    paddleArray[i] = loadImage("assets/images/paddle" + [i] + ".png");
  }
  // Assigns images to all the other visual elements besides the paddles
  leftPaddleLipstick = loadImage("assets/images/leftpaddlelipstick.png");
  rightPaddleLipstick = loadImage("assets/images/rightpaddlelipstick.png");
  heartImage = loadImage("assets/images/heart.png");
  heartbreakImage = loadImage("assets/images/heartbreak.png");
  doublerImage = loadImage("assets/images/doubler.png");
  winImage = loadImage("assets/images/win.png");

  // Assigns the sounds to their respective variables
  kissSound = new Audio("assets/sounds/kiss.mp3");
  winSound = new Audio("assets/sounds/win.mp3");

  // Assigns the font to its variable
  pixelFont = loadFont('assets/fonts/pixelfont.ttf');
}

///////// END NEW /////////

// setup()
//
// Creates the heart, paddles, power-ups and obstacles
function setup() {
  createCanvas(640,480);
  ///////// NEW /////////
  imageMode(CENTER);
  // Assigns a random (non-repeating) image to each paddle
  assignImage();
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-20,height/2,30,70,5,DOWN_ARROW,UP_ARROW,rightImage,rightPaddleLipstick);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(20,height/2,30,70,5,83,87,leftImage,leftPaddleLipstick);
  // Create hearts
  for (var i = 0; i < 2; i++) {
    heart[i] = new Heart(width/2,height/2,5,5,20,5,heartImage,kissSound);
  }
  // Create a heartbreak obstacles
  heartbreak = new Heartbreak(random(width),random(height),5,5,20,5,heartbreakImage);
  // Create an evil heart
  doubler = new Doubler(random(width),random(height),15,50,doublerImage,winSound);

  // Creates the score text object
  scoreText = new OnscreenText(width/2,70,30,pixelFont);
  // Creates the win screen text objects
  winText = new OnscreenText(width/2,70,50,pixelFont);
  win2Text = new OnscreenText(width/2,height - 155,30,pixelFont);
  win3Text = new OnscreenText(width/2,height - 70,25,pixelFont);
  // Creates the start screen text objects
  startText = new OnscreenText(width/2,height/2 - 90,80,pixelFont);
  start2Text = new OnscreenText(width/2,height/2 + 80,30,pixelFont);
  // Creates the instruction screen text objects
  instructionsText = new OnscreenText(width/4,150,20,pixelFont);
  instructions2Text = new OnscreenText(width - width/4,150,20,pixelFont);
  instructions3Text = new OnscreenText(width/2,height - 50,20,pixelFont);
}

// assignImage()
//
// Assigns a random image from the arrays to each paddle, ensures both paddles
// never share an image
function assignImage() {
  // Shuffles the face image array
  shuffledPaddleArray = shuffle(paddleArray);
  // Assigns an image from the shuffled array to each paddle
  rightImage = shuffledPaddleArray[0];
  leftImage = shuffledPaddleArray[1];
}

///////// END NEW /////////

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  ///////// NEW /////////
  // Checks if the player is on the start screen, and if so checks if they're
  // on the start menu's instructions screen.
  if (startScreen === true){
    start();
    if (instructionsScreenActive === true){
      instructionsScreen();
    }
  }
  // Checks if the game is over and if not, plays the game
  else if (!gameOver){
    ///////// END NEW /////////
    // Handles player input for the paddles
    leftPaddle.handleInput();
    rightPaddle.handleInput();

    ///////// NEW /////////
    // Checks if power-ups/obstacles are active
    extraHeartIsActive();
    heartbreak.isActive();
    doubler.isActive();
    ///////// END NEW /////////

    // Updates the movement of these objects
    leftPaddle.update();
    rightPaddle.update();
    ///////// NEW /////////
    heart[0].update();
    heartbreak.update();

    // Checks if the heart is offscreen, and if so resets it
    if (heart[0].isOffScreen()) {
      heart[0].reset();
    }

    // Handles collisions between all these objects
    heart[0].handleCollision(leftPaddle);
    heart[0].handleCollision(rightPaddle);
    heartbreak.handleCollision(leftPaddle);
    heartbreak.handleCollision(rightPaddle);
    doubler.handleCollision();
    ///////// END NEW /////////

    // Displays all these objects
    leftPaddle.display(leftPaddle);
    rightPaddle.display(rightPaddle);
    ///////// NEW /////////
    heart[0].display();
    heartbreak.display();
    doubler.display();
    leftPaddle.lipstickDisplay(leftPaddle);
    rightPaddle.lipstickDisplay(rightPaddle);
    scoreText.display("KISS COMBO: " + score + " !");

    // Checks if the game has been won
    checkWin();
  }
  else {
    // When the game has been won, displays the win screen
    win();
  }
}

// start()
//
// Displays the start screen
function start() {
  // Displays the start screen text
  startText.display("KISS PONG");
  start2Text.display("press [ENTER]\nto play\n\npress [SHIFT]\nfor instructions");

  // Starts the game if the player presses enter
  if (keyIsDown(ENTER)) {
    startScreen = false;
  }
  // Shows the instructions if the player presses shift
  if (keyIsDown(SHIFT)) {
    instructionsScreenActive = true;
  }
}

// instructionsScreen()
//
// Displays the instructions screen
function instructionsScreen() {
  background(0);

  // Shows the instructions screen images for the controls
  image(leftImage,width/4,height/2 - 130)
  // the right paddle image needs to be flipped
  push();
  translate(3 * width/4,height/2 - 130);
  scale(-1,1);
  image(rightImage,0,0)
  pop();

  // Shows the instructions screen images for the power-ups/obstacles
  image(leftImage,width/4 - 20,height/2 + 70)
  image(heartbreakImage,width/4 + 20,height/2 + 70);
  image(heartImage,3 * width/4 - 20,height/2 + 70);
  image(doublerImage,3 * width/4 + 20,height/2 + 70);

  // Displays the instructions screen text
  instructionsText.display("player 1: W & S\n\n\n\n\n\n\navoid getting hit by\nthe broken hearts...");
  instructions2Text.display("player 2: UP & DOWN\n\n\n\n\n\n\ntry to aim the kiss\ninto the lipstick!");
  instructions3Text.display("press [BACKSPACE] to go back           press [ENTER] to play");

  // Closes the instructions if the player presses backspace
  if (keyIsDown(BACKSPACE)) {
    instructionsScreenActive = false;
  }
}

// extraHeartIsActive()
//
// Checks if the extra heart is active and if so, enables all its functions
function extraHeartIsActive(){
  if (extraHeartActive === true){
    heart[1].update();
    heart[1].handleCollision(leftPaddle);
    heart[1].handleCollision(rightPaddle);
    heart[1].display();

    if (heart[1].isOffScreen()) {
      heart[1].reset();
    }
  }
}


// scoring()
//
// Update the score
function scoring() {
  // Adds 1 to the score
  score += 1;

  // Makes the paddles get closer together
  leftPaddle.distanceChange(1);
  rightPaddle.distanceChange(-1);

  // Tracks the top score attained by the player
  if (score > maxScore){
    maxScore = score;
  }
}

// checkWin()
//
// Check if the game has been won (to go to the win screen)
function checkWin() {
  // If the paddles are very close, the game ends
  if (dist(leftPaddle.x,0,rightPaddle.x,0) <= 20) {
    gameOver = true;
  }
}

// win()
//
// Displays the win screen
function win() {
  background(0);

  // Sets the amount of time it took the player to complete the game (only once)
  if (playerTimeSet === false){
    playerTime = second();
    playerTimeSet = true;
  }

  // Shows the win screen image
  image(winImage,width/2,height/2 - 50);

  // Displays the win screen text
  winText.display("LOVE WINS!!!");
  win2Text.display("YOU TOOK " + playerTime + " SECONDS!\nMAX KISS COMBO: " + maxScore);
  win3Text.display("press [ENTER] to play again");

  // Plays the win screen kissing sound effect
  winSound.play();

  // Reloads the page if the player presses enter
  if (keyIsDown(ENTER)) {
    location.reload();
  }
}

///////// END NEW /////////
