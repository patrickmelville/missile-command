class EnemyMissile {
    constructor(s) {
      this.endPoint = createVector(random(100, width-100), height - 75);
      this.length = 1;
      this.startPos = createVector(random(0, width), 0);
      this.endPos = createVector(this.endPoint.x - this.startPos.x, this.endPoint.y - this.startPos.y);
      this.currentPos = createVector(this.endPoint.x - this.startPos.x, this.endPoint.y - this.startPos.y).setMag(this.length);
      this.speed = s;
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
      this.length += this.speed;
    }
  }