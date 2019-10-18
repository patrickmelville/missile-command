class EnemyLauncher {
    constructor(m, s, r) {
        this.missiles = m;
        this.speed = s;
        this.fireRate = r;
    }
    fireMissiles() {
        if (this.missiles > 0) {
            setTimeout(() => {
                enemyMissiles.push(new EnemyMissile(this.speed));
                this.missiles--;
                this.fireMissiles();
            }, random(0, this.fireRate));
        }

        // enemyMissiles.push(new EnemyMissile(this.speed));
    }
}