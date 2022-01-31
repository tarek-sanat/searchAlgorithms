function randomWall(board, setBoard){
    //Clone board
    let grid = Array.from(Array(board.length), () =>
      Array(board[0].length).fill(0)
    );
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            //Don't turn start and end to walls
            if(board[i][j] === 'start' || board[i][j] === 'end'){
                grid[i][j] = board[i][j]
            } else if (Math.random() < 0.3){
                //30% chance a node gets turned into a wall
                grid[i][j] = true
            }
        }
    }
    setBoard(grid)
}

export {randomWall}