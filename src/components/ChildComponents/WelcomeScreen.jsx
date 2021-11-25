import React, { useState } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import "../../assets/css/welcome_screen.css";
import wsPage0 from "../../assets/images/welcome_screen/welcome_screen_page_0.png";
import wsPage1 from "../../assets/images/welcome_screen/welcome_screen_page_1.png";
import wsPage2 from "../../assets/images/welcome_screen/welcome_screen_page_2.png";
import wsPage3 from "../../assets/images/welcome_screen/welcome_screen_page_3.png";
import wsPage4 from "../../assets/images/welcome_screen/welcome_screen_page_4.png";
import wsPage5 from "../../assets/images/welcome_screen/welcome_screen_page_5.png";
import wsPage6 from "../../assets/images/welcome_screen/welcome_screen_page_6.png";
import wsPage7 from "../../assets/images/welcome_screen/welcome_screen_page_7.png";
import wsPage8 from "../../assets/images/welcome_screen/welcome_screen_page_8.png";
import wsPage9 from "../../assets/images/welcome_screen/welcome_screen_page_9.png";

function WelcomeScreen(props) {
  const [wsPage, setWsPage] = useState(0);
  const wsPages = [wsPage0, wsPage1, wsPage2, wsPage3, wsPage4, wsPage5, wsPage6, wsPage7, wsPage8, wsPage9];
  const minPage = 0;
  const maxPage = 9;

  const __wsDone = () => {
    localStorage.setItem("wsDone", true);
    props.setWsDone(true);
    props.setWsOpen(false);
    setWsPage(0);
    console.log("WS Done");
  };

  return (
    <div>
      <Modal show={props.wsOpen} fullscreen={true} onHide={() => props.setWsOpen(false)}>
        <Modal.Body className="m-0 p-0 ws-container">
          <div className="ws-content">
            <Image src={wsPages[wsPage]} fluid />
          </div>
        </Modal.Body>
        <Modal.Footer className="ws-footer">
          {wsPage !== minPage && (
            <Button variant="primary" onClick={() => setWsPage(wsPage > minPage ? wsPage - 1 : wsPage)}>
              Back
            </Button>
          )}
          {wsPage !== maxPage && (
            <Button variant="success" onClick={() => setWsPage(wsPage < maxPage ? wsPage + 1 : wsPage)}>
              Next to continue
            </Button>
          )}
          {wsPage === maxPage && (
            <Button variant="warning" onClick={__wsDone}>
              Close to continue
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WelcomeScreen;
