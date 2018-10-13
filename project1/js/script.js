/******************************************************

Project 1
Hazel Thexton

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

Image sources:
http://www.pngmart.com/image/73027
https://gallery.yopriceville.com/Free-Clipart-Pictures/Underwater/Shark_Transparent_Clip_Art_Image#.W7_ZbWhKjIU
https://www.sciencenewsforstudents.org/article/mystery-microbes-sea

Sound sources:
http://soundbible.com/2067-Blop.html
http://soundbible.com/801-Suck-Up.html
https://www.youtube.com/watch?v=J2ogakQM_so

******************************************************/
// Tracks the advancement of time
var time = 0;

// Track whether the game is over
var gameOver = false;

// Track whether we are on the start screen
var startScreen = true;

// Player position, size, velocity, and direction
var playerX;
var playerY;
var playerSize = 100;
var playerVX = 0;
var playerVY = 0;
var playerMinSpeed = 3;
var playerMaxSpeed = 6;
var playerSpeed = playerMinSpeed;
var playerXDirection;
var playerYDirection;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player image
var playerImage;
// Player rotation
var playerRotate;

// Prey position, size, velocity, perlin noise time value, and direction
var preyX;
var preyY;
var preySize = 90;
var preySizeIncrease = 0.4;
var preyVX;
var preyVY;
var preyMinSpeed = 4;
var preyMaxSpeed = 10;
var preySpeed = preyMinSpeed;
var preyXDirection;
var preyYDirection;
// Perlin noise variables
var tx;
var ty;
// Prey health
var preyAlive;
// Prey image
var preyImage;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 100;
// Number of prey eaten during the game
var preyEaten = 0;

// Sound effects
var popSound;
var eatSound;
// Music
var jellyfishJam;
// Checks if music is playing
var musicPlaying = true;

// preload()
//
// Preloads our sound and images
function preload() {
  backgroundImage = loadImage("assets/images/background.jpg");
  playerImage = loadImage("assets/images/player.png");
  playerDyingImage = loadImage("assets/images/playerDying.png");
  preyImage = loadImage("assets/images/prey.png");

  popSound = new Audio("assets/sounds/pop.wav");
  eatSound = new Audio("assets/sounds/eat.wav");
  jellyfishJam = new Audio("assets/sounds/jellyfishjam.mp3");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(windowWidth,windowHeight);

  noStroke();

  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, health, and perlin noise time value
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyAlive = true;
  tx = random(0,1000);
  ty = random(0,1000);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {

  if (startScreen) {
    background(backgroundImage);

    startScreenInput();

    showStartScreen();
  }
  else if (!gameOver) {
    background(backgroundImage);

    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey(0,0);
    drawPlayer();

    gameText();
  }
  else {
    jellyfishExplosion();
    gameOverInput();
    showGameOver();
  }
}

// Start screen functions

// startScreenInput()
//
// Handles input on the start screen
function startScreenInput() {
  // Starts the game if the player presses enter
  if (keyIsDown(ENTER)) {
    popSound.play();
    popSound.currentTime = 0;
    backgroundMusic();
    startScreen = false;
  }
}

// backgroundMusic()
//
// Handles the background music
function backgroundMusic(){
  jellyfishJam.play();
  jellyfishJam.loop = true;
  musicPlaying = true;
}

// showStartScreen()
//
// Display text about the game instructions!
function showStartScreen() {
  textFormat();
  textAlign(CENTER,CENTER);
  var startScreenText = "JELLY FRENZY\n\n";
  startScreenText += "Eat as many jellyfish as you can!\n";
  startScreenText += "Use the arrow keys to move and SHIFT to sprint.\n";
  startScreenText += "Press ENTER to start.";
  text(startScreenText,width/2,height/2);
}

// textFormat()
//
// Text size, color, etc.
function textFormat() {
  textSize(40);
  fill(255);
  stroke(50,100,255);
  strokeWeight(4);
}

// Actual game functions

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Rotates based on player movement
  playerRotation();
  // Pause music
  if (keyIsDown(ESCAPE) && musicPlaying == true) {
    jellyfishJam.pause();
    musicPlaying = false;
  }
  else if (keyIsDown(ESCAPE) && musicPlaying == false) {
    backgroundMusic();
  }

  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerSpeed;

  }
  else {
    playerVY = 0;
  }

  // Checks for sprinting
  if (keyIsDown(SHIFT)) {
    playerSpeed = constrain(playerSpeed + 1,playerMinSpeed,playerMaxSpeed);
    // Reduce player health, constrain to reasonable range (in addition to base reduction)
    playerHealth = constrain(playerHealth - 0.2,0,playerMaxHealth);

  }
  else {
    // Returns speed to normal
    playerSpeed = constrain(playerSpeed - 1,playerMinSpeed,playerMaxSpeed);
  }
}

