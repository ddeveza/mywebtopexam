import React from 'react'
import {useMsal} from '@azure/msal-react'
import './Tile.css'
import {Button } from '@material-ui/core'
import { baseURL } from "../utility/reusableFunctions";

function SignOut() {
    const {instance} = useMsal();
    
   const signOutClickHandler= async (instance) => {
        const accounts = await  instance.getAllAccounts()[0].homeAccountId;

        const logoutRequest = {
            account: instance.getAccountByHomeId(accounts),
            postLogoutRedirectUri:`${baseURL}`
        }
        instance.logoutRedirect(logoutRequest);
    }
    

    return (
        <Button variant="contained" component="label"  onClick={()=>signOutClickHandler(instance)}>
                                <span>Log Out</span>
                                
        </Button>
    )
}

export default SignOut
