/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import Tile from "../components/Tile";
import LoginForm from "../components/LoginForm";
import SignOut from "../components/SignOut";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import logo from "../logo/Assets/BeCloudSafe Logo Cropped.png";
import MainContainerLogic from "./action/MainContainerLogic";
import { useIsAuthenticated } from "@azure/msal-react";
import { makeStyles } from "@material-ui/core";
import WelcomeScreen from "./ChildComponents/WelcomeScreen";
import Swal from "sweetalert2";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { getUserPhoto, getUserAvatar, blobToBase64, imgPlaceHolder, getUserProfile } from "../graph";
import Recommendations from "./Recommendations";

const useStyles = makeStyles({
  container: {
    maxWidth: "80%",
    paddingTop: "150px",
    display: "grid",
  },

  tileContainer: {
    gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
  },

  MyWebTopLogo: {
    maxWidth: "80%",
    maxHeight: "80%",
  },

  headerMenu: {
    padding: "15px 50px 0px 50px",
  },
  userName: {
    fontFamily: "Lato, sans-serif",
    fontSize: "1.2rem",
    color: "rgb(100 101 101)",
    letterSpacing: "1px",
    paddingRight: "10px",
  },
  userAvatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    //border: "1px solid rgba(42, 129, 163, 1)",
    margin: "1px",
  },
  mainBtn: {
    minWidth: "50%",
    maxWidth: "100%",
    fontFamily: "Arial",
    fontWeight: "700",
    width: "170px",
    color: "rgba(42, 129, 163, 1)",
    padding: "7px",
    border: "1px solid rgba(42, 129, 163, 1)",
  },
});

function MainContainer() {
  const classes = useStyles();
  const isAuthenticated = useIsAuthenticated();
  const isMounted = useRef(false);
  const [wsDone, setWsDone] = useState(false);
  const [wsOpen, setWsOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current && isAuthenticated) {
      console.log("starting up...");
      getPhoto();
      if (!wsDone) {
        if (!localStorage.getItem("wsDone")) {
          setWsOpen(true);
        } else {
          setWsDone(localStorage.getItem("wsDone") ? true : false);
        }
      }
    }
  }, [isAuthenticated]);

  //Get Photo of User
  const getPhoto = async () => {
    let userDetails = await getUserProfile();
    const photoBlob = await getUserPhoto();
    if (photoBlob && !photoBlob?.error) {
      const photo = await blobToBase64(photoBlob);
      setUserPhoto(photo);
    } else {
      console.log("No user photo");
      const name = userDetails.displayName ? userDetails.displayName : userDetails.userPrincipalName;
      const result = await getUserAvatar(name);
      if (result?.error) {
        setUserPhoto(imgPlaceHolder);
      } else {
        const photo = await blobToBase64(result);
        setUserPhoto(photo);
      }
    }
  };
  //End of getting UserPhoto

  ///BeCloud Safe Data Fetching
  const { currentScore, numOfGlbalAccts, percentMFA, mailBreaches, numOfDormantAccount, phoneBreaches, profile, inProgress } = MainContainerLogic(isAuthenticated);

  const __welcomeModal = async () => {
    Swal.fire("Welcome to BeCloudSafe!", "a product by mywebtop", "success");
  };

  useEffect(() => {
    if (isMounted && !inProgress && !wsOpen && wsDone && !Swal.isVisible()) {
      __welcomeModal();
    }
  }, [wsOpen, wsDone, inProgress]);

  return (
    <>
      {!isAuthenticated ? (
        <LoginForm />
      ) : (
        <>
          <Router>
            <Grid container direction="row" className={classes.headerMenu}>
              <Grid item xs={4}>
                <img className={classes.MyWebTopLogo} src={logo} alt="Logo" />
              </Grid>
              <Grid item xs={8} container direction="column" justifyContent="flex-end" spacing={2}>
                <Grid item container justifyContent="flex-end" alignItems="center">
                  <Grid item>
                    <Typography className={classes.userName}>
                      {" "}
                      <span style={{ cursor: "pointer" }} onClick={() => setWsOpen(true)} title="Show welcome screen tutorial">
                        Welcome
                      </span>
                      , {profile}{" "}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <img src={userPhoto} className={classes.userAvatar} alt="avatar" />
                  </Grid>
                </Grid>

                <Grid item container spacing={4} justifyContent="flex-end" direction="row">
                  <Grid item>
                    <Link to="/">
                      <Button className={classes.mainBtn}>Home</Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/recommendations">
                      <Button className={classes.mainBtn}>Recommendations</Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <SignOut />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Switch>
              <Route path="/" exact>
                <Container className={classes.container}>
                  <Grid container justifyContent="space-evenly" alignItems="center" spacing={5} className={classes.tileContainer}>
                    <Grid item>{true && <Tile count={mailBreaches} title={"Number of Breached ,Email Accounts"} boolHipb={true} loading={inProgress} />}</Grid>
                    <Grid item>{true && <Tile count={currentScore} percentSign={true} title={"Microsoft,Secure Score"} boolHipb={false} />}</Grid>
                    <Grid item>{true && <Tile count={phoneBreaches} title={"Number of Breached,Phone Numbers"} boolHipb={true} loading={inProgress} />}</Grid>
                    <Grid item>{true && <Tile count={numOfGlbalAccts} title={"Number of Global,Administrator Accounts"} boolHipb={false} />}</Grid>
                    <Grid item>{true && <Tile count={numOfDormantAccount} title={"Number of,Dormants Account"} boolHipb={false} />}</Grid>
                    <Grid item>{true && <Tile count={percentMFA} percentSign={true} title={"Percentage of ,Accounts Using MFA"} boolHipb={false} />}</Grid>
                  </Grid>
                </Container>
              </Route>
              <Route path="/recommendations" exact>
                <Container className={classes.container}>
                  <Grid container justifyContent="space-evenly" alignItems="center" spacing={5} className={classes.tileContainer}>
                    <Recommendations />
                  </Grid>
                </Container>
              </Route>
            </Switch>
          </Router>
        </>
      )}
      {/* Welcome Screen */}
      <WelcomeScreen setWsOpen={setWsOpen} wsOpen={wsOpen} setWsDone={setWsDone} />
    </>
  );
}

export default MainContainer;
