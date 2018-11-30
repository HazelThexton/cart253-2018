// Review
//
// A class to define how displayed text looks and changes. Taken from my
// Project 2.
//

// Text constructor
//
// Sets the properties with the provided arguments
function Review(x,y,image) {
  this.x = x;
  this.y = y;
  this.image = image;
  this.name;
  this.pronoun;
  this.occupation;
  this.review;
  this.string;
  this.author = ["guest_user: \n", "coolguy91: \n", "catgirlnya: \n",
  "king-of-the-internet: \n", "batmanfan85: \n", "neopets-is-life: \n",
"anon167382: \n", "anon87630: \n", "i_think_dogs_should_vote: \n"]
  this.randomAuthor;
  this.adjectives = ["cool", "awesome", "nice", "talented", "amazing",
  "cute", "badass", "sweet", "thoughtful", "smart",
  "brilliant", "elegant", "funny", "hilarious", "skilled",
  "fabulous", "charming", "creative", "imaginative", "kind"];
  this.randomAdjective;
  this.randomSentence;
}

// display()
//
// Display the text onscreen
Review.prototype.display = function () {
  this.writeReview();
  this.review = new OnscreenText(this.x - this.width/2 + 20,this.y,30,pixelFont);
  this.height = 150;
  push();
  rectMode(CENTER);
  stroke(255);
  strokeWeight(2);
  fill(0);
  rect(this.x, this.y + this.height/2 - 60, this.width, this.height, 20);
  pop();
  image(this.image,this.x - this.width/2 + 20,this.y - 40);
  push();
  textAlign(LEFT, TOP);
  this.review.display(this.author[this.randomAuthor] + this.string);
  this.width = textWidth(this.string) + 50;
  pop();
}

// name()
//
// Text size, color, etc.
Review.prototype.writeReview = function () {
  if (this.randomSentence === 0){
    if (this.pronoun === "they") {
      this.string = this.name + "? " + this.pronoun + " are so " + this.adjectives[this.randomAdjective] + "!";
    }
    else {
      this.string = this.name + "? " + this.pronoun + " is so " + this.adjectives[this.randomAdjective] + "!";
    }
  }
  else  if (this.randomSentence === 1){
    this.string ="I think " + this.name + " is super " + this.adjectives[this.randomAdjective] + "...";
  }
  else if (this.randomSentence === 2){
    if (this.pronoun === "they") {
      this.string = "I met " + this.name + ",  and " + this.pronoun + " were very " + this.adjectives[this.randomAdjective] + "! Five stars!";
    }
    else {
      this.string = "I met " + this.name + ",  and " + this.pronoun + " was very " + this.adjectives[this.randomAdjective] + "! Five stars!";
    }
  }
  else  if (this.randomSentence === 3){
    this.string = "You know who's " + this.adjectives[this.randomAdjective] + "???? " + this.name + "!!";
  }
  else  if (this.randomSentence === 4){
    this.string = this.name + " is the most " + this.adjectives[this.randomAdjective] + " " + this.occupation + " around!";
  }
  else  if (this.randomSentence === 5){
    this.string = "You wanna know who's one of the best " + this.occupation + "s? I have gotta say " + this.name + ".";
  }
}
