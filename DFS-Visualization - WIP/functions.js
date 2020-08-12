function getLegalX(diameter) {
  let x = windowWidth * Math.random();
   while (x < (2 * diameter) || x > (windowWidth - (2 * diameter))) {
      x = windowWidth * Math.random();
    }
    return x;
}

function getLegalY(diameter) {
  let y = windowHeight * Math.random();
  while (y < (2 * diameter) || y > (windowHeight - (2 * diameter))) {
      y = windowHeight * Math.random();
    }
    return y;
}

function dfs(nodes, currentNode, discoveryOrder){
  currentNode.visited = true;
  visitedNodes.push(currentNode.value);
  discoveryOrder.push(currentNode.value);
    currentNode.neighbors.forEach((w) => {
      if(!visitedNodes.includes(w)){
        dfs(nodes, nodes[w], discoveryOrder); //w is just the .value of the node
      }
    });
}

function createRandomConnectivity(nodes, maxConnections){


  for (let i = 0; i < nodes.length; i++){ //create connectivity for node i

      let connections = Math.floor(maxConnections * Math.random()) + 1; //plus one cause I don't want zero connections even tho DFS would still work

      for(let j = 0; j < connections ; j++){

        let connectedNodeValue = i; // start with the condition that the node tries to connect to itself so while loop triggers
        while(connectedNodeValue === i || nodes[i].neighbors.has(connectedNodeValue)){ // if the node tries to connect to itself or a node its already connected to try again
            connectedNodeValue = Math.floor(numNodes*Math.random());
        }

          for(let k = 0; k < nodes.length; k++){ //check if this connection will pass thru another node
              if(k !== i && k !== connectedNodeValue){ //don't want to check if current node or connected node
                  if(checkLineThruCircle(nodes[i], nodes[connectedNodeValue], nodes[k])){
                      console.log(i + " collided with " + k + " when trying to connect to " + connectedNodeValue);
                      connectedNodeValue = k; //change it so the connection just goes to that intermediate node
                      //could also connect intermediate to original destination but less edges is better
                  }
              }
        }
        nodes[i].neighbors.add(connectedNodeValue);
        nodes[connectedNodeValue].neighbors.add(i); //set wont allow duplicate to be added so we dont check

      }
  }
  //sort neighbors lowest to highest just to theres some method to the madness when dfs runs
  //also draw lines here after all the mess above finishes
  strokeWeight(3);
  for(let i = 0; i < nodes.length; i++){
    nodes[i].neighbors.forEach(w => {
        line(nodes[w].x,nodes[w].y,nodes[i].x, nodes[i].y);
    });
  }

  console.log(nodes);
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
                     if(dist < 8*d){
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

//checks if any paths pass through the circle (they would be obscured if this happened)
function checkLineThruCircle(firstNode, secondNode, inBetweenNode){


  let x1 = firstNode.x;
  let y1 = firstNode.y
  let x2 = secondNode.x;
  let y2 = secondNode.y;

  let lowerBoundX = Math.min(x1,x2);
  let lowerBoundY = Math.min(y1,y2);
  let upperBoundX = Math.max(x1,x2);
  let upperBoundY = Math.max(y1,y2);

  let x = inBetweenNode.x;
  let y = inBetweenNode.y;

//if node isn't in between the other two don't bother
  if(x > upperBoundX || x < lowerBoundX || y > upperBoundY || y < lowerBoundY){
    return false;
}

  let m = (y2-y1)/(x2-x1);
  //put line into form ax+by+c=0
  let a = m;
  let b = -1;
  let c = (y1-(m*x1));

//LIMIT LINE TO THE DOMAIN AND RANGE OF X1-X2 && Y1-Y2
  let dist = Math.abs(a*x + b*y + c)/(Math.sqrt(Math.pow(a,2)+Math.pow(b,2)));
  if(dist <= 0.5*d){ //then in circle
    return true;
  }
  return false;
}
