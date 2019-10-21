class EnemyLauncher {
    constructor(m, s, r) {
        this.missiles = m;
        this.speed = s;
        this.fireRate = r;
        this.loadedMissiles = [];
    }
    fireMissiles() {
        if (this.missiles > 0) {
            myGlobalTimeout(() => {
                enemyMissiles.push(new EnemyMissile(this.speed));
                this.missiles--;
                this.fireMissiles();
            }, random(0, this.fireRate));
        }
    }
}