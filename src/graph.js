import {graphConfig, msalConfig , loginRequest}  from '../src/authConfig';
import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";
import axiosRetry from 'axios-retry';
import {fakeData} from '../src/logo/Assets/fakeData'
const instance = new PublicClientApplication(msalConfig);
//const accounts = instance.getAllAccounts();
/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
axiosRetry(axios,{
    retries:5,
    retryDelay:(retryCount) => retryCount * 1500
})


export async function getUserProfile() {
    
    const accounts = await instance.getAllAccounts();
    const requestMsal = { ...loginRequest, account: accounts[0] };
    const token = await instance.acquireTokenSilent(requestMsal);

    
    if (true) {
      const headers = {
        Authorization: `Bearer ${token.accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      };
  
      const options = {
        headers: headers
      };
  
      return axios
        .get(graphConfig.testingDennis, options)
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

    
    if (true) {
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
        .then((res) => {
          console.log(res.data);
          numBreachEmail =   countBreachEmail(fakeData);

          console.log(numBreachEmail);
          return res;
        })
        .catch(function (error) {
          return { error: error };
        });
    } else {
      return { error: "Something went wrong during API Call" };
    }
  }

 export const countBreachEmail = (data) =>{
    let apiKey = { "hibp-api-key": "bfed6a051ef3436aa3f16e546d7faa45",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"

                    }; //api key
  const consolidateApiRequest =   data.map(async (eachData, index)=>{
   
   
        
        const apiUrl = `api/v3/breachedaccount/${eachData}?truncateResponse=false`;
         
        const getEachApi = axios.get(apiUrl,{ headers: apiKey  }).catch(err=>console.log(`${eachData} has no response` ));
       
        return (getEachApi);
         
    })

    //console.log(consolidateApiRequest);
    let count ="";
    axios.all(consolidateApiRequest).then(axios.spread(async (...response)=>{
       
      count  =  response.filter((eachData)=> eachData).length;
      console.log(count);
        return await count;
    })).catch(err=> {
        
        return console.log('not working axios all')
    });
    
 }