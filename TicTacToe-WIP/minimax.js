let maxDepth = 3;
let scores = [10, -10, 0]; //[AI_PLAYER, HUMAN_PLAYER, TIE]

function getPossibleMoves(board) {
    let possibleMoves = [];
    for(let i = 0; i < 3; i++){  //hard coded for 3x3 board
      for (let j = 0; j < 3; j++){
        if(board[i][j] !== AI_PLAYER || board[i][j] !== HUMAN_PLAYER){
          let move = [i,j];
          possibleMoves.push(move);
        }
      }
    }
    return possibleMoves;
}

function bestMove() {
  let bestScore = -Infinity;
  let nextMove;


  for(let i = 0; i < 3; i++){  //hard coded for 3x3 board
    for (let j = 0; j < 3; j++){
      if(bins[i][j] !== AI_PLAYER || bins[i][j] !== HUMAN_PLAYER){

        let hold = bins[i][j];
        bins[i][j] = AI_PLAYER;
        let score = minimax(bins, 0, true); //update board to try that move 
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

function minimax(board, depth, isMaximizing){
  let outcome = checkWin(board); //rn this only returns a bool not who won 
  if(outcome !==null){ //null indicates no win--doesn't necessarily mean a draw
      return scores[outcome];
  }
  if(depth === maxDepth){
      return evaluate(board);
  }

  let possibleMoves = getPossibleMoves(board);
  if(isMaximizing){ //AI Player
    let bestScore = -Infinity;

    possibleMoves.forEach(move => {
        let hold = board[move[0]][move[1]]; //could also assign a copy
        board[move[0]][move[1]] = AI_PLAYER; //update the temp board
        let score =  minimax(board, depth + 1, false);
        board[move[0]][move[1]] = hold;
        if(score > bestScore){
          bestScore = score;
        }
    })
    return bestScore;
  } else {  //minimizing player
    let bestScore = Infinity;

    possibleMoves.forEach(move => {
        let hold = board[move[0]][move[1]];
        board[move[0]][move[1]] = HUMAN_PLAYER; 
        let score =  minimax(board, depth + 1, true);
        board[move[0]][move[1]] = hold;
        if(score < bestScore){
          bestScore = score;
        }
    });
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