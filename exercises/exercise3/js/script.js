/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX = 0;
var targetY = 0;
var targetImage;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// Image of the lost poster background
var lostPoster;

// The text on the lost poster
var lost = "LOST";

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

// Tracks how many times draw has run. Used to inform the frequency of
// the target's sine wave on game over.
var time = 0;
// The amplitude of the sine wave, or its maximum height
var amplitude = 100;
// The frequency of the sine wave, or how many cycles there are per unit of time
var frequency = 0.2;
// Allows me to make the sine wave center on the target
var sineCenter;

// Velocity variable
var vx = 8;

// Size of the target
var targetSize = 1;
// How much the target size increases by
var targetSizeIncrease = 2;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");

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

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }

  // The position of the lost poster background
  var lostPosterX = windowWidth - 230;
  var lostPosterY = 10;

  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);
  // While the target is located under the lost poster, this loop randomizes
  // the target location until it's no longer under the lost poster
  while (targetX > lostPosterX - 200 && targetY < lostPosterY + 315){
    targetX = random(0,width);
    targetY = random(0,height);
  }
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY);

  // This makes the sine's center equivalent to the target's vertical position
  sineCenter = targetY - amplitude/2;

  // Display the lost poster (background, target image, and text) over everything
  imageMode(CORNER);
  // Display the poster background
  image(lostPoster, lostPosterX, lostPosterY);
  // Display the target image on the poster
  image(targetImage,lostPosterX + 35, lostPosterY + 80);
  // Display and format the text
  fill(200, 0, 0);
  textSize(40);
  textFont("Helvetica");
  text(lost, lostPosterX + 45, lostPosterY + 50);

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
    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);

    // Moves the target image according to its velocity
    targetX += vx;

    // Tracks the advancement of time each time the draw function runs
    time += 1;

    // Increases the target size every frame
    targetSize += targetSizeIncrease;

    // Moves the target image along the defined sine wave on the Y axis
    targetY = (amplitude * sin(time * frequency)) + sineCenter;

    console.log("here: " + sineCenter);

    // Displays the target image on the game over screen
    image(targetImage, targetX, targetY, targetImage.width + targetSize, targetImage.height + targetSize);
    // Displays a circle around the target
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width + targetSize, targetImage.height + targetSize);
  }
  // Makes the target image turn around when it hits the edge
  if (targetX >= windowWidth || targetX <= 0) {
    vx = -vx;
  }
  // Makes the target image shrink/grow back when it reaches a certain size
  if (targetSize <= -20 || targetSize >= 200) {
    targetSizeIncrease = -targetSizeIncrease;
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
