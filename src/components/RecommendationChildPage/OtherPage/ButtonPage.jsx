import React from "react";
import { Button, makeStyles, Typography} from "@material-ui/core";
import {useToggleModal} from '../../../customhook/useToggleModal'

import MoreInfo from "./MoreInfo";

const styles = makeStyles({
  buttonStyle: {
    margin: "10px",
    boxSizing: "content-box",
    backgroundColor: "rgba(42, 129, 163, 1)",
    width: "200px",
    height: "40px",
    WebkitFilter: "drop-shadow(2px 5px 3px rgba(112, 112, 112, 1))",
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "500",
    "&:hover": {
      backgroundColor: "rgb(95 165 193)",
    },
  },
  descStyle: {
    paddingLeft: "15px",
    paddingRight: "15px",
  },
});



const ButtonPage = (props) => {
  const classes = styles();
  const [toggle,handleToggle] =  useToggleModal(false);

 


  return (
    <>
      <Button onClick={props.desc!== 'MORE INFO' ? props.close : handleToggle} className={classes.buttonStyle}>
        <Typography className={classes.descStyle}>{props.desc} </Typography>
      </Button>


      {/* This is for the thank you after clicking the "MORE INFO" button */}
    
      {props.desc === 'MORE INFO' && <MoreInfo  isOpen={toggle} close={props.close}/>}

      {/* End of Thankyou info */}
    </>
  );
};

export default ButtonPage;
