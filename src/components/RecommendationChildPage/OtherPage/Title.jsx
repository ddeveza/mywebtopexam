import React from "react";
import { Box, Typography } from "@material-ui/core";

const Title = (props) => {
  const titleStyle = {
      fontSize : '30px',
      fontFamily: "Lato, sans-serif",
      textTransform: "uppercase",
      letterSpacing:'1px',
      paddingLeft : '40px',
      paddingRight: '170px',
      color:'rgba(42, 129, 163, 1)'
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "row"  , m:3 , marginTop:'30px', marginLeft:'50px'}}>
      <Box sx={{display:'flex', alignItems:'center'}}>
        <img src={props.photo} alt="recommendation" />
      </Box>
      <Box sx={{display:'flex' , flexWrap:'wrap'}}>
        <Typography style={titleStyle}>{props.title}</Typography>
      </Box>
    </Box>
  );
};

export default Title;
