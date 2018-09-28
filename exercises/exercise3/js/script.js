/******************************************************************************
Where's [INSERT ANIMAL HERE]?
by Hazel Thexton

An algorithmic version of a Where's Wally searching game where you
need to click on the animal you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position of the animal we're searching for
var targetX = 0;
var targetY = 0;

// Variables we will assign randomized images to later
var targetImage;
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

// The animal images we will assign to the above variables. Please note I have
// no idea what those last two animals are so I named them at random.
var daschund;
var lion;
var panther;
var tiger;
var leopard;
var hyena;
var bear;
var polarBear;
var panda;
var dog;
var cat;
// The animal image array.
var animals = [daschund, lion, panther, tiger, leopard, hyena, bear, polarBear, panda, dog, cat];

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

  // Assigns each of the animal variables to its corresponding image
  for (var i = 0; i < 11; i++) {
    animals[i] = loadImage("assets/images/" + i + ".png");
  }

  // Shuffles the animal array
  var shuffledAnimals = shuffle(animals);
  // Assigns a randomly determined animal to each variable including the target
  targetImage = shuffledAnimals[0];
  decoyImage1 = shuffledAnimals[1];
  decoyImage2 = shuffledAnimals[2];
  decoyImage3 = shuffledAnimals[3];
  decoyImage4 = shuffledAnimals[4];
  decoyImage5 = shuffledAnimals[5];
  decoyImage6 = shuffledAnimals[6];
  decoyImage7 = shuffledAnimals[7];
  decoyImage8 = shuffledAnimals[8];
  decoyImage9 = shuffledAnimals[9];
  decoyImage10 = shuffledAnimals[10];

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
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    if (r < 0.1) {
      image(decoyImage1,x,y,decoyImage1.width * decoySize,decoyImage1.height * decoySize);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,decoyImage2.width * decoySize,decoyImage2.height * decoySize);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,decoyImage3.width * decoySize,decoyImage3.height * decoySize);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,decoyImage4.width * decoySize,decoyImage4.height * decoySize);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,decoyImage5.width * decoySize,decoyImage5.height * decoySize);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,decoyImage6.width * decoySize,decoyImage6.height * decoySize);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,decoyImage7.width * decoySize,decoyImage7.height * decoySize);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,decoyImage8.width * decoySize,decoyImage8.height * decoySize);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,decoyImage9.width * decoySize,decoyImage9.height * decoySize);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,decoyImage10.width * decoySize,decoyImage10.height * decoySize);
    }
  }

  // The position of the lost poster background
  var lostPosterX = windowWidth * 0.9;
  var lostPosterY = windowHeight * 0.25;
  // Distance between target image and poster
  var d = dist(targetX,targetY,lostPosterX,lostPosterY);

  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);

  // While the target is overlapping the lost poster, this loop randomizes
  // the target location until it's no longer under the lost poster
  while (d < targetImage.width/2 + lostPoster.height/2){
    targetX = random(0,width);
    targetY = random(0,height);
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
