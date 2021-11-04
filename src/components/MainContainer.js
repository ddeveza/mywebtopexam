import React from 'react'

import { useEffect } from "react";


import Tile from '../components/Tile'
import LoginForm from '../components/LoginForm'

import SignOut from '../components/SignOut'
import {Button ,Container, Grid} from '@material-ui/core'
import logo from '../logo/Assets/BeCloudSafe Logo Cropped.png';
import {useIsAuthenticated} from '@azure/msal-react'
import MainContainerLogic from './action/MainContainerLogic';

import './Tile.css';

import Swal from 'sweetalert2'

function MainContainer() {

  //Custom hooks
  const { isAuthenticated,
          user,
          currentScore,
          numOfGlbalAccts,
          percentMFA,
          numOfBreachEmail,
          numOfDormantAccount} = MainContainerLogic();
  
  

  useEffect(() => {
   if(isAuthenticated)
      Swal.fire(
        'Welcome to BeCloudSafe!',
        'a product by mywebtop',
        'success'
      )
    
  }, [])

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
                                      
                                      title={'Number of Breached ,Email Account'} 
                                      boolHipb = {true}/>}

               
                  
                </Grid>
                <Grid item  xs={4}  sm={4}  m={4}>
                  {true && <Tile 
                                    count={currentScore} 
                                    percentSign = {true}
                                    title={'Microsoft,Secure Score'} 
                                    boolHipb = {false} />}
                
                  
                </Grid>
                <Grid item xs={4}  sm={4}  m={4}>
                  {true && <Tile count={numOfBreachEmail} 
                                       
                                       title={'Number of Breached,Phone Numbers'} 
                                       boolHipb = {true}/>}

                  
                  
                </Grid>
                <Grid item xs={4}  sm={4}  m={4}>
                  {true && <Tile count={numOfGlbalAccts} 
                                 title={'Number of Global,Administrator Accounts'} 
                                 boolHipb = {false}/>}

                  
                  
                </Grid>
                <Grid item xs={4}  sm={4}  m={4}>
                  {true && <Tile  
                                       count={numOfDormantAccount} 
                                       title={'Number of Dormants Account'} 
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
