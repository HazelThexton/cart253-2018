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
var player = {
  x : 0,
  y : 0,
  size : 100,
  vx : 0,
  vy : 0,
  minSpeed : 8,
  maxSpeed : 15,
  speed : 8,
  xDirection : false,
  yDirection : false,
  // Player health
  health : 255,
  maxHealth : 255,
  // Player image
  image : 0,
  // Player rotation
  rotate : 0
}

// Prey position, size, velocity, perlin noise time value, and direction
var prey = {
  x : 0,
  y : 0,
  size : 90,
  sizeIncrease : 0.4,
  vx : 0,
  vy : 0,
  minSpeed : 8,
  maxSpeed : 20,
  speed : 8,
  xDirection : false,
  yDirection : false,
  // Perlin noise variables
  tx : 0,
  ty : 0,
  // Prey health
  health : 0,
  maxHealth : 255,
  // Prey image
  image : 0
}

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
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
  player.image = loadImage("assets/images/player.png");
  prey.image = loadImage("assets/images/prey.png");

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
  prey.x = width/5;
  prey.y = height/2;
  prey.vx = -prey.maxSpeed;
  prey.vy = prey.maxSpeed;
  prey.health = prey.maxHealth;
  prey.tx = random(0,1000);
  prey.ty = random(0,1000);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  player.x = 4*width/5;
  player.y = height/2;
  player.health = player.maxHealth;
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

// Core game functions

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
    player.vx = -player.speed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    player.vx = player.speed;
  }
  else {
    player.vx = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    player.vy = -player.speed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    player.vy = player.speed;

  }
  else {
    player.vy = 0;
  }

  // Checks for sprinting
  if (keyIsDown(SHIFT)) {
    player.speed = constrain(player.speed + 1,player.minSpeed,player.maxSpeed);
    // Reduce player health, constrain to reasonable range (in addition to base reduction)
    player.health = constrain(player.health - 0.2,0,player.maxHealth);

  }
  else {
    // Returns speed to normal
    player.speed = constrain(player.speed - 1,player.minSpeed,player.maxSpeed);
  }
}

