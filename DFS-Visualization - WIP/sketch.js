let numNodes = 10;  // must be less than rows*cols
let rows = 5;
let cols = 5;

class Node {
  constructor(x, y, value) {
   this.neighbors = [];
   this.x = x; //grid x val (0-4)
   this.y = y; //grid y val (0-4)
   this.value = value;
 }
}

function createRandomGrid(){
    let nodes = [];
    let grid =  Array(rows).fill().map(() => Array(cols).fill(0)); //0 denotes no element in that grid spot
    let count = 0;

    for(let i = 0; i < numNodes; i++){
        while(count < numNodes){
            let x = Math.floor(4*Math.random());
            let y = Math.floor(4*Math.random());
            if(grid[x][y] === 0){
              grid[x][y] = 1;
              let temp = new Node(x,y,count);
              count += 1;
              nodes.push(temp);
            }
        }
    }
    return nodes;
}

let maxConnections = 2;
function createRandomConnectivity(nodes){
  for (let i = 0; i < nodes.length;i++){
      let connections = Math.floor(maxConnections * Math.random()) + 1; //plus one cause I don't want zero connections even tho DFS would still work
      for(let j = 0; j < connections ; j++){
        let connectedNodeValue = i; // start with the condition that the node tries to connect to itself so while loop triggers
        while(connectedNodeValue == nodes[i].value || nodes[i].neighbors.includes(connectedNodeValue)){ // if the node tries to connect to itself or a node its already connected to try again
            connectedNodeValue = Math.floor(numNodes*Math.random());
        }
        nodes[i].neighbors.push(connectedNodeValue);
        if(!nodes[connectedNodeValue].neighbors.includes(i)){
          nodes[connectedNodeValue].neighbors.push(i);
        }

        //draw lines
        let boxWidth = windowHeight/rows;
        let x1 = ((nodes[i].x * windowWidth) / cols) + 0.5 * boxWidth;
        let y1 = ((nodes[i].y * windowHeight) / rows) + 0.5 * boxWidth;
        let x2 = ((nodes[connectedNodeValue].x * windowWidth) / cols) + 0.5 * boxWidth;
        let y2 = ((nodes[connectedNodeValue].y * windowHeight) / rows) + 0.5 * boxWidth;
        strokeWeight(3);
        line(x1,y1,x2,y2);
      }
  }
  console.log(nodes);
}

//imagine the canvas as a 5x5 grid of nodes some of which may be active...add connectivity (neighbors) then apply alg

function setup() {
  createCanvas(windowWidth,windowHeight)
  let nodes = createRandomGrid();
  let boxWidth = windowHeight/rows; //if we assume rows === cols then d = width/height of a box
  let count = 0;

  createRandomConnectivity(nodes); //this is first so the lines stay behind the circles;

  //draw the circles;
  for(let i = 0; i < nodes.length; i++){
      let x = (nodes[i].x * windowWidth) / cols;
      let y = (nodes[i].y * windowHeight) / rows;
      strokeWeight(3);
      circle(x + 0.5*boxWidth, y + 0.5*boxWidth, 0.5*boxWidth); //maybe make elipses if needs to be responsive and use boxHeight
      textSize(30);
      textAlign(CENTER, CENTER);
      text(count, x + 0.5*boxWidth, y + 0.5*boxWidth)
      count += 1;
  }

}

function draw() {

}
