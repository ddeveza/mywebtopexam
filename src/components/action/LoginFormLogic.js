import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

const LoginFormLogic = () => {
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


    return __handleMsLogin;
}

export default LoginFormLogic
  