// to do list for part 5

/* 
- rework missiles
- multiple levels
- enhance graphic design
*/

const allMyTimeouts = new Set;

function setup() { // once at the beginning.
    createCanvas(800, 800);
    textAlign(CENTER);
    textFont("VT323");
    launcher = new EnemyLauncher(20, 2, 2000);
    gameState = 0; // 0 = unstarted, 1-? what level im on
    missileList = [];
    explosions = [];
    silos = [];
    cities = [];
    enemyMissiles = [];
}

function draw() { // main game loop ... infinite times...
    background(100);
    console.log(allMyTimeouts, enemyMissiles.length, launcher);
    
    if (gameState == -1) { // GAME OVER SCREEN
        textSize(188);
        text("GAME OVER", width / 2, height / 3);
        textSize(42);
        text("Press Spacebar to Start", width / 2, height / 2);
        clearAllMyTimeouts();
    } else if (gameState == 0) { // MENU SCREEN
        textSize(124);
        text("MISSILE COMMAND", width / 2, height / 3);
        textSize(42);
        text("Press Spacebar to Start", width / 2, height / 2);
    } else if (gameState > 0) {

        cities.forEach(c => c.draw());
        
        silos.forEach(s => s.draw());

        enemyMissiles = enemyMissiles.filter(e => {
            e.draw();
            e.update();
            if (e.currentPos.mag() < e.endPos.mag()) {
                return true;
            } else {
                createExplosions(e.endPoint, 4, 255);
                // remove from mytimeoutlist?
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

        // did we die?
        if (cities.length == 0) {
            gameState = -1;
        }
    }

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

// INPUT section
function mouseClicked() {
    if (gameState > 0) {
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
}

function keyPressed() { // on SpaceBar only on gamestart or gameover
    if (keyCode === 32 && gameState < 1) { 
        console.log("START THE GAME!");
        restart();
        gameState = 1;
        // level 1 settings
        launcher = new EnemyLauncher(20, 2, 2000);
        launcher.fireMissiles();
    }
}

function restart(){
    missileList = [];
    explosions = [];
    enemyMissiles = [];
    silos = [
        new Silo(50, height - 100),
        new Silo(width / 2, height - 100),
        new Silo(width - 50, height - 100),
    ];
    cities = [
        new City(100, height - 70),
        new City(200, height - 70),
        new City(300, height - 70),
        new City(450, height - 70),
        new City(550, height - 70),
        new City(650, height - 70),
    ];
}

function myGlobalTimeout(fn, delay){
    const id = setTimeout(() => { 
        fn();
        allMyTimeouts.delete(id);
     }, delay);
    allMyTimeouts.add(id);
}

function clearAllMyTimeouts(){
    allMyTimeouts.forEach(t => {
        clearTimeout(t);
    });
    allMyTimeouts.clear();
}