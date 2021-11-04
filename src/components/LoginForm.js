import React from 'react'
import {Image } from 'react-bootstrap';
import Logo from '../logo/Assets/BeCloudSafe Logo Cropped.png'
import MSButton from '../logo/Assets/ms-symbollockup_signin_dark.png'
import './LoginForm.css';
import {Paper , Button} from '@material-ui/core'

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import LoginFormLogic from './action/LoginFormLogic';


function LoginForm() {

    const __handleMsLogin = LoginFormLogic();
    
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
