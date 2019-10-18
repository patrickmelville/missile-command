class PlayerMissile {
    constructor(startX, startY, x, y) {
      this.endPoint = createVector(x, y);
      this.length = 1;
      this.startPos = createVector(startX, startY);
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
      this.length += 10;
    }
  }