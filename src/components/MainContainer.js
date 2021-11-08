import React from 'react'
import Tile from '../components/Tile'
import LoginForm from '../components/LoginForm'

import SignOut from '../components/SignOut'
import {Button ,Container, Grid, Typography} from '@material-ui/core'
import logo from '../logo/Assets/BeCloudSafe Logo Cropped.png';
import avatar from '../logo/Avatar.png'
import MainContainerLogic from './action/MainContainerLogic';
import { useIsAuthenticated } from "@azure/msal-react";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  container:{
    maxWidth:'80%',
    paddingTop:'150px',
   
  },
  MyWebTopLogo:{
    maxWidth:'80%',
    maxHeight: '80%'
  },

  headerMenu:{
    padding:'15px 50px 0px 50px'
  },
  userName:{
    fontFamily:'Lato, sans-serif',
    fontSize:'1.2rem',
    color:'rgb(100 101 101)',
    letterSpacing:'1px'
   
    
    
  },
  userAvatar:{
    width:'5vw',
    height:'10vh',
    borderRadius:'60%'
  }

})






function MainContainer() {
  const classes = useStyles();
  const isAuthenticated = useIsAuthenticated();
  
  //Custom hooks
  const { 
          user,
          currentScore,
          numOfGlbalAccts,
          percentMFA,
          numOfBreachEmail,
          numOfDormantAccount} = MainContainerLogic(isAuthenticated);
  
  
 

    return (
        <>

      {!isAuthenticated ? <LoginForm/> :
      (<>
      <Grid container direction='row' className={classes.headerMenu}>
          <Grid item xs={4}>
            <img className={classes.MyWebTopLogo} src={logo} alt="Logo" />
          </Grid>
          <Grid item xs={8} container direction='column' justifyContent="flex-end" spacing={2}>
                      <Grid item container justifyContent="flex-end" alignItems="center">
                            <Grid item>
                               <Typography className={classes.userName}> Welcome  , {user} </Typography>
                            </Grid>
                            <Grid item>
                                <img  src={avatar} alt="avatar photo" className={classes.userAvatar}/>
                            </Grid>
                            
                      </Grid>
               <Grid item container  spacing={2} justifyContent="flex-end" direction='row' >
           
               
                      <Grid item>
                            <Button variant="contained" color="primary" >
                                Home
                                
                            </Button>
                      </Grid>
                      <Grid item>
                            <Button variant="contained" color="primary" >
                                Recommendation
                                
                            </Button>
                      </Grid>
                      <Grid item>
                            <SignOut/>
                      </Grid>
        
      
                </Grid>


          </Grid>
         
    </Grid>
      <Container className={classes.container}>
        
          <Grid  container spacing={8} > 
                
                <Grid item xs={6}  sm={4}  m={6} >
                  {true && <Tile 
                                      count={numOfBreachEmail} 
                                      
                                      title={'Number of Breached ,Email Account'} 
                                      boolHipb = {true}/>}

               
                  
                </Grid>
                <Grid item  xs={6}  sm={4}  m={6}>
                  {true && <Tile 
                                    count={currentScore} 
                                    percentSign = {true}
                                    title={'Microsoft,Secure Score'} 
                                    boolHipb = {false} />}
                
                  
                </Grid>
                <Grid item xs={6}  sm={4}  m={6}>
                  {true && <Tile count={numOfBreachEmail} 
                                       
                                       title={'Number of Breached,Phone Numbers'} 
                                       boolHipb = {true}/>}

                  
                  
                </Grid>
                <Grid item xs={6}  sm={4}  m={6}>
                  {true && <Tile count={numOfGlbalAccts} 
                                 title={'Number of Global,Administrator Accounts'} 
                                 boolHipb = {false}/>}

                  
                  
                </Grid>
                <Grid item xs={6}  sm={4}  m={6}>
                  {true && <Tile  
                                       count={numOfDormantAccount} 
                                       title={'Number of,Dormants Account'} 
                                       boolHipb = {false}/>}

                  
                  
                </Grid>
                <Grid item xs={6}  sm={4}  m={6}>
                  {true && <Tile 
                                       
                                       count={percentMFA}
                                       percentSign = {true}
                                       title={'Percentage of ,Accounts Using MFA'} 
                                       boolHipb = {false}/>}

                  
                  
                </Grid>

          </Grid>
         
        
        </Container></>)}
      
     
  </>
    )
}

export default MainContainer
