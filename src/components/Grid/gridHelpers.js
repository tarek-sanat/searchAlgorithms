// Calculates number of vertical and horizontal grids by dividing width and height by 30px (the size of a grid)
    function numGrid(props){
        const [width, height] = props.size;
        let horizGrid = Math.floor(height / 30);
        let verticGrid = Math.floor((width) / 30);
        return [verticGrid, horizGrid]
    } 

    function initialPosition(horizGrid, verticGrid){
        let x1 = Math.floor(horizGrid/2)
        let y1 = Math.floor(verticGrid/6)
        let x2 = Math.floor(horizGrid/2)
        let y2 = Math.floor(verticGrid - verticGrid/6)
        
        return [x1, y1, x2, y2]
    }
  
    function duplicate(i,k, board, value){
        let duplicateBoard = board.slice()
        if(value !== null){
            duplicateBoard[i][k] = value
        } else if(board[i][k] !== 'start' && board[i][k] !== 'end'){
            duplicateBoard[i][k] = !duplicateBoard[i][k]
        }
        return duplicateBoard;
    }
      
  export {numGrid, duplicate, initialPosition}
  