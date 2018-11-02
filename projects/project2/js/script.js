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
var heart;
var extraHeart;
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
// Variable tracking whether the extra heart is active
var extraHeartActive = false;

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
var ohNoSound;

// Variables for our various text elements
var scoreText;
var winText;
var win2Text;
var win3Text;
var startText;

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
  ohNoSound = new Audio("assets/sounds/ohno.mp3");

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
  heart = new Heart(width/2,height/2,5,5,20,5,heartImage,kissSound);
  extraHeart = new Heart(width/2,height/2,5,5,20,5,heartImage,kissSound);
  // Create a heartbreak obstacles
  heartbreak = new Heartbreak(random(width),random(height),5,5,20,5,heartbreakImage,ohNoSound);
  // Create an evil heart
  doubler = new Doubler(random(width),random(height),15,50,doublerImage,ohNoSound);

  // Creates the score text object
  scoreText = new OnscreenText(width/2,70,30,pixelFont);
  // Creates the win screen text objects
  winText = new OnscreenText(width/2,70,50,pixelFont);
  win2Text = new OnscreenText(width/2,height - 70,30,pixelFont);
  win3Text = new OnscreenText(width/2,130,30,pixelFont);
  // Creates the start screen text objects
  startText = new OnscreenText(width/2,height/2 - 20,80,pixelFont);
  start2Text = new OnscreenText(width/2,height/2 + 40,30,pixelFont);
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
  // Checks if the player is on the start screen
  if (startScreen === true){
    start();
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
    heart.update();
    heartbreak.update();

    // Checks if the heart is offscreen, and if so resets it
    if (heart.isOffScreen()) {
      heart.reset();
    }

    // Handles collisions between all these objects
    heart.handleCollision(leftPaddle);
    heart.handleCollision(rightPaddle);
    heartbreak.handleCollision(leftPaddle);
    heartbreak.handleCollision(rightPaddle);
    doubler.handleCollision();
    ///////// END NEW /////////

    // Displays all these objects
    leftPaddle.display(leftPaddle);
    rightPaddle.display(rightPaddle);
    ///////// NEW /////////
    heart.display();
    heartbreak.display();
    doubler.display();
    leftPaddle.lipstick(leftPaddle);
    rightPaddle.lipstick(rightPaddle);
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
  start2Text.display("PRESS ENTER TO PLAY");

  // Starts the game if the player presses enter
  if (keyIsDown(ENTER)) {
    startScreen = false;
  }
}

// extraHeartIsActive()
//
// Checks if the extra heart is active and if so, enables all its functions
function extraHeartIsActive(){
  if (extraHeartActive === true){
    extraHeart.update();
    extraHeart.handleCollision(leftPaddle);
    extraHeart.handleCollision(rightPaddle);
    extraHeart.display();

    if (extraHeart.isOffScreen()) {
      extraHeart.reset();
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

  // Shows the win screen image
  image(winImage,width/2,height/2 + 20);

  // Displays the win screen text
  winText.display("LOVE WINS!!!");
  win2Text.display("PRESS ENTER TO PLAY AGAIN");
  win3Text.display("MAX KISS COMBO: " + maxScore);

  // Plays the win screen kissing sound effect
  winSound.play();

  // Reloads the page if the player presses enter
  if (keyIsDown(ENTER)) {
    location.reload();
  }
}

///////// END NEW /////////
