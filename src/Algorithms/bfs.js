

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
  
    // Breadth First Search
    async function bfs(grid) {
      let [row, col] = nodeIndex(grid, 'start')
      //has visited nodes
      var vis = Array.from(Array(grid.length), () => Array(grid[0].length).fill(false));
      //keep track of parent node
      var parent = Array.from(Array(grid.length), () => Array(grid[0].length).fill(null));
      var q = [];
      //visited nodes in order
      let visitedOrder = []
  
      // Mark the starting cell as visited
      // and push it into the queue
      q.push([row, col]);
      vis[row][col] = true;
      visitedOrder.push([row, col])
      parent[row][col] = "startNode";
      // Iterate while the queue
      // is not empty
      while (q.length !== 0) {
        var cell = q[0];
        var x = cell[0];
        var y = cell[1];
        
        //if current node is the end node, break out of loop
        if (grid[x][y] === 'end') {
          break;
        }
        
        q.shift();
    
        // Go to the adjacent cells
        for (var i = 0; i < 4; i++) {
          
          var adjx = x + dRow[i];
          var adjy = y + dCol[i];
  
          if (isValid(vis, adjx, adjy, grid)) {
            //if valid, set node to visited, push the parent node and add to visited nodes
            if(grid[adjx][adjy] !== 'end'){
              visitedOrder.push([adjx, adjy])
            }
            
            parent[adjx][adjy] = [x, y];
            q.push([adjx, adjy]);
            vis[adjx][adjy] = true;
            
          }
        }
      }
      
      let found = false;
  
      //shortest path array 
      let shortestPath = [];
      // find position of end node
      let [endRow, endCol] = nodeIndex(grid, 'end')
  
  
      // backtrack shortest path by checking the parent nodes starting from the end node
      if(parent[endRow][endCol] !== null){
          shortestPath.push(parent[endRow][endCol]);
          while (found !== true) {
              if (shortestPath[shortestPath.length - 1] !== "startNode") {
  
                  let xParent = shortestPath[shortestPath.length - 1][0];
                  let yParent = shortestPath[shortestPath.length - 1][1];
                  shortestPath.push(parent[xParent][yParent]);
              } else {
                  shortestPath.pop()
                  found = true;
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
                for(let i =0; i<shortestPath.length -1; i++){
                  setTimeout(function(){
                      document.getElementById('r-' + shortestPath[i][0]+ ' c-'+ shortestPath[i][1]).style.backgroundColor = '#FFB000'
                      if(i === shortestPath.length-2) toggleButton(false)
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
    
    export {bfs}
    