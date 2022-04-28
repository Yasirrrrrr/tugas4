let vs = []
function setup (){
  createCanvas( 400,400);
  v =new Vehicle (200,200);
}

function draw (){
   background(220);
  v.display()
  v.edges()
  v.update();
  v.wander();

}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 30;
    this.maxspeed = 1.5;
    this.maxforce = 0.01;
    this.wanderTheta = PI/2;
  }
  
  wander(){
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar, yBar));
    
    let debug = true;
    
    if (debug){
      push()
      fill(255, 0, 0);
      stroke('red')
      line(this.location.x, this.location.y, projPoint.x, projPoint.y)
      stroke('red');
      circle(projPoint.x, projPoint.y, 8);
      noFill();
      stroke('black');
      circle(projPoint.x, projPoint.y, wanderRadius*2);
      fill(255, 0, 0);
      stroke('red')
      ellipse(this.location.x, this.location.y, 60, 60)
      
      line(this.location.x-10, this.location.y-10, projPoint.x-1, projPoint.y-1)
      line(this.location.x+10, this.location.y+10, projPoint.x-1, projPoint.y-1)
      line(this.location.x, this.location.y, projPoint.x, projPoint.y)
      
     
      circle(wanderPoint.x, wanderPoint.y, 16);
      pop()
    }
    
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.5, 0.5);
  }
  
  seek(vektorTarget){
    // percieve target location 
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    noStroke();
    translate(this.location.x, this.location.y)
    rotate(theta)
    
    //bagian atas
    fill(109,112,79)
    rect(50,20,100,20);

   
    triangle(40,20,50,40,35,40)

  
    triangle(150,20,150,40,165,40)

    var x = 35 
    rect(35,40,130,30)

    
    rect(166,38,130,15)

    
    
    ellipse(283,45.5,30,30)

  
    ellipse(298,45.5,20,20)

   
    ellipse(298,45.5,20,20)
    

// bagian tengah
    
    rect(10,90,230,30)

    
    triangle(190,70,190,90,205,90)

  
    rect(10,70,180,20)

    
    triangle(240,90,240,120,300,120)
  


// roda roda    
    ellipse(200,145,40,40)

    
    ellipse(20,145,40,40)

    
    ellipse(65,145,40,40)

    
    ellipse(110,145,40,40)

    
    ellipse(155,145,40,40)

    
    ellipse(245,145,40,40)
  
  
    
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }
}