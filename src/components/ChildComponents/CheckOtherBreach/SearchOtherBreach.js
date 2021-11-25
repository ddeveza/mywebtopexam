import React from "react";
import { Modal, Backdrop, Box, Button, Typography } from "@material-ui/core";
import emailLogo from "../../../logo/Assets/icons8-mail.png";


const SearchOtherBreach = (props) => {
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
    outline: "none",
  };

  const mainTitle = {
    fontSize: '36px',
    fontWeight: '700'
  }

  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleToggle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            <Box>
              <img src={emailLogo} alt="search logo" />
            </Box>
            <Box>
              <Typography sx={mainTitle}>{props.desc.toUpperCase()}</Typography>
            </Box>
          </Box>
          <Box>About</Box>
          <Box>Search</Box>
          <Box>
            <Button onClick={props.handleToggle}>CLOSE</Button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default SearchOtherBreach;
