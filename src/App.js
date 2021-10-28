
import LoginForm from "./components/LoginForm";
import MainContainer from "./components/MainContainer";


import { useIsAuthenticated } from "@azure/msal-react";
import {useEffect,useState} from 'react'
import {getUserProfile} from './graph'



function App() {
  
 const isMsAuth = useIsAuthenticated();
 const [Name, setName] = useState("")
const getName = async () => {
  //console.log('Im Here')
  const {displayName} = await getUserProfile()
  return displayName;
}

 if (isMsAuth) {


    
 getName().then(res => {
    setName(res);
   
 });
 
    
   
    //console.log(account);
 }

 
 
  

 
  return (
    
   
     <div>
      
       {!isMsAuth ?  <LoginForm/> :  <MainContainer user={Name}/> }
      
     </div>
     
  
  )
}

export default App;
