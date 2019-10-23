function setup() { // once at the beginning.
    createCanvas(800, 800);
    textAlign(CENTER);
    textFont("VT323");
    gameState = 0; // 0 = unstarted, 1-? what level im on
    remainingMissiles = 0;
    remainingCities = 6;
    score = 0;
    bonusDelay = 30 * 3;
    missileList = [];
    explosions = [];
    silos = [];
    cities = [];
    enemyMissiles = [];
}

function draw() { // main game loop ... infinite times...
    background(10,0,40);
    drawStats();

    fill(255);
    if (gameState == -1) { // GAME OVER SCREEN
        textSize(188);
        text("GAME OVER", width / 2, height / 3);
        textSize(42);
        text("Press Spacebar to Start", width / 2, height / 2);
    } else if (gameState == 0) { // MENU SCREEN
        textSize(124);
        text("MISSILE COMMAND", width / 2, height / 3);
        textSize(42);
        text("Press Spacebar to Start", width / 2, height / 2);
    } else if (gameState > 0) {
        remainingCities = 6;
        cities.forEach(c =>{
            c.draw();
            if(c.destroyed){
                remainingCities--;
            }
        });

        remainingMissiles = 0;
        silos.forEach(s => {
            s.draw();
            remainingMissiles += s.missiles;
        });

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

        // did we die?
        if (remainingCities < 1) {
            gameState = -1;
        }

        // are we done with this level?
        if (enemyMissiles < 1) {
            // show bonus points screen..... later
            console.log("ready to go to next level!");
            textSize(122);
            text("LEVEL COMPLETE", width/2, height/3);
            textSize(88);
            text("BONUS POINTS", width/2, height/1.8);
            text("score: " + score + " + " + calculateBonus(), width/2, height/1.5);

            bonusDelay--;
            if(bonusDelay < 1){
                score += calculateBonus();
                move2NextLevel();
            }
        }

    }

}

function move2NextLevel(){
    // reset bonusDelay, silos, and +1 city
    bonusDelay = 30 * 3;
    if (remainingCities < 6) {
        remainingCities++;
        let cityIndex = cities.findIndex( c => c.destroyed);
        cities[cityIndex].destroyed = false;
    };
    silos = [
        new Silo(50, height - 100),
        new Silo(width / 2, height - 100),
        new Silo(width - 50, height - 100),
    ];
    // level 2+ settings
    gameState++;
    for (let i = 0; i < 20 + (gameState * 3); i++) {
        let r = random(-2000, 2000);
        enemyMissiles.push(new EnemyMissile(2 + gameState/2, r + i * (1000 - gameState * 100)));
    }
}

function createExplosions(loc, num, myColor) {
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
        for (let i = 0; i < 20; i++) {
            let r = random(-2000, 2000)
            enemyMissiles.push(new EnemyMissile(2, r + i * 1000));
        }
    }
}

function restart() {
    score = 0;
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


function drawStats() {
    let location = 100;
    // textSize(16);
    // text("EnemyMissiles: " + enemyMissiles.length, width - 100, location);
    // text("RemainingMissiles: " + remainingMissiles, width - 100, location - 15);
    // text("Cities: " + remainingCities, width - 100, location - 30);
    textSize(36);
    text("Score: " + score, width - 100, location - 45);
    text("Level: " + gameState, width - 100, location - 70);
}

function calculateBonus() {
    return (cities.length * 100) + (remainingMissiles * 5);
}