import React from 'react'
import TileBody from './TileBody'
import TileTitle from './TileTitle'
import TileButton  from './TileButton'
import {Paper, Box} from '@material-ui/core'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    height: '25vw',
    bgcolor: 'background.paper',
    //border: '2px solid #000',
   // boxShadow: 24,
    p: 4,
  };

const MainChild = () => {
    return (
       
           <Box sx={style}>
                <TileTitle/>
                <TileBody/>
                <TileButton/>
            </Box>
      
            
               
         
           
        
    )
}

export default MainChild
