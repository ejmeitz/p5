let numNodes = 10;  // must be less than rows*cols
let rows = 5;
let cols = 5;
let nodes = [];

class Node {
  constructor(x, y) {
   this.neighbors = [];
   this.x = x; //grid x val (0-4)
   this.y = y; //grid y val (0-4)
 }
}

function createRandomGrid(){
    let grid =  Array(rows).fill().map(() => Array(cols).fill(0)); //0 denotes no element in that grid spot
    let count = 0;

    for(let i = 0; i < numNodes; i++){
        while(count < numNodes){
            let x = Math.floor(4*Math.random());
            let y = Math.floor(4*Math.random());
            if(grid[x][y] === 0){
              grid[x][y] = 1;
              count += 1;
              let temp = new Node(x,y);
              nodes.push(temp);
            }
        }
    }
    return grid;
}

function createRandomConnectivity(){



}

//imagine the canvas as a 5x5 grid of nodes some of which may be active...add connectivity (neighbors) then apply alg

function setup() {
  createCanvas(windowWidth,windowHeight)
  let grid = createRandomGrid();
  let boxWidth = windowHeight/rows; //if we assume rows === cols then d = width/height of a box
  let count = 0;
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
        if(grid[i][j] === 1){
          let x = (i*windowWidth) / cols;
          let y = (j*windowHeight) / rows;
          circle(x + 0.5*boxWidth, y + 0.5*boxWidth, 0.5*boxWidth); //maybe make elipses if needs to be responsive
          textSize(30);
          text(count, x + 0.5*boxWidth, y + 0.5*boxWidth)
          count += 1;
        }
    }
  }
}

function draw() {

}
