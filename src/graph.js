import {graphConfig, msalConfig , loginRequest}  from '../src/authConfig';
import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";

const instance = new PublicClientApplication(msalConfig);
//const accounts = instance.getAllAccounts();
/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */


//Applied harris code


 export async function getUsers(accessToken) {
 

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  
  const options = {
    
    headers: headers,
  };

  return axios.get(graphConfig.users, options)
    .then((response) => response)
    .catch((error) => console.log(error));
}



export async function __checkBreach  (value)  {
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

// end of harris code


export async function getUserProfile() {
    
  const accounts =  await instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token =  await instance.acquireTokenSilent(requestMsal);

    
    if (token) {
      const headers = {
        Authorization: `Bearer ${token.accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      };
  
      const options = {
        headers: headers
      };
  
      return axios
        .get(graphConfig.profile, options)
        .then((res) => {
          //console.log(res.data);
          return res.data;
        })
        .catch(function (error) {
          return { error: error };
        });
    } else {
      return { error: "Something went wrong during API Call" };
    }
  }





 export const getSecurityAPI = async () =>{
  const accounts = await instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token = await instance.acquireTokenSilent(requestMsal);

  
  if (token !== undefined) {
    const headers = {
      Authorization: `Bearer ${token.accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };

    const options = {
      headers: headers
    };
    
    return axios
      .get(graphConfig.numGlobalAdminAcct, options)
      .then(async (res) => {
        
        const controlScores = await res.data.value[0].controlScores.filter(eachData => eachData.controlCategory==='Identity');
        const {currentScore : MSSecureScore} = await (res.data.value[0]);
        
        return {controlScores, MSSecureScore};
        
      })
      .catch(function (error) {
        return { error: error };
      });
  } else {
    return { error: "Something went wrong during API Call" };
  }

 }


 export const getDormantAcct = async () =>{
  const accounts = await instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token = await instance.acquireTokenSilent(requestMsal);

  
  if (token !== undefined) {
    const headers = {
      Authorization: `Bearer ${token.accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };

    const options = {
      headers: headers
    };
    
    return axios
      .get(graphConfig.dormant, options)
      .then(async (res) => {
        
          const account = res.data.value;
          
          const dormantAccount = await account
              .map(eachAccount => {
                let noOfDaysFromLastSignIn = 0;
                let signInData = eachAccount.signInActivity;
                if (signInData !== undefined) {

                      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                      let firstDate = new Date(signInData.lastSignInDateTime);
                      let secondDate = Date.now();
                      noOfDaysFromLastSignIn = Math.round(Math.abs((secondDate - firstDate) / oneDay));
                }
                return ({...eachAccount, noOfDaysFromLastSignIn})})
              .filter(eachAccount => (eachAccount.signInActivity !== undefined && eachAccount.noOfDaysFromLastSignIn >=30))
            
              
              return dormantAccount;
        
      })
      .catch(function (error) {
        return { error: error };
      });
  } else {
    return { error: "Something went wrong during API Call" };
  }

 }