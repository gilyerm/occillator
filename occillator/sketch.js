let minH;
let maxH;
let totalW ;
let divC = 32;
let divW = divC;
let pixel=16;
let ang = 0;

function setup()
{
  createCanvas(windowWidth, windowHeight, WEBGL);
  totalW=divC*divW;
  minH=pixel;
  maxH=pow(minH,2);
  angOff = PI/32;
  rectMode(CENTER);
  //fill(255,255,255);
  //directionalLight(130,186,180, -sin(90), sin(90),-sin(90));
  noStroke();

  camera( (height/2.0), (height/2.0), (height/1.0) ,//camera position
          -divW, -divC, 0,///looking at
          sin(90), sin(90), 0);



}

function draw()
{

  background(240,240,240);
  translate(-totalW/2, -totalW/2);
  for (i=0;i<divW; i++)
  {
    for(j=0;j<divC;j++)
    {
      val=sin(ang-pythagorean(divW/2-i, divC/2-j)/3);
      let h = map(val, -1, 1, minH, maxH);
      push();

      translate(pixel*(i),pixel*(j));///split
      fill(color(255*(h)/(maxH),255*i/divW,255*j/divC));
      box(pixel,pixel,h);
      pop();
    }
  }
  ang += angOff;
  ang %=TWO_PI;
}


function pythagorean(sideA, sideB){
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}
