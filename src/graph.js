import {graphConfig, msalConfig , loginRequest}  from '../src/authConfig';
import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";
const instance = new PublicClientApplication(msalConfig);
//const accounts = instance.getAllAccounts();
/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */




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


  export async function getAllUsers() {
    
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
      let numBreachEmail = '';
      return axios
        .get(graphConfig.users, options)
        .then(async (res) => {
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
 
export function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

 export async function countBreachEmail  (data) {
  const accounts =  await instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token =  await instance.acquireTokenSilent(requestMsal);
  
  const headers = {
    Authorization: `Bearer ${token.accessToken}`,
    "hibp-api-key": "bfed6a051ef3436aa3f16e546d7faa45",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  const options = {
    headers: headers
    
    
  };

  const consolidateApiRequest =   data.map( async (eachData)=>{
    
                                  const apiUrl = `api/v3/breachedaccount/${eachData}?truncateResponse=false`;
                                  
                                  
                                  let data1 = await axios.get(apiUrl,options)
                                                         .then(async res=>await {...res.data, eachData})
                                                         .catch(err=>console.log(`${eachData} has no response`));
                                  await timeout(1500);
                                  return await data1;
                                  
                                  
         
    })

    return axios.all(consolidateApiRequest)
         .then(axios.spread(async (...response)=>{
                  let breachEmails = await response.filter(breachEmail=>breachEmail !== undefined);
                  return await breachEmails;}))
         .catch(err=> console.log('not working axios all'));
    
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
        
        const controlScores = await res.data.value[0].controlScores;
        const {currentScore : MSSecureScore} = await (res.data.value[0]);
        
        const identityOneAdminMFA =await controlScores.filter((eachControlSource, index)=>{
          return (eachControlSource.controlCategory === 'Identity' && (eachControlSource.controlName=== 'OneAdmin' ||eachControlSource.controlName=== 'MFARegistrationV2' ))
        })
        
        return {...identityOneAdminMFA, MSSecureScore};
        
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