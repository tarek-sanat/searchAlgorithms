import React, {useState} from 'react';
import './Menu.css'
import { IconContext } from "react-icons";
import { FaGithub } from 'react-icons/fa';
function Menu(props){
  const [finder, setFinder] = useState('A*')

  const setMenu = (option) =>{
    props.setMenu(option)
  }
  return (
    <div id='iddd' className={'menu '+ (props.menu === 'nav' ? 'condStyle bg-dark mx-auto' : 'center') }>
      <div>
        {(props.menu === 'nav' ?  '': <h5 className='pt-4 pb-4 projName '> Pathfinding Visualizer</h5>) }
      </div>
      
      <div className={'centerDrop selectWidth ' + (props.menu === 'nav' ? '' : 'pad')}>
        <select className="form-select" onChange={(e) => setFinder(e.target.value)}>
          <option value="A*">A* Search</option>
          <option value="Breadth First">Breadth First Search</option>
          <option value="Depth First">Bi-Directional Breadth First Search</option>
          <option value="Dijkstra">Dijkstra</option>
        </select>

      </div>
      <div className={(props.menu === 'nav' ? '' : 'padBtn')}>
        <button id='startBtn' onClick={()=>setMenu(finder)} className="btn btn-primary">Start</button>
      </div>
      <div className={(props.menu === 'nav' ? '' : 'padBtn')}>
        <button id='generateBtn' onClick={()=>setMenu('Generate')} className="btn btn-primary">Generate</button>
      </div> 
      <div className={(props.menu === 'nav' ? '' : 'padBtn')}>
        <button id='clearBtn' onClick={()=> setMenu('Clear')} className="btn btn-light">Clear</button>
      </div>
      
      <IconContext.Provider value={{ color: "white", size: "3em" }}>
        <div className='icon'>
          <a target="_blank" rel="noopener noreferrer" href='https://github.com/tarek-sanat'><FaGithub/></a>
          
        </div>
      </IconContext.Provider>
      
    </div>
    
    
  );
}


export default Menu;
