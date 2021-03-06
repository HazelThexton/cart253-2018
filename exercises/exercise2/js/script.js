/*********************************************************

Exercise 2 - The Artful Dodger
Hazel Thexton

Exercise 2. A game where your arrow key/touch controlled avatar avoids an enemy,
both avatar and enemy change size and speed depending on when the avatar dodges.
The game tracks the number of dodges and you can win by dodging 10 times.

*********************************************************/

// The position and size of our avatar
var avatarX;
var avatarY;
var avatarSize = 70;
// How much bigger the avatar gets with each successful dodge
var avatarSizeChange;

// The speed and velocity of our avatar
var avatarVX = 0;
var avatarVY = 0;
var avatarSpeed = 10;
// How much faster the avatar gets with each successful dodge
var avatarSpeedChange;

// The image of our avatar
var avatarImage;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 70;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 7;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much faster the enemy circle gets with each successful dodge
var enemySpeedIncrease = 1;

// The image of our enemy
var enemyImage;

// How many dodges the player has made
var dodges = 0;

// Text displaying the number of successful dodges
var dodgeText = "Dodges: ";

// The background image
var backgroundImage;

// The win screen image
var winImage;

// The canvas dimensions
var canvasWidth;
var canvasHeight;

// Preloads the images of the background, avatar and enemy
function preload() {
  avatarImage = loadImage("assets/images/avatar.png");
  enemyImage = loadImage("assets/images/enemy.png");
  backgroundImage = loadImage("assets/images/background.png");
  winImage = loadImage("assets/images/win.png");
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Define the width and height of the canvas relative to the window size
  canvasWidth = windowWidth/2;
  canvasHeight = windowHeight/1.2;
  // Restrict our canvas width to a minimum of 400 (and a height proportionate
  // to that) to keep it playable on smaller windows, ie mobile
  canvasWidth = constrain(canvasWidth,400,5000);
  canvasHeight = constrain(canvasHeight,canvasWidth,canvasWidth * 1.5);
  // Create our playing area
  createCanvas(canvasWidth,canvasHeight);


  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A background
  background(backgroundImage);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // If using the mouse or touch input, the avatar is at the mouse/touch
  // coordinates. Otherwise, see comments in else.
  if (mouseIsPressed) {
    avatarX = mouseX;
    avatarY = mouseY;
  } else {
    // Check which keys are down and set the avatar's velocity based on its
    // speed appropriately

    // Left and right
    if (keyIsDown(LEFT_ARROW)) {
      avatarVX = -avatarSpeed;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      avatarVX = avatarSpeed;
    }

    // Up and down (separate if-statements so you can move vertically and
    // horizontally at the same time)
    if (keyIsDown(UP_ARROW)) {
      avatarVY = -avatarSpeed;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      avatarVY = avatarSpeed;
    }

    // Move the avatar according to its calculated velocity
    avatarX = avatarX + avatarVX;
    avatarY = avatarY + avatarVY;
  }

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;

    // Makes the amount that the size and speed of the avatar changes a random
    // number between -20 and 20. If it was completely random the game would be
    // unplayable
    avatarSizeChange = random(-20,20);
    avatarSpeedChange = random(-20,20);
    // Changes the avatar's speed and size
    avatarSpeed = avatarSpeed + avatarSpeedChange;
    avatarSize = avatarSize + avatarSizeChange;
    // Prevents the speed and size of the avatar from falling below 1
    // and from going over 50. The instructions called for preventing it from
    // falling below zero, but again, this makes the game nearly unplayable,
    // and using 1 instead demonstrates the same knowledge
    avatarSpeed = constrain(avatarSpeed,1,50);
    avatarSize = constrain(avatarSize,1,50);

    // Tells me what the speed and size of the avatar is (to check that the
    // above code works)
    console.log("avatar speed: " + avatarSpeed);
    console.log("avatar size: " + avatarSize);
  }

  // Text modifiers. Places text in the middle of the screen,
  // in the Impact font, and sets the text size to 64 and color to purple
  textAlign(CENTER);
  textFont("Impact");
  textSize(64);
  fill(48,10,91);
  // Display the current number of succesful dodges on the screen
  text(dodgeText + dodges, width/2, height/7);

  // Display the image of the avatar
  image(avatarImage,avatarX,avatarY,avatarSize,avatarSize);

  // Display the image of the enemy
  image(enemyImage,enemyX,enemyY,enemySize,enemySize);

  // Check if the player has successfully dodged 15 times
  if (dodges >= 10) {
    // Displays a win screen over everything else
    image(winImage,0,0,width,height);
    // Stops the avatar and enemy from moving
    avatarSpeed = 0;
    enemySpeed = 0;
    // Reloads the page if the player pressed enter
    if (keyIsDown(ENTER)) {
      location.reload();
    }
  }
}
// Reloads the page if the player double clicks
// after getting 10 dodges (winning)
function doubleClicked() {
  if (dodges >= 10) {
    location.reload();
  }
}
