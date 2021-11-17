/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import Tile from "../components/Tile";
import LoginForm from "../components/LoginForm";
import SignOut from "../components/SignOut";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import logo from "../logo/Assets/BeCloudSafe Logo Cropped.png";
import avatar from "../logo/Avatar.png";
//import MainContainerLogic from "./action/MainContainerLogic";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { makeStyles } from "@material-ui/core";

import { loginRequest } from "../authConfig";
import { getUsers } from "../graph";

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
  },
  userAvatar: {
    width: "5vw",
    height: "10vh",
    borderRadius: "60%",
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
  const isMounted = useRef(false);
  const classes = useStyles();
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const accountName = accounts[0] && accounts[0].name;
  const [users, setUsers] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const [mailBreaches, setMailBreaches] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [numOfGlobalAccts, setNumOfGlobalAccts] = useState(0);
  const [percentMFA, setPerfecntMFA] = useState(0);
  const [numOfBreachEmails, setNumOfBreachEmails] = useState(0);
  const [numOfDormantAccts, setNumOfDormantAccts] = useState(0);

  //Custom hooks
  //const { user, currentScore, numOfGlbalAccts, percentMFA, numOfBreachEmail, numOfDormantAccount } = MainContainerLogic(isAuthenticated);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      __getAllUsers();
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (users.length > 0) {
        __checkBreaches();
      }
    }
  }, [users]);

  useEffect(() => {
    if (isMounted.current && mailBreaches.length > 0) {
      setNumOfBreachEmails(mailBreaches.filter((data) => data.breached === true).length);
      console.log(mailBreaches);
    }
  }, [mailBreaches]);

  const wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

  const __checkBreaches = async () => {
    setInProgress(true);
    let resultMail = [];
    for (const user of users) {
      if (user.mail) {
        const result = await __checkBreach(user.mail);
        console.log(user.mail, result ? true : false);
        resultMail = [...resultMail, { email: user.mail, breached: result ? true : false, data: result }];
        await wait(1500);
      }
    }
    setMailBreaches(resultMail);
    setInProgress(false);
  };

  const __checkBreach = async (value) => {
    const myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const eUrl = Buffer.from(`https://haveibeenpwned.com/api/v3/breachedaccount/${value}?truncateResponse=false`).toString("base64");

    return fetch(`https://api.ppm.one/hibp/?url=${eUrl}`, requestOptions)
      .then((response) => response.text())
      .then((result) => result)
      .catch((error) => console.log(error));
  };

  const __getAllUsers = async () => {
    console.log("getting users...");
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        getUsers(response.accessToken).then((response) => {
          setUsers(response.value);
        });
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          getUsers(response.accessToken).then((response) => {
            setUsers(response.value);
          });
        });
      });
  };

  return (
    <>
      {!isAuthenticated ? (
        <LoginForm />
      ) : (
        <>
          <Grid container direction="row" className={classes.headerMenu}>
            <Grid item xs={4}>
              <img className={classes.MyWebTopLogo} src={logo} alt="Logo" />
            </Grid>
            <Grid item xs={8} container direction="column" justifyContent="flex-end" spacing={2}>
              <Grid item container justifyContent="flex-end" alignItems="center">
                <Grid item>
                  <Typography className={classes.userName}> Welcome , {accountName} </Typography>
                </Grid>
                <Grid item>
                  <img src={avatar} alt="avatar" className={classes.userAvatar} />
                </Grid>
              </Grid>
              <Grid item container spacing={4} justifyContent="flex-end" direction="row">
                <Grid item>
                  <Button className={classes.mainBtn}>Home</Button>
                </Grid>
                <Grid item>
                  <Button className={classes.mainBtn}>Recommendations</Button>
                </Grid>
                <Grid item>
                  <SignOut />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Container className={classes.container}>
            <Grid container justifyContent="space-evenly" alignItems="center" spacing={5} className={classes.tileContainer}>
              <Grid item>
                {inProgress && `Checking mail breaches...`}
                {true && <Tile count={numOfBreachEmails} title={"Number of Breached ,Email Account"} boolHipb={true} />}
              </Grid>
              {/*
              <Grid item>{true && <Tile count={currentScore} percentSign={true} title={"Microsoft,Secure Score"} boolHipb={false} />}</Grid>
              <Grid item>{true && <Tile count={numOfBreachEmails} title={"Number of Breached,Phone Numbers"} boolHipb={true} />}</Grid>
              <Grid item>{true && <Tile count={numOfGlobalAccts} title={"Number of Global,Administrator Accounts"} boolHipb={false} />}</Grid>
              <Grid item>{true && <Tile count={numOfDormantAccts} title={"Number of,Dormants Account"} boolHipb={false} />}</Grid>
              <Grid item>{true && <Tile count={percentMFA} percentSign={true} title={"Percentage of ,Accounts Using MFA"} boolHipb={false} />}</Grid>
              */}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}

export default MainContainer;
