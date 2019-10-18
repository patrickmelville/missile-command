let missileList = [];
let explosions = [];

function setup() { // once at the beginning.
  createCanvas(800, 800);
}

function draw() { // main game loop ... infinite times...
  background(0);

  missileList = missileList.filter(m => {
    m.draw();
    m.update();
    
    if (m.currentPos.mag() < m.endPos.mag()){
      return true;
    } else{
      explosions.push(new Explosion(m.endPoint,255));
      explosions.push(new Explosion(m.endPoint, 0));
      explosions.push(new Explosion(m.endPoint, 255));
      return false;
    }
  });
  
  explosions = explosions.filter(e => {
    e.draw();
    e.update();
    
    // if (e.currentPos.mag() < e.endPos.mag()){
    //   return true;
    // } else{
    //   explosions.push(400,400);
    //   return false;
    // }
    
    return true;
  });
}

function mouseClicked() {
  missileList.push(new PlayerMissile(mouseX, mouseY));
}