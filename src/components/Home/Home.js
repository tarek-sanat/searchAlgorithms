import React,{useState,useRef} from 'react';
import Grid from '../Grid/Grid.js'
import Menu from '../Menu/Menu.js'
import './Home.css'
import {useResize} from '../Home/resizeHelper'



function Home(){
  const componentRef = useRef()
  

  const [menuSelect, setMenuSelect] = useState(0)
  const size = useResize(componentRef, setMenuSelect)
 
  
  return (
    <div className='container-fluid'>
        <div className="row h-100" >
          { window.innerWidth >= 1000 ?
            <>
              <div className="col-lg-2 col-4 h-100 p-0"><Menu setMenu={setMenuSelect}  menu={'side'}/></div>
              <div className="col-md-10 h-100 p-0" ref={componentRef} >
                <Grid menu={menuSelect} setMenu={setMenuSelect} size={size} />
              </div>
            </> 
            :
            <>
              <nav className="navbar navbar-expand-md justify-content-center navbar-light bg-dark">
                <Menu menu={'nav'} setMenu={setMenuSelect} />
              </nav>
              <div className="h-100 p-0" ref={componentRef} >
                <Grid menu={menuSelect} setMenu={setMenuSelect} size={size} />
              </div>
            </>
          }
            
          
            
        </div>
    </div>

  );
}


export default Home;
