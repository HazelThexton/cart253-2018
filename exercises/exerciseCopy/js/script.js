/******************************************************************************
Where's [INSERT ANIMAL HERE]?
by Hazel Thexton

An algorithmic version of a Where's Wally searching game where you
need to click on the animal you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the animal we're searching for
var targetX = 0;
var targetY = 0;
var targetImage;

// The animal image array.
var animals = [];

var shuffledAnimals = [];

// Image of the lost poster background
var lostPoster;

// The text on the lost poster
var lost = "LOST";

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys;

// Keep track of whether they've won
var gameOver = false;

// Tracks how many times draw has run. Used to inform the frequency of
// the target's sine wave on game over.
var time = 0;
// The amplitude of the sine wave, or its maximum height
var amplitude = 100;
// The frequency of the sine wave, or how many cycles there are per unit of time.
// This is the same as velocity.
var frequency = 0.2;
// Allows me to make the sine wave center on the target's vertical position
var sineCenter;

// Velocity variable for X. The Y's velocity is equivalent to frequency here.
var vx;
// Speed variable
var speed = 10;

// Size of the target
var targetSize = 1;
// How much the target size increases by
var targetSizeIncrease = 2;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
console.log("array: " + animals[1]);
  // Assigns each of the animal variables to its corresponding image
  for (var i = 0; i < 11; i++) {
    animals[i] = loadImage("assets/images/" + i + ".png");
  }
console.log("array: " + animals[1]);
  // Shuffles the animal array
  shuffledAnimals = shuffle(animals);
  // Assigns a randomly determined animal to the target
  targetImage = shuffledAnimals[0];

  //Preloads the lost poster image
  lostPoster = loadImage("assets/images/target-background.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Define velocity
  vx = speed;

  // Makes the number of decoys larger or smaller depending on screen size
  // so the difficulty scales accordingly
  numDecoys = windowWidth/12;

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Adds a random positive or negative size variation of 50% relative to
    // default decoy size
    var decoySize = random(0.5, 1.5);
    var decoyImage = shuffledAnimals[i];
    console.log(decoyImage);
    console.log(shuffledAnimals[i]);
    image(decoyImage,x,y,decoyImage.width * decoySize,decoyImage.height * decoySize);
  }

  // The position of the lost poster background
  var lostPosterX = windowWidth - lostPoster.width/2 - 20;
  var lostPosterY = lostPoster.height/2 + 20;

  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);
  // Distance between target image and poster
  var d = dist(lostPosterX,lostPosterY, targetX, targetY);

  // While the target is overlapping the lost poster, this loop randomizes
  // the target location until it's no longer under the lost poster
  while (d < targetImage.width/2 + lostPoster.width/2 && d < targetImage.height/2 + lostPoster.height/2){
    targetX = random(0,width);
    targetY = random(0,height);
    // Checks distance between target image and poster again
    var d = dist(lostPosterX,lostPosterY, targetX, targetY);
  }
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY);

  // This makes the sine's center equivalent to the target's vertical position
  sineCenter = targetY - amplitude/2;

  // Display the lost poster (background, target image, and text) over everything
  // Display the poster background
  image(lostPoster, lostPosterX, lostPosterY);
  // Display the target image on the poster
  image(targetImage,lostPosterX, lostPosterY - 10);
  // Display and format the text
  fill(200, 0, 0);
  textSize(40);
  textFont("Helvetica");
  textAlign(CENTER);
  text(lost, lostPosterX, lostPosterY - 110);

}

function draw() {
  if (gameOver) {
    // Clear the canvas
    createCanvas(windowWidth,windowHeight);
    background("#ffff00");
    imageMode(CENTER);
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won and how to play again!
    text("YOU WINNED!",width/2,height/3);
    textSize(65);
    text("PRESS ENTER TO PLAY AGAIN",width/2,height/2);

    // Moves the target image according to its velocity
    targetX += vx;

    // Tracks the advancement of time each time the draw function runs
    time += 1;

    // Increases the target size every frame
    targetSize += targetSizeIncrease;

    // Moves the target image along the defined sine wave on the Y axis
    targetY = (amplitude * sin(time * frequency)) + sineCenter;

    // Moves the origin to the target image location
    translate(targetX, targetY);
    // Rotates the image around the new origin (so, it rotates on itself)
    rotate(0.1 * time);
    // Displays the target image on the game over screen
    image(targetImage, 0, 0, targetImage.width + targetSize, targetImage.height + targetSize);
    // Displays a circle around the target
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(0,0,targetImage.width + targetSize, targetImage.height + targetSize);

    // Makes the target image turn around when it hits the edge
    if (targetX >= windowWidth || targetX <= 0) {
      vx = -vx;
    }
    // Makes the target image shrink/grow back when it reaches a certain size
    if (targetSize <= -20 || targetSize >= 200) {
      targetSizeIncrease = -targetSizeIncrease;
    }
    // Reloads the page if the player presses enter
    if (keyIsDown(ENTER)) {
      location.reload();
    }
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
