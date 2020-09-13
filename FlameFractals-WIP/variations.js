let linear = {
    type : "parametric",
    blendingFactor : 1,
    apply : function (x,y,weight) {
        return new Array(weight * x,weight * y);
    }
};


let sinusoidal = {
    type : "parametric",
    blendingFactor : 1,  
    apply : function (x,y,weight) {
        return new Array(weight * Math.sin(x),weight * Math.sin(y));
    }
};

let spherical = {
    type : "parametric",
    blendingFactor : 1, 
    apply : function (x,y,weight) {
        let r = Math.sqrt(x*x + y*y);
        let newX = (x / (r*r));
        let newY = (y / (r*r));
        return new Array(weight * newX, weight * newY);
    }
};

let swirl = {
    type : "parametric",
    blendingFactor : 1,
    apply : function (x,y,weight) {
        let r = Math.sqrt(x*x + y*y);
        let r2 = r*r;
        let newX = (x * Math.sin(r2)) - (y * Math.cos(r2));
        let newY = (x * Math.cos(r2)) + (y * Math.sin(r2));
        return new Array(weight * newX, weight * newY);
    }
};

let horseshoe = {
    type : "parametric",
    blendingFactor : 1,   
    apply : function (x,y,weight) {
        let r = Math.sqrt(x*x + y*y);
        let newX = ((x-y)*(x+y)) / y;
        let newY = (2*x*y) / r;
        return new Array(weight * newX, weight * newY);
    }
};

let polar = {
    type : "parametric",
    blendingFactor : 1,   
    apply : function (x,y,weight) {
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);
        return new Array(weight * theta / Math.PI, weight * (r-1));
    }

}

let heart = {
    type : "parametric",
    blendingFactor : 1,    
    apply : function (x,y,weight) {
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);
        let newX = r * (Math.sin(theta * r));
        let newY = -1 * (Math.cos(theta * r));
        return new Array(weight*newX, weight*newY);
    }
};

let disk = {
    type : "parametric",
    blendingFactor : 1,   
    apply : function (x,y,weight) {
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);
        let k = theta / Math.PI;
        return new Array(weight * k * Math.sin(Math.PI * r),weight * k * Math.cos(Math.PI * r));
    }

};

let handkerchief = {
    type : "parametric",
    blendingFactor : 1,   
    apply : function (x,y,weight) {
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);
        return new Array(weight * r * Math.sin(theta + r), weight * r * Math.cos(theta - r));
    }



}; 

let spiral = {
    type: "parametric",
    blendingFactor : 1, 
    apply : function(x,y,weight){
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);
        let k = 1 / r;
        return new Array(weight * k * (Math.cos(theta) + Math.sin(r)), weight * k * (Math.sin(theta)-Math.cos(r)));
    }
};

let hyperbolic = {
    type: "parametric",

    apply : function(x,y,weight){
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);
        return new Array(weight *  Math.sin(theta) / r, weight * r * Math.cos(theta));
    }

};

let diamond = {
    type: "parametric",

    apply : function(x,y,weight){
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);
        return new Array(weight* Math.sin(theta) * Math.cos(r), weight* Math.cos(theta) * Math.sin(r));
    }
};

let ex = {
    type: "parametric",

    apply : function(x,y,weight){
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);
        let p0 = Math.sin(theta + r);
        let p1 = Math.cos(theta-r);
        return new Array(weight * r * (Math.pow(p0,3) + Math.pow(p1,3)), weight * r * (Math.pow(p0,3) - Math.pow(p1,3)));
    }
};

let julia = {
    type: "parametric",

    apply : function(x,y,weight){
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);

        let omega = random(0,1);
        if(omega > 0.5){
            omega = Math.PI;
        } else {
            omega = 0;
        }

        let k = Math.sqrt(r);
        return new Array(weight * k * Math.cos((theta/2) + omega), weight * k * Math.sin((theta/2) + omega));
    }
};

let bent = {
    type: "parametric",

    apply : function(x,y,weight){
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
};

let waves = {
    type: "dependent",

    apply : function(x,y,a,b,c,d,e,f,weight){
        return new Array(weight* (x + b*Math.sin(y/(c*c))), weight * (y + e*Math.sin(x/(f*f))))
    }
};

let fisheye = {
    type: "parametric",

    apply : function(x,y,weight){
        let r = Math.sqrt(x*x + y*y);
        let k = 2 / (r + 1);
        return new Array(weight * k * y, weight * k * x);
    }

};


let popcorn = {
    type: "dependent",

    apply : function(x,y,a,b,c,d,e,f,weight){
        return new Array(weight* (x + c*Math.sin(Math.tan(3*y))), weight * (y + f*Math.sin(Math.tan(3*x))));
    }
};

let exponential = {
    type: "parametric",

    apply : function(x,y,weight){
        let k =Math.pow(2.7182,(x-1));
        return new Array(weight * k * Math.cos(Math.PI * y), weight * k * Math.sin(Math.PI * y));
    }
};

let power = {
    type: "parametric",

    apply : function(x,y,weight){
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);
        let k = Math.pow(r, Math.sin(theta));
        return new Array(weight * k * Math.cos(theta), weight * k * Math.sin(theta));
    }

};

