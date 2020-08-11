let numNodes = 10;  // must be less than rows*cols
let d = 50;


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

    for(let i = 0; i < numNodes; i++){
            let x1 ;
            let y1;

            let legal = false;
            while(!legal){
              x1 = getLegalX(d);
              y1 = getLegalY(d);


              if(i >= 1){ //check if node overlaps with an already existing node  -- maybe if its even close at all try again
                for(let j = 0; j < i ; j++){
                    let dist = Math.sqrt(Math.pow((nodes[j].x - x1),2) + Math.pow((nodes[j].y - y1),2));
                    if(dist < 4*d){
                        legal = false;
                        break; //try again
                      } else {
                        legal = true;
                      }
                  }
                } else {
                  break;
                }
            }

            let temp = new Node(x1, y1, i);
            nodes.push(temp);
    }
    return nodes;
}

function createRandomConnectivity(nodes, maxConnections){
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
        let x1 = (nodes[i].x );
        let y1 = (nodes[i].y );
        let x2 = (nodes[connectedNodeValue].x);
        let y2 = (nodes[connectedNodeValue].y);
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
  let count = 0;

  createRandomConnectivity(nodes,2); //this is first so the lines stay behind the circles;

  //draw the circles;
  for(let i = 0; i < nodes.length; i++){
      let x = nodes[i].x;
      let y = nodes[i].y;
      strokeWeight(3);
      circle(x , y , d); //maybe make elipses if needs to be responsive and use boxHeight
      textSize(30);
      textAlign(CENTER, CENTER);
      text(count, x, y)
      count += 1;
  }

}

function draw() {

}
