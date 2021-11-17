import React from 'react'
import TileBody from './TileBody'
import TileTitle from './TileTitle'
import TileButton  from './TileButton'
import {Grid, Box} from '@material-ui/core'

const style = {
    position: 'fixed',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '900px',
    height: '600px',
    bgcolor: 'background.paper',
    //border: '2px solid #000',
   // boxShadow: 24,
    p:2
  };

   
    
const MainChild = ({data}) => {
    return (
       
           <Box sx={style}>
               
                <Grid container direction='column'  >
                        <Grid item xs={12}>
                            <TileTitle title={data.Title} value={data.value} about={data.about}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TileBody data={data}/>
                           
                        </Grid>
                        <Grid  container  direction="column" alignItems="flex-end">
                            <Grid item xs={12}>
                                <TileButton desc={'DOWNLOAD'}/>
                                <TileButton desc={'CLOSE'}/>
                            </Grid>
                          
                        </Grid>
                    
                    </Grid>
                
            </Box>
      
            
               
         
           
        
    )
}

export default MainChild
