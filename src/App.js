
import LoginForm from "./components/LoginForm";
import MainContainer from "./components/MainContainer";


import { useIsAuthenticated } from "@azure/msal-react";
import {useState,useEffect} from 'react'
import {getUserProfile,getAllUsers,countBreachEmail} from './graph'
import {fakeData} from './logo/Assets/fakeData'




function App() {
  
  const isMsAuth = useIsAuthenticated();
   
   const [Name, setName] = useState("")
   const [numOfBreachEmail, setnumOfBreachEmail] = useState(0);
   const getName = async () => {
    //console.log('Im Here')
    const {displayName} = await getUserProfile()
    return displayName;
  }
  


  
  if (isMsAuth){
    getAllUsers()
      getName().then(res => {
        setName(res);
   
 });
}


 
 
    
   
    //console.log(account);
 

 
 
  

 
  return (
    
   
     <div>
      
       {!isMsAuth ?  <LoginForm/> :  <MainContainer user={Name} numOfBreachEmail={numOfBreachEmail}/> }
      
     </div>
     
  
  )
}

export default App;
