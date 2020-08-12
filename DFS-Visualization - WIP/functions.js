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
        dfs(nodes, nodes[w], discoveryOrder); //w is just the .value of the node so we can access the actual node by accessing that index
      }
    });
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
