/******************************************************

Project 1
Hazel Thexton

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/
var time = 0;

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity, and direction
var playerX;
var playerY;
var playerSize = 50;
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

// Prey position, size, velocity, perlin noise time value, and direction
var preyX;
var preyY;
var preySize = 50;
var preySizeIncrease = 0.4;
var preyVX;
var preyVY;
var preyMinSpeed = 4;
var preyMaxSpeed = 10;
var preySpeed = preyMinSpeed;
var preyXDirection;
var preyYDirection;
var tx;
var ty;

// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey image
var preyImage;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

// preload()
//
// Preloads our sound and images
function preload() {
  playerImage = loadImage("assets/images/player.png");
  preyImage = loadImage("assets/images/prey.png");
}
// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

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
  preyHealth = preyMaxHealth;
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

  background(100,100,200);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    gameOverInput();

    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
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
    playerSpeed = constrain(playerSpeed - 1,playerMinSpeed,playerMaxSpeed);
  }
}

// gameOverInput()
//
// Handles input on the game over screen
function gameOverInput() {
  // Reloads the page if the player presses enter
  if (keyIsDown(ENTER)) {
    location.reload();
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
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  determinePreyDirection();

  offsetX = random();
  offsetY = random();
  // Set velocity based on random noise values to get a new direction
  // and speed of movement
  preyVX = map(noise(tx),0,1,-preySpeed,preySpeed);
  // Use map() to convert from the 0-1 range of the noise() function
  // to the appropriate range of velocities for the prey
  preyVY = map(noise(ty),0,1,-preySpeed,preySpeed);

  // Behavior when the prey "panics" from being near the player
  if (dist(preyX,preyY,playerX,playerY) <= 150){
    preyRunAway();
  }
  else {
    // Reduce the speed of the prey back to normal
    preySpeed = constrain(preySpeed - 1,preyMinSpeed,preyMaxSpeed);

  }

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

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

  // Increase the speed of the prey's "jitter"
  preySpeed = constrain(preySpeed + 1,preyMinSpeed,preyMaxSpeed);

  // Increase the speed of the prey's size changing
  //preySizeIncrease = 1;

  // Update prey position based on velocity (added to base movement- so
  // makes it moves away faster)
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

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  tint(255,preyHealth);
  preySize += preySizeIncrease;
  // Makes the target image shrink/grow back when it reaches a certain size
if (preySize <= 40 || preySize >= 60) {
  preySizeIncrease = -preySizeIncrease;
}
  image(preyImage,preyX,preyY,preySize,preySize);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  // Tracks the advancement of time each time the draw function runs
time += 1;
// Moves the origin to the target image location
translate(playerX, playerY);
// Rotates the image around the new origin (so, it rotates on itself)
rotate(0.1 * time);

  tint(255,playerHealth);
  image(playerImage,playerX,playerY,playerSize,playerSize + 20);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died.\n";
  gameOverText += "Press ENTER to try again."
  text(gameOverText,width/2,height/2);
}