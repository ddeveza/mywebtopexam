import React from "react";
import { Button, makeStyles ,Box} from "@material-ui/core";

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
    alignSelf: "end",
    position: "absolute",
  },
  descStyle: {
    paddingLeft: "15px",
    paddingRight: "15px",
  },
});

const Footer = (props) => {
  const classes = styles();
  return (
    <Box sx={{display:'flex' , position: 'absolute', right: '255px',bottom: '16px'}}>
      <Button onClick={props.close} className={classes.buttonStyle}>
        Close
      </Button>
    </Box>
  );
};

export default Footer;
