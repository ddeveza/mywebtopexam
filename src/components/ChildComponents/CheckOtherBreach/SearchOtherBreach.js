import React, { useState } from "react";
import { Modal, Backdrop, Box, Button, Typography, makeStyles, LinearProgress } from "@material-ui/core";
import emailLogo from "../../../logo/Assets/icons8-mail.png";
import phoneLogo from "../../../logo/Assets/icons8-touchscreen.png";
import SearchIcon from "@material-ui/icons/Search";
import ModalResult from "./ModalResult";

import { __checkBreach } from "../../../graph";

const styles = makeStyles({
  buttonStylePhone: {
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
    marginTop: " 250px",
    marginRight: "20px",
  },
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
    marginTop: " 278px",
    marginRight: "20px",
  },
  descStyle: {
    paddingLeft: "15px",
    paddingRight: "15px",
  },
});
const SearchOtherBreach = (props) => {
  const classes = styles();
  const [value, setValue] = useState();
  const [toggle, setToggle] = useState(false);
  const [result, setResult] = useState([]);
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const searchHandle = async (input) => {
    //1. get the email address / phone number
    //2. search for the api
    //3. set data
    //5. set modal
    //6. pass to detailBreach email
    if (input === null || input === undefined) {
      props.desc.search("email") !== -1 ? alert("Please enter a valid email address.") : alert("Please enter a valid phone number.");
    } else {
      if (props.desc.search("email") !== -1) {
        if (input.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
          setSearching(true);
          const data = await __checkBreach(input);

          if (data !== "") {
            setResult(data);
            setEmail(input);
            setSearching(false);
            setToggle(!toggle);
          } else {
            setSearching(false);
            alert("No result found.");
          }
        } else {
          alert("Enter a valid email address.");
        }
      } else {
        if (input.match(/^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im)) {
          setSearching(true);
          const data = await __checkBreach(input);

          if (data !== "") {
            setResult(data);
            setEmail(input);
            setSearching(false);
            setToggle(!toggle);
          } else {
            setSearching(false);
            alert("No result found");
          }
        } else {
          alert("Enter a valid phone number.");
        }
      }
    }
  };
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
   
    color: 'rgba(42, 129, 163, 1)',
    fontSize: '28px',
    fontFamily:'Lato, sans-serif',
    letterSpacing: '1px',
   
  };

  const searchBox = {
    backgroundColor: "rgb(242, 242, 242)",
    border: 0,
    outline: "none",
    width: "410px",
    padding: "10px",
  };

  return (
    <>
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
                <img src={props.desc.search("email") !== -1 ? emailLogo : phoneLogo} alt="search logo" style={{ width: "130px", height: "130px" }} />
              </Box>
              <Box sx={{ display: "flex", paddingLeft: "30px" }}>
                <Typography style={mainTitle}>{props.desc.toUpperCase()}</Typography>
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
                <Typography style={{ fontSize: "20px", color: "rgba(112, 112, 112, 1)" }}>Enter email address to be checked</Typography>
              ) : (
                <>
                  {" "}
                  <Typography
                    style={{
                      fontSize: "20px",
                      color: "rgba(112, 112, 112, 1)",
                    }}
                  >
                    Enter the phone number to be checked including the country code
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "20px",
                      color: "rgba(112, 112, 112, 1)",
                    }}
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
              <input type={props.desc.search("email") !== -1 && "email"} style={searchBox} placeholder={props.desc.search("email") !== -1 ? "Enter email address...." : "Enter phone number...."} onChange={(e) => setValue(e.target.value)} />
              <Button
                style={{
                  padding: "0px",
                  "&:hover": { backgroundColor: "rgb(242 242 242 / 38%)" },
                }}
              >
                <SearchIcon
                  onClick={() => searchHandle(value)}
                  style={{
                    cursor: "pointer",
                    width: "60px",
                    height: "auto",
                    color: "#5181b1",
                    borderLeft: "1px solid rgba(112, 112, 112, 1)",
                    padding: "5px",
                  }}
                />
              </Button>
            </Box>
            {searching && <LinearProgress style={{ width: 478, margin: "auto", color: "rgb(42, 129, 163)" }} />}
            <Box sx={{ display: "flex", alignSelf: "end" }}>
              <Button onClick={props.handleToggle} className={props.desc.search("email") !== -1 ? classes.buttonStyle : classes.buttonStylePhone}>
                <Typography>CLOSE</Typography>
              </Button>
            </Box>
          </Box>
        </>
      </Modal>

      <ModalResult data={result} isOpen={toggle} handleToggle={handleToggle} email={email} />
    </>
  );
};

export default SearchOtherBreach;
