// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

var video;
var vScale = 5;
var particles = [];

function setup() {
      
  // canvas = document.getElementById('canvas');
  canvas = createCanvas(640, 480);
  pixelDensity(0);
  video();
  for (var i = 0; i < 500; i++) { //Replace "500" with 100000 to set a maximum of rects
    particles[i] = new Particle(random(width-50), random(height-50));
  }
}

function draw() {
  // console.log(mappedSensor1);
  // console.log(mappedSensor2);
  // console.log(mappedSensor3);
  background(255);
  video.loadPixels();
  Seriously();

  for(var i = 0; i < particles.length; i++) { //replace particles.length with mappedSensor
    particles[i].update();
    particles[i].show();
  }
}

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.xspeed = random(-1,1);
  this.yspeed = random(-1,1);
  this.r = 30;
  
  this.update = function() {
    // //movement
    // this.x += this.xspeed;
    // this.y += this.yspeed;

    // //border
    // if(this.x +this.r > canvas.width || this.x <0){
    //   this.xspeed = this.xspeed *-1
    // }
    // if(this.y +this.r> canvas.height || this.y<0){
    //   this.yspeed = this.yspeed *-1
    //   // console.log("hi")
    // }

    //dont know what this does
    this.x = constrain(this.x, 0, width);    
    this.y = constrain(this.y, 0, height);  
  }

  this.show = function() {
    // noStroke();
    var px = floor(this.x / vScale);
    var py = floor(this.y / vScale);
    var col = video.get(px, py);

    fill(col[0], col[1], col[2],255);//replace 255 with mappedSensor

    rect(this.x,this.y,this.r,this.r)//add mappedSensor after each this.r 
  }
  
}

function video() {
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function Seriously() {

  var Seriously = Seriously.plugin
  var cvideo, target, vignette;
  var canvas

  var seriously = new Seriously();
  cvideo = seriously.source(video);
  target = seriously.target(canvas);
  vignette = seriously.effect('vignette');

  vignette.source = cvideo
  target.source = vignette;
  seriously.go();

  vignette.amount = 10;
}