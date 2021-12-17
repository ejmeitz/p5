// Based on Scott Draves paper : https://flam3.com/flame_draves.pdf

let numPoints = 9000000; //paper uses 9.26 million
let gamma = 1;

let superSamplingFactor = 1;  //making this higher kinda removes salt an pepper noise rn cause the filter is crap

let w = 1000 * superSamplingFactor;
let h = 1000 * superSamplingFactor;  //i always want the final to be x x y regardless of the super sampling

let super_w = w / superSamplingFactor;
let super_h = h / superSamplingFactor;

let channels = 4;
let _pixels = new Array(channels * w * h).fill(0); //array for every pixel with x channels of color info

let currentFractal = testFractal;

let allVariations = [linear, sinusoidal, spherical, swirl, horseshoe, polar, heart, disk, handkerchief, spiral, hyperbolic, diamond,
ex, julia, bent, waves, fisheye, popcorn, exponential, power, cosine, rings, fan, eyefish, bubbles, _cylinder, _noise, blur, gaussian,
arch, tangent, _square, rays, blade, secant, twintran, cross]

function setup() {
  createCanvas(super_w, super_h);

  stroke(255);
  strokeWeight(1);
  noLoop();
}

function draw() {
  background(0);
  translate(super_w / 2, super_h / 2);

  let x = random(-1, 1);
  let y = random(-1, 1);

  let c = random(0,1);
  let c_f = 0;

  for(let j = 0; j < numPoints; j++){
  
    let weights = currentFractal.functionSet.weights;
    let transform = chooseWeighted(currentFractal.functionSet.funcs, weights);


    //apply initial transform chosen randomly from a set of transforms
    [x,y] = transform.apply(x,y); 
    c = 0.5 * (c + transform.color);

    //calculate V_j for whichever variations are chosen
    let tempX = 0; 
    let tempY = 0;

    // let testVal = j % (allVariations.length);
    // let bf = 1;
    //     if(allVariations[testVal].blendingFactor){
    //       bf = allVariations[testVal].blendingFactor;
    //     }
    // let temp = allVariations[testVal].apply(x,y,1);
    //        tempX += bf*temp[0];
    //        tempY += bf*temp[1];


    // calculate weights for N variations and make sure they add to 1
    weights = generateWeights(transform.variants.length);
      for(let k = 0; k < transform.variants.length; k++){
        let bf = 1;
        if(transform.variants[k].blendingFactor){
          bf = transform.variants[k].blendingFactor;
        }
        if(transform.variants[k].type === "parametric"){
          let temp = transform.variants[k].apply(x,y,weights[k]);
          tempX += bf*temp[0];
          tempY += bf*temp[1];
        } else if(transform.variants[k].type === "dependent"){
          let a = transform.coeffs[0];
          let b = transform.coeffs[1];
          let c = transform.coeffs[2];
          let d = transform.coeffs[3];
          let e = transform.coeffs[4];
          let f = transform.coeffs[5];
          let temp = transform.variants[k].apply(x,y,a,b,c,d,e,f,weights[k]);
          tempX += bf*temp[0];
          tempY += bf*temp[1];
        } else if(transform.variants[k].type === "weighted"){
          let temp = transform.variants[k].apply(x,y,weights[k],weights[k]);
          tempX += bf*temp[0];
          tempY += bf*temp[1];
        } else{
          error("Could not determine type of variant");
        }
    }
 
    x = tempX;
    y = tempY;

    //APPLY POST TRANSFORMS
    [x, y] = transform.applyPost(x,y);        

    // APPLY FINAL TRANSFORM 
    let scaledX;
    let scaledY;
    if(currentFractal.useFinal){
      let F0 = new FinalTransform([1.5,0,0,0,1.5,0], c);  //final transofmrs can be as complex as wanted -- no convergence criteria
      [scaledX, scaledY] = F0.apply(x,y);
      scaledX = Math.floor(scaledX * w * 0.5 + (w/2)); // scale and translate to viewport size (scaling should be done after ALL transforms)
      scaledY = Math.floor(scaledY * h * 0.5 + (h/2));
      c_f = 0.5 * (c + F0.color);
    }  else {
      scaledX = Math.floor(x * w * 0.5 + (w/2)); // scale and translate to viewport size (scaling should be done after ALL transforms)
      scaledY = Math.floor(y * h * 0.5 + (h/2));
    }

    

    if(j >= 20 && scaledX < w && scaledX > 0 && scaledY < h && scaledY > 0){ 
      if(currentFractal.useFinal){
        _pixels[channels*(scaledY * w + scaledX)]     = c_f; //color is taken from 0-1 and mapped to a color bar
        _pixels[channels*(scaledY * w + scaledX) + 3] += 1;  //density is tracked in alpha channel
      } else {
          _pixels[channels*(scaledY * w + scaledX)]     = c; 
          _pixels[channels*(scaledY * w + scaledX) + 3] += 1;  
      }
   
    }

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

  applyRedToBlueColorMap();

  //adjust gamma before super sampling
  for (i = 0; i < h; i++){
    for(j = 0; j < w; j++){
      let alpha = _pixels[channels*(i*w + j) + 3];
      let k = 0;
      if(alpha > 0){
        k = Math.pow((Math.log(alpha) /  Math.log(max)), 1 / gamma);
      }

       _pixels[channels*(i*w + j) + 2] *=  k ;   
       _pixels[channels*(i*w + j) + 1] *=  k ;
       _pixels[channels*(i*w + j)]     *=  k;
    }
  }

  if(superSamplingFactor === 1){
    for (i = 0; i < h; i++){
      for(j = 0; j < w; j++){
        let r =  Math.floor(_pixels[channels*(i*w + j) + 2]);   
        let g =   Math.floor(_pixels[channels*(i*w + j) + 1]);
        let b =   Math.floor(_pixels[channels*(i*w + j)]);
      stroke(r,g,b);
         // rotate(Math.PI / 1.61803398); //golden ratio as rotation  angle is cool 
     //  rotate(PI / 2); 
        point(j - (w/2), i - (h/2)); //translate back to actual coordinates
      } 
    }
  } else {
    let test = superSample(superSamplingFactor);

    for (i = 0; i < super_h; i++){
     for(j = 0; j < super_w; j++){
       let r = Math.floor(test[channels*(i*super_w + j) + 2]);   
       let g = Math.floor(test[channels*(i*super_w + j) + 1]);
       let b = Math.floor(test[channels*(i*super_w + j)]);
        stroke(r,g,b);
       //  rotate(Math.PI / 1.61803398); //golden ratio as rotation  angle is cool 
      // rotate(PI / 6); 
       point(j - (super_w/2), i - (super_h/2)); //translate back to actual coordinates
     }
   }
  }
}



function generateWeights(numVariations){
  let w = new Array(numVariations);
  let sum = 0;
  for(let i = 0; i < numVariations; i++){
    w[i] = Math.random();
    sum += w[i];
  }

  for(let i = 0; i < numVariations; i++){
    w[i] /= sum;
  }

  return w;
}

//THIS IS PROBABLY WRONG -- needs weights to be positive integer numbers
function chooseWeighted(items, w) {

  let weightedArray = [];

  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < w[i]; j++){
        weightedArray.push(i);
    }
  }

  return items[weightedArray[Math.floor(Math.random() * weightedArray.length)]];
}


