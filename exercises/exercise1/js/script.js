// Exercise 1 - Moving pictures
// Hazel Thexton
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The image of a gator
var gatorImage;
// The current position of the gator
var gatorImageX;
var gatorImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// The image of my cat Furie
var furieImage;
// The current position of Furie
var furieImageX;
var furieImageY;

// The image of my cat Peanut
var peanutImage;
// The current position of Peanut
var peanutImageX;
var peanutImageY;

// The image of a demon girl
var demonImage;
// The current position of demon
var demonImageX;
var demonImageY;

// Sine wave variables. Based on experimentation I think it is possible to
// achieve a sine wave with simply sin * time, however adding frequency
// and amplitude variables offers more control.

// Tracks how many times draw has run. Used to inform the frequency of
// the demon's sine wave.
var time = 0;
// The amplitude of the sine wave, or its maximum height
var amplitude = 5;
// The frequency of the sine wave, or how many cycles there are per unit of time
var frequency = 0.2;


// preload()
//
// Load the six images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  gatorImage = loadImage("assets/images/gator.png");
  furieImage = loadImage("assets/images/furie.png");
  peanutImage = loadImage("assets/images/peanut.png");
  demonImage = loadImage("assets/images/demon.png");
}

// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // Start the gator image at the center left of the canvas
  gatorImageX = 0;
  gatorImageY = width/2;

  // Start the peanut image at the centre of the canvas
  peanutImageX = width/2;
  peanutImageY = height/2;

  // Start the demon image at the upper left of the canvas
  demonImageX = 0;
  demonImageY = width/3;



  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  // Move the gator image right by increasing its x position
  gatorImageX += 2;

  // Display the gator image
  image(gatorImage,gatorImageX,gatorImageY);

  // Define the coordinates of the furie image as the mouse coordinates
  furieImageX = mouseX;
  furieImageY = mouseY;

  // Display the furie image at mouse coordinates
  image(furieImage,furieImageX,furieImageY);

  // Move the peanut image by moving it 1/50th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - peanutImageX;
  var yDistance = mouseY - peanutImageY;
  // Add 1/50th of the x and y distance to the peanut image's current (x,y) location
  peanutImageX = peanutImageX + xDistance/50;
  peanutImageY = peanutImageY + yDistance/50;

  // Display the peanut image
  image(peanutImage,peanutImageX,peanutImageY);

  // Moves the demon image right by increasing its x position
  demonImageX += 1;

  // Tracks the advancement of time each time the draw function runs
  time += 1;

  // Moves the demon image along the defined sine wave on the Y axis
  demonImageY = amplitude * sin(time * frequency);

  // Display the demon image
  image(demonImage,demonImageX,demonImageY + 100);

}
