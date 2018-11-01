// Basic OOP Pong
// by Hazel Thexton
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.
//
// Sound sources:
// https://www.freesoundeffects.com/free-track/smoochy-kiss-428522/
// https://www.partnersinrhyme.com/soundfx/human_sounds/human_kiss2_wav.shtml
//
// Font source:
// https://www.dafont.com/minecraft.font

// Variable to contain the objects representing our heart and paddles
var heart;
var leftPaddle;
var rightPaddle;
var evilHeart;
///////// NEW /////////
// This version of Pong is collaborative, so score is based on the number of
// successful bounces, NOT misses by the other side.
var score = 0;
var gameOver = false;
var startScreen = true;

var leftImage;
var rightImage;
var paddleArray = [];
var shuffledPaddleArray = [];
var heartImage;
var winImage;

var kissSound;
var winSound;

var scoreText;
var winText;
var win2Text;
var startText;

var pixelFont;
// preload()
//
// Loads the kiss audio, text font, and images for the heart and paddles
function preload() {

  for (var i = 0; i < 5; i++) {
    paddleArray[i] = loadImage("assets/images/paddle" + [i] + ".png");
  }

  heartImage = loadImage("assets/images/heart.png");
  winImage = loadImage("assets/images/win.png");

  evilHeartImage = loadImage("assets/images/evilheart.png");

  kissSound = new Audio("assets/sounds/kiss.mp3");
  winSound = new Audio("assets/sounds/win.mp3");

  pixelFont = loadFont('assets/fonts/pixelfont.ttf');
}
///////// END NEW /////////
// setup()
//
// Creates the heart and paddles
function setup() {
  createCanvas(640,480);
  imageMode(CENTER);
  assignImage();
  // Create a heart
  heart = new Heart(width/2,height/2,5,5,20,5,heartImage,kissSound);
  // Create a heart
  evilHeart = new EvilHeart(random(width),random(height),5,5,20,5,evilHeartImage,kissSound);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-20,height/2,30,70,5,DOWN_ARROW,UP_ARROW,rightImage);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(20,height/2,30,70,5,83,87,leftImage);
  // Creates the score text object
  scoreText = new OnscreenText(width/2,70,30,pixelFont);
  // Creates the win text objects
  winText = new OnscreenText(width/2,70,50,pixelFont);
  win2Text = new OnscreenText(width/2,height - 70,30,pixelFont);
  startText = new OnscreenText(width/2,height/2 - 20,80,pixelFont);
  start2Text = new OnscreenText(width/2,height/2 + 40,30,pixelFont);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  if (startScreen === true){
    start();
  }
  else if (!gameOver){
    leftPaddle.handleInput();
    rightPaddle.handleInput();

    evilHeart.isActive();


    heart.update();
    evilHeart.update();
    leftPaddle.update();
    rightPaddle.update();

    if (heart.isOffScreen()) {
      heart.reset();
    }

    heart.handleCollision(leftPaddle);
    heart.handleCollision(rightPaddle);
    evilHeart.handleCollision(leftPaddle);
    evilHeart.handleCollision(rightPaddle);

    heart.display();
    evilHeart.display();
    leftPaddle.display(leftPaddle);
    rightPaddle.display(rightPaddle);
    scoreText.display("KISS POINTS: " + score + "!");

    checkWin();
  }
  else {
    win();
  }
}

// scoring()
//
// Update the score
function scoring() {
  score += 1;
  leftPaddle.distanceChange(1);
  rightPaddle.distanceChange(-1);
}

// checkWin()
//
// Check if the game has been won (to go to the win screen)
function checkWin() {
  if (dist(leftPaddle.x,0,rightPaddle.x,0) <= 20) {
    gameOver = true;
  }
}

// win()
//
// Displays the win screen
function win() {
  background(0);
  image(winImage,width/2,height/2);
  winText.display("LOVE WINS!!!");
  win2Text.display("PRESS ENTER TO PLAY AGAIN");
  winSound.play();
  // Reloads the page if the player presses enter
  if (keyIsDown(ENTER)) {
    location.reload();
  }
}

// start()
//
// Displays the start screen
function start() {
  startText.display("KISS PONG");
  start2Text.display("PRESS ENTER TO PLAY");
  // Starts the game if the player presses enter
  if (keyIsDown(ENTER)) {
    startScreen = false;
  }
}

// assignImage()
//
// Assigns a random image from the arrays to each paddle
function assignImage() {
  // Shuffles the face image array
  shuffledPaddleArray = shuffle(paddleArray);
  rightImage = shuffledPaddleArray[0];
  leftImage = shuffledPaddleArray[1];
}
