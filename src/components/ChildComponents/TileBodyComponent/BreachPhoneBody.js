import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
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

const BreachPhoneBody = ({ data }) => {
  const { phones } = data;
  const classes = styles();
  //const fakeData=['Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209','Dennis Deveza:+639323596209',];
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
  return (
    /*   <div>
           {phones[0].map(eachPhone=>{
               console.log(eachPhone.phone);
               return (<li>{eachPhone.phone}</li>)
           })}
        </div> */

    <Box sx={boxStyle}>
      {phones[0].map((data, id) => {
        return (
          <Box sx={{ marginRight: "30px" }}>
            <Typography className={classes.emailStyle} key={id}>
              {" "}
              {data.name}:{data.phone}{" "}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default BreachPhoneBody;
