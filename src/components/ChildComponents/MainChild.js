import React, { forwardRef, useState, useEffect, useRef } from "react";
import TileBody from "./TileBody";
import TileTitle from "./TileTitle";
import TileButton from "./TileButton";
import { Box } from "@material-ui/core";

const style = {
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
  paddingTop: "0px",
  boxSizing: "content-box",
  WebkitFilter: "drop-shadow(2px 2px 5px  rgb(120 196 217))",
  borderRadius: "1%",
};

const MainChild = forwardRef(({ data, close }, ref) => {
  const [buttonDesc, setButtonDesc] = useState("DOWNLOAD");

  const _isMounted = useRef();

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    switch (data.Title) {
      case "Breached Email Accounts": {
        setButtonDesc("Check another email address");
        break;
      }
      case "Breached Phone Numbers": {
        setButtonDesc("Check another phone number");
        break;
      }
      default: {
        break;
      }
    }
  }, [data]);

  return (
    <Box sx={style}>
      <Box>
        <TileTitle title={data.Title} value={data.value} about={data.about} />
      </Box>
      <Box>
        <TileBody data={data} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginRight: "9px",
        }}>
        {buttonDesc !== "DOWNLOAD" && <TileButton desc={buttonDesc} />}
        <TileButton desc={"CLOSE"} close={close} />
      </Box>
    </Box>

    // Modal for Breach and Phone only
  );
});

export default MainChild;
