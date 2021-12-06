import React from "react";
import { Box, Typography } from "@material-ui/core";
import swUpdates from "../../../../logo/Assets/Ensure your devices have the latest security updates/Installing software updates Quote.png";
import laptop from "../../../../logo/Assets/Ensure your devices have the latest security updates/icons8-checked_laptop.png";

const SecurityUpdates = () => {
  const imageStyle = { 
      
      margin: "auto" ,
      marginBottom:'30px',
      WebkitFilter: "drop-shadow(3px 2px 3px  gray)",
    
    
    }

  const url = 'https://www.cyber.gov.au/acsc/view-all-content/guidance/update-software-regularly'
  return (
    <Box sx={{ display: "flex", flexDirection: "column"  , color:'rgb(100 101 101)' , marginTop:'30px'}}>
      <Typography style={{ padding: "0 150px 0 190px" ,marginBottom:'30px'}}>Keeping your operation system and application up to date not only provides you with the latest features, it is also one of the best ways to protect your self from being hacked</Typography>

      <img src={swUpdates} alt="Installing Software Updates Qoute" style={imageStyle} />

      <Typography style={{ padding: "0 150px 0 190px" }}>For some guidance on how to keep your devices up to date click on the laptop below:</Typography>
      <a href={url} style={{margin:'auto'}}>
        <img src={laptop} alt="laptop"  />
      </a>
    </Box>
  );
};

export default SecurityUpdates;
