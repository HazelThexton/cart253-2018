/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup
var x;
var y;
var exampleImage;
var imageWidth = exampleImage.width/2.5;
var imageHeight = exampleImage.height/2.5;


function setup() {
  createCanvas(1360,657);
  x = width/2;
  y = height/2;
}

function preload() {
  exampleImage = loadImage("assets/images/exampleImage.png");
}

// draw()
//
// Description of draw()

function draw() {
  background(255);
  var gamerText = "GAMERGATOR!!!!";
  textAlign(CENTER,CENTER);
  textSize(64);
  text(gamerText, width/2, height/2);
  var distX = mouseX - x;
  var distY = mouseY - y;
  x += distX/10;
  y += distY/10;
  if (mouseX > x+50) {
    translate(exampleImage.width+x,y);
    scale(-1,1);
    image(exampleImage,0,0);
  } else {
    image(exampleImage,x,y,imageWidth,imageHeight);
}
}
