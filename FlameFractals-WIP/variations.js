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
  
}
function exponential(x, y, weight){

}

