import React, { useState } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import Main from "./DetailBreachEmail/Main";
import "../TileBodyComponent/DetailBreachEmail/BreachEmail.css";

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
 /*  const fakeData = [
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
    //alignContent: "space-around",
    paddingLeft: "77px",
    paddingRight: "77px",
    margin: "auto",
    overFlow: "auto !important",
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <Box sx={boxStyle} className="scroll">
        {emails[0]?.map((data, index) => {
          return (
            <Box sx={{ marginRight: "30px", overFlow: "auto" }} key={index}>
              <Typography className={classes.emailStyle} onClick={handleToggle}>
                {" "}
                {data.email}{" "}
              </Typography>

              <Main handleToggle={handleToggle} data={data} isOpen={toggle} title="email" />
            </Box>
          );

          //Modal for each email
        })}
      </Box>
    </>
  );
};

export default BreachEmailBody;
