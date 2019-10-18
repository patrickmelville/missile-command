class City {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    draw(){
        push();

        fill(60,60,255);
        noStroke();
        rect(this.x, this.y, 50, 15);
        rect(this.x, this.y - 10, 15, 15);
        rect(this.x + 17, this.y - 20, 17, 25);

        pop();
    }
}