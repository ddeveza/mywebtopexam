import React from "react";
import Page from "./Page";
import EndPage from "./EndPage";
import HTMLFlipBook from "react-pageflip";
import one from '../../../logo/Creating a Cyber Secure Home/1.png'
import two from '../../../logo/Creating a Cyber Secure Home/2.png'
import three from '../../../logo/Creating a Cyber Secure Home/3.png'
import four from '../../../logo/Creating a Cyber Secure Home/4.png'
import five from '../../../logo/Creating a Cyber Secure Home/5.png'
import six from '../../../logo/Creating a Cyber Secure Home/6.png'
import seven from '../../../logo/Creating a Cyber Secure Home/7.png'

const FlipPage = (props) => {
  const bookStyle = {
    backgroundColor: "white",
    margin: "auto",
    marginTop: "170px",
    boxSizing: "content-box",
    WebkitFilter: "drop-shadow(3px 2px 3px  rgb(120 196 217))",
    borderRadius:"10%"
    
  };

  return (
    <HTMLFlipBook width={500} height={700} maxShadowOpacity={1} showCover={false} mobileScrollSupport={true} style={bookStyle}>
      <Page  number='1'photo={one} />
      <Page  number='2'photo={two} />
      <Page  number='3'photo={three} />
      <Page  number='4'photo={four} />
      <Page  number='5'photo={five} />
      <Page  number='6'photo={six} />
      <Page  number='7'photo={seven} />
      <EndPage handleToggle={props.handleToggle} number="8"/>
    
    </HTMLFlipBook>
  );
};

export default FlipPage;
