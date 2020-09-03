class Variation{
    constructor(t){
        this.type = t;
    }
}


class Transform{
    constructor(coefficients, c = 0, vars = []){
        this.coeffs = coefficients;
        this.color = c;
        this.variants = vars;
    }

    apply(x,y){
        let newX = this.coeffs[0]*x + this.coeffs[1]*y + this.coeffs[2];
        let newY = this.coeffs[3]*x + this.coeffs[4]*y + this.coeffs[5];
        return new Array(newX,newY);
    }
}


class FunctionSet{
    constructor(functions, w){
        this.funcs = functions;
        this.weights = w;
        this.count = functions.length;
    }
}

//applied to every iteration -- not randomly chosen from a set like a normal transform
class FinalTransform extends Transform{
    constructor(coefficients,c) {
        super(coefficients,c); 
      }
}

class FlameFractal {
    constructor(fSet,pTransformSet,final = false){
        this.functionSet = fSet;
        this.postTransforms = pTransformSet;
        this.useFinal = final;
    }
}