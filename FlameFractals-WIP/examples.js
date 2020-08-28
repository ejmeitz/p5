
  let T0 = new Transform([0.5,0,0,0,0.5,0],[0,100,255]);
  let T1 = new Transform([0.5,0,0.5,0,0.5,0],[255,69,0]);
  let T2 = new Transform([0.5,0,0,0,0.5,0.5],[255,140,0]);

  let Sierpinski = new FunctionSet(new Array(T0,T1,T2),3);


  let P0 = new PostTransform([0.2,1,0.8,0.4,0.5,-0.5]);

  let F0 = new FinalTransform([-0.75,0.8,0.8,-0.3,0,-0.5]);  //use coefficients in -1 -> 1 to converge--not sure if thats the only ones but using 3 and 4 definitely diverge
