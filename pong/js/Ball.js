function Ball() {
  this.size = 10;
  this.speed = 5;
  this.x = width/2;
  this.y = height/2;
  this.vx = this.speed;
  this.vy = this.speed;
}


Ball.prototype.update = function () {
  this.x += this.vx;
  this.y += this.vy;
}

Ball.prototype.display = function () {
  rect(this.x,this.y,this.size,this.size);
}

Ball.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
}
