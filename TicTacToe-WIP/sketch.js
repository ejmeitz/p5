
let r = 0;
let c = 0;
let AI_PLAYER = 0; //0's
let HUMAN_PLAYER = 1; //X's

//turn = 0 : X          // turn = 1 : O
let turn = HUMAN_PLAYER;
let movesPlayed = 0;
let playerWon = false;

//each sub array is a column
let bins = [
  [2, 3, 4],
  [5, 6, 7],
  [8, 9, 10]
]; 
//instantiate as non repeating numbers--a bit hard codey but it could be scaled up with a for loop

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  stroke(0, 0, 0);
  line(windowWidth / 3, 0, windowWidth / 3, windowHeight);
  line(2 * windowWidth / 3, 0, 2 * windowWidth / 3, windowHeight);

  line(0, windowHeight / 3, windowWidth, windowHeight / 3);
  line(0, 2 * windowHeight / 3, windowWidth, 2 * windowHeight / 3);

  noFill();
  rect(0, 0, windowWidth, windowHeight);

  r = (windowWidth / 3);
  c = (windowHeight / 3);
}


let imgX;
let imgO;

function preload() {
  imgX = loadImage('x.png');
  imgO = loadImage('o.png');
}

function mouseClicked() {
  if (movesPlayed >= 9 || playerWon) {
    return;
  }

  let x = mouseX;
  let y = mouseY;

  let row = Math.floor((x * 3) / windowWidth);
  let col = Math.floor((y * 3) / windowHeight);

  //if bin already full abort
  if (bins[row][col] === AI_PLAYER || bins[row][col] === HUMAN_PLAYER) {
    return;
  }
  console.log(bins);
  bins[row][col] = HUMAN_PLAYER;
  image(imgX, r * row, c * col, windowWidth / 3, windowHeight / 3);

  movesPlayed = movesPlayed + 1;
  gameOutcome = checkWin(bins);

  if (gameOutcome !== null) {
    console.log("Game Over");
    endMessage(gameOutcome);
    return;
  }

  turn = AI_PLAYER;
  let aiMove = bestMove();

  bins[aiMove[0]][aiMove[1]] = AI_PLAYER; //AI plays the best move it found
  image(imgO, r * aiMove[0], c * aiMove[1], windowWidth / 3, windowHeight / 3);
  movesPlayed = movesPlayed + 1;
  gameOutcome = checkWin(bins);

  if(gameOutcome !== null) {
    console.log(bins);
    console.log("Game Over");
    endMessage(gameOutcome);
    return;
  }
  //after AI player board could never be full cause they go second

  turn = HUMAN_PLAYER;

}

//definitely not the fastest way but idc about that for this project
function checkWin(board) {
  //check cols
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return board[i][0];
    }
  }
  //check rows
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return board[0][i];
    }
  }
  //check diag
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0];
  }
  //check anti-diag
  if (board[2][0] === board[1][1] && board[2][0] === board[0][2]) {
    return bins[2][0];
  }

  let tempMovesPlayed = 0;
  for(let i = 0; i < 3 ; i ++){
    for(let j = 0; j < 3; j++){
        if(board[i][j] === AI_PLAYER || board[i][j] === HUMAN_PLAYER){
          tempMovesPlayed += 1;
        }
    }
  }
  if(tempMovesPlayed === 9){
    return 2; // set as two because score[2] is for a draw
  }

  return null;
}


function endMessage(gameOutcome) {
  textSize(28);
  if (gameOutcome === AI_PLAYER) {
    fill('rgba(0,255,0, 0.25)')
    rect(0, 0, windowWidth, windowHeight);
    text("The O's Won. Resetting canvas.", windowWidth / 4, windowHeight / 2, windowWidth / 2, windowHeight); //above X's are 1 but the turn flips before this gets called so its backwards
    setTimeout(resetCanvas, 1200);
  } else if (gameOutcome === HUMAN_PLAYER) {
    fill('rgba(0,255,0, 0.25)')
    rect(0, 0, windowWidth, windowHeight);
    text("The X's Won. Resetting canvas.", windowWidth / 4, windowHeight / 2, windowWidth / 2, windowHeight);
    setTimeout(resetCanvas, 1200);
  } else {
    fill('rgba(192,192,192,0.6)')
    rect(0, 0, windowWidth, windowHeight);
    fill('rgb(0,0,0,0)')
    text("Draw. Resetting canvas.", windowWidth / 4, windowHeight / 2, windowWidth / 2, windowHeight);
    setTimeout(resetCanvas, 1200);
  }
}


//reset everything to initial state
function resetCanvas() {
  clear();
  bins = [
    [2, 3, 4],
    [5, 6, 7],
    [8, 9, 10]
  ];
  turn = HUMAN_PLAYER;
  movesPlayed = 0;
  playerWon = false;
  setup();
}

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
