import React, { forwardRef } from "react";
import { Paper , Box,Typography} from "@material-ui/core";

const Page = forwardRef((props,ref) => {
  const imageStyle = {
      maxWidth:'465px',
      maxHeight:'600px',
      height: '100vh',
      width:'100vw',
      cursor:'pointer',
  }
  
  return (

        <Paper ref={ref} > 
            <Box sx={{m:2,marginTop:'30px'}}>
                <img src={props.photo} alt="cyber phot" style={imageStyle}/>
            </Box>
            <Box sx={{m:2 , display:'flex' , alignSelf:'center', justifyContent:'center'}}>
               <Typography>Page: {props.number} out of 8</Typography>
            </Box>

        </Paper>
  );
});
export default Page;
