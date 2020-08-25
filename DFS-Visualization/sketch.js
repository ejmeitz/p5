let numNodes = 6;  // must be less than rows*cols
let d = 30;
let visitedNodes = [];
let discoveryOrder = [];
let nodes = [];
let animated = []; //most of these global variables are just so window resizing is supported

let previousWidth;
let previousHeight;

class Node {
  constructor(x, y, value) {
   this.neighbors = new Set();
   this.x = x; //grid x val (0-4)
   this.y = y; //grid y val (0-4)
   this.value = value;
   this.visited = false;
 }
}

let buttonHeight = 30;
let buttonWidth = 100;
let button;
let discoveryString = "";

function setup() {
  createCanvas(windowWidth,windowHeight);

  button = createButton('New Graph');
  button.size(buttonWidth,buttonHeight);
  button.position(windowWidth/2, windowHeight-60);
  button.mousePressed(drawNextGraph);

   previousWidth = windowWidth;
   previousHeight = windowHeight;
}

let delay = 1000; //time between discovery on animation
function drawNextGraph() {

  button.attribute('disabled', '');
  clear();
  visitedNodes = [];
  nodes = [];
  animated = [];
  discoveryString = "";

  discoveryOrder = generateGraph(); //create new graph

  //animate path through the graph
  noFill();
  stroke(255,0,0);
  strokeWeight(3);
  circle(discoveryOrder[0].x , discoveryOrder[0].y , d);
  animated[0] = discoveryOrder[0];
  discoveryString += discoveryOrder[0].value + " ";
  for(let i = 1; i < numNodes; i++){
     setTimeout(animatePath, delay * i, discoveryOrder[i], discoveryOrder[i-1], i);
  }

}

function animatePath(node, lastNode, index){
  noFill();
  strokeWeight(3);
  //add color to current node
  stroke(255,0,0);
  circle(node.x , node.y , d);

  //change color of previous node
  stroke(0,255,0);
  circle(lastNode.x , lastNode.y , d);
  animated[index] = node;

  discoveryString += node.value + " ";
  textSize(14);
  textAlign(LEFT, TOP);
  fill(0);
  strokeWeight(0.5);
  stroke(0);

  text("Discovery Order: " + discoveryString, 10, 10);


  if(index === numNodes-1){
      button.removeAttribute('disabled');
   }

}

function generateGraph(){
   stroke(0,0,0);
   let discoveryOrder = [];
   nodes = createRandomGrid();
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

  let diffX = windowWidth - previousWidth;
  let percentChangeX = diffX / previousWidth;
  let diffY = windowHeight - previousHeight;
  let percentChangeY = diffY / previousHeight;
  previousWidth = windowWidth;
  previousHeight = windowHeight;

  nodes.forEach( node => {
    node.x = node.x * (1 + percentChangeX);
    node.y = node.y * (1 + percentChangeY);
  });

  strokeWeight(3);
  stroke(0);
  for(let i = 0; i < nodes.length; i++){
    nodes[i].neighbors.forEach(w => {
        line(nodes[w].x,nodes[w].y,nodes[i].x, nodes[i].y);
    });
  }

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

  stroke(0,255,0);
  strokeWeight(3);
  noFill();
  animated.forEach(node => {
    circle(node.x,node.y,d);
  })

  button.remove();
  button = createButton('New Graph');
  button.size(buttonWidth,buttonHeight);
  button.position(windowWidth/2, windowHeight-(2*buttonHeight));
  button.mousePressed(drawNextGraph);

}
