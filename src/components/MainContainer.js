import React from 'react'
import Papa  from "papaparse";
import { useEffect, useState } from "react";
import {useIsAuthenticated} from '@azure/msal-react'
import axios from "axios";
import Tile from '../components/Tile'
import LoginForm from '../components/LoginForm'
import Optional from '../components/Optional'
import SignOut from '../components/SignOut'
import {Button ,Container, Grid} from '@material-ui/core'
import logo from '../logo/Assets/BeCloudSafe Logo Cropped.png';

//API request functions
import {getUserProfile, 
        getAllUsers,
        countBreachEmail,
        getCurrentScore,
        getSecurityAPI } from '../graph';
//End of API request functions

import delay from 'delay';
import './Tile.css';
import { fakeData } from '../logo/Assets/fakeData';
import Swal from 'sweetalert2'

function MainContainer() {

  const isAuthenticated = useIsAuthenticated();
  const [user, setUser] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const [numOfGlbalAccts, setNumOfGlbalAccts] = useState(0);
  const [percentMFA, setPercentMFA] = useState(0);
  const [numOfBreachEmail,setNumOfBreachEmail] = useState(0);

  if(isAuthenticated) {
   
    getUserProfile()
      .then(async res=>{
         // await console.log('GetUserProfile')
         // await console.log(res);
          return  setUser(res.displayName)
          
        })
      .catch(err => console.log('Unable to get the User Profile'));

    getAllUsers().then(async res=>{
      //await console.log('getAllUsers')
      //await console.log(res);
    })
  

    countBreachEmail(fakeData).then(async res=>{
      //await console.log('BreachEmail')
      //await console.log(res);
      return setNumOfBreachEmail(res[10]); // Get the count of email breach account from 11th element of response
    });

 
    getSecurityAPI().then(async (res)=>{
      const {count : numGlobalAcct} = await res[0];
      const {scoreInPercentage : percentAcctMFA} = await res[1];
      
      
      setNumOfGlbalAccts(numGlobalAcct)
      setCurrentScore(Math.round(await res.MSSecureScore))
      setPercentMFA(Math.round(percentAcctMFA))    
          
    });




    
  
    
  }

  useEffect(() => {
    if(isAuthenticated){
      Swal.fire(
        'Welcome to BeCloudSafe!',
        'a product by mywebtop',
        'success'
      )
    }
  }, [numOfBreachEmail])



    const [parseData, setParseData] = useState([]);
    const [countBreach,setCountBreach]=useState(0);
    const [toggleTile,setToggleTile] = useState(false);
    const [optional, setOptional] = useState(false); 
    const [emailBreach , setEmailBreach] = useState([]);
    
  
    const csvData = (e) => {
      const file = e.target.files[0];
  
      Papa.parse(file, {
        header: false,
        dynamicTyping: true,
        complete: function (results) {
           setParseData([...results.data]);
        }
      });
    };
  
    useEffect( ()=>{
      
      let apiKey = { "hibp-api-key": "bfed6a051ef3436aa3f16e546d7faa45" }; //api key
      
      //loop each dataif has 
      parseData.map(async (data) => {
           
            let url = `/api/v3/breachedaccount/${data["0"]}?truncateResponse=false`;
            //console.log(`${url}`);
         
  
  
              setTimeout(async () => {
  
                      await axios.get(url, { headers: apiKey  })
                      .then(async res=>{
                      
                        const inputEmail = { email : data};
                        const newRes = {...res.data,...inputEmail}
                        
                        setCountBreach(oldCount => oldCount+1); //set count w/ positive output
                        setEmailBreach(oldArray => [...oldArray,newRes]);
  
                        delay(500)
                        
                      })
                      .catch( err => console.log(err))
                
              }, 3000);
                       
                    
            
      });
  
      
     
    },[parseData])
  
    return (
        <>

      {!isAuthenticated ? <LoginForm/> :
      (<>
      <Grid container direction='row'>
          <Grid item xs={4}>
            <img className="webTop" src={logo} alt="Logo" />
          </Grid>
          <Grid item xs={8} container direction='column' justifyContent="flex-end" spacing={2}>
                      <Grid item container justifyContent="flex-end">
                            <Grid item>
                                Welcome  , {user}
                            </Grid>
                            <Grid item>
                                <img  src='' alt="avatar phot"/>
                            </Grid>
                            
                      </Grid>
               <Grid item container  spacing={2} justifyContent="flex-end" direction='row' >
           
                    {/*   <Grid item>
                            <Button variant="contained" component="label" className='scan-button'>
                                <span>Scan</span>
                                <input type="file" onChange={csvData} onClick={()=>setToggleTile(true)} hidden/>
                            </Button>
                      </Grid> */}
                      <Grid item>
                            <Button variant="outlined"  >
                                Home
                                
                            </Button>
                      </Grid>
                      <Grid item>
                            <Button variant="outlined" >
                                Recommendation
                                
                            </Button>
                      </Grid>
                      <Grid item>
                            <SignOut/>
                      </Grid>
        
      
                </Grid>


          </Grid>
         
    </Grid>
      <Container>
        <div className="listOfTiles">
          <Grid  container spacing={8} > 
                
                <Grid item xs={4}  sm={4}  m={6} >
                  {true && <Tile 
                                      count={numOfBreachEmail} 
                                      
                                      title={'Number of Breached , Email Account'} 
                                      boolHipb = {true}/>}

                  {optional&& <Optional 
                                      emailBreach={emailBreach}/>}
                  
                </Grid>
                <Grid item  xs={4}  sm={4}  m={4}>
                  {true && <Tile 
                                    count={currentScore} 
                                    percentSign = {true}
                                    title={'Microsoft, Secure Score'} 
                                    boolHipb = {false} />}
                
                  
                </Grid>
                <Grid item xs={4}  sm={4}  m={4}>
                  {true && <Tile count={numOfBreachEmail} 
                                       
                                       title={'Number of Breached, Phone Numbers'} 
                                       boolHipb = {true}/>}

                  
                  
                </Grid>
                <Grid item xs={4}  sm={4}  m={4}>
                  {true && <Tile count={numOfGlbalAccts} 
                                 title={'Number of Global, Administrator Accounts'} 
                                 boolHipb = {false}/>}

                  
                  
                </Grid>
                <Grid item xs={4}  sm={4}  m={4}>
                  {true && <Tile  
                                       count={0} 
                                       title={'Number of, Dormants Account'} 
                                       boolHipb = {false}/>}

                  
                  
                </Grid>
                <Grid item xs={4}  sm={4}  m={4}>
                  {true && <Tile 
                                       
                                       count={percentMFA}
                                       percentSign = {true}
                                       title={'Percentage of ,Accounts Using MFA'} 
                                       boolHipb = {false}/>}

                  
                  
                </Grid>

          </Grid>
         
        </div>
        </Container></>)}
      
     
  </>
    )
}

export default MainContainer
