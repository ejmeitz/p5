// Based on Scott Draves paper : https://flam3.com/flame_draves.pdf

let numPoints = 5000000; //paper uses 9.26 million

let w = 1000;
let h = 1000;

let channels = 4;
let _pixels = new Array(channels*w*h).fill(0); //array for every pixel with x channels of color info

let all_variations = [linear,sinusoidal,spherical,swirl,horseshoe,disk,heart,handkerchief,polar];
let currentFractal = testFractal;


function setup() {
  createCanvas(w,h);

  stroke(255);
  strokeWeight(1);
  noLoop();
}

function draw() {
  background(0);
  translate(w/2, h/2);
  let x = random(-1, 1);
  let y = random(-1, 1);

  let init_c = Math.floor(255*random(0,1));
  let colors = [init_c,init_c,init_c];

  for(let j = 0; j < numPoints; j++){
    
    let transform = random(currentFractal.functionSet.funcs);

    //apply initial transform chosen randomly from a set of transforms
    let newPoints = transform.apply(x,y); 
    x = newPoints[0];
    y = newPoints[1];

    //calculate V_j for whichever variations are chosen
    let tempSumX = 0; //need hold variables because each variation needs the initial value of x 
    let tempSumY = 0;
    for(let k = 0; k < currentFractal.variants.length; k++){
      let temp = currentFractal.variants[k](x,y);
      tempSumX += temp[0];
      tempSumY += temp[1];
    }
    x = tempSumX;
    y = tempSumY;


    // APPLY POST TRANSFORMS HERE on tempX tempY       //rn this is ugly af
    let postTrans = currentFractal.postTransform.apply(x,y)
    x = postTrans[0];
    y = postTrans[1];         
  // APPLY FINAL TRANSFORM HERE on output of post transform

    let finalTrans = currentFractal.finalTransform.apply(x,y)
    let finalX = finalTrans[0];
    let finalY = finalTrans[1];
    
    let scaledX = Math.floor(finalX * w * 0.5 + (w/2)); // scale and translate to viewport size (scaling should be done after ALL transforms)
    let scaledY = Math.floor(finalY* h * 0.5 + (h/2));

    
    if(j >= 20 && scaledX < w && scaledX > 0 && scaledY < h && scaledY > 0){ 
        _pixels[channels*(scaledY * w + scaledX)]     = Math.floor(0.5 * (colors[0] + transform.color[0]));
        _pixels[channels*(scaledY * w + scaledX) + 1] = Math.floor(0.5 * (colors[1] + transform.color[1]));    //r-g-b channels depend on function chosen and previous color
        _pixels[channels*(scaledY * w + scaledX) + 2] = Math.floor(0.5 * (colors[2] + transform.color[2]));  
        _pixels[channels*(scaledY * w + scaledX) + 3] += 1; //alpha channel is dependent on frequency of point
    }

      colors[0] = Math.floor(0.5 * (colors[0] + transform.color[0]));
      colors[1] = Math.floor(0.5 * (colors[1] + transform.color[1]));
      colors[2] = Math.floor(0.5 * (colors[2] + transform.color[2]));
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

  // var histogram = new Array(max);
  // for (i = 0; i <= max; i++) {
  //   histogram[i] = 0
  // }
  // for (i = 0; i < h; i++){
  //   for(j = 0; j < w; j++){
  //     histogram[_pixels[channels*(i*w + j) + 3]]++
  //   }
  // }
  // for (x = 0; x <= max; x++) {
  //   index = histogram[x];

  //   y1=int(map(index, 0, Math.max(...histogram), h, h-200));
	// 	y2 = h
  //   xPos = map(x,0,max,0, width-20)
  //   line(xPos, y1, xPos, y2);
  // }

  let gamma = 1.4
  for (i = 0; i < h; i++){
    for(j = 0; j < w; j++){
      let alpha = _pixels[channels*(i*w + j) + 3];
      let k = 1;
      if(alpha > 0){
        k = Math.log(alpha) /  alpha;
      }

      let r =  2 * k * _pixels[channels*(i*w + j)];   //add alpha information into image -- if the point was visited a lot k will be closer to 1 and other wise it will dim that pixel
      let g =  2 * k * _pixels[channels*(i*w + j) + 1];
      let b =  2 * k * _pixels[channels*(i*w + j) + 2];


      let brightness = (0.2126*r + 0.7152*g + 0.0722*b) / 255; //perceived brightness (0-1)
      brightness = 255 * Math.pow(brightness, 1/gamma); //paper suggests gamma === 2.2

      if(brightness > 0){
        r += brightness;
        g += brightness; 
        b += brightness;
        constrain(r, 0, 255);
        constrain(g, 0, 255);
        constrain(b, 0, 255);
      }

      let c = color(Math.floor(r), Math.floor(g), Math.floor(b));
      stroke(c);
      // rotate(Math.PI / 1.61803398); //golden ratio as rotation  angle is cool af
      //rotate(PI / 6); 
      point(j - (w/2), i - (h/2)); //translate back to actual coordinates
      
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
function transformation2(x,y,i){  //things like x*y break the form of the function
  if(i === 0){
    return new Array(x + y + 1 , y, [125,176,255]);  //thrid is color info--just a test
  } else if (i === 1){
    return new Array(2 , 0.5*y,[255,190,255]);
  } else {
    return new Array(0.5*x , 0.5*(y+1),[125,30,255]);
  }
}

