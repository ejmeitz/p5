
let r = 0;
let c = 0;

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(255);

  stroke(0, 0, 0);
  line(windowWidth / 3, 0, windowWidth / 3, windowHeight);
  line(2 * windowWidth / 3, 0, 2 * windowWidth / 3, windowHeight);

  line(0, windowHeight / 3, windowWidth, windowHeight / 3);
  line(0, 2 * windowHeight / 3, windowWidth, 2 * windowHeight / 3);

  noFill();
  rect(0, 0, windowWidth, windowHeight);

  c = (windowHeight / 3);
  r = (windowWidth / 3);
}

let imgX;
let imgO;

function preload() {
  imgX = loadImage('x.png');
  imgO = loadImage('o.png');
}


//turn = 0 : X          // turn = 1 : O
let turn = 0;
let move = 0;
let playerWon = false;

//each sub array is a column
let bins = [
  [2, 3, 4],
  [5, 6, 7],
  [8, 9, 10]
]; //instantiate as non repeating numbers--a bit hard codey but its just tic tac toe

function mouseClicked() {
  //prevent clicking after game is over
  if (turn >= 9 || playerWon) {
    return;
  }

  let x = mouseX;
  let y = mouseY;

  let row = Math.floor((x * 3) / windowWidth);
  let col = Math.floor((y * 3) / windowHeight);

  //if bin already full abort
  if (bins[row][col] === 1 || bins[row][col] === 0) {
    return;
  }


  bins[row][col] = turn;
  if (turn === 0) {
    image(imgO, r * row, c * col, windowWidth / 3, windowHeight / 3);
    turn = 1;
  } else {
    image(imgX, r * row, c * col, windowWidth / 3, windowHeight / 3);
    turn = 0;
  }

  move = move + 1;
  playerWon = checkWin(bins);

  if (playerWon) {
    console.log("Game Over");
    winMessage(turn);
    return;
  }
  if (move === 9 && playerWon === false) {
    console.log("Draw");
    drawMessage();
    return;
  }
}

//definitely not the fastest way but idc about that for this project
function checkWin(bins) {
  //check cols
  for (let i = 0; i < 3; i++) {
    if (bins[i][0] === bins[i][1] && bins[i][0] === bins[i][2]) {
      return true;
    }
  }
  //check rows
  for (let i = 0; i < 3; i++) {
    if (bins[0][i] === bins[1][i] && bins[0][i] === bins[2][i]) {
      return true;
    }
  }
  //check diag
  if (bins[0][0] === bins[1][1] && bins[0][0] === bins[2][2]) {
    return true;
  }
  //check anti-diag
  if (bins[2][0] === bins[1][1] && bins[2][0] === bins[0][2]) {
    return true;
  }

  return false;
}


function winMessage(turn) {
  fill('rgba(0,255,0, 0.25)')
  rect(0, 0, windowWidth, windowHeight);
  textSize(28);
  if (turn === 0) {
    text("The X's Won. Resetting canvas.", windowWidth / 4, windowHeight / 2, w / 2, windowHeight); //above X's are 1 but the turn flips before this gets called so its backwards
    setTimeout(resetCanvas, 1200);
  } else {
    text("The O's Won. Resetting canvas.", windowWidth / 4, windowHeight / 2, windowWidth / 2, windowHeight);
    setTimeout(resetCanvas, 1200);
  }
}

function drawMessage() {

  fill('rgba(192,192,192,0.6)')
  rect(0, 0, windowWidth, windowHeight);
  textSize(28);
  text("Draw. Resetting canvas.", windowWidth / 4, windowHeight / 2, windowWidth / 2, windowHeight);
  setTimeout(resetCanvas, 1200);
}

//reset everything to initial state
function resetCanvas() {
  clear();
  bins = [
    [2, 3, 4],
    [5, 6, 7],
    [8, 9, 10]
  ];
  turn = 0;
  move = 0;
  playerWon = false;
  setup();
}

//when window resizes redraw and update r,c values
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  //resize clears canvas so re draw everything
  stroke(0, 0, 0);
  line(windowWidth / 3, 0, windowWidth / 3, windowHeight);
  line(2 * windowWidth / 3, 0, 2 * windowWidth / 3, windowHeight);

  line(0, windowHeight / 3, windowWidth, windowHeight / 3);
  line(0, 2 * windowHeight / 3, windowWidth, 2 * windowHeight / 3);

  noFill();
  rect(0, 0, windowWidth, windowHeight);

  c = (windowHeight / 3);
  r = (windowWidth / 3);
  for(let i = 0; i < 3 ; i++){
    for(let j = 0; j < 3 ; j++){
        if(bins[i][j] === 0){
            image(imgO, r * i, c * j, windowWidth / 3, windowHeight / 3);
        }
        if(bins[i][j] === 1){
            image(imgX, r * i, c * j, windowWidth / 3, windowHeight / 3);
        }
    }
  }
}
