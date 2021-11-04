
import { useState } from 'react'
import { useIsAuthenticated } from "@azure/msal-react";
import { useDispatch } from 'react-redux';
import { setBreachEmailData } from '../../features/breachedemail';


//API request functions
import {getUserProfile, 
    getAllUsers,
    countBreachEmail,
    getSecurityAPI,
    getDormantAcct } from '../../graph';
//End of API request functions

const MainContainerLogic = () => {
   const isAuthenticated = useIsAuthenticated();
   const dispatch = useDispatch();
    const [user, setUser] = useState("");
    const [currentScore, setCurrentScore] = useState(0);
    const [numOfGlbalAccts, setNumOfGlbalAccts] = useState(0);
    const [percentMFA, setPercentMFA] = useState(0);
    const [numOfBreachEmail,setNumOfBreachEmail] = useState(0);
    const [numOfDormantAccount, setNumOfDormantAccount] = useState(0);
    
   

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
                        Title:'Breached Email Accounts',
                        description:`These email addresses are detected as being found on websites that have been breached.
                                     To improve your security, ensure every password you use is unique`,
                        countOfBreachedEmail:response.length,
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
         
         
         setNumOfGlbalAccts(numGlobalAcct)
         setCurrentScore(Math.round(await res.MSSecureScore))
         setPercentMFA(Math.round(percentAcctMFA))    
             
       });
   
        getDormantAcct().then(async res=>setNumOfDormantAccount(res.length));
        return {isAuthenticated,user,currentScore,numOfGlbalAccts,percentMFA,numOfBreachEmail,numOfDormantAccount};
    }

    return false;  
    
}
export default MainContainerLogic
