import React, { useState,useEffect } from "react";
import { Box, Typography , makeStyles} from "@material-ui/core";

import avatar from "../../../../logo/Avatar.png";
const styles = makeStyles({
    textStyle :{
        color:'gray',
        fontWeight:'500',
        letterSpacing:'1px',
        marginBottom: '5px',
        fontSize:'20px'
    }
})
const Header = (props) => {
  const clasess = styles()
  const [photo, setphoto] = useState();
  const userAvatar = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",

    marginTop: "10px",
    marginLeft: "10px",
  };

  
  

  console.log(props);
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box>
        <img src={props.data.photo} alt="avatar" style={userAvatar} />
      </Box>
      <Box sx={{m:2}}>
        <Typography className={clasess.textStyle}>{props.data.name}</Typography>
        <Typography className={clasess.textStyle}>{props.data.email}</Typography>
      </Box>
    </Box>
  );
};

export default Header;
