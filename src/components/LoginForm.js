import React from 'react'
import {Image } from 'react-bootstrap';
import Logo from '../logo/Assets/BeCloudSafe Logo Cropped.png'
import MSButton from '../logo/Assets/ms-symbollockup_signin_dark.png'
import './LoginForm.css';
import {Paper , Button} from '@material-ui/core'

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import {useDispatch} from 'react-redux';
import {isAuth} from "../features/auth"


function LoginForm() {
    const { instance } = useMsal();
    

    
  
    const __handleMsLogin = async (loginType) => {
        if (loginType === "popup") {
           // localStorage.clear();
          await instance
            .loginPopup(loginRequest)
            .then((response) => {
              localStorage.clear();
              localStorage.setItem("account", JSON.stringify(response));
        
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
