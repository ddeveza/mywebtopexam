import React from "react";
import { makeStyles, Paper, Box, Typography } from "@material-ui/core";

const styles = makeStyles({
  tile: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxSizing: "content-box",
    WebkitFilter: "drop-shadow(3px 2px 3px  rgb(120 196 217))",
    padding: "20px 15px 25px 10px",
    width: "370px",
    height: "165px",
    color: "rgb(100 101 101)",
    cursor: "pointer",
  },
  tileText: {
    fontFamily: "Lato, sans-serif",
    textTransform: "uppercase",
    fontSize: "18px",
    letterSpacing: "1px",
    margin: "0.001em",
    textAlign:'center'
  },
});

const handleToggle = () => {};

const TileRecommend = (props) => {
  const classes = styles();

  return (
    <>
      <Paper onClick={handleToggle} className={classes.tile}>
        <Box sx={{display:'flex' ,flexDirection:'column', alignItems:'center'}}>
          <Box>
            <Typography className={classes.tileText}>{props.title}</Typography>
          </Box>
          <Box>
            <img src={props.photo} alt="photo" />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default TileRecommend;
