class spot {
    constructor(type, i, j) {
      this.wall = type;
      this.x = i;
      this.y = j;
      this.f = 0;
      this.g = 0;
      this.h = 0;
      this.parent = null;
      this.neighbors = [];
  
      this.addNeighbors = function (grid, rows, cols) {
        var i = this.x;
        var j = this.y;
        if (i < rows - 1) {
          this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
          this.neighbors.push(grid[i - 1][j]);
        }
        if (j < cols - 1) {
          this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
          this.neighbors.push(grid[i][j - 1]);
        }
      };
    }
  }
  
  function heuristic(a, b) {
    var d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    return d;
  }
  function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === elt) {
        arr.splice(i, 1);
      }
    }
  }



  function nodeIndex(board, position){
    for(let i =0; i< board.length; i++){
        for(let j = 0; j< board[0].length; j++){
            if(board[i][j] === position){
                
                return [i, j]
            }
        }
    }
  }
  async function astar(grid) {
    var path = []
    var openList = [];
    var closedList = [];
    var visited = []
    var start;
    var end;
    var found = false;
    let grid1 = Array.from(Array(grid.length), () =>
      Array(grid[0].length).fill(0)
    );

    for (let i = 0; i < grid1.length; i++) {
      for (let j = 0; j < grid1[0].length; j++) {
        
        if (grid[i][j] === true) {
          grid1[i][j] = new spot(true, i, j);
        } else {
          grid1[i][j] = new spot(false, i, j);
        }
      }
    }

    for (let i = 0; i < grid1.length; i++) {
      for (let j = 0; j < grid1[0].length; j++) {
          
        grid1[i][j].addNeighbors(grid1, grid1.length, grid1[0].length);
      }
    }
    let [startX, startY] = nodeIndex(grid, 'start')
    let [endX, endY] = nodeIndex(grid, 'end')
    start = grid1[startX][startY];
    end = grid1[endX][endY];
  
    openList.push(start);
  
    while (openList.length > 0) {
      var lowestIndex = 0;
      for (var i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[lowestIndex].f) {
          lowestIndex = i;
        }
      }
  
      var current = openList[lowestIndex];
      
      if (current === end) {
        var temp = current;
        path.push(temp);
        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }
        found = true;
        break;
      } 
  
      removeFromArray(openList, current);
      closedList.push(current);
  
      var neighbors = current.neighbors;
  
      for (let i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if(neighbor === undefined) break;
        if (!closedList.includes(neighbor) && !neighbor.wall) {
          var tempG = current.g + 1;
          var newPath = false;
          if (openList.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            visited.push(neighbor)
            neighbor.g = tempG;
            newPath = true;
            openList.push(neighbor);
          }
  
          if (newPath) {
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.f + neighbor.h;
            neighbor.parent = current;
          }
        }
      }
    }

    toggleButton(true)
    await animateAlgo(visited, path, found)
  }


  async function animateAlgo(visited, path, found){ 
    for(let i =0; i<visited.length; i++){
      setTimeout(function(){
          document.getElementById('r-' + visited[i].x + ' c-'+ visited[i].y).style.backgroundColor = 'rgba(0, 190, 218, 0.75)'
          
          if( i === visited.length-1){
            if(!found) toggleButton(false);
            for(let i =0; i<path.length -1; i++){
              setTimeout(function(){
                  document.getElementById('r-' + path[i].x+ ' c-'+ path[i].y).style.backgroundColor = '#FFB000'
                  if(i === path.length-2) toggleButton(false)
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

export {astar}
//   let an = [
//     ["start", 0, 0],
//     [0, false, 0],
//     [false, 0, "end"]
//   ];
//   astar(an);
  