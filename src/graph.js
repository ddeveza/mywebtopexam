import {graphConfig, msalConfig , loginRequest}  from '../src/authConfig';
import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";
import {baseURL,baseApiURL} from './utility/reusableFunctions'
import { PromptValue } from '@azure/msal-common';
const instance = new PublicClientApplication(msalConfig);
//const accounts = instance.getAllAccounts();
/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */


const PROXY = 'https://haveibeenpwned.com'

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
      
      return axios
        .get(graphConfig.users, options)
        .then(async (res) => {
          
         
         return res.data;
         
          
        })
        .catch(function (error) {
          return { error: error };
        });
    } else {
      return { error: "Something went wrong during API Call" };
    }
  }
 



async function _hibpQuery (email , name){

  const accounts =  await instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token =  await instance.acquireTokenSilent(requestMsal);
  
  const headers =await {
    Authorization: `Bearer ${token.accessToken}`,
    "hibp-api-key": "bfed6a051ef3436aa3f16e546d7faa45",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Retry-After" :2
    
  };

  const options = await{
    headers: headers,
    
 
    
  };

  

   let promise = new Promise (async (resolve,reject)=>{
    const apiUrl = await `${baseURL}/api/v3/breachedaccount/${email}?truncateResponse=false`;
      setTimeout(async() => {
        await axios.get(apiUrl,options)
        .then(async ({data})=>{
        
        const response = await{data, email,name};
        //console.log(response)
         await resolve( response);
        //return await response;

        
        })
        .catch(err=>console.log(reject(`${email} --> ${err.message}`)));
    
      }, 1000);

     
   });

   return promise;
        
       
       

   
    
}



export async function countBreachEmail  (data) {
  
  const consolidateApiRequest = await  data.map( async ({userPrincipalName,displayName},i)=>{  
    
     return await    _hibpQuery(userPrincipalName,displayName).then(async data => {
        
           // console.log(data);
            return await data;
      }).catch(err=>console.log(err))                            
  
    
    });
    
    return await axios.all(consolidateApiRequest)
         .then(axios.spread(async (...response1)=>{
                 // console.log(...response1);
                  let breachEmails = await response1.filter(breachEmail=>breachEmail !== undefined);
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