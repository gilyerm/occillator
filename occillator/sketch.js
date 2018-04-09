let minH;
let maxH;
let totalW ;
let divC = 20;
let divW = divC;

let ang = 0;

function setup()
{
  createCanvas(windowWidth, windowHeight, WEBGL);
  //background(57);
  // divW=windowHeight/32;
  // divC=windowWidth/32;
  totalW=divC*divW;
  minH=20;
  maxH=pow(minH,2);

  angOff = PI*sqrt(2)/150;

  rectMode(CENTER);

  directionalLight(154,228,176, -3*PI/4, 3*PI/4,-3*PI/4);
  //ambientMaterial(100,100,100);
  noStroke();
  //rotate(3*PI/4,3*PI/4);

  camera( (height/2.0), (height/2.0), (height/2.0) ,//camera position
          0, 0, 0,///looking at
          sin(90), sin(90), 0);
}

function draw()
{

  let curAng = ang;
  background(250,250,250);


  //translate(width/2, height/2);

  translate(-totalW/2, -totalW/2);




  for (i=0;i<divW; i+=1)
  {
    for(j=0;j<divC;j+=1)
    {
      curAng=(ang+angOff*
        Math.sqrt(Math.pow(divW/2-i, 2) + Math.pow(divC/2-j, 2)))*2;


      push();
      let val = abs(sin(curAng));
      let h = map(val, 0, 1, minH, maxH);
      translate(divW*(i),divC*(j));///split
      //rotateX(3*PI/4);
      //rotateY(3*PI/4);
      //rotateZ(3*PI/4);
      box(divC,divW,h);
      pop();
    }
  }

  ang += angOff;

}
