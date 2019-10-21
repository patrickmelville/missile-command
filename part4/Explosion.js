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
        if (this.lifespan < 60) {
            this.size += 2;
        } else if (this.lifespan < 120) {
            this.size -= 2;
        }

        this.collisionCheckEnemyMissiles()
        this.collisionCheckCities()
        this.collisionCheckSilos()
    }

    collisionCheckEnemyMissiles() {
        // for every missile
        // get dist missile current position & explosion pos
        // if dist < explosion size
        // remove missile
        
        enemyMissiles = enemyMissiles.filter( eMissile => {
            let x2 = eMissile.currentPos.x + eMissile.startPos.x;
            let y2 = eMissile.currentPos.y + eMissile.startPos.y;
            let d = dist(this.pos.x, this.pos.y, x2, y2);
            return d > this.size / 2;
        });
    }
    collisionCheckCities() {
        cities = cities.filter( c => {
            let d = dist(this.pos.x, this.pos.y, c.x, c.y);
            return d > this.size / 2;
        });

    }
    collisionCheckSilos() {
        silos = silos.filter( s => {
            let d = dist(this.pos.x, this.pos.y, s.pos.x, s.pos.y);
            return d > this.size / 2;
        });
    }
}
