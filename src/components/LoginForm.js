import React from 'react'
import {Image } from 'react-bootstrap';
import Logo from '../logo/Assets/BeCloudSafe Logo Cropped.png'
import MSButton from '../logo/Assets/images/ms-signin_light.png'
import './LoginForm.css';
import {Paper , Button} from '@material-ui/core'

import { useMsal } from "@azure/msal-react";
import { loginRequest, graphConfig } from "../authConfig";
import { useIsAuthenticated } from "@azure/msal-react";

function LoginForm() {
    const { instance } = useMsal();
   
    const isMsAuth = useIsAuthenticated();
  
    const __handleMsLogin = async (loginType) => {
        if (loginType === "popup") {
            localStorage.clear();
          await instance
            .loginPopup(loginRequest)
            .then((response) => {
              localStorage.clear();
              localStorage.setItem("account", JSON.stringify(response));
              //__doMsAuthProcess();
            })
            .catch((e) => {
              const error = JSON.stringify(e);
              if (error.indexOf("AADSTS65004") > -1) {
               // __consentDeclined();
              } else if (error.indexOf("AADSTS65001") > -1) {
               // __consentNotGranted();
              } else {
              }
            });
     
        } 
      };
    
    return (
        <div className="loginFormContainer">
            <Paper elevation={6} variant="outlined" square>
                <div id="LoginForm">
                        <Image src={Logo} fluid />
                    <div className="signInWithMicrosoft">
                        <Button onClick={()=>__handleMsLogin("popup")} >
                            <Image src={MSButton} />
                        </Button>
                    </div>
                </div>
            </Paper> 
            
        </div>
    );
}

export default LoginForm
