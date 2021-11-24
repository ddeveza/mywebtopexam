import React, { useState } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
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

  const [toggle, setToggle] = useState(false);
  const { emails } = data;
  const classes = styles();
  /* const fakeData = [
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
  ]; */

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "stretch",
    height: "385px",
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
              <Typography className={classes.emailStyle} onClick={handleToggle}>
                {" "}
                {data.email}{" "}
              </Typography>

              <Main handleToggle={handleToggle} data={data} isOpen={toggle} />
            </Box>
          );

          //Modal for each email
        })}
      </Box>

      
    </>
  );
};

export default BreachEmailBody;
