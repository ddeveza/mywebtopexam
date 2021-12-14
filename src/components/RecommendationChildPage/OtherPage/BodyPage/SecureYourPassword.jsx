import React from "react";
import { Box, Typography } from "@material-ui/core";
import lastPass from "../../../../logo/Assets/icons8-lastpass.png";

const SecureYourPassword = () => {
  const url = "https://lastpass.wo8g.net/MyWebTop";
  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 5, padding: "0 190px 0 190px", color: "rgb(100 101 101)", marginTop: "30px" }}>
      <Typography style={{ marginBottom: "15px" }}>Use a Password Manager - One of the easiest ways to be is through the use of the same password across multiple sites</Typography>
      <Typography style={{ marginBottom: "15px" }}>Trying to remember multuple passwords is impossible therefor using a password manager enable you to use unique passwords across all sites without having to remember them all</Typography>
      <Typography style={{ marginBottom: "15px" }}>We use and recomment LastPass</Typography>
      <Typography style={{ marginBottom: "15px" }}>Click the LastPass icon below to get started:</Typography>
      <Box
        style={{ alignSelf: "center", cursor: "pointer", marginTop: "10px" }}
        onClick={() => {
          window.location = url;
        }}
      >
        <img src={lastPass} alt="lass pass" />
      </Box>
    </Box>
  );
};

export default SecureYourPassword;
