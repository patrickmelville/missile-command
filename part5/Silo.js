class Silo {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.missiles = 10;
    }

    draw() {
        noStroke();
        if (this.missiles > 0) this.drawMissile(this.pos.x   , this.pos.y + 10);

        if (this.missiles > 1) this.drawMissile(this.pos.x-10, this.pos.y + 20);
        if (this.missiles > 2) this.drawMissile(this.pos.x+10, this.pos.y + 20);

        if (this.missiles > 3) this.drawMissile(this.pos.x-20, this.pos.y + 30);
        if (this.missiles > 4) this.drawMissile(this.pos.x   , this.pos.y + 30);
        if (this.missiles > 5) this.drawMissile(this.pos.x+20, this.pos.y + 30);
        
        if (this.missiles > 6) this.drawMissile(this.pos.x-30, this.pos.y + 40);
        if (this.missiles > 7) this.drawMissile(this.pos.x-10, this.pos.y + 40);
        if (this.missiles > 8) this.drawMissile(this.pos.x+10, this.pos.y + 40);
        if (this.missiles > 9) this.drawMissile(this.pos.x+30, this.pos.y + 40);
    }

    drawMissile(x,y){
        rect(x, y, 3, 7); // center
        rect(x-3, y+5, 3, 5); // left
        rect(x+3, y+5, 3, 5); // right
    }

    fireMissile() {
        if (this.missiles > 0) {
            this.missiles--;
            missileList.push(new PlayerMissile(this.pos.x, this.pos.y, mouseX, mouseY));
        }
    }
}