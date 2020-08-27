class Transform{
    constructor(coefficients){
        this.coeffs = coefficients;
    }

    apply(x,y){
        let x = this.coeffs[0]*x + this.coeffs[1]*y + this.coeffs[2];
        let y = this.coeffs[3]*x + this.coeffs[4]*y + this.coeffs[5];
        return new Array(x,y);
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
    }
}

//P5 has built in affine transformations to use
// class PostTransform extends Transform{
//     constructor(coefficients) {
//         super(coefficients); // call the super class constructor and pass in the name parameter
//       }

// }