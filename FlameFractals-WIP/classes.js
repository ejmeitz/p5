class Transform{
    constructor(coefficients,c){
        this.coeffs = coefficients;
        this.color = c;
    }

    apply(x,y){
        let newX = this.coeffs[0]*x + this.coeffs[1]*y + this.coeffs[2];
        let newY = this.coeffs[3]*x + this.coeffs[4]*y + this.coeffs[5];
        return new Array(newX,newY);
    }

    colorMapping(x,y){ //in the real one this map is function specific i.e. its a parameter in the constructor, but this is simpler
        let r = Math.floor(255 * ((Math.abs(x) / (windowWidth * 0.5))));
        let g = Math.floor(255 * ((Math.abs(x) / (windowHeight * 0.5))));
        let b = (x > 0 || y > 0) ? 255 : 0;
        return new Array(r,g,b);
    }
}


class FunctionSet{
    constructor(functions){
        this.funcs = functions;
        this.count = functions.length;
    }
}

//can be chosen from a set and applied after the variation -- kinda just another step to get away from the original image
class PostTransform extends Transform{
    constructor(coefficients) {
        super(coefficients); 
      }

}

//applied to every iteration -- not randomly chosen from a set like a normal transform
class FinalTransform extends Transform{
    constructor(coefficients,c) {
        super(coefficients,c); 
      }
}

class FlameFractal {
    constructor(fSet,pTransform,fTransform,vars){
        this.functionSet = fSet;
        this.postTransform = pTransform;
        this.finalTransform = fTransform;
        this.variants = vars;
    }
}