let maxDepth = 3;

function checkForTerminalState(){



}

function getPossibleMoves() {



}

function bestMove() {
  let bestScore = -Infinity;
  let nextMove;

  let avaiableMoves = getPossibleMoves(board);

  avaiableMoves.forEach(move => {
    let score = minimax(grid, 0, turn)
    if(score > bestScore){
      bestScore = score;
      nextMove = move;
    }
  });
}

function miniMax(board, depth, turn){
  let gameIsOver = checkWin(grid);

  if(gameIsOver){
      return; .....//TO DO
  }
  if(depth === maxDepth){
    return //TO DO;
  }

    let avaiableMoves = getPossibleMoves(board);
  if(turn === AI_TURN){ //maximizing player
    let bestScore = -Infinity;

    avaiableMoves.forEach(move => {
        tempBoard = board;
        tempBoard[move.x][move.y] = AI_VARIABLE; //NEED TO PICK IF AI IS X or O
        let score =  minimax(tempBoard,depth + 1, HUMAN_TURN)
        if(score > bestScore){
          bestScore = score;
        }
    })
    return bestScore;
  } else {  //minimizing player
    let bestScore = Infinity;

    avaiableMoves.forEach(move => {
        tempBoard = board;
        tempBoard[move.x][move.y] = HUMAN_VARIABLE; //NEED TO PICK IF AI IS X or O
        let score =  minimax(tempBoard,depth + 1, AI_TURN)
        if(score < bestScore){
          bestScore = score;
        }
    });
    return bestScore;
  }

}
