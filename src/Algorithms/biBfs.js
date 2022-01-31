  //Node directions
  var dRow = [-1, 0, 1, 0];
  var dCol = [0, 1, 0, -1];
  
  // find I and J position of specific node used to find start and end nodes
  function nodeIndex(board, position){
      for(let i =0; i< board.length; i++){
          for(let j = 0; j< board[0].length; j++){
              if(board[i][j] === position){
                  
                  return [i, j]
              }
          }
      }
  }

  // check if node is valid if out of bonds or already visited or is wall node return false
  function isValid(vis, row, col, grid) {
    
    if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) return false;
    if (vis[row][col]) return false;
    if(grid[row][col] === true) return false
    
    return true;
  }

// reconstruct path from 2 points meeting in the graph (one point from start and one from end)
  function reconstruct(parentFirst, parentSecond, x1, y1){
      let path = []
        path.push([x1, y1])
        while(path[path.length - 1] !== 'startNode'){
            var x = path[path.length - 1][0]
            var y = path[path.length - 1][1]
            path.push(parentFirst[x][y])
        }
        var reversed = path.reverse()
        reversed.push([x1, y1])
        while(reversed[reversed.length - 1] !== 'endNode'){
            var x = path[reversed.length - 1][0]
            var y = path[reversed.length - 1][1]
            reversed.push(parentSecond[x][y])
        }
        reversed.shift()
        reversed.pop()

        return reversed;
        
  }
  // BI Breadth First Search (perform BFS on start and end node and reconstruct path on where they meet)
  async function biBFS(grid) {
      
    let shortestPath = []
    let [startRow, startCol] = nodeIndex(grid, 'start')
    let [endRow, endCol] = nodeIndex(grid, 'end')
    //visited nodes 
    var visitedFirst = Array.from(Array(grid.length), () => Array(grid[0].length).fill(false));
    var visitedSecond = Array.from(Array(grid.length), () => Array(grid[0].length).fill(false));

    // parent nodes
    var parentFirst = Array.from(Array(grid.length), () => Array(grid[0].length).fill(null));
    var parentSecond = Array.from(Array(grid.length), () => Array(grid[0].length).fill(null));

    // queues for both
    var firstQ = []
    var secondQ = []
    let found = false
    var visitedOrder = []

    // push first iteration into q before loop
    firstQ.push([startRow, startCol])
    visitedFirst[startRow][startCol] = true;
    parentFirst[startRow][startCol] = 'startNode'
    visitedOrder.push([startRow, startCol])

    secondQ.push([endRow, endCol])
    visitedSecond[endRow][endCol] = true;
    visitedOrder.push([endRow, endCol])
    parentSecond[endRow][endCol] = 'endNode'


    //while either start or end still have nodes to explore
    while(firstQ.length > 0 && secondQ.length > 0){

        // get node on top of Q
        var cell1 = firstQ[0]
        var x1 = cell1[0];
        var y1 = cell1[1];

        var cell2 = secondQ[0]
        var x2 = cell2[0];
        var y2 = cell2[1];
        
        // if both ends meet break out of the loop, path was found
        if(visitedFirst[x2][y2] ){
            shortestPath = reconstruct(parentFirst, parentSecond, x2, y2);
            found = true
            break;
        }

        if(visitedSecond[x1][y1]){
            shortestPath = reconstruct(parentFirst, parentSecond, x1, y1);
            found = true
            break;
        }

        // shift top of Q out of Queue
        firstQ.shift();
        secondQ.shift();


        // Find neighbors, keep track of visited nodes, parents of the nodes and push to Q
        for(let i = 0; i < 4; i++){
            var adjx1 = x1 + dRow[i];
            var adjy1 = y1 + dCol[i]

            var adjx2 = x2 + dRow[i];
            var adjy2 = y2 + dCol[i]

            if(isValid(visitedFirst, adjx1, adjy1, grid)){
                if(visitedSecond[adjx1][adjy1] !== true){
                    visitedOrder.push([adjx1, adjy1])
                }
                parentFirst[adjx1][adjy1] = [x1, y1]
                firstQ.push([adjx1, adjy1])
                visitedFirst[adjx1][adjy1] = true;
            }
            
            if(isValid(visitedSecond, adjx2, adjy2, grid)){
                if(visitedFirst[adjx2][adjy2] !== true){
                    visitedOrder.push([adjx2, adjy2])
                }
                parentSecond[adjx2][adjy2] = [x2, y2]
                secondQ.push([adjx2, adjy2])
                visitedSecond[adjx2][adjy2] = true;
            }
        }
    }

    // animation to visualize the algorithm
    toggleButton(true)
    await animateAlgo(visitedOrder, shortestPath, found)
    
  }
  
  // animate visited nodes
  // Once end node reached or all nodes are reached halt the program
  async function animateAlgo(visitedOrder, shortestPath, found){ 
      for(let i =0; i<visitedOrder.length; i++){
        setTimeout(function(){
            document.getElementById('r-' + visitedOrder[i][0]+ ' c-'+ visitedOrder[i][1]).style.backgroundColor = 'rgba(0, 190, 218, 0.75)'
            if( i === visitedOrder.length-1){
                if(!found) toggleButton(false);
                for(let i =0; i<shortestPath.length ; i++){
                    setTimeout(function(){
                        document.getElementById('r-' + shortestPath[i][0]+ ' c-'+ shortestPath[i][1]).style.backgroundColor = '#FFB000'
                        if(i === shortestPath.length-1) toggleButton(false)
                    },10 * i )
                }
            }
        },10*i)
      }
  }

  // toggle buttons when animation is running
  function toggleButton(active){
    if(active === true){
      document.getElementById('generateBtn').disabled = active;
      document.getElementById('startBtn').disabled = active;
    }
    document.getElementById('clearBtn').disabled = active;
  }
  
  export {biBFS}