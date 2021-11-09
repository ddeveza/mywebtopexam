import React from 'react'
import {Box} from '@material-ui/core'

const TileTitle = ({title,value,about}) => {

    const style = {
        position: 'relative',
        //transform: 'translate(-50%, -50%)',
      
        bgcolor: 'background.paper',
        border: '2px solid red',
     
        p:2,
      };
    return (
        <Box sx={style}>
               {value}  {title} {about}
        </Box>
           
      
    )
}

export default TileTitle
