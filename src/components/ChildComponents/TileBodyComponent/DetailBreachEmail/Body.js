import React from "react";
import { Box, Typography } from "@material-ui/core";

const Body = (props) => {
  const data1 = JSON.parse(props.data);
  console.log(data1);
  const container = {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    overflowY: "scroll", // added scroll
    backgroundColor: "white",
    color: "gray",

    width: "80%",
    height: "70%",
    placeSelf: "center",
    margin: "auto",
  };
  return (
    <Box sx={container}>
      {data1.map((value, index) => {
        let logoWhite =
          value.LogoPath.includes("List") || value.LogoPath.includes("Email") ||value.LogoPath.includes("Canva")? true: false;
        return (
          <Box key={index} sx={{ display: "flex", p: 2 }}>
            <Box>
              {
                <img
                  src={value.LogoPath}
                  style={
                    logoWhite
                      ? {
                          backgroundColor: "rgba(42, 129, 163, 1)",
                          width: "100px",
                          heigh: "100px",
                          marginRight: '10px'
                        }
                      : {
                          width: "100px",
                          heigh: "100px",
                          marginRight: '10px'
                        }
                  }
                />
              }
            </Box>
            <Box>
              <Typography  style={{fontWeight:'700'}}>{value.Name} : </Typography>
              <Typography  >{value.Description}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Body;
