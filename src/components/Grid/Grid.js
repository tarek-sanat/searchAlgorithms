import React, {useState, useEffect}  from 'react';
import './Grid.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'
import {numGrid, duplicate, initialPosition} from '../Grid/gridHelpers'
import {startAlgo} from '../../Algorithms/setAlgorithms'


function Grid(props){
  //Get the number of rows and columns when the window is resized
  const [horizGrid, verticGrid] = numGrid(props)
  
  // Track state of board, Click on board, Start node and End node
  const [board, setBoard] = useState(Array(horizGrid).fill().map(() => Array(verticGrid).fill(false)));
  const [algoStarted, setAlgoStarted] = useState(false)

  const [clicked, setClicked] = useState(false)
  const [startClicked, setStart] = useState(false)
  const [endClicked, setEnd] = useState(false)
  
  //On props change which contains width and height, update the board state
  useEffect(()=>{
      const [horizGrid, verticGrid] = numGrid(props)
      let arr = Array(horizGrid).fill().map(() => Array(verticGrid).fill(false))
      let [x1, y1, x2, y2] = initialPosition(horizGrid, verticGrid)
      arr[x1][y1] = 'start'
      arr[x2][y2] = 'end'
      setBoard(arr)
     
  },[props.size])
  
  useEffect(() =>{
    // If clear reset Board
    if(props.menu !== 'Clear'){
      setBoard(board)
    }
    //Start algo depending on selected 
    startAlgo(props, horizGrid, verticGrid,board, setAlgoStarted, setBoard)
  }, [props.menu])
  
  // Handle DIV enter event and handle DIV leave Events
  // Triggers after click and is used for click and drag effect
  const handleEnter = (i, k) =>{
    if(startClicked && board[i][k] !== 'end'){
        setBoard(duplicate(i,k, board, 'start')) 
    } else if(endClicked  && board[i][k] !== 'start'){
        setBoard(duplicate(i,k, board, 'end'))
    } else if(clicked){
        setBoard(duplicate(i,k, board, null))
    } 
  }

  const handleLeave = (i, k) =>{
    if(startClicked  && board[i][k] !=='end' ){ 
      let duplicateBoard = board.slice()
      duplicateBoard[i][k] = false
      //setBoard(duplicateBoard)
      
    } else if(endClicked && board[i][k] !=='start'){
      let duplicateBoard = board.slice()
      duplicateBoard[i][k] = false
      //setBoard(duplicateBoard)
    }
  }

  //Handle DIV Click Event, used to set Start drawing WALLS or moving start and end nodes.
  const handleClick = (i, k) =>{
    if(!algoStarted){
      if(board[i][k] === 'start'){ // If click on start node, setStart state to true to start moving the node
        setStart(true)
      } else if(board[i][k] === 'end'){ // If click on end node, setEnd state to true to move the end node
        setEnd(true)
      } else{
        setBoard(duplicate(i,k,board, null)) // If click on empty node, start drawing node
        setClicked(true)
      }
    }
  }

  // On mouse up set the state to false to stop updating the UI
  const handleMouseUp = (i, k) =>{
    //On mouse reseale stop drawing walls or moving start/end noved
    if(startClicked && board[i][k] !=='end') setStart(false)
    if(endClicked && board[i][k] !=='start') setEnd(false)
    if(clicked) setClicked(false)
  }
  

  
  return (
    <div className='grid h-100 d-flex justify-content-center align-items-center'>
      <table>
        <tbody>
          {board.map((row, i) =>(
            <tr key={i}>
              {row.map((col,k)=>(
                <td key={k-i}>
                  <div 
                    className ={'node ' + ((board[i][k] === true)  ? "wall" : "")} key={k} id={"r-"+ i +" c-"+k } 
                    onMouseDown={()=>handleClick(i, k)} 
                    onMouseUp={()=> handleMouseUp(i, k)}
                    onMouseEnter={()=> handleEnter(i,k)}
                    onMouseLeave={()=> handleLeave(i,k)}
                    >
                      {(board[i][k] === 'start') ? <FontAwesomeIcon icon={faPlay} size='lg' color='#3d5a80 ' /> : ""}
                      {(board[i][k] === 'end') ? <FontAwesomeIcon icon={faBullseye} size='lg' color='#FF0000'/> : ""}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grid;