// playerRotation()
//
// Check for rotation
function playerRotation() {
  if (keyIsDown(LEFT_ARROW)) {
    playerRotate = constrain(playerRotate - 0.3,-1.5,0);
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerRotate = constrain(playerRotate + 0.3,0,1.5);
  }
  else if (keyIsDown(UP_ARROW)) {
    playerRotate = constrain(playerRotate - 0.3,0,1.5);
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerRotate = constrain(playerRotate + 0.3,-1.5,3);
  }
  else {
    playerRotate = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  determinePlayerDirection();
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// playerDirection()
//
// Determines the direction the player is going
function determinePlayerDirection(){
  if (Math.sign(playerVX) == -1){
    playerXDirection = true;
  }
  else {
    playerXDirection = false;
  }
  if (Math.sign(playerVY) == -1){
    playerYDirection = true;
  }
  else {
    playerYDirection = false;
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  determinePreyDirection();
  // Set velocity based on random noise values to get a new direction
  // and speed of movement
  preyVX = map(noise(tx),0,1,-preySpeed,preySpeed);
  // Use map() to convert from the 0-1 range of the noise() function
  // to the appropriate range of velocities for the prey
  preyVY = map(noise(ty),0,1,-preySpeed,preySpeed);

  // Behavior when the prey "panics" from being near the player
  preyRunAway();

  // Update prey position based on velocity AND number of fish eaten (gets harder)
  preyX += preyVX + preyVX * preyEaten/10;
  preyY += preyVY + preyVY * preyEaten/10;

  tx +=0.1;
  ty +=0.1;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// preyDirection()
//
// Determines the direction the prey is going
function determinePreyDirection(){
  if (Math.sign(preyVX) == -1){
    preyXDirection = true;
  }
  else {
    preyXDirection = false;
  }
  if (Math.sign(preyVY) == -1){
    preyYDirection = true;
  }
  else {
    preyYDirection = false;
  }
}

// preyRunAway()
//
// Makes the prey move fast in the opposite direction from the player
function preyRunAway(){
  if (dist(preyX,preyY,playerX,playerY) <= 300){
    // Increase the speed of the prey's "jitter"
    preySpeed = constrain(preySpeed + 1,preyMinSpeed,preyMaxSpeed);

    // Update prey position based on velocity (added to base movement- so
    // makes it move away faster)
    preyX += preyVX/2;
    preyY += preyVY/2;
    // Makes the prey go the opposite direction of the player by matching
    // the sign (positive or negative) of the player and prey's velocities
    if (preyXDirection != playerXDirection){
      if (Math.sign(playerVX) <= 0){
        preyVX = -Math.abs(preyVX);
      }
      else {
        preyVX = Math.abs(preyVX);
      }
    }
    if (preyYDirection != playerYDirection){
      if (Math.sign(playerVY) <= 0){
        preyVY = -Math.abs(preyVY);
      }
      else {
        preyVY = Math.abs(preyVY);
      }
    }
  }
  else {
    // Reduce the speed of the prey back to normal
    preySpeed = constrain(preySpeed - 1,preyMinSpeed,preyMaxSpeed);
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerSize + preySize) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Kill the prey
    preyAlive = false;
    // Play a slurping sound
    eatSound.play();
    eatSound.currentTime = 0;

    // Check if the prey died
    if (preyAlive === false) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyAlive = true;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey(x,y) {
  preySize += preySizeIncrease;
  // Makes the target image shrink/grow back when it reaches a certain size
  if (preySize <= 40 || preySize >= 60) {
    preySizeIncrease = -preySizeIncrease;
  }
  image(preyImage,preyX + x,preyY + y,preySize,preySize + 30);
}

// drawPlayer()
//
// Draw the player with alpha based on health
function drawPlayer() {
  push();
  // Moves the origin to the target image location
  translate(playerX, playerY);
  // Rotates the image around the new origin (so, it rotates on itself)
  rotate(playerRotate);
  imageMode(CENTER);
  tint(255,playerHealth);
  if (playerHealth < 150){
    tint(255,0,0,playerHealth);
  }
  image(playerImage,0,0,playerSize,playerSize + 50);
  pop();
}

// gameText()
//
// Display the score and text onscreen
function gameText() {
  textFormat();
  textAlign(LEFT,TOP);
  var scoreText = preyEaten + " jellyfish eaten!";
  text(scoreText,40,40);
  textAlign(RIGHT,TOP);
  var stopMusicText = "Press ESC to stop music";
  var playMusicText = "Press ESC to play music";
  if (musicPlaying == true){
    text(stopMusicText,width - 40,40);
  }
  else {
    text(playMusicText,width - 40,40);
  }
}

//Game over functions

// jellyfishExplosion()
//
// Make jellyfish overwhelm the screen
function jellyfishExplosion(){
  for(var i = 0; i < 100; i++){
    push();
    rotate(random());
    drawPrey(random(-width,width),random(-height,height));
    pop();
  }
}

// gameOverInput()
//
// Handles input on the game over screen
function gameOverInput() {
  // Reloads the page if the player presses enter
  if (keyIsDown(ENTER)) {
    popSound.play();
    location.reload();
  }
}

// showGameOver()
//
// Display the game over screen
function showGameOver() {
  textFormat();
  textAlign(CENTER,CENTER);
  var gameOverText = "GAME OVER\n\n";
  gameOverText += "You ate " + preyEaten + " jellyfish\n";
  gameOverText += "before you died.\n";
  gameOverText += "Press ENTER to try again."
  text(gameOverText,width/2,height/2);
}
