let w = 500;
let h = 500;

function setup() {
  createCanvas(w,h)
  background(255);

  stroke(0, 0, 0);
  line(w/3, 0 , w/3, h);
  line(2*w/3, 0 , 2*w/3, h);
  line( 0, w/3 , w,  w/3);
  line( 0, 2*w/3 ,w,  2*w/3);
  noFill();
  rect(0, 0, w, h);
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

//each sub array is a column
let bins = [[2, 3 ,4], [5 ,6 ,7] ,[8, 9, 10]];  //instantiate as non repeating numbers--a bit hard codey but its just tic tac toe
let k = (500/3);
function mouseClicked(){
  let x = mouseX;
  let y = mouseY;

  let row = Math.floor((x * 3) / 500);
  let col = Math.floor((y * 3) / 500);

//if bin already full abort
  if(bins[row][col] === 1 || bins[row][col] === 0){
    return;
  }


  bins[row][col] = turn;
  if(turn === 0){
    image(imgO, k*row, k*col, w/3, h/3); //in p5 (0,0) is the bottom left, but row 0 col 0 is top right
    turn = 1;
  } else {
    image(imgX, k*row, k*col, w/3, h/3);
    turn = 0;
  }

  move = move + 1;
  let playerWon = checkWin(bins);

  if(playerWon){
    console.log("Game Over");
    winMessage(turn);
  }
  if(move === 9 && playerWon === false){
      console.log("Draw");
      drawMessage();
  }
}

//definitely not the fastest way but idc about that for this project
function checkWin(bins){
    //check cols
    for(let i = 0; i < 3; i++){
        if(bins[i][0] === bins[i][1] && bins[i][0] === bins[i][2]){
          return true;
        }
    }
    //check rows
    for(let i = 0; i < 3; i++){
        if(bins[0][i] === bins[1][i] && bins[0][i] === bins[2][i]){
          return true;
        }
    }
    //check diag
    if(bins[0][0] === bins[1][1] && bins[0][0] === bins[2][2]){
      return true;
    }
    //check anti-diag
    if(bins[2][0] === bins[1][1] && bins[2][0] === bins[0][2]){
      return true;
    }

    return false;
}


function winMessage(turn){
  fill('rgba(0,255,0, 0.25)')
  rect(0, 0, w, h);
  rect(0, 0, w, h);
  textSize(28);
  if(turn === 0){
      text("The X's Won. Resetting canvas.",0,h/2,w,h); //above X's are 1 but the turn flips before this gets called so its backwards
      setTimeout(resetCanvas,1200);
  } else {
      text("The O's Won. Resetting canvas.",0,h/2,w,h);
      setTimeout(resetCanvas,1200);
  }
}

function drawMessage(){
    stroke('rgba(0,0,0,0.6)')
    rect(0, 0, w, h);
    textSize(28);
    text("Draw. Resetting canvas.",0,h/2,w,h);
    setTimeout(resetCanvas,1200);
}

//reset everything to initial state
function resetCanvas(){
    clear();
    bins = [[2, 3 ,4], [5 ,6 ,7] ,[8, 9, 10]];
    turn = 0;
    move = 0;
    setup();
}
