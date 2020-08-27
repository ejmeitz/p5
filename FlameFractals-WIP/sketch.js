// Based on Scott Draves paper : https://flam3.com/flame_draves.pdf

let numPoints = 5000000; //paper uses 9.26 million
let numTransformations = 3;

let w = 900;
let h = 900;

let channels = 4;
let _pixels = new Array(channels*w*h).fill(0); //array for every pixel with x channels of color info

let all_variations = [linear,sinusoidal,spherical,swirl,horseshoe,disk,heart,handkerchief,polar];
let variations = [linear,swirl,sinusoidal];

function setup() {
  createCanvas(w,h);

  stroke(255);
  strokeWeight(1);
  noLoop();
}

function draw() {
  background(0);
  translate(w/2, h/2);

  let x = random(-1*w/2, w/2); //maybe have this pick inside biunit cube and then scale final x and y to screen size
  let y = random(-1*h/2, h/2);

  let init_c = Math.floor(255*random(0,1));
  let colors = [init_c,init_c,init_c];

  for(let j = 0; j < numPoints; j++){
    
    let i = Math.floor(numTransformations * Math.random());

    //apply initial transform chosen randomly from a set of transforms
    let data = sierpinski(x,y,i); 
    //calculate V_j for whichever variations are chosen
    //let v = [1,1]; //for checking if I broke stuff this is same as having no variation
    let v = [0,0];
    for(let k = 0; k < variations.length; k++){
      let func = variations[k];
      let temp = func(x,y);
      v[0] += temp[0];
      v[1] += temp[1];
    }
    let tempX = v[0] * w * 0.5 * x;
    let tempY = v[1] * h * 0.5 * y;
    let tempColors = data[2];

    //APPLY POST TRANSFORMS HERE on tempX tempY

      //TO-DO

    //APPLY FINAL TRANSFORM HERE on output of post transform

      //TO-DO


    if(j >= 20){  
      if(Math.abs(tempX) <= (0.5*w) && Math.abs(tempY) <= (0.5*h)){ //only draw if in viewport
        tempX += (w/2); //map back to positive number line between 0-w and 0-h e.g -250 is 0 and 250 = 500 = w
        tempY += (h/2); 
        tempX = Math.floor(tempX);
        tempY = Math.floor(tempY);

          _pixels[channels*(tempY*w + tempX)] = Math.floor(0.5 * (colors[0] + tempColors[0]));
          _pixels[channels*(tempY*w + tempX) + 1] = Math.floor(0.5 * (colors[1] + tempColors[1]));    //r-g-b channels depend on function chosen and previous color
          _pixels[channels*(tempY*w + tempX) + 2] = Math.floor(0.5 * (colors[2] + tempColors[2]));  

          _pixels[channels*(tempY * w + tempX) + 3] += 1; //alpha channel is dependent on frequency of point
 
      }
    }
      //update x and y for next iteration --this should be based on the x as it changed not just initial value but that breaks for some reason atm
      x = data[0];
      y = data[1];

  }
  //loop alpha values to find biggest frequency --better than math.max cause we just want the alpha values
  let max = -Infinity;
  for (i = 0; i < h; i++){
    for(j = 0; j < w; j++){ 
      let temp = _pixels[channels*(i*w + j) + 3];
      if(temp > max){
        max = temp;
      }
    }
  }


  for (i = 0; i < h; i++){
    for(j = 0; j < w; j++){
      let alpha = _pixels[channels*(i*w + j) + 3];
      alpha = (alpha/max).toPrecision(4); //in future make this log scaled not linear because thats how the densities are distributed
      let c = color(_pixels[channels*(i*w + j)], _pixels[channels*(i*w + j) + 1], _pixels[channels*(i*w + j) + 2], alpha)
      stroke(c);
      // rotate(Math.PI / 1.61803398); //golden ratio as rotation  angle is cool af
       rotate(Math.PI / 3); 
      point(j - (w/2), i - (h/2));
      
    }
  }
}


//simple chaos-game to base flame fractal on
function sierpinski(x,y,i){
  if(i === 0){
    return new Array(0.5*x , 0.5*y,[125,176,255]);  //thrid is color info--just a test
  } else if (i === 1){
    return new Array(0.5*(x+1) , 0.5*y,[30,190,255]);
  } else {
    return new Array(0.5*x , 0.5*(y+1),[125,30,255]);
  }
}


//blues
function colorMapping(x,y){ //temp while objects aren't done
  let r = Math.floor(255 * ((Math.abs(x) / (w * 0.5))));
  let g = Math.floor(255 * ((Math.abs(y) / (h * 0.5))));
  let b = (x > 0 || y < 0) ? 255 : 0;
  return new Array(r,g,b);
}
function colorMapping1(x,y){ //temp while objects aren't done
  let r = Math.floor(255 * ((Math.abs(x) / (w * 0.5))));
  let g = Math.floor(255 * ((Math.abs(y) / (h * 0.5))));
  let b = Math.floor(((x*y) % 255));
  return new Array(r,g,b);
}


// let F0 = new Transform([0.5,0,0,0,0.5,0],[0.5,0.4,0.3]);
// let F1 = new Transform([0.5,0,0.5,0,0.5,0],[0.2,0.4,0.7]);
// let F2 = new Transform([0.5,0,0,0,0.5,0.5],[0.5,0.43,0.9]);

// let Sierpinski = new FunctionSet(F0,F1,F2);