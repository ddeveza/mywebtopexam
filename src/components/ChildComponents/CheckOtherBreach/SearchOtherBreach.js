import React, { useState } from "react";
import { Modal, Backdrop, Box, Button, Typography } from "@material-ui/core";
import emailLogo from "../../../logo/Assets/icons8-mail.png";
import phoneLogo from "../../../logo/Assets/icons8-touchscreen.png";
import SearchIcon from "@material-ui/icons/Search";

const SearchOtherBreach = (props) => {
  const [onClickSytle, setOnClickSytle] = useState();
  const searchHandle = () => {};
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
    paddingTop: "1px",
    boxSizing: "content-box",
    WebkitFilter: "drop-shadow(2px 2px 5px  rgb(120 196 217))",
    borderRadius: "1%",
    outline: "none",
  };

  const mainTitle = {
    fontSize: "40px",
    color: "rgba(42, 129, 163, 1)",
  };

  const searchBox = {
    backgroundColor: "rgb(242, 242, 242)",
    border: 0,
    outline: "none",
    width: "410px",
    padding: "10px",
  };

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
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", marginLeft: "19px" }}>
              <img
                src={props.desc.search("email") !== -1 ? emailLogo : phoneLogo}
                alt="search logo"
                style={{ width: "130px", height: "130px" }}
              />
            </Box>
            <Box sx={{ display: "flex", paddingLeft: "30px" }}>
              <Typography style={mainTitle}>
                {props.desc.toUpperCase()}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignSelf: "center",
              flexDirection: "column",
            }}
          >
            {props.desc.search("email") !== -1 ? (
              <Typography
                style={{ fontSize: "20px", color: "rgba(112, 112, 112, 1)" }}
              >
                Enter email address to be checked
              </Typography>
            ) : (
              <>
                {" "}
                <Typography
                  style={{ fontSize: "20px", color: "rgba(112, 112, 112, 1)" }}
                >
                  Enter the phone number to be checked including the country
                  code
                </Typography>
                <Typography
                  style={{ fontSize: "20px", color: "rgba(112, 112, 112, 1)" }}
                >
                  Eg:+61412333555`
                </Typography>
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignSelf: "center",
              marginTop: "20px",
              border: "1px solid rgba(112, 112, 112, 1) ",
              width: "auto",
              height: "60px",
            }}
          >
            <input
              type={props.desc.search("email") !== -1 && "email"}
              style={searchBox}
            />
            <Button
              style={{
                
                padding:'0px',
                "&:hover": { backgroundColor: "rgb(242 242 242 / 38%)" },
              }}
            >
              <SearchIcon
                onClick={searchHandle}
                style={{
                  cursor: "pointer",
                  width: "60px",
                  height: "auto",
                  color: "#5181b1",
                  borderLeft: "1px solid rgba(112, 112, 112, 1)",
                  padding:'5px'
                }}
              />
            </Button>
          </Box>
          <Box>
            <Button onClick={props.handleToggle} style={{}}>CLOSE</Button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default SearchOtherBreach;
