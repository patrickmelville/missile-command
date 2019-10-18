class EnemyLauncher {
    constructor(m, s, d) {
        this.missiles = m;
        this.speed = s;
        this.difficulty = d;
    }
    fireMissiles() {
        if (this.missiles > 0) {
            setTimeout(() => {
                enemyMissiles.push(new EnemyMissile(this.speed));
                this.missiles--;
                this.fireMissiles();
            }, random(0, this.difficulty));
        }
    }
}