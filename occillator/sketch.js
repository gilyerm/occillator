
let minH = 60;
let maxH = 300;
let totalW = 400;
let divC = 20;
let divW = totalW / divC;
let angOff;

let ang = 0;

function setup()
{
  createCanvas(1000, 1000, WEBGL);
  background(57);


  angOff = PI/100;
}

function draw()
{
  background(57);
  rectMode(CENTER);
  //translate(width/2, height/2);
  let curAng = ang;
  translate(-totalW/2, -totalW/2);



  for (i=0; i<divW; i++)
  {
    for(j=0;j<divC;j++)
    {
      if(i<=divW/2)
      {
        if(j<=divC/2)
        {
          if(i+j<=divC/2)
          {
            continue;
          }
          curAng=ang+angOff*i*j;
        }
        else {
          if(i+(divC-j)<=divC/2)
          {
            continue;
          }
          curAng=ang+angOff*i*(divC-j);
        }
      }
      else
      {
        if(j<=divC/2)
        {
          if((divW-i)+j<=divC/2)
          {
            continue;
          }
          curAng=ang+angOff*(divW-i)*j;
        }
        else {
          if((divW-i)+(divC-j)<=divC/2)
          {
            continue;
          }
          curAng=ang+angOff*(divW-i)*(divC-j);
        }
      }
      noStroke();
      fill(color(255*i/divW,255*j/divC, 255*i*j/divW));
      push();
      let val = abs(sin(curAng));
      let h = map(val, 0, 1, minH, maxH);
      translate(divW*i,divC * j);
      rotateX(3*PI/4);
      rotateY(3*PI/4);
      box(divW,h,divC);
      pop();
    }
  }

  ang += angOff;

}
