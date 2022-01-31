import {useState, useEffect} from 'react';

//Reload the grid component on window resize and return the width and height of grid
const useResize = (myRef, setMenu) => {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
  
    useEffect(() => {
      const handleResize = () => {
        setWidth(myRef.current.offsetWidth)
        setHeight(myRef.current.offsetHeight)
        setMenu('Clear')
      }
  
      window.addEventListener('resize', handleResize)
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [myRef])
  
    return [height, width] 
  }


  export {useResize};



