// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.
//
// Image sources:
// https://www.istockphoto.com/ca/photos/profile-picture?sort=mostpopular&mediatype=photography&phrase=profile%20picture
// https://www.samsung.com/global/galaxy/galaxy-s8/security/
//
// Sound source:
// http://www.pacdv.com/sounds/voices-1.html

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
///////// NEW /////////
var leftImage;
var rightImage;
var ballImage;

// preload()
//
// Loads the bla audio for the sound of bouncing and images for the ball and paddles
function preload() {
  blaSFX = new Audio("assets/sounds/bla.wav");
  leftImage = loadImage("assets/images/left.png");
  rightImage = loadImage("assets/images/right.png");
  ballImage = loadImage("assets/images/ball.png");
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  imageMode(CENTER);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,50,5,ballImage);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-50,height/2,70,90,5,DOWN_ARROW,UP_ARROW,rightImage);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(50,height/2,70,90,5,83,87,leftImage);
}
///////// END NEW /////////

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
  ///////// NEW /////////
  if (ball.location() === "right") {
    leftPaddle.scoring();
    ball.reset();
  }
  else if (ball.location() === "left"){
    rightPaddle.scoring();
    ball.reset();
  }
  console.log(rightPaddle.score);
  console.log(leftPaddle.score);
  ///////// END NEW /////////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}
