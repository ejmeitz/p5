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

//bins are numbered 0 - 8 left to right top to bottom;
let bins = [[2 , 2 , 2], [2 ,2 ,2] ,[2 ,2, 2]];  //instantiate as 2's because 0 and 1 represent x or o
let k = (500/3);
function mouseClicked(){
  let x = mouseX;
  let y = mouseY;

  let row = Math.floor((x * 3) / 500);
  let col = Math.floor((y * 3) / 500);

  if(bins[row][col] !== 2){
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

}

function checkGameOver(bins){


}
