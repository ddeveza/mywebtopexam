import React from 'react'
import {Box,Grid} from '@material-ui/core'

const TileBody = ({data}) => {
    
    const style = {
        position: 'relative',
        //transform: 'translate(-50%, -50%)',
        
        bgcolor: 'background.paper',
        border: '2px solid red',
        height :'52.5vh',
       // boxShadow: 24,
       
        p: 2,
        
      };




    return (
        <Box sx={style}>
            <Grid container></Grid>
            <Grid container></Grid>
            <Grid container></Grid>
            <Grid container></Grid>
        </Box>
           
       
    )
}

export default TileBody
