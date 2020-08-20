let numNodes = 6;  // must be less than rows*cols
let d = 30;
let visitedNodes = [];

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
  createCanvas(windowWidth,windowHeight);
  drawNextGraph();
}

let delay = 1000;
function drawNextGraph() { //this function recursively calls itself forever
  //reset graph 
  clear();
  visitedNodes = [];

  let discoveryOrder = generateGraph(); //create new graph

  //animate path through the graph
  noFill();
  stroke(255,0,0);
  strokeWeight(3);
  circle(discoveryOrder[0].x , discoveryOrder[0].y , d);
  for(let i = 1; i < numNodes; i++){
     setTimeout(animatePath, delay * i, discoveryOrder[i], discoveryOrder[i-1], i);
  } 
}
 function animatePath(node, lastNode, index){
  noFill();

  //add color to current node
  stroke(255,0,0);
  circle(node.x , node.y , d);

  //change color of previous node
  stroke(0,255,0);
  circle(lastNode.x , lastNode.y , d);

  if(index === numNodes-1){
    setTimeout(drawNextGraph,2000);
  }
  
}

function generateGraph(){
   stroke(0,0,0);
   let discoveryOrder = []; 
   let nodes = createRandomGrid();
  //the second param can be a decimal 1.25 means on average given infinity nodes they will have 1.25 connections originating from them or 2.5 total
    createRandomConnectivity(nodes,1.5); //this is first so the lines stay behind the circles;
    //draw the circles;
    for(let i = 0; i < nodes.length; i++){
        let x = nodes[i].x;
        let y = nodes[i].y;
        strokeWeight(3);
        fill(255);
        circle(x , y , d); //maybe make elipses if needs to be responsive and use boxHeight
        textSize(20);
        textAlign(CENTER, CENTER);
        fill(0);
        strokeWeight(1);
        text(i, x, y)
    }
  
    // run recursive dfs to get discovery order
    for(let i = 0; i < numNodes; i++){
      let start = nodes[i];
      if(!start.visited){ //try starting on all nodes incase graph is disconnected
        dfs(nodes, start, discoveryOrder);
      }
    }
    return discoveryOrder;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
