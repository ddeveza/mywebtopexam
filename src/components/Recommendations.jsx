import React from "react";
import TileRecommend from "../components/TileRecommend";
import { Grid } from "@material-ui/core";
import home from "../logo/Assets/icons8-home.png";
import learnMore from "../logo/Assets/icons8-learn_more.png";
import password from "../logo/Assets/icons8-password.png";
import otp from "../logo/Assets/icons8-one_time_password.png";
import multipleDevices from "../logo/Assets/icons8-multiple_devices.png";
import cloudFirewall from "../logo/Assets/icons8-cloud_firewall.png";

const Recommendations = () => {
  return (
    <>
      <Grid item>
        <TileRecommend id="tile1" title="CREATE A CYBER SECURE HOME" photo={home} />
      </Grid>
      <Grid item>
        <TileRecommend id="tile2" title="BECOME CYBER AWARE" photo={learnMore} />
      </Grid>
      <Grid item>
        <TileRecommend id="tile3" title="SECURE YOUR PASSWORDS WITH A PASSWORD MANAGER" photo={password} />
      </Grid>
      <Grid item>
        <TileRecommend id="tile4" title="IMPLEMENT MULTI FACTOR AUTHENTICATION AT WORK AND ON YOUR PERSONAL ACCOUNTS" photo={otp} />
      </Grid>
      <Grid item>
        <TileRecommend id="tile5" title="ENSURE YOUR DEVICES HAVE THE LATEST SECURITY UPDATES" photo={multipleDevices} />
      </Grid>
      <Grid item>
        <TileRecommend id="tile6" title="IMPLEMENT A CLOUD SECURITY GATEWAY" photo={cloudFirewall} />
      </Grid>
    </>
  );
};

export default Recommendations;
