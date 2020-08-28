function linear(x,y){ 
    return new Array(x,y);
}

function sinusoidal(x,y){  
 return new Array(Math.sin(x),Math.sin(y));
}

function spherical(x,y){  
    let r = Math.sqrt(x*x + y*y);
    let newX = (x / (r*r));
    let newY = (y / (r*r));
    return new Array(newX, newY);
}

function swirl(x,y){
    let r = Math.sqrt(x*x + y*y);
    let r2 = r*r;
    let newX = (x * Math.sin(r2)) - (y * Math.cos(r2));
    let newY = (x * Math.cos(r2)) + (y * Math.sin(r2));
    return new Array(newX, newY);
}
function horseshoe(x,y){
    let r = Math.sqrt(x*x + y*y);
    let newX = ((x-y)*(x+y)) / y;
    let newY = (2*x*y) / r;
    return new Array(newX, newY);
}

function heart(x,y){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    let newX = r * (Math.sin(theta * r));
    let newY = -1 * (Math.cos(theta * r));
    return new Array(newX, newY);
}

function disk(x,y){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    let k = theta/Math.PI;
    return new Array(k * Math.sin(Math.PI * r), k * Math.cos(Math.PI * r));
}

function handkerchief(x,y){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    return new Array(r * Math.sin(theta + r), r * Math.cos(theta - r));
}

function polar(x,y){
    let r = Math.sqrt(x*x + y*y);
    let theta = Math.atan(x / y);
    return new Array(theta/Math.PI,r-1)
}