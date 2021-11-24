import React, { useState, useEffect } from "react";
import { Typography, Box, Grid } from "@material-ui/core";
import forwardImg from "../../../logo/Assets/icons8-forward.png";
import backwardImg from "../../../logo/Assets/icons8-back.png";
import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
  boldStyle: {
    fontWeight: "650",
    fontSize: "17px",
    color: "rgba(112, 112, 112, 1)",
    display: "inline-block",
    paddingRight:'8px'
  },

  textStyle: {
    fontSize: "17px",
    color: "rgba(112, 112, 112, 1)",
    display: "contents",
  },
});

const SecurityAPIBody = ({ data }) => {
  const classes = styles();

  const [index, setIndex] = useState(0);
  const [toggleForArrow, setToggleForArrow] = useState(false);
  const [toggleBackArrow, setToggleBackArrow] = useState(false);

  const dataLength = data.securityControl.length;
  useEffect(() => {
    if (dataLength > 1) setToggleForArrow(true);
  }, [dataLength]);

  const _forwardClick = (data) => {
    if (dataLength > 1) {
      setIndex((currentVal) => {
        if (currentVal === dataLength - 2) {
          setToggleForArrow(false);
          setToggleBackArrow(true);
          return currentVal + 1;
        } else {
          setToggleBackArrow(true);
          return currentVal + 1;
        }
      });
    }
  };
  const _backwardClick = (data) => {
    if (dataLength > 1) {
      setIndex((currentVal) => {
        if (currentVal === 1) {
          setToggleBackArrow(false);
          setToggleForArrow(true);
          return currentVal - 1;
        } else {
          setToggleForArrow(true);
          return currentVal - 1;
        }
      });
    }
  };

  return !(data.Title === "MICROSOFT SECURE SCORE") ? (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "347px",
          paddingLeft: "60px",
          paddingRight: "60px",
          marginTop: "40px",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", paddingBottom: "40px" }}
        >
          <Typography className={classes.boldStyle}>
            Security Control:
          </Typography>
          <Typography className={classes.textStyle}>
            
            {` ${data.securityControl}` }
          </Typography>
        </Box>

        <Box sx={{ paddingBottom: "40px" }}>
          <Typography className={classes.boldStyle}>Description:</Typography>
          <Typography className={classes.textStyle}>
            {data.description}
          </Typography>
        </Box>

        <Box>
          <Typography className={classes.boldStyle}>Status:</Typography>
          <Typography className={classes.textStyle}>{data.status}</Typography>
        </Box>
      </Box>
    </div>
  ) : (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row", height: "385px" }}>
        <Grid container direction="row">
          <Grid
            item
            container
            xs={2}
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              {toggleBackArrow && (
                <img
                  src={backwardImg}
                  alt="backward"
                  onClick={() => _backwardClick(data.securityControl)}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: "40px",
                  paddingTop: "40px",
                }}
              >
                <Typography className={classes.boldStyle}>
                  Security Control:{" "}
                </Typography>
                <Typography className={classes.textStyle}>
                  {" "}
                  {data.securityControl[index].controlName}
                </Typography>
              </Box>

              <Box sx={{ paddingBottom: "40px" }}>
                <Typography className={classes.boldStyle}>
                  Description:
                </Typography>
                <Typography className={classes.textStyle}>
                  {data.securityControl[index].description}
                </Typography>
              </Box>

              <Box>
                <Typography className={classes.boldStyle}>Status:</Typography>
                <Typography className={classes.textStyle}>
                  {data.securityControl[index].implementationStatus}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={2}
            container
            xs={2}
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              {toggleForArrow && (
                <img
                  src={forwardImg}
                  alt="forward"
                  onClick={() => _forwardClick(data.securityControl)}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SecurityAPIBody;
