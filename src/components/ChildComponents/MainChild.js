import React from 'react'
import TileBody from './TileBody'
import TileTitle from './TileTitle'
import TileButton  from './TileButton'
import { Box} from '@material-ui/core'

const style = {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1000px',
    height: '600px',
    bgcolor: 'background.paper',
    display: 'flex',
    flexDirection:'column',
    p:1,
    paddingTop:'0px',
    boxSizing:'content-box', 
    WebkitFilter:'drop-shadow(2px 2px 5px  rgb(120 196 217))',
   
    
    
  
    
    
  };

   
    
const MainChild = ({data}) => {
    return (
       
           <Box sx={style}>
               <Box >
                    <TileTitle title={data.Title} value={data.value} about={data.about}/>
               </Box>
               <Box>
                    <TileBody data={data}/>
               </Box>
               <Box sx={{display:'flex' , flexDirection:'row' , justifyContent:'flex-end'}}>
                                <TileButton desc={'DOWNLOAD'}/>
                                <TileButton desc={'CLOSE'}/> 
               </Box>
               

                
            </Box>
      
            
               
         
           
        
    )
}

export default MainChild
