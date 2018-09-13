// Exercise 0 - Spiritual Self-Portrait
// Hazel Thexton
// 6 September 2018

function setup() {
  //sets size and colour of background
  createCanvas(500,500);
  background(200,220,220);

  // yellow hair behind head, no stroke
  noStroke();
  fill(250,250,20);
  arc(250, 200, 300, 180, 200, PI, PIE);

  //red shirt with rounded shoulders
  fill(200,0,0);
  rect(118, 390, 270, 300, 90);

  //ears and neck, darker pink and behind the main head shape
  //ears
  fill(255,160,160);
  ellipse(230,250,200,100);
  ellipse(259,250,229,100);
  //neck (rounded corners to make neckline)
  rect(202, 190, 100, 255, 40);

  // main head colour and shape
  fill(255,200,190);
  ellipseMode(CENTER);
  ellipse(250,250,200,250);



  noStroke();
  //eyes, two circles coloured black
  fill(0);
  ellipse(200,225,20,20);
  ellipse(300,225,20,20);

  // Nose colour
  fill(255,150,150);
  // Main nose part
  triangle(227, 275, 273, 275, 250, 220);
  // tip of nose
  ellipse(250,280,49,30);

  // Draw the mouth out of an ellipse and a dividing line

  // Lip colour
  fill(200,0,0, 100);
  // Lips
  ellipse(250,320,50,25);
  // Lip divider colour and size
  stroke(0,0,0);
  strokeWeight(4);
  // Lip divider
  line(220,316,280,321);

  noStroke();
  // Hair colour
  fill(250,250,20);
  // front part of hair
  arc(230, 115, 320, 180, 130, PI, PIE);


  //main frames of glasses, using stroke here and no fill
  noFill();
  stroke(0);
  ellipse(200,225,90,90);
  ellipse(300,225,90,90);
  //bridge of glasses
  line(245,230,255,230);

  //eyebrows
  line(180,210,220,210);
  line(280,210,320,210);
  // mole
  point(290, 330);

}


// draw()
//
// Description of draw()

function draw() {

}
