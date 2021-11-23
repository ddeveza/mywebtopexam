import React from "react";
import { Modal ,Backdrop} from "@material-ui/core";

const SearchOtherBreach = (props) => {
    console.log(props)
  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleToggle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      hideBackdrop={false}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
         <>  Hello Search Other Breach Email</>
    </Modal>
  );
};

export default SearchOtherBreach;
