import React from "react";
import { Button, makeStyles, Typography, Modal , Backdrop  , Box } from "@material-ui/core";
import {useToggleModal} from '../../../customhook/useToggleModal'
import beCloudSafe from '../../../logo/Assets/BeCloudSafe Logo Cropped.png'

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
  const [toggle,handleToggle] = useToggleModal(false);

  const boxStyle ={
    position: "relative",
    top: "57%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "400px",
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    p: 2,
    paddingTop: "0px",
    boxSizing: "content-box",
    WebkitFilter: "drop-shadow(2px 2px 5px  rgb(120 196 217))",
    borderRadius: "1%",
  }



  return (
    <>
      <Button onClick={props.desc!== 'MORE INFO' ? props.close : handleToggle} className={classes.buttonStyle}>
        <Typography className={classes.descStyle}>{props.desc} </Typography>
      </Button>

      <Modal
        open={toggle}
        onClose={handleToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop = { true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          invisible:true
        }}
      >
        <>
          <Box sx={boxStyle}>
             <img src={beCloudSafe} alt='becloudsafe' style={{width:'290px', height:'80px' ,marginTop:'18px'}}/>
             <Typography style={{margin:'auto' ,padding:'0 100px 0 100px' ,fontSize: '20px', letterSpacing:'1px' , color:'rgb(42, 129, 163)'}}>Thank you for your interest, one of our team will be in contact with you shortly</Typography>
             
             <Button onClick={props.close}  className={classes.buttonStyle} style={{display:'flex' , alignSelf:'flex-end'}}>
                <Typography className={classes.descStyle}>CLOSE </Typography>
             </Button>
          </Box>
        </>
      </Modal>
    </>
  );
};

export default ButtonPage;
