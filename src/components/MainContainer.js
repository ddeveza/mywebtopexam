import React from 'react'
import Papa, { parse } from "papaparse";
import { useEffect, useState } from "react";
import axios from "axios";
import Tile from '../components/Tile'
import Optional from '../components/Optional'
import {Button ,Container, Grid} from '@material-ui/core'
import logo from '../logo/Assets/BeCloudSafe Logo Cropped.png';
import delay from 'delay';
import './Tile.css';

function MainContainer({user}) {



  console.log(user);


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
           
                      <Grid item>
                            <Button variant="contained" component="label" className='scan-button'>
                                <span>Scan</span>
                                <input type="file" onChange={csvData} onClick={()=>setToggleTile(true)} hidden/>
                            </Button>
                      </Grid>
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
                            <Button variant="contained" component="label" className='scan-button'>
                                <span>Log Out</span>
                                
                            </Button>
                      </Grid>
        
      
                </Grid>


          </Grid>
         
    </Grid>
      <Container>
        <div className="listOfTiles">
          <Grid  container spacing={8} > 
                
                <Grid item xs={4}  sm={4}  m={6} >
                  {toggleTile && <Tile 
                                      count={countBreach} 
                                      
                                      title={'Number of Breached , Email Account'} 
                                      boolHipb = {true}/>}

                  {optional&& <Optional 
                                      emailBreach={emailBreach}/>}
                  
                </Grid>
                <Grid item  xs={4}  sm={4}  m={4}>
                  {toggleTile && <Tile 
                                    count={countBreach} 
                                    percentSign = {true}
                                    title={'Microsoft, Secure Score'} 
                                    boolHipb = {false} />}
                
                  
                </Grid>
                <Grid item xs={4}  sm={4}  m={4}>
                  {toggleTile && <Tile count={countBreach} 
                                       
                                       title={'Number of Breach, Phone Numbers'} 
                                       boolHipb = {true}/>}

                  
                  
                </Grid>
                <Grid item xs={4}  sm={4}  m={4}>
                  {toggleTile && <Tile count={countBreach} 
                                       
                                       title={'Number of Global, Administrator Accounts'} 
                                       boolHipb = {false}/>}

                  
                  
                </Grid>
                <Grid item xs={4}  sm={4}  m={4}>
                  {toggleTile && <Tile  
                                       count={countBreach} 
                                       title={'Number of, Dormants Account'} 
                                       boolHipb = {false}/>}

                  
                  
                </Grid>
                <Grid item xs={4}  sm={4}  m={4}>
                  {toggleTile && <Tile 
                                       
                                       count={countBreach}
                                       percentSign = {true}
                                       title={'Percentage of ,Accounts Using MFA'} 
                                       boolHipb = {false}/>}

                  
                  
                </Grid>

          </Grid>
         
        </div>
        </Container>
      
     
  </>
    )
}

export default MainContainer
