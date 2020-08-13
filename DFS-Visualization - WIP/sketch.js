let numNodes = 6;  // must be less than rows*cols
let d = 30;
let visitedNodes = [];
let discoveryOrder = [];

class Node {
  constructor(x, y, value) {
   this.neighbors = new Set();
   this.x = x; //grid x val (0-4)
   this.y = y; //grid y val (0-4)
   this.value = value;
   this.visited = false;
 }
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  let nodes = createRandomGrid();
//the second param can be a decimal 1.25 means on average given infinity nodes they will have 1.25 connections originating from them or 2.5 total
  createRandomConnectivity(nodes,1.5); //this is first so the lines stay behind the circles;

  //draw the circles;
  for(let i = 0; i < nodes.length; i++){
      let x = nodes[i].x;
      let y = nodes[i].y;
      strokeWeight(3);
      circle(x , y , d); //maybe make elipses if needs to be responsive and use boxHeight
      textSize(20);
      textAlign(CENTER, CENTER);
      text(i, x, y)
  }

  // run recursive dfs to get discovery order
  for(let i = 0; i < numNodes; i++){
    let start = nodes[i];
    if(!start.visited){ //try starting on all nodes incase graph is disconnected
      dfs(nodes, start, discoveryOrder);
    }
  }

}

function draw() {
  let delay = 1000;
  for(let i = 0; i < numNodes; i++){
     setTimeout(animatePath, delay * i, discoveryOrder[i]);
  }

}
 function animatePath(node){
  stroke(0,255,0);
  noFill();
  circle(node.x , node.y , d);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
