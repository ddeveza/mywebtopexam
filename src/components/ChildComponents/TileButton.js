import React, { useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import SearchOtherBreach from "../ChildComponents/CheckOtherBreach/SearchOtherBreach";

const styles = makeStyles({
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
    
  },
  descStyle: {
    paddingLeft: "15px",
    paddingRight: "15px",
  },
});

const TileButton = (props) => {
  const classes = styles();
  const [openSearchBreach, setOpenSearchBreach] = useState(false);
  const handleToggle = () => {
    setOpenSearchBreach(!openSearchBreach);
  };

  return (
    <>
      <Button
        className={classes.buttonStyle}
        onClick={
          props.desc !== "CLOSE"
            ? () => setOpenSearchBreach(!openSearchBreach)
            : () => props.close()
        }
      >
        <Typography className={classes.descStyle}> {props.desc} </Typography>
      </Button>

      {openSearchBreach && (
        <SearchOtherBreach
          isOpen={openSearchBreach}
          handleToggle={handleToggle}
          desc ={props.desc}
        />
      )}
    </>
  );
};

export default TileButton;
