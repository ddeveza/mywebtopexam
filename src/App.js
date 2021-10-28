
import LoginForm from "./components/LoginForm";
import MainContainer from "./components/MainContainer";


import { useIsAuthenticated } from "@azure/msal-react";



function App() {


  const isMsAuth = useIsAuthenticated();
 
  return (
    
   
     <div>
       {!isMsAuth ?  <LoginForm/> :  <MainContainer/> }
      
     </div>
     
  
  )
}

export default App;
