import { Paper, Typography ,Box, Button} from "@material-ui/core";
import React, { forwardRef } from "react";

const EndPage = forwardRef((props, ref) => {
  return (
    <Paper ref={ref}>
      <Box sx={{display:'flex' , justifyContent:'center' , marginTop:'250px'}}>
        <Button onClick={props.handleToggle}>Click Here To Close</Button>
      </Box>
      <Box sx={{display:'flex', justifyContent:'center', marginTop:'357px'}}>
        <Typography>  Page: {props.number} out of 8  </Typography>
      </Box>
       
    </Paper>
  );
});
export default EndPage;
