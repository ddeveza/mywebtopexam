import React, { useState, useEffect, forwardRef } from "react";
import Header from "../DetailBreachEmail/Header";
import Footer from "../DetailBreachEmail/Footer";
import Body from "../DetailBreachEmail/Body";

import { Modal, Backdrop } from "@material-ui/core";

const Main = (props) => {
 


  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleToggle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
        <Header />
        <Body email={props.data.email}/>
        <Footer />
    </Modal>
  );
};

export default Main;
