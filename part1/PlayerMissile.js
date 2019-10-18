class PlayerMissile {
  constructor(x, y) {
    this.endPoint = createVector(x, y);
    this.length = 1;
    this.startPos = createVector(400, 700);
    this.endPos = createVector(x - this.startPos.x, y - this.startPos.y);
    this.currentPos = createVector(x - this.startPos.x, y - this.startPos.y).setMag(this.length);
  }

  draw() {
    push();

    strokeWeight(4);
    stroke(255);
    translate(this.startPos.x, this.startPos.y);
    line(0, 0, this.currentPos.x, this.currentPos.y);
    rotate(this.endPos.heading());
    pop();
  }
  update() {
    this.currentPos.setMag(this.length);
    this.length += 5;
  }
}

class Explosion {
  constructor(pos, color) {
    this.color = color;
    this.pos = createVector(pos.x + random(-10,10), pos.y + random(-10,10));
    this.size = 5;
    this.lifespan = 0;
  }

  draw() {
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.size);
  }

  update() {
    this.lifespan++;
    if (this.lifespan < 30)
      this.size += 3;
    else if (this.lifespan < 60)
      this.size -=3;
  }
}






