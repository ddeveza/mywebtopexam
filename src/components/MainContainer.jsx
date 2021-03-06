/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import Tile from "./Tile";
import LoginForm from "./LoginForm";
import SignOut from "./SignOut";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import logo from "../logo/Assets/BeCloudSafe Logo Cropped.png";
import MainContainerLogic from "./action/MainContainerLogic";
import { useIsAuthenticated } from "@azure/msal-react";
import { makeStyles } from "@material-ui/core";
import WelcomeScreen from "./ChildComponents/WelcomeScreen";
import { _backend } from "../utility/api";
import { addDays, daysRemaining } from "../utility/reusableFunctions";
import Swal from "sweetalert2";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getUserPhoto, getUserAvatar, blobToBase64, imgPlaceHolder, getUserProfile, getUserTenant } from "../graph";
import { Modal, Button as ButtonX, Form } from "react-bootstrap";
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
  const [profile, setProfile] = useState();
  const [tenant, setTenant] = useState();
  const [keyModal, setKeyModal] = useState(false);
  const [enteredKey, setEnteredKey] = useState("");
  const [keyDaysLeft, setKeyDaysLeft] = useState("");

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current && isAuthenticated) {
      console.log("starting up...");
      __getFullUserProfile();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isMounted.current && profile) {
      __processUserTenancy();
    }
  }, [profile]);

  useEffect(() => {
    if (isMounted.current && tenant) {
      if (!profile.wsDone && tenant.license_key) {
        setWsOpen(true);
      }
    }
  }, [tenant]);

  useEffect(() => {
    if (isMounted.current && profile && wsDone === true) {
      __wsDone();
    }
  }, [profile, wsDone]);

  //Get Full profile of User
  const __getFullUserProfile = async () => {
    const userProfile = await getUserProfile();
    if (userProfile?.error) {
      console.log("Error getting profile");
    } else {
      const photoBlob = await getUserPhoto();
      if (photoBlob && !photoBlob?.error) {
        const photo = await blobToBase64(photoBlob);
        userProfile.photo = photo;
      } else {
        console.log("No user photo");
        const name = userProfile.displayName ? userProfile.displayName : userProfile.userPrincipalName;
        const result = await getUserAvatar(name);
        if (result?.error) {
          userProfile.photo = imgPlaceHolder;
        } else {
          const photo = await blobToBase64(result);
          userProfile.photo = photo;
        }
      }
      const existingUser = await _backend.get("User", userProfile.id);
      if (existingUser?.error) {
        console.log("Error calling backend API", existingUser);
      } else {
        if (!existingUser) {
          const userCreate = await _backend.create("User", userProfile);
          setProfile(userCreate);
          console.log("User created");
        } else {
          setProfile(existingUser);
          await _backend.update("User", userProfile.id, userProfile);
          console.log("User updated");
        }
      }
    }
  };
  //End of getting UserPhoto

  //Process user records and tenancy
  const __processUserTenancy = async () => {
    const msTenant = await getUserTenant();
    if (!msTenant || msTenant?.error || msTenant?.value?.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "We cannot query your Organization's information (Tenant). Please contact us or your administrator.",
        footer: '<a href="">Contact Us</a>',
      });
    } else {
      const tenantData = msTenant?.value[0];
      if (tenantData) {
        const existingTenant = await _backend.get("Tenant", profile.tenantid);
        if (!existingTenant) {
          const createTenantResult = await _backend.create("Tenant", tenantData);
          console.log("Tenant created");
          setTenant(createTenantResult);
        } else {
          existingTenant.keyValid = existingTenant.license_key ? __validateKey(existingTenant.key_expiration, existingTenant.license_key) : false;
          setTenant(existingTenant);
          await _backend.update("Tenant", profile.tenantid, tenantData);
          console.log("Tenant updated");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "We cannot query your Organization's information (Tenant). Please contact us or your administrator.",
          footer: '<a href="">Contact Us</a>',
        });
      }
    }
  };
  //End of tenancy

  ///BeCloud Safe Data Fetching
  const { currentScore, numOfGlbalAccts, percentMFA, mailBreaches, numOfDormantAccount, phoneBreaches, inProgress } = MainContainerLogic(isAuthenticated, tenant, profile);

  const __welcomeModal = async () => {
    Swal.fire("Welcome to BeCloudSafe!", "a product by mywebtop", "success");
  };

  useEffect(() => {
    if (isMounted && !inProgress && !wsOpen && wsDone && !Swal.isVisible()) {
      __welcomeModal();
    }
  }, [wsOpen, wsDone, inProgress]);

  const __wsDone = async () => {
    await _backend.update("User", profile?.id, { wsDone: 1 });
  };

  const __initKey = async () => {
    const existingKey = await _backend.get("License", enteredKey);
    console.log(existingKey);
    if (!existingKey || existingKey.error || existingKey.duration_days <= 0) {
      console.log("Invalid key");
      Swal.fire({
        icon: "error",
        title: "Invalid Key!",
        text: "Make sure you entered the key correctly. If you think this is a mistake, contact us!",
        footer: '<a href="">Contact Us</a>',
      });
    } else {
      await _backend.update("Tenant", profile.tenantid, { license_key: enteredKey, key_expiration: addDays(existingKey.duration_days) });
      await _backend.update("License", existingKey.id, { isUsed: 1 });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your key has been validated",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    setEnteredKey("");
    setKeyModal(false);
  };

  const __validateKey = (key_expiration, license_key) => {
    let daysLeft = null;
    if (license_key && key_expiration) {
      daysLeft = daysRemaining(key_expiration);
      console.log("Days Left: ", daysLeft);
      if (daysLeft < 0) {
        setKeyDaysLeft("Expired key");
      } else {
        if (daysLeft > 36500) {
          setKeyDaysLeft("Lifetime");
        } else {
          setKeyDaysLeft(`${daysLeft} days left`);
        }
      }
    }
    return daysLeft && daysLeft >= 0;
  };

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
                      , {profile?.displayName ?? "User"}
                      {tenant?.displayName && (
                        <>
                          <br />
                          <small style={{ fontSize: "0.8em", marginLeft: "1em" }}>
                            {tenant?.displayName} {keyDaysLeft && `(${keyDaysLeft})`}
                          </small>
                        </>
                      )}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <img src={profile?.photo ?? imgPlaceHolder} className={classes.userAvatar} alt="avatar" />
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
            {tenant?.keyValid ? (
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
            ) : (
              <>
                {tenant ? (
                  <center className="mt-5">
                    <div>
                      <div className="mb-3">
                        Your company <b>{tenant?.displayName}</b> has no license key for BeCloudSafe
                      </div>
                      <div>
                        <ButtonX variant="primary" onClick={() => window.open("https://buy.stripe.com/test_dR6dTQfoz7TPfKM9AA", "_blank")}>
                          I don't have a key
                        </ButtonX>
                        <ButtonX variant="success" style={{ marginLeft: "1em" }} onClick={() => setKeyModal(true)}>
                          Enter Key
                        </ButtonX>
                      </div>
                    </div>
                  </center>
                ) : (
                  <center className="mt-5">Processing your tenancy...</center>
                )}
              </>
            )}
          </Router>
        </>
      )}
      {/* Welcome Screen */}
      <WelcomeScreen setWsOpen={setWsOpen} wsOpen={wsOpen} setWsDone={setWsDone} />
      {/* Licensing Modal */}
      <Modal
        show={keyModal}
        onHide={() => {
          setKeyModal(false);
          setEnteredKey("");
        }}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter License Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">The license key was sent to the email used in purchasing.</div>
          <Form.Group controlId="license.key">
            <Form.Control type="text" placeholder="Enter license key..." value={enteredKey} onChange={(e) => setEnteredKey(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <ButtonX
            variant="danger"
            onClick={() => {
              setKeyModal(false);
              setEnteredKey("");
            }}
          >
            Close
          </ButtonX>
          <ButtonX variant="success" onClick={__initKey} disabled={enteredKey.length < 10}>
            Validate
          </ButtonX>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MainContainer;
