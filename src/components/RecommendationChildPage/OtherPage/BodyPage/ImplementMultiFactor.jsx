import React from "react";
import { Box, Typography } from "@material-ui/core";
import ms365 from "../../../../logo/Assets/Implement MFA/Microsoft_365_logo.png";
import meta from "../../../../logo/Assets/Implement MFA/Facebook-meta-logo.png";
import ebay from "../../../../logo/Assets/Implement MFA/ebay.png";
import linkedin from "../../../../logo/Assets/Implement MFA/linkedin-app.png";
import twitter from "../../../../logo/Assets/Implement MFA/Twitter IOS Icon.png";
import xero from "../../../../logo/Assets/Implement MFA/xero-1-logo-png-transparent.png";

const ImplementMultiFactor = () => {

  const urlMS365 = 'https://docs.microsoft.com/en-us/microsoft-365/admin/security-and-compliance/set-up-multi-factor-authentication?view=o365-worldwide'
  const urlMeta = 'https://www.facebook.com/help/148233965247823'
  const urlEbay = 'https://community.ebay.com/t5/Announcements/eBay-launches-a-new-2-step-verification-method-to-increase/ba-p/29818464'
  const urlLinkedIn = 'https://www.linkedin.com/help/linkedin/answer/544/turn-two-step-verification-on-and-off?lang=en'
  const urlTwitter = 'https://help.twitter.com/en/managing-your-account/two-factor-authentication'
  const urlXero = 'https://central.xero.com/s/article/Set-up-multi-factor-authentication'

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "0 190px 0 190px", color: "rgb(100 101 101)", marginTop: "40px" }}>
      <Box sx={{ marginBottom: "30px" }}>
        <Typography style={{ marginBottom: "15px" }}>Implementing Multi-Factor Authentication (MFA) across the applications and services you use both in the workplace and at home is proven to avert 99% of cyber attacks.</Typography>
        <Typography style={{ marginBottom: "30px" }}>Click on the relevant below to find out how to implement MFA accriss these popular services.</Typography>
        <a href={urlMS365}>
          <img src={ms365} style={{ height: "40px", width: "250px" }} alt='MS365'/>
        </a>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", marginTop: "20px", alignItems: "flex-start", justifyContent: "space-between" }}>
        <a href={urlLinkedIn}>
          <img src={linkedin}  alt="linkedin"style={{ height: "45px", width: "45px", cursor: "pointer" }} />
        </a>
        <a href={urlTwitter}>
          <img src={twitter} alt="twitter" style={{ height: "45px", width: "45px", cursor: "pointer" }} />
        </a>
        <a href={urlXero}>
          <img src={xero} alt="xero" style={{ height: "45px", width: "45px", cursor: "pointer" }} />
        </a>
        <a href={urlEbay}>
          <img src={ebay} alt="ebay" style={{ height: "45px", width: "45px", cursor: "pointer" }} />
        </a>
        <a href={urlMeta}>
          <img src={meta} alt="meta" style={{ height: "45px", width: "115px", cursor: "pointer" }} />
        </a>
      </Box>
    </Box>
  );
};

export default ImplementMultiFactor;
