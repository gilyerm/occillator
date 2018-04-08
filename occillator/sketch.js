
let minH = 60;
let maxH = 300;
let totalW = 400;
let divC = 20;
let divW = totalW / divC;
let angOff;

let ang = 0;

function setup()
{
  createCanvas(600,400);
  background(57);

  angOff = PI/64;
}

function draw()
{
  background(57);
  rectMode(CENTER);
  translate(width/2, height/2);

  let curAng = ang;
  translate(-totalW/2, 0);
  for (i=0; i<divC; i++, curAng+=angOff) {
    push();
    let val = abs(sin(curAng));
    let h = map(val, 0, 1, minH, maxH);
    translate(divW * i, 0);
    rect(0,0,divW-2,h);
    pop();
  }
  ang += angOff;

}

// function draw()
// {
//   background(57);
//   rectMode(CENTER);
//   translate(width/2, height/2);
//   console.log(degrees(ang));
//
//   // translate(-totalW/2, 0);
//   let curAng = ang;
//   // for (i=0; i<divC; i++, curAng+=angOff) {
//     push();
//     let val = abs(sin(curAng));
//     let h = map(val, 0, 1, minH, maxH);
//     translate(divW, 0);
//     rect(0,0,divW-2,h);
//     pop();
//   // }
//   ang += angOff;
//   frameRate(8);
// }

// function draw()
// {
//   if (mouseIsPressed)
//     fill(255);
//   else
//     fill(40, 255, 70);
//
//   ellipse(mouseX, mouseY, 25,25);
// }
