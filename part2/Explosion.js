class Explosion {
    constructor(pos, color) {
        this.color = color;
        this.pos = createVector(pos.x + random(-10, 10), pos.y + random(-10, 10));
        this.size = 5;
        this.lifespan = 0;
    }

    draw() {
        push();
        noStroke();
        fill(this.color, 200);
        circle(this.pos.x, this.pos.y, this.size);
        pop();
    }

    update() {
        this.lifespan++;
        if (this.lifespan < 60)
            this.size += 2;
        else if (this.lifespan < 120)
            this.size -= 2;
    }
}