//CHANGE FROM BOX FILTER -- its crap
function superSample(factor){ //if factor = 3 then we represent a 3x3 region in the original as a single pixel in the final

  let filter = [   
    [0,1,0],
    [1,4,1],
    [0,1,0]
  ];

  // let filter = [
  //   [0.5, 1.5, 1.5, 1.5, 0.5],
  //   [1.5, 2.5, 3.0, 2.5, 1.5],
  //   [1.5, 3.0, 5.0, 3.0, 1.5],
  //   [1.5, 2.5, 3.0, 2.5, 1.5],
  //   [0.5, 1.5, 1.5, 1.5, 0.5]
  // ];


  if(w % factor !== 0 || h % factor !== 0){
    console.log("cannot super sample, dimensions are wrong");
  }

  let k = factor * factor;
  let superSampledPixels = new Array(_pixels.length / k);

  let new_h = h / factor;
  let new_w = w / factor;

  for(let i = 0; i < new_h; i++){ //loop through the new array
    for(let j = 0; j < new_w; j++){

      let averageRed = 0;
      let averageBlue = 0;
      let averageGreen = 0;
      let averageAlpha = 0;

      //sum up values from larger array
      for(let m = 0; m < factor; m ++){ 
        for(let n = 0; n < factor; n++){

          let weight = filter[m][n]

          averageBlue += _pixels[channels*((factor*i*w + m) + (factor*j + n))];
          averageGreen += _pixels[channels*((factor*i*w + m) + (factor*j + n)) + 1];
          averageRed += _pixels[channels*((factor*i*w + m) + (factor*j + n)) + 2];
          averageAlpha += _pixels[channels*((factor*i*w + m) + (factor*j + n)) + 3];
        }
      }
       averageRed /= k;
       averageBlue /= k;
       averageGreen /= k;
       averageAlpha /= k;

      superSampledPixels[channels*(i*new_w + j)]     = averageBlue   //b
      superSampledPixels[channels*(i*new_w + j) + 1] = averageGreen //g
      superSampledPixels[channels*(i*new_w + j) + 2] = averageRed //r
      superSampledPixels[channels*(i*new_w + j) + 3] = averageAlpha //alpha
    }
  }

  return superSampledPixels;
}


