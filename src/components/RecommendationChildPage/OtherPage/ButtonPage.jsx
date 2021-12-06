import React from 'react'
import {Button, makeStyles, Typography} from '@material-ui/core'

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
    return (
       
            <Button onClick={props.close} className={classes.buttonStyle}>
                <Typography className={classes.descStyle}>{props.desc} </Typography>
            </Button>
    
    )
}

export default ButtonPage
