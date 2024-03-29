import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Markup } from "interweave";
import { Scrollbars } from "react-custom-scrollbars";
import "../DetailBreachEmail/BreachEmail.css";

const Body = (props) => {
  const data1 = JSON.parse(props.data);

  const container = {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    height: "70%",
    placeSelf: "center",
    margin: "auto" ,
   
  };
  return (
    <Box sx={container}>
      <Scrollbars  autoHide={false}   >
        {data1.map((value, index) => {
          let logoWhite =
            value.LogoPath.includes("List") ||
            value.LogoPath.includes("Email") ||
            value.LogoPath.includes("Canva")
              ? true
              : false;
          return (
            <Box key={index} sx={{ display: "flex", p: 2 }}>
              <Box>
                {
                  <img
                    src={value.LogoPath}
                    alt="logo"
                    style={
                      logoWhite
                        ? {
                            backgroundColor: "rgba(42, 129, 163, 1)",
                            width: "90px",
                            heigh: "90px",
                            marginRight: "10px",
                          }
                        : {
                            width: "90px",
                            heigh: "90px",
                            marginRight: "10px",
                          }
                    }
                  />
                }
              </Box>
              <Box  >
                <Typography style={{ fontWeight: "700", color: "gray" }}>
                  {value.Name} :{" "}
                </Typography>
                <Typography style={{ color: "gray" }}>
                  <Markup content={value.Description} />
                </Typography>

                <Typography
                  style={{
                    color: "gray",
                    display: "inline-block",
                    marginTop: "15px",
                    marginRight: "5px",
                    fontWeight: "700",
                  }}
                >{`Compromise Data: `}</Typography>

                {value.DataClasses.map((eachVal, index) => {
                  return (
                    <Typography key={index} style={{ display: "contents", color: "gray" }}>
                      {eachVal} {index + 1 !== value.DataClasses.length && `, `}
                    </Typography>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Scrollbars>
    </Box>
  );
};

export default Body;
