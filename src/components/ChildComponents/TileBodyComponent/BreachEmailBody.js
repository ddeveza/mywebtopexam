import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Modal,
  Backdrop,
} from "@material-ui/core";
import Main from "./DetailBreachEmail/Main";
const styles = makeStyles({
  emailStyle: {
    fontSize: "20px",
    color: "rgba(42, 129, 163, 1)",
    cursor: "pointer",
    "&:hover": {
      color: "rgb(166 197 209)",
    },
  },
});
const BreachEmailBody = ({ data }) => {
  const ref = useRef();
  const [toggle, setToggle] = useState(false);
  const [emailData, setEmailData] = useState({});
  const { emails } = data;
  const classes = styles();
  const fakeData = [
    "dennis@mywebtop.au.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "dennis@mywebtop.au.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "dennis@mywebtop.au.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "dennis@mywebtop.au.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
    "admin@emmslab.com",
  ];

  const modalStyle = {
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "1000px",
    height: "600px",
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    p: 1,
    paddingTop: "0px",
    boxSizing: "content-box",
    WebkitFilter: "drop-shadow(2px 2px 5px  rgb(120 196 217))",
    borderRadius: "1%",
  };

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "stretch",
    height: "400px",
    width: "800px",
    alignContent: "space-around",
    paddingLeft: "100px",
    paddingRight: "100px",
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

 
  return (
    <>
      <Box sx={boxStyle}>
        {emails[0].map((data, index) => {
          return (
            <Box sx={{ marginRight: "30px" }} key={index}>
              <Typography
                className={classes.emailStyle}
                onClick={handleToggle}
                
              >
                {" "}
                {data.email}{" "}
              </Typography>

              <Main handleToggle={handleToggle} data={data} isOpen={toggle}/>
            </Box>
          );

          //Modal for each email
        })}
      </Box>
      

      {/*    <Modal
                open={toggle}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}

                >

                    <Box sx={modalStyle}>
                         
                    </Box>
                

                </Modal>   */}
    </>
  );
};

export default BreachEmailBody;