// playerRotation()
//
// Check for rotation
function playerRotation() {
  if (keyIsDown(LEFT_ARROW)) {
    player.rotate = constrain(player.rotate - 0.3,-1.5,0);
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    player.rotate = constrain(player.rotate + 0.3,0,1.5);
  }
  else if (keyIsDown(UP_ARROW)) {
    player.rotate = constrain(player.rotate - 0.3,0,1.5);
  }
  else if (keyIsDown(DOWN_ARROW)) {
    player.rotate = constrain(player.rotate + 0.3,-1.5,3);
  }
  else {
    player.rotate = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  determinePlayerDirection();
  // Update position
  player.x += player.vx;
  player.y += player.vy;

  // Wrap when player goes off the canvas
  if (player.x < 0) {
    player.x += width;
  }
  else if (player.x > width) {
    player.x -= width;
  }

  if (player.y < 0) {
    player.y += height;
  }
  else if (player.y > height) {
    player.y -= height;
  }
}

// playerDirection()
//
// Determines the direction the player is going
function determinePlayerDirection(){
  if (Math.sign(player.vx) == -1){
    player.xDirection = true;
  }
  else {
    player.xDirection = false;
  }
  if (Math.sign(player.vy) == -1){
    player.yDirection = true;
  }
  else {
    player.yDirection = false;
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  determinePreyDirection();
  // Set velocity based on random noise values to get a new direction
  // and speed of movement
  prey.vx = map(noise(prey.tx),0,1,-prey.speed,prey.speed);
  // Use map() to convert from the 0-1 range of the noise() function
  // to the appropriate range of velocities for the prey
  prey.vy = map(noise(prey.ty),0,1,-prey.speed,prey.speed);

  // Behavior when the prey "panics" from being near the player
  preyRunAway();

  // Update prey position based on velocity AND number of fish eaten (gets harder)
  prey.x += prey.vx + prey.vx * preyEaten/10;
  prey.y += prey.vy + prey.vy * preyEaten/10;

  prey.tx +=0.1;
  prey.ty +=0.1;

  // Screen wrapping
  if (prey.x < 0) {
    prey.x += width;
  }
  else if (prey.x > width) {
    prey.x -= width;
  }

  if (prey.y < 0) {
    prey.y += height;
  }
  else if (prey.y > height) {
    prey.y -= height;
  }
}

// preyDirection()
//
// Determines the direction the prey is going
function determinePreyDirection(){
  if (Math.sign(prey.vx) == -1){
    prey.xDirection = true;
  }
  else {
    prey.xDirection = false;
  }
  if (Math.sign(prey.vy) == -1){
    prey.yDirection = true;
  }
  else {
    prey.yDirection = false;
  }
}

// preyRunAway()
//
// Makes the prey move fast in the opposite direction from the player
function preyRunAway(){
  if (dist(prey.x,prey.y,player.x,player.y) <= 300){
    // Increase the speed of the prey's "jitter"
    prey.speed = constrain(prey.speed + 1,prey.minSpeed,prey.maxSpeed);

    // Update prey position based on velocity (added to base movement- so
    // makes it move away faster)
    prey.x += prey.vx/2;
    prey.y += prey.vy/2;
    // Makes the prey go the opposite direction of the player by matching
    // the sign (positive or negative) of the player and prey's velocities
    if (prey.xDirection != player.xDirection){
      if (Math.sign(player.vx) <= 0){
        prey.vx = -Math.abs(prey.vx);
      }
      else {
        prey.vx = Math.abs(prey.vx);
      }
    }
    if (prey.yDirection != player.yDirection){
      if (Math.sign(player.vy) <= 0){
        prey.vy = -Math.abs(prey.vy);
      }
      else {
        prey.vy = Math.abs(prey.vy);
      }
    }
  }
  else {
    // Reduce the speed of the prey back to normal
    prey.speed = constrain(prey.speed - 1,prey.minSpeed,prey.maxSpeed);
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  player.health = constrain(player.health - 0.5,0,player.maxHealth);
  // Check if the player is dead
  if (player.health === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(player.x,player.y,prey.x,prey.y);
  // Check if it's an overlap
  if (d < player.size + prey.size) {
    // Increase the player health
    player.health = constrain(player.health + eatHealth,0,player.maxHealth);
    // Reduce the prey health
    prey.health = constrain(prey.health - eatHealth,0,prey.maxHealth);
    // Play a slurping sound
    eatSound.play();
    eatSound.currentTime = 0;

    // Check if the prey died
    if (prey.health === 0) {
      // Move the "new" prey to a random position
      prey.x = random(0,width);
      prey.y = random(0,height);
      // Give it full health
      prey.health = prey.maxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey(x,y) {
  prey.size += prey.sizeIncrease;
  // Makes the target image shrink/grow back when it reaches a certain size
  if (prey.size <= 70 || prey.size >= 110) {
    prey.sizeIncrease = -prey.sizeIncrease;
  }
  // The game gets really laggy if I keep the tint on for the jellyfish explosion
  push ();
  if (!gameOver){
    // The constraint prevents the jellies from becoming so transparent they are invisible
    tint(255,constrain(prey.health,100,prey.maxHealth));
  }
  image(prey.image,prey.x + x,prey.y + y,prey.size,prey.size + 30);
  pop ();
}

// drawPlayer()
//
// Draw the player with alpha based on health
function drawPlayer() {
  push();
  // Moves the origin to the target image location
  translate(player.x, player.y);
  // Rotates the image around the new origin (so, it rotates on itself)
  rotate(player.rotate);
  imageMode(CENTER);
  tint(255,player.health);
  if (player.health < 150){
    tint(255,0,0,player.health);
  }
  image(player.image,0,0,player.size,player.size + 50);
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
