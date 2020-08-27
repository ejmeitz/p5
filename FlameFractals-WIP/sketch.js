// Based on Scott Draves paper : https://flam3.com/flame_draves.pdf

let numPoints = 1000000;
let numTransformations = 3;


function setup() {
  createCanvas(windowWidth,windowHeight);

  stroke(0);
  strokeWeight(1);
  noLoop();

}

function draw() {
  background(0);
  translate(windowWidth/2,windowHeight/2);

  let x = random(-1*windowWidth/2, windowWidth/2); 
  let y = random(-1*windowHeight/2, windowHeight/2);
  let init_c = Math.floor(255*random(0,1));
  let colors = [init_c,init_c,init_c];

  for(let j = 0; j < numPoints; j++){
    let i = Math.floor(numTransformations * Math.random());
    let points = sierpinski(x,y,i);
    let variants = linear(x,y);

    //stroke(colorMapping(windowWidth * 0.5*x,windowHeight * 0.5*y));
    stroke(colors[0], colors[1], colors[2]);

    //update x, y and colors for next iteration
    x = points[0];
    y = points[1];

    let temp = colorMapping1(windowWidth * 0.5 * x, windowHeight * 0.5 * y);

    colors[0] = Math.floor(0.5 * (colors[0] + temp[0]));
    colors[1] = Math.floor(0.5 * (colors[1] + temp[1]));
    colors[2] = Math.floor(0.5 * (colors[2] + temp[2]));

    if(j >= 20){  //APPLY POST TRANSFORMS HERE
    // rotate(Math.PI / 1.61803398); //golden ratio as rotation  angle is cool af
      rotate(Math.PI / 6); 
      point(variants[0] * windowWidth * 0.5 * x, variants[1] * windowHeight * 0.5 * y);
    }
  }
}

//simple chaos-game to base flame fractal on
function sierpinski(x,y,i){
  if(i === 0){
    return new Array(0.5*x , 0.5*y);
  } else if (i === 1){
    return new Array(0.5*(x+1) , 0.5*y);
  } else {
    return new Array(0.5*x , 0.5*(y+1));
  }
}


//blues
function colorMapping(x,y){ //temp while objects aren't done
  let r = Math.floor(255 * ((Math.abs(x) / (windowWidth * 0.5))));
  let g = Math.floor(255 * ((Math.abs(y) / (windowHeight * 0.5))));
  let b = (x > 0 || y < 0) ? 255 : 0;
  return new Array(r,g,b);
}
function colorMapping1(x,y){ //temp while objects aren't done
  let r = Math.floor(255 * ((Math.abs(x) / (windowWidth * 0.5))));
  let g = Math.floor(255 * ((Math.abs(y) / (windowHeight * 0.5))));
  let b = Math.floor(((x*y) % 255));
  return new Array(r,g,b);
}


// let F0 = new Function([0.5,0,0,0,0.5,0]);
// let F1 = new Function([0.5,0,0.5,0,0.5,0]);
// let F2 = new Function([0.5,0,0,0,0.5,0.5]);

// let Sierpinski = new FunctionSet(F0,F1,F2);