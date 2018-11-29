// Review
//
// A class to define how displayed text looks and changes. Taken from my
// Project 2.
//

// Text constructor
//
// Sets the properties with the provided arguments
function Review(x,y,type) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.name;
  this.pronoun;
  this.review;
  this.string;
}

// display()
//
// Display the text onscreen
Review.prototype.display = function (string) {
  this.writeReview();
  this.review = new OnscreenText(this.x,this.y,30,pixelFont);
  push();
  rectMode(CENTER);
  stroke(255);
  strokeWeight(2);
  fill(0);
  rect(this.x, this.y, this.width, this.height, 20);
  pop();
  this.review.display(this.string);
  this.width = textWidth(this.string) + 50;
  this.height = this.size + 50;
}

// name()
//
// Text size, color, etc.
Review.prototype.name = function (name) {
  this.name = name;
}

// name()
//
// Text size, color, etc.
Review.prototype.pronoun = function (pronoun) {
  this.pronoun = pronoun;
}

// name()
//
// Text size, color, etc.
Review.prototype.writeReview = function () {
  if (this.pronoun === "they") {
    this.string = this.name + "?? " + this.pronoun + " are so cool!!!";
  }
  else {
    this.string = this.name + "?? " + this.pronoun + " is so cool!!!";
  }
}
