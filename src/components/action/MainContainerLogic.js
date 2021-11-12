
import { useState,useEffect,useLayoutEffect } from 'react'

import { useDispatch } from 'react-redux';
import { setBreachEmailData } from '../../features/breachedemail';
import { setMFA } from '../../features/mfa';
import { setMSSecureScore } from '../../features/mssecurescore';
import { setGlobalAdminAcct} from '../../features/globaladminacct'
import { setDormant } from '../../features/dormant';
import Swal from 'sweetalert2'

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
    
/* useLayoutEffect(()=>{
    if (isAuthenticated) {
        getAllUsers()
        .then(async res=>{

        await countBreachEmail(res.value)
            .then(async response=>{
                let data = {value:response.length,emails:[response]}
                dispatch(setBreachEmailData(data));
                await  setNumOfBreachEmail(response.length)
                        })})
            .catch(err=>console.log('Unable to count breach email'))

        .catch(err => console.log('Unable to get the list of users'));
    }
},[isAuthenticated]) */

useEffect(()=>{
    const getAllData = async () =>  { 
     await getUserProfile()
                .then(async res=>await setUser(res.displayName))
                .catch(err => console.log('Unable to get the User Profile'));
        
    await   getAllUsers()
         .then(async res=>{
   
           await countBreachEmail(res.value)
                .then(async response=>{
                    console.log(response);

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
    
         //const {count : numGlobalAcct} = await res[0];
         const controlScores = res.controlScores;

         const {count :numGlobalAcct ,
                controlName : controlNameGlobalAcct,
                description : descriptionGlobalAcct} = await controlScores.filter(data => data.controlCategory === 'Identity' && data.controlName=== 'OneAdmin')[0];

         const {scoreInPercentage : percentAcctMFA,
                controlName :controlNameMFA,
                description:descriptionMFA,
                count: countMFA,
                total:totalMFA} = await controlScores.filter(data => data.controlCategory === 'Identity' && data.controlName=== 'MFARegistrationV2')[0];
         
         let dataMFA = {
             value: `${Math.trunc(percentAcctMFA)}%`,
             securityControl:controlNameMFA,
             description:descriptionMFA ,
             status:`You have ${countMFA} out of ${totalMFA} users registered and protected with MFA`
         }
         let dataMSSecureScore = {
                value: `${Math.trunc(res.MSSecureScore)}%`,
                securityControl:res.controlScores,
                
         }
         let dataGlobalAdminAcct = {
                value: numGlobalAcct,
                securityControl:controlNameGlobalAcct,
                description:descriptionGlobalAcct ,
                status:`You currently have ${numGlobalAcct} golbal admins`
         }



         dispatch(setMFA(dataMFA));
         dispatch(setMSSecureScore(dataMSSecureScore));
         dispatch(setGlobalAdminAcct(dataGlobalAdminAcct));

         
    await     setNumOfGlbalAccts(numGlobalAcct)
    await    setCurrentScore(Math.trunc(res.MSSecureScore))
    await    setPercentMFA(Math.trunc(percentAcctMFA))    
             
       });
   
          getDormantAcct().then(async res=>{
            
            //let newData = res.map(eachData=>{eachData.displayName,eachData.noOfDaysFromLastSignIn,eachData.signInActivity.lastSignInDateTime})
            const newData =await res.map(data => {
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
            await     setNumOfDormantAccount(res.length)
        
        
        
            });

      await      Swal.fire(
                'Welcome to BeCloudSafe!',
                'a product by mywebtop',
                'success'
              )
        }
   
    if (isAuthenticated){
       getAllData();
     

    }
}, [isAuthenticated])   

return {user,currentScore,numOfGlbalAccts,percentMFA,numOfBreachEmail,numOfDormantAccount};

    
}
export default MainContainerLogic
