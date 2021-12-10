import React from "react";
import { Box } from "@material-ui/core";
import ImplementMultiFactor from "./BodyPage/ImplementMultiFactor";
import SecureYourPassword from "./BodyPage/SecureYourPassword";
import SecurityGateway from "./BodyPage/SecurityGateway";
import SecurityUpdates from "./BodyPage/SecurityUpdates";
import Title from "./Title";
import ButtonPage from "./ButtonPage";

const ChildPage = (props) => {
  const style = {
    position: "relative",
    top: "57%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "900px",
    height: "700px",
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    p: 1,
    paddingTop: "0px",
    boxSizing: "content-box",
    WebkitFilter: "drop-shadow(2px 2px 5px  rgb(120 196 217))",
    borderRadius: "1%",
  };

  return (
    
    <Box sx={style}>
      <Title photo={props.photo} title={props.title} />
      {props.id === "tile3" && <SecureYourPassword />}
      {props.id === "tile4" && <ImplementMultiFactor />}
      {props.id === "tile5" && <SecurityUpdates />}
      {props.id === "tile6" && <SecurityGateway />}
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", position: "absolute", right: "25px", bottom: "20px" }}>
         {props.id === "tile6" && <ButtonPage desc="MORE INFO"  close={props.handleToggle} />}
          <ButtonPage close={props.handleToggle} desc="CLOSE" />




      </Box>
    </Box>
  );
};

export default ChildPage;
