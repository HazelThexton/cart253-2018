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
// Sound source:
// https://www.freesoundeffects.com/free-track/smoochy-kiss-428522/

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
///////// NEW /////////
// This version of Pong is collaborative, so score is based on the number of
// successful bounces, NOT misses by the other side.
var score = 0;
var gameOver = false;

var leftImage;
var rightImage;
var ballImage;
var winImage;

var kissSound;
var winSound;

var scoreText;
var winText;
var win2Text;

// preload()
//
// Loads the bla audio for the sound of bouncing and images for the ball and paddles
function preload() {
  leftImage = loadImage("assets/images/left.png");
  rightImage = loadImage("assets/images/right.png");
  ballImage = loadImage("assets/images/ball.png");
  winImage = loadImage("assets/images/win.png");

  kissSound = new Audio("assets/sounds/kiss.mp3");
  winSound = new Audio("assets/sounds/win.mp3");
}
///////// END NEW /////////
// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  imageMode(CENTER);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,20,5,ballImage,kissSound);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-20,height/2,30,70,5,DOWN_ARROW,UP_ARROW,rightImage);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(20,height/2,30,70,5,83,87,leftImage);
  // Creates the score text object
  scoreText = new OnscreenText(width/2,50,30);
  // Creates the win text objects
  winText = new OnscreenText(width/2,50,50);
  win2Text = new OnscreenText(width/2,height - 50,30);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  if (!gameOver){
    leftPaddle.handleInput();
    rightPaddle.handleInput();

    ball.update();
    leftPaddle.update();
    rightPaddle.update();

    if (ball.isOffScreen()) {
      ball.reset();
    }

    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);

    ball.display();
    leftPaddle.display();
    rightPaddle.display();
    scoreText.display("BUDDY POINTS: " + score + "!");

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

function checkWin() {
  if (dist(leftPaddle.x,0,rightPaddle.x,0) <= 20) {
    gameOver = true;
  }
}

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
