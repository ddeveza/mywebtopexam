import React from 'react'
import {Image } from 'react-bootstrap';
import Logo from '../logo/Assets/BeCloudSafe Logo Cropped.png'
import MSButton from '../logo/Assets/images/ms-signin_light.png'
import './LoginForm.css';
import {Paper , Button} from '@material-ui/core'

function LoginForm() {
    return (
        <div className="loginFormContainer">
            <Paper elevation={6} variant="outlined" square>
                <div id="LoginForm">
                        <Image src={Logo} fluid />
                    <div className="signInWithMicrosoft">
                        <Button  >
                            <Image src={MSButton} />
                        </Button>
                    </div>
                </div>
            </Paper> 
            
        </div>
    )
}

export default LoginForm