//takes a value between 0-1 and maps it to an rgb color gradient 
function applyRedToBlueColorMap() {
	let value = 0; //arbitrary starting value

	for (let i = 0; i < h; i++) {
		for (let j = 0; j < w; j++) {
		
      value = _pixels[channels * (i * w + j)];  
			if (value >= 0.875) {
				_pixels[(channels * (w * i + j))] = 0;   //b
				_pixels[(channels * (w * i + j)) + 1] = 0;  //g
        _pixels[(channels * (w * i + j)) + 2] = (255.0 * ((-4.0 * value) + 4.5));  //r
				continue;
			}
			else if (value >= 0.625) {
				_pixels[channels * (w * i + j)] = 0;
				_pixels[(channels * (w * i + j)) + 1] = (255.0 * ((-4.0 * value) + 3.5));
				_pixels[(channels * (w * i + j)) + 2] = 255;
				continue;
			}
			else if (value >= 0.375) {
				_pixels[channels * (w * i + j)] = (255.0 * ((-4.0 * value) + 2.5));
				_pixels[(channels * (w * i + j)) + 1] = 255;
        _pixels[(channels * (w * i + j)) + 2] = (255.0 * ((4.0 * value) - 1.5));
				continue;
			}
			else if (value >= 0.125) {
				_pixels[channels * (w * i + j)] = 255;
				_pixels[(channels * (w * i + j)) + 1] = (255.0 * ((4.0 * value) - 0.5));
				_pixels[(channels * (w * i + j)) + 2] = 0;
				continue;
			}
			else if( value > 0) {
				_pixels[channels * (w * i + j)] = (255.0 * ((4.0 * value) + 0.5));
				_pixels[(channels * (w * i + j)) + 1] = 0;
				_pixels[(channels * (w * i + j)) + 2] = 0;
				continue;
			} else {
        _pixels[channels * (w * i + j)] = 255;
				_pixels[(channels * (w * i + j)) + 1] = 0;
        _pixels[(channels * (w * i + j)) + 2] = 0;
        continue;
      }

		}
	}
	
}

//purple and orange
function colorMap1(){
  let value = 0; //arbitrary starting value

	for (let i = 0; i < h; i++) {
		for (let j = 0; j < w; j++) {
		
      value = _pixels[channels * (i * w + j)];  
			if (value >= 0.875) {
				_pixels[(channels * (w * i + j))] = 235;   //b
				_pixels[(channels * (w * i + j)) + 1] = 52;  //g
        _pixels[(channels * (w * i + j)) + 2] = 142;  //r
				continue;
			}
			else if (value >= 0.625) {
				_pixels[channels * (w * i + j)] = 230;
				_pixels[(channels * (w * i + j)) + 1] = 133;
				_pixels[(channels * (w * i + j)) + 2] = 176;
				continue;
			}
			else if (value >= 0.375) {
				_pixels[channels * (w * i + j)] = 118;
				_pixels[(channels * (w * i + j)) + 1] = 200;
        _pixels[(channels * (w * i + j)) + 2] = 232;
				continue;
			}
			else if (value >= 0.125) {
				_pixels[channels * (w * i + j)] = 73;
				_pixels[(channels * (w * i + j)) + 1] = 185;
				_pixels[(channels * (w * i + j)) + 2] = 230;
				continue;
			}
			else if( value > 0) {
				_pixels[channels * (w * i + j)] = 14;
				_pixels[(channels * (w * i + j)) + 1] = 168;
				_pixels[(channels * (w * i + j)) + 2] = 230;
				continue;
			} else {
        _pixels[channels * (w * i + j)] = 0;
				_pixels[(channels * (w * i + j)) + 1] = 0;
        _pixels[(channels * (w * i + j)) + 2] = 200;
        continue;
      }

		}
	}
	



}

  //tones of blue
function colorMap2(){
  let value = 0; //arbitrary starting value

	for (let i = 0; i < h; i++) {
		for (let j = 0; j < w; j++) {
		
      value = _pixels[channels * (i * w + j)];  
			if (value >= 0.875) {
				_pixels[(channels * (w * i + j))] = 255;   //b
				_pixels[(channels * (w * i + j)) + 1] = 0;  //g
        _pixels[(channels * (w * i + j)) + 2] = 0;  //r
				continue;
			}
			else if (value >= 0.625) {
				_pixels[channels * (w * i + j)] = 220;
				_pixels[(channels * (w * i + j)) + 1] = 0;
				_pixels[(channels * (w * i + j)) + 2] = 0;
				continue;
			}
			else if (value >= 0.375) {
				_pixels[channels * (w * i + j)] = 180;
				_pixels[(channels * (w * i + j)) + 1] = 0;
        _pixels[(channels * (w * i + j)) + 2] = 0;
				continue;
			}
			else if (value >= 0.125) {
				_pixels[channels * (w * i + j)] = 130;
				_pixels[(channels * (w * i + j)) + 1] = 0;
				_pixels[(channels * (w * i + j)) + 2] = 0;
				continue;
			}
			else if( value > 0) {
				_pixels[channels * (w * i + j)] = 100;
				_pixels[(channels * (w * i + j)) + 1] = 0;
				_pixels[(channels * (w * i + j)) + 2] = 0;
				continue;
			} else {
        _pixels[channels * (w * i + j)] = 70;
				_pixels[(channels * (w * i + j)) + 1] = 0;
        _pixels[(channels * (w * i + j)) + 2] = 0;
        continue;
      }

		}
	}
}


//red and gold
function colorMap3(){

}