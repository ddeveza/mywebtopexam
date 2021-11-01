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


const getToken =  async () => {
  const accounts =  await instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token =  await instance.acquireTokenSilent(requestMsal);

  return token.idToken;
}

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
    headers: headers,
    'axios-retry':{
      retries:50,
      retryDelay:(retryCount) => {
          console.log(`retry attemp: ${retryCount}` );
          return retryCount * 2000;
        },
      retryCondition: (error) => {
        console.log(error);
        return error.response.status === 503;
      }
    }
    
  };




   /*  let apiKey = { "hibp-api-key": "bfed6a051ef3436aa3f16e546d7faa45",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"

                    }; */
  const consolidateApiRequest =   data.map(async (eachData, index)=>{
    
                                  const apiUrl = `api/v3/breachedaccount/${eachData}?truncateResponse=false`;
                                  await timeout(1000);
                                  const getEachApi = axios.get(apiUrl,options).catch(err=>console.log(`${eachData} has no response` ));
                                  return (getEachApi);
         
    })

    //console.log(consolidateApiRequest);
    
    return axios.all(consolidateApiRequest)
         .then(axios.spread(async (...response)=>{
                    let count =0;
                    count  =   response.filter((eachData)=> eachData).length;
                    return await [...response,count];
        }))
        .catch(err=> {
        
            return console.log('not working axios all')
        });
    
    
 }