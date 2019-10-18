function setup() { // once at the beginning.
    createCanvas(800, 800);
    missileList = [];
    explosions = [];
    silos = [
        new Silo(100, height - 100),
        new Silo(width / 2, height - 100),
        new Silo(width - 100, height - 100),
    ];

    enemyMissiles = [];

    launcher = new EnemyLauncher(10, 3, 2000);
    launcher.fireMissiles();

}

function draw() { // main game loop ... infinite times...
    background(0);

    // launcher.fireMissiles();

    enemyMissiles = enemyMissiles.filter(e => {
        e.draw();
        e.update();
        if (e.currentPos.mag() < e.endPos.mag()) {
            return true;
        } else {
            createExplosions(e.endPoint, 4, 255);
            return false;
        }
    });


    missileList = missileList.filter(m => {
        m.draw();
        m.update();

        if (m.currentPos.mag() < m.endPos.mag()) {
            return true;
        } else {
            createExplosions(m.endPoint, 4, 255);
            return false;
        }
    });

    explosions = explosions.filter(e => {
        e.draw();
        e.update();
        return e.lifespan <= 120;
    });

    silos.forEach(s => s.draw());
}

function createExplosions(loc, num, color) {
    color = color == 0 ? 255 : 0;
    if (num > 0) {
        setTimeout(() => {
            explosions.push(new Explosion(loc, color));
            createExplosions(loc, num - 1, color);
        }, 400 - num * 100);
    }



}

function mouseClicked() {
    let closestSilo = silos.reduce((closest, current) => {
        let currDist = dist(current.pos.x, current.pos.y, mouseX, mouseY);
        let closestDist = dist(closest.pos.x, closest.pos.y, mouseX, mouseY);
        if (closest.missiles < 1)
            return current;
        else if (current.missiles < 1)
            return closest;
        else if (currDist < closestDist)
            return current;
        else
            return closest;
    });

    closestSilo.fireMissile();
}