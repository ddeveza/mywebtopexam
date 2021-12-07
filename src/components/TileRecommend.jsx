import React, { useState } from "react";
import { makeStyles, Paper, Box, Typography, Modal, Backdrop } from "@material-ui/core";
import HTMLFlipBook from "react-pageflip";

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
    textAlign: "center",
  },
  demo: {
    backgroundColor: "white",
    margin: "auto",
    marginTop: "150px",
  },
});

const TileRecommend = (props) => {
  const [toggle, setToggle] = useState(false);
  const classes = styles();
  const handleToggle = () => setToggle(!toggle);
  return (
    <>
      <Paper onClick={handleToggle} className={classes.tile}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box>
            <Typography className={classes.tileText}>{props.title}</Typography>
          </Box>
          <Box>
            <img src={props.photo} alt="photo" />
          </Box>
        </Box>
      </Paper>

      <Modal
        open={toggle}
        onClose={handleToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <>
          {" "}
          <HTMLFlipBook width={300} height={500}   maxShadowOpacity={1} showCover={false} mobileScrollSupport={true} className={classes.demo}>
            <div className="demoPage">{props.title}</div>
            <div className="demoPage">Demo 2text</div>
            <div className="demoPage">Demo 3text</div>
            <div className="demoPage">Demo 4text</div>
          </HTMLFlipBook>
        </>
      </Modal>
    </>
  );
};

export default TileRecommend;
