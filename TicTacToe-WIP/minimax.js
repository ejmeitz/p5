let maxDepth = 7;
let scores = [10, -10, 0]; //[AI_PLAYER, HUMAN_PLAYER, TIE]


//try all possible moves on board and give each a score according to outcomes
function bestMove() {
  let bestScore = -Infinity;
  let nextMove;

  for(let i = 0; i < 3; i++){  //loop cols
    for (let j = 0; j < 3; j++){ //loop through elements in col i
      if(bins[i][j] !== AI_PLAYER && bins[i][j] !== HUMAN_PLAYER){
        let hold = bins[i][j];
        bins[i][j] = AI_PLAYER;
        let score = minimax(bins, 0, false); //update board to try that move 
        bins[i][j] = hold; //then put it back ...idk how else to do this javascript really doesn't like making copies
        if(score > bestScore){
          bestScore = score;
          nextMove = [i,j];
        }

      }
    }
  }
  console.log("Next Move: " + nextMove);
  return nextMove;
}

//given a board recursively play the best moves
function minimax(board, depth, isMaximizing){
  let outcome = checkWin(board); //rn this only returns a bool not who won 
  if(outcome !==null){ //null indicates no win--doesn't necessarily mean a draw
      return scores[outcome];
  }
  if(depth === maxDepth){
      return evaluate(board);
  }

  if(isMaximizing){ //AI Player
    let bestScore = -Infinity;

    for(let i = 0; i < 3; i++){  //hard coded for 3x3 board
      for (let j = 0; j < 3; j++){
        if(bins[i][j] !== AI_PLAYER && bins[i][j] !== HUMAN_PLAYER){
          let hold = board[i][j]; //could also assign a copy
          board[i][j] = AI_PLAYER; //update the temp board
          let score =  minimax(board, depth + 1, false);
          board[i][j] = hold;
          if(score > bestScore){
            bestScore = score;
          }
        }
      }
    }
    return bestScore;
  } else {  //minimizing player
    let bestScore = Infinity;

    for(let i = 0; i < 3; i++){  //hard coded for 3x3 board
      for (let j = 0; j < 3; j++){
        if(bins[i][j] !== AI_PLAYER && bins[i][j] !== HUMAN_PLAYER){
          let hold = board[i][j];
          board[i][j] = HUMAN_PLAYER; 
          let score =  minimax(board, depth + 1, true);
          board[i][j] = hold;
          if(score < bestScore){
            bestScore = score;
          }
        }
      }
   }
    return bestScore;
  }

}

function evaluate(board) {
	let score = 0;
  let outcome = checkWin(board);

	if (outcome === AI_PLAYER) { //ai wins
		score = 10;
	}
	else if (outcome === HUMAN_PLAYER) { //human wins
		score = -10;
	} else { //draw
		score = 0;
	}

	return score;
}