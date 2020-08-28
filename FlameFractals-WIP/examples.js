
  let T0 = new Transform([0.5,0,0,0,0.5,0],[0,100,255]);
  let T1 = new Transform([0.5,0,0.5,0,0.5,0],[255,69,0]);
  let T2 = new Transform([0.5,0,0,0,0.5,0.5],[255,140,0]);

  let Sierpinski = new FunctionSet(new Array(T0,T1,T2));


  let P0 = new PostTransform([0.2,0.8,1,2,0.6,1]);

  let F0 = new FinalTransform([0.25,1,1.6,0.5,0.5,0]);  //use coefficients in -1 -> 1 to converge--not sure if thats the only ones but using 3 and 4 definitely diverge

  let testFractal = new FlameFractal(Sierpinski,P0,F0, [heart,swirl,disk,polar]); 





  // let T0 = new Transform([0.5,0,0,0,0.5,0],[191,57,0]);
  // let T1 = new Transform([0.75,-0.533,0,0.533,0.75,0],[230,138,99]);
  // let T2 = new Transform([-0.5,0,0,0.5,0,0],[178,50,0]);
  // let T3 = new Transform([0.5,-0.3,0,0.3,0.5,0],[0,214,227]);
  // let T4 = new Transform([-1,0,0.8,-1,0.5,0.5],[76,181,255]);


  // let Sierpinski = new FunctionSet(new Array(T0,T1,T2,T3,T4));


  // let P0 = new PostTransform([0.2,0.8,1,2,0.6,1]);

  // let F0 = new FinalTransform([0.25,1,1.6,0.5,0.5,0]);  //use coefficients in -1 -> 1 to converge--not sure if thats the only ones but using 3 and 4 definitely diverge

  // let testFractal = new FlameFractal(Sierpinski,P0,F0, [swirl]); //check horseshoe