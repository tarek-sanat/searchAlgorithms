import {bfs} from '../Algorithms/bfs'
import {clear} from '../Algorithms/clear'
import {astar} from '../Algorithms/aStar'
import {randomWall} from '../Algorithms/randomWall'
import {biBFS} from './biBfs'

function startAlgo(props, horizGrid, verticGrid, board, setAlgoStarted, setBoard){
    if( props.menu === 0){
        return;
      } else if(props.menu === 'Clear'){
          clear(props, horizGrid, verticGrid, setAlgoStarted)
      } else if(props.menu === 'Dijkstra'){
          setAlgoStarted(true)
          bfs(board)
          props.setMenu(0)
      } else if(props.menu === 'A*'){
          setAlgoStarted(true)
          astar(board)
          props.setMenu(0)
      } else if(props.menu === 'Breadth First'){
          setAlgoStarted(true)
          bfs(board)
          props.setMenu(0) 
      } 
      else if(props.menu === 'Depth First'){
          setAlgoStarted(true)
          biBFS(board)
          props.setMenu(0) 
      } else if(props.menu === 'Generate'){
            randomWall(board, setBoard);
            props.setMenu(0) 
      } 
}


export {startAlgo}