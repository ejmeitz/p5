
  // let T0 = new Transform([0.5,0,0,0,0.5,0], 0.8 , [heart]);
  // let T1 = new Transform([0.5,0,0.5,0,0.5,0], 0.5 , [heart]);
  // let T2 = new Transform([0.5,0,0,0,0.5,0.5], 0.3 , [heart]);

  // let Sierpinski = new FunctionSet(new Array(T0,T1,T2),[0.33,0.33,0.331]);


  // let P0 = new Transform([0.2,0.8,1,2,0.6,1]);

  // let post = new FunctionSet(new Array(P0) , [1]);

  // let testFractal = new FlameFractal(Sierpinski,post); 



  let T0 = new Transform([-1,0,0,0,1,0],                        0.8, [linear]);
  let T1 = new Transform([.15,1,.5,.42,0.5234,0.76431],          0.2, [linear]);
  let T2 = new Transform([1,0.5,0,0,1,0],                       0.5, [linear]);
  let T3 = new Transform([0.5,-0.3,0,0.3,0.5,0],                 0.3, [linear]);
  let T4 = new Transform([-0.6,0,0.8,-0.74,0.5,0.5],            0.1, [linear]);

  let Sierpinski = new FunctionSet(new Array(T0,T3,T4,T1), [5,3,1,1]);


  let P0 = new Transform([-1,0,0,0,1,0]);
  let P1 = new Transform([0.2,0.8,-0.6,-0.1,0.6,0.8]);
  let P2 = new Transform([0.3,0.8,0.7,0.2,0.6,-0.25]);
  let P3 = new Transform([0,0.8,0.3,0.4,0.6,0]);
  let P4 = new Transform([0.1,0.8,0.3,2,0.6,-0.4]);

  let post = new FunctionSet(new Array(P0,P1,P2) , [5,3,2]);

  let testFractal = new FlameFractal(Sierpinski, post, false); 


  // let T0 = new Transform([0.5,0,0,0,0.5,0],[191,57,0]);
  // let T1 = new Transform([0.75,-0.533,0,0.533,0.75,0],[230,138,99]);
  // let T2 = new Transform([-0.5,0,0,0.5,0,0],[178,50,0]);
  // let T3 = new Transform([0.5,-0.3,0,0.3,0.5,0],[0,214,227]);
  // let T4 = new Transform([-1,0,0.8,-1,0.5,0.5],[76,181,255]);


  // let Sierpinski = new FunctionSet(new Array(T0,T1,T2,T3,T4));


  // let P0 = new PostTransform([0.2,0.8,1,2,0.6,1]);

  // let F0 = new FinalTransform([0.25,1,1.6,0.5,0.5,0]);  //use coefficients in -1 -> 1 to converge--not sure if thats the only ones but using 3 and 4 definitely diverge

  // let testFractal = new FlameFractal(Sierpinski,P0,F0); //check horseshoe