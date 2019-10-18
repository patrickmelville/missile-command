class Silo {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.missiles = 10;
    }

    draw() {
        if (this.missiles > 0) circle(this.pos.x   , this.pos.y + 10, 10);

        if (this.missiles > 1) circle(this.pos.x-10, this.pos.y + 20, 10);
        if (this.missiles > 2) circle(this.pos.x+10, this.pos.y + 20, 10);

        if (this.missiles > 3) circle(this.pos.x-20, this.pos.y + 30, 10);
        if (this.missiles > 4) circle(this.pos.x   , this.pos.y + 30, 10);
        if (this.missiles > 5) circle(this.pos.x+20, this.pos.y + 30, 10);
        
        if (this.missiles > 6) circle(this.pos.x-30, this.pos.y + 40, 10);
        if (this.missiles > 7) circle(this.pos.x-10, this.pos.y + 40, 10);
        if (this.missiles > 8) circle(this.pos.x+10, this.pos.y + 40, 10);
        if (this.missiles > 9) circle(this.pos.x+30, this.pos.y + 40, 10);
    }

    fireMissile() {
        if (this.missiles > 0) {
            this.missiles--;
            missileList.push(new PlayerMissile(this.pos.x, this.pos.y, mouseX, mouseY));
        }
    }
}