let cosine = {
    type: "parametric",

    apply : function(x,y,weight){
        return new Array(weight * Math.cos(Math.PI*x)*Math.cosh(y), -1 * weight * Math.sin(Math.PI*x)*Math.sinh(y));
    }
}

let rings = {
    type: "dependent",

    apply : function(x,y,a,b,c,d,e,f,weight){
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);
        let c2 = c*c;
        let k = ((((r+c2)%(2*c2)) - c2) + r*(1-c2));
        return new Array(weight * k * Math.cos(theta) , weight * k * Math.sin(theta));
    }
}

let fan = {
    type: "dependent",

    apply : function(x,y,a,b,c,d,e,f,weight){
        let r = Math.sqrt(x*x + y*y);
        let theta = Math.atan(x / y);
        let t = Math.PI * c * c;
        let k = (theta + f) % t;
        if(k > t/2){
            return new Array(weight * r * Math.cos(theta - t/2) , weight *  r * Math.sin(theta - t/2));
        } else {
            return new Array(weight * r * Math.cos(theta + t/2) , weight *  r * Math.sin(theta + t/2));

        }
    }
};
let blob = {

};

let pdj = {


};

let fan2 = {


};

let rings2 = {


};

let eyefish = {
    type: "parametric",

    apply : function(x,y,weight){
        let r = Math.sqrt(x*x + y*y);
        let k = 2 / (r + 1);
        return new Array(weight * k * x, weight * k * y);
    }
};

let bubbles = {
    type: "parametric",

    apply : function(x,y,weight){
        let r = Math.sqrt(x*x + y*y);
        let k = 4 / (r*r + 4);
        return new Array(weight * k * x, weight * k * y);
    }

};

let _cylinder = {
    type: "parametric",

    apply : function(x,y,weight){
        return new Array(weight * Math.sin(x), weight * y);
    }
        
}

let _perspective = {


}

let _noise = {
    type: "parametric",

    apply : function(x,y,weight){
        let r1 = random(0, 1);
        let r2 = random(0, 1);
        return new Array(weight * r1 * x * Math.cos(2*Math.PI*r2),weight * r1* y * Math.sin(2*Math.PI*r2));
    }
}

let juliaN = {

};
let juliaScope = {

};

let blur = {
    type: "parametric",

    apply : function(x,y,weight){
        let r1 = random(0, 1);
        let r2 = random(0, 1);
        return new Array(weight * r1 * Math.cos(2*Math.PI*r2),weight * r1 * Math.sin(2*Math.PI*r2));
    }
};

let gaussian = {
    type: "parametric",

    apply : function(x,y,weight){
        let r1 = random(0,1);

        let sum = 0;
        for(let i = 0; i < 4; i++){ //approximate a gaussian distribution
            sum += random(0,1);
        }
        sum -= 2;
        return new Array(weight * sum * Math.cos(2*Math.PI * r1), weight * sum * Math.sin(2*Math.PI*r1));
    }

};

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

let arch = {
    type: "weighted",

    apply : function(x,y,v,weight){
        let r1 = random(0,1);
        return new Array(weight * Math.sin(r1 * Math.PI * v), weight * Math.sin(r1 * Math.PI * v) * Math.sin(r1 * Math.PI * v) / Math.cos(r1 * Math.PI * v))
    }
};

let tangent = {
    type: "parametric",

    apply : function(x,y,weight){
        return new Array(weight* (Math.sin(x) / Math.cos(y)), weight * Math.tan(y));
    }

};

let _square = {
    type: "parametric",

    apply : function(x,y,weight){
        let r1 = random(0,1);
        let r2 = random(0,1);
        return new Array(weight * (r1 - 0.5), weight * (r2 - 0.5));
    }
};

let rays = {
    type: "weighted",

    apply : function(x,y,v,weight){
        let r = Math.sqrt(x*x + y*y);
        let r1 = random(0,1);
        let k = Math.tan(r1*Math.PI*v) * v / (r*r);
        return new Array(weight * k * Math.cos(x), weight * k * Math.sin(y));
    }
}


let blade = {
    type: "weighted",

    apply : function(x,y,v,weight){
        let r = Math.sqrt(x*x + y*y);
        let r1 = random(0,1);
        return new Array(weight * x * (Math.cos(r1*Math.PI*v) + Math.sin(r1*Math.PI*v)), weight * x * (Math.cos(r1*Math.PI*v) - Math.sin(r1*Math.PI*v)));
    }
};

let secant = {
    type: "weighted",

    apply : function(x,y,v,weight){
        let r = Math.sqrt(x*x + y*y);
        return new Array(weight * x, weight / (v*Math.cos(v*r)));
    }
}

let twintran = {
    type: "weighted",

    apply : function(x,y,v,weight){
        let r = Math.sqrt(x*x + y*y);
        let r1 = random(0,1);
        let t = Math.log10(Math.sin(r1*r*v)*Math.sin(r1*r*v)) + Math.cos(r1*r*v);
        return new Array(weight * t * x, weight * x * (t - Math.PI*Math.sin(r1*r*v)));
    }
};

let cross = {
    type: "parametric",

    apply : function(x,y,weight){
        let k = Math.sqrt( 1 / Math.pow(x*x - y*y,2));
        return new Array(weight * k * x, weight * k * y);
    }

}