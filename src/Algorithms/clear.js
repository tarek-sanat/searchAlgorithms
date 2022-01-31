//Clear board and reset
function clear(props, horizGrid, verticGrid, setAlgoStarted){
    setAlgoStarted(false)
    for(let i =0; i< horizGrid; i++){
      for(let j =0; j<verticGrid; j++){
        document.getElementById('generateBtn').disabled = false;
        document.getElementById('startBtn').disabled = false;  
        document.getElementById('r-' + i +' c-' + j).style.removeProperty('background-color')
        props.setMenu(0)
      }
    }
}

export {clear}
