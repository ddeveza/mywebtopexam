import React from "react";
import { makeStyles, Paper, Box, Typography, Modal, Backdrop } from "@material-ui/core";
import FlipPage from "./RecommendationChildPage/CyberSecureHomePage/FlipPage";
import ChildPage from "./RecommendationChildPage/OtherPage/ChildPage";
import { useToggleModal } from "../customhook/useToggleModal";

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
  const classes = styles();
  const [toggle, handleToggle] = useToggleModal(false);

  return (
    <>
      <Paper onClick={handleToggle} className={classes.tile}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box>
            <Typography className={classes.tileText}>{props.title}</Typography>
          </Box>
          <Box sx={{display:'flex' , height:'110px', alignItems:'center'}}>
            <img src={props.photo} alt="recommendation logo" style={{height:'100px', width:'100px'}}/>
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
          {props.id === "tile1" && <FlipPage handleToggle={handleToggle} />}
          {(props.id !== "tile1" && props.id !== "tile2") && <ChildPage handleToggle={handleToggle} title={props.title} id={props.id} photo={props.photo}/>}
        </>
      </Modal>
    </>
  );
};

export default TileRecommend;
