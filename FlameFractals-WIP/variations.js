function linear(x, y ,weight){ 
    return new Array(weight * x,weight * y);
}

function sinusoidal(x, y ,weight){  
 return new Array(weight * Math.sin(x),weight * Math.sin(y));
}

function spherical(x, y ,weight){  
    let r = Math.sqrt(x*x + y*y);
    let newX = (x / (r*r));
    let newY = (y / (r*r));
    return new Array(weight * newX, weight * newY);
}

function swirl(x,y ,weight){
    let r = Math.sqrt(x*x + y*y);
    let r2 = r*r;
    let newX = (x * Math.sin(r2)) - (y * Math.cos(r2));
    let newY = (x * Math.cos(r2)) + (y * Math.sin(r2));
    return new Array(weight * newX, weight * newY);
}
function horseshoe(x, y ,weight){
    let r = Math.sqrt(x*x + y*y);
    let newX = ((x-y)*(x+y)) / y;
    let newY = (2*x*y) / r;
    return new Array(weight * newX, weight * newY);
}

function polar(x,y,weight){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    return new Array(weight * theta / r, weight * (r-1));
}

function heart(x, y ,weight){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    let newX = r * (Math.sin(theta * r));
    let newY = -1 * (Math.cos(theta * r));
    return new Array(weight*newX, weight*newY);
}

function disk(x, y ,weight){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    let k = theta/Math.PI;
    return new Array(weight * k * Math.sin(Math.PI * r),weight * k * Math.cos(Math.PI * r));
}

function handkerchief(x, y ,weight){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    return new Array(weight * r * Math.sin(theta + r), weight * r * Math.cos(theta - r));
}

function spiral(x, y ,weight){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    let k = 1 / r;
    return new Array(weight * k * (Math.cos(theta) + Math.sin(r)), weight * k * (Math.sin(theta)-Math.cos(r)));
}

function hyperbolic(x, y ,weight){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    return new Array(weight *  Math.sin(theta) / r, weight * r * Math.cos(theta));
}
function diamond(x, y ,weight){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    return new Array(weight* Math.sin(theta) * Math.cos(r), weight* Math.cos(theta) * Math.sin(r));
}
function ex(x, y ,weight){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    let p0 = Math.sin(theta + r);
    let p1 = Math.cos(theta-r);
    return new Array(weight * r * (Math.pow(p0,3) + Math.pow(p1,3)), weight * r * (Math.pow(p0,3) - Math.pow(p1,3)));
}
function julia(x, y ,weight){
 
}
function bent(x, y ,weight){
   if(x >= 0 && y >= 0){
      return new Array(weight*x,weight*y);
  } else if (x < 0 && y >= 0){
    return new Array(2*weight*x,weight*y);
  } else if (x >= 0 && y < 0){
    return new Array(weight* x,0.5*weight*y);
  } else {
    return new Array(2*weight*x,0.5*weight*y);
  }
}

function waves(x, y ,weight){
  
}
function fisheye(x, y ,weight){
    let r = Math.sqrt(x*x + y*y);
    let k = 2 / (r + 1);
    return new Array(weight * k * y, weight * k * x);
}
function popcorn(x,y,weight){

}
function exponential(x, y, weight){
    let k =Math.pow(2.718,(x-1));
    return new Array(weight * k * Math.cos(Math.PI * y), weight * k * Math.sin(Math.PI * x));
}

function power(x,y,weight){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    let k = Math.pow(r, Math.sin(theta));
    return new Array(weight * k * Math.sin(theta), weight * k * Math.cos(theta));
}

function cosine(x,y,weight){
    return new Array(weight * Math.cos(Math.PI*x)*Math.cosh(y), -1 * weight * Math.sin(Math.PI*x)*Math.sinh(y));
}

function rings(x,y,weight){
    
}

function fan(x,y,weight){
    
}

function blob(x,y,weight){
    
}
function pdj(x,y,weight){

}
function fan2(x,y,weight){

}
function rings2(x,y,weight){
    
}
function eyefish(x,y,weight){
    let r = Math.sqrt(x*x + y*y);
    let k = 2 / (r + 1);
    return new Array(weight * k * x, weight * k * y);
}
function bubbles(x,y,weight){
    let r = Math.sqrt(x*x + y*y);
    let k = 4 / (r*r + 4);
    return new Array(weight * k * x, weight * k * y);
}

function _cylinder(x,y,weight){
    return new Array(weight * Math.sin(x), weight * y);
}

function _perspective(x,y,weight){

}

function _noise(x,y,weight){
    let r1 = random(0, 1);
    let r2 = random(0, 1);
    return new Array(weight * r1 * x * Math.cos(2*Math.PI*r2),weight * r1* y * Math.sin(2*Math.PI*r2));
}

function juliaN(x,y,weight){

}

function juliaScope(x,y,weight){

}

function blur(x,y,weight){
    let r1 = random(0, 1);
    let r2 = random(0, 1);
    return new Array(weight * r1 * Math.cos(2*Math.PI*r2),weight * r1 * Math.sin(2*Math.PI*r2));
}

function gaussian(x,y,weight){
    let r1 = random(0,1);

    let sum = 0;
    for(let i = 0; i < 4; i++){ //approximate a gaussian distribution
        sum += random(0,1);
    }
    sum -= 2;
    return new Array(weight * sum * Math.cos(2*Math.PI * r1), weight * sum * Math.sin(2*Math.PI*r1));
}

function radialBlur(x,y,weight){

}

function pie(x,y,weight){

}

function ngon(x,y,weight){

}

function curl(x,y,weight){

}

function rectangles(x,y,weight){

}

function arch(x,y,weight){

}

function tangent(x,y,weight){
    return new Array(weight* (Math.sin(x) / Math.cos(y)), Math.tan(y));
}

function _square(x,y,weight){
    let r1 = random(0,1);
    let r2 = random(0,1);
    return new Array(weight * (r1 - 0.5), weight * (r2 - 0.5));
}

function rays(x,y,weight){

}

function blade(x,y,weight){

}

function secant(x,y,weight){

}

function twintrian(x,y,weight){

}

function cross(x,y,weight){
    let k = Math.sqrt( 1 / Math.pow(x*x - y*y,2));
    return new Array(weight * k * x, weight * k * y);
}