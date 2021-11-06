
import { useState,useEffect,useLayoutEffect } from 'react'

import { useDispatch } from 'react-redux';
import { setBreachEmailData } from '../../features/breachedemail';
import { setMFA } from '../../features/mfa';
import { setMSSecureScore } from '../../features/mssecurescore';
import { setGlobalAdminAcct} from '../../features/globaladminacct'
import { setDormant } from '../../features/dormant';


//API request functions
import {getUserProfile, 
    getAllUsers,
    countBreachEmail,
    getSecurityAPI,
    getDormantAcct } from '../../graph';
//End of API request functions

const MainContainerLogic = (isAuthenticated) => {
   
   const dispatch = useDispatch();
    const [user, setUser] = useState("");
    const [currentScore, setCurrentScore] = useState(0);
    const [numOfGlbalAccts, setNumOfGlbalAccts] = useState(0);
    const [percentMFA, setPercentMFA] = useState(0);
    const [numOfBreachEmail,setNumOfBreachEmail] = useState(0);
    const [numOfDormantAccount, setNumOfDormantAccount] = useState(0);
    
useLayoutEffect(()=>{
    if (isAuthenticated){
        
        getUserProfile()
         .then(async res=>setUser(res.displayName))
         .catch(err => console.log('Unable to get the User Profile'));
   
       getAllUsers()
         .then(async res=>{
   
            countBreachEmail(res.value)
                .then(response=>{
                    //console.log(response);

                    let data = {
                        value:response.length,
                        emails:[response]
                    }

                    dispatch(setBreachEmailData(data));

                    setNumOfBreachEmail(response.length)

                })})
                .catch(err=>console.log('Unable to count breach email'))

         .catch(err => console.log('Unable to get the list of users'));
     
   
       
   
    
       getSecurityAPI().then(async (res)=>{
    
         const {count : numGlobalAcct} = await res[0];
         const {scoreInPercentage : percentAcctMFA} = await res[1];
         
         let dataMFA = {
             value: `${Math.trunc(percentAcctMFA)}%`,
             securityControl:res[1].controlName,
             description:res[1].description ,
             status:`You have ${res[1].count} out of ${res[1].total} users registered and protected with MFA`
         }
         let dataMSSecureScore = {
                value: `${Math.trunc(res.MSSecureScore)}%`,
                securityControl:res[0].controlName,
                description:res[0].description ,
                status:`You currently have ${res[0].count} golbal admins`
         }
         let dataGlobalAdminAcct = {
                value: numGlobalAcct,
                securityControl:res[0].controlName,
                description:res[0].description ,
                status:`You currently have ${numGlobalAcct} golbal admins`
         }



         dispatch(setMFA(dataMFA));
         dispatch(setMSSecureScore(dataMSSecureScore));
         dispatch(setGlobalAdminAcct(dataGlobalAdminAcct));

         
         setNumOfGlbalAccts(numGlobalAcct)
         setCurrentScore(Math.trunc(await res.MSSecureScore))
         setPercentMFA(Math.trunc(percentAcctMFA))    
             
       });
   
        getDormantAcct().then(async res=>{
            
            //let newData = res.map(eachData=>{eachData.displayName,eachData.noOfDaysFromLastSignIn,eachData.signInActivity.lastSignInDateTime})
            const newData = res.map(data => {
                let daysLastSignIn = data.noOfDaysFromLastSignIn;
                let mail = data.mail;
                let lastSignIn = data.signInActivity.lastSignInDateTime;
                

                return {mail,lastSignIn,daysLastSignIn}
            })
            let dataDormant = {
                value: res.length,
                details:newData,
            }
            dispatch(setDormant(dataDormant));
            setNumOfDormantAccount(res.length)
        
        
        
        });
        
    }
}, [isAuthenticated])   

    return {user,currentScore,numOfGlbalAccts,percentMFA,numOfBreachEmail,numOfDormantAccount};
  
    
}
export default MainContainerLogic
