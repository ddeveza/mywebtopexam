import React, { useState } from 'react'
import "./Tile.css"
import { Paper , Grid } from '@material-ui/core';
import logo from '../logo/hibp cropped.png'
import {useSelector} from 'react-redux'
import MainChild from './ChildComponents/MainChild';
import {Box,Button,Modal} from '@material-ui/core'

import {setToggle} from '../features/breachedemail';


function Tile({count,clickMe,title,boolHipb,percentSign}) {
    const breachEmailData = useSelector(state=>state.breachEmail.data)
    const msSecureData = useSelector(state=>state.msSecure.data);
    const globalAdminData = useSelector(state=>state.globalAdmin.data)
    const mfaData = useSelector(state=>state.mfa.data)
    const dormantData = useSelector(state=>state.dormant.data)
    const [renderData1, setrenderData1] = useState({})
    let renderData = {};
    
    const [title1,title2] = title.split(',');
    const [toggleChildTile, setToggleChildTile] = useState(false)
    const handleClose = () => setToggleChildTile(false);
    
     switch(title2) {
        case 'Email Account': {
           
            renderData =breachEmailData;
         
           break;
        }
        case 'Secure Score': {
           renderData = msSecureData;
           break;
        }
        case 'Phone Numbers':{
            renderData = breachEmailData;
            break
        }
        case'Administrator Accounts':{
            renderData = globalAdminData;
            break
        }case'Accounts Using MFA':{
            renderData = mfaData;
            break
        }
        default: {
            renderData = dormantData;
           break;
        }
     } 
     
 
    return (
       <>
           
                <Paper onClick={()=>setToggleChildTile(true)}>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Grid item  container  direction='column' justifyContent="center" alignItems="center" space={0}> 
                                <Grid item  >
                                    <span className='breachText' >  {title1} </span>
                                </Grid>
                                <Grid item  >
                                    <span className='breachText' >  {title2} </span>
                                </Grid>
                                
                        </Grid> 
                       
                       
                        <Grid item > 
                            <span className="Count">{count}{percentSign && "%"} </span>
                           
                        </Grid>
                       
                    </Grid>

                    <Grid  container  direction="row"  justifyContent="flex-end"  alignItems="center" spacing={1}>
                           
                            <Grid item  > 
                               <span className='powerBy'>{boolHipb && 'Powered by'}</span>
                            </Grid>

                            <Grid item   >   
                                {boolHipb && <img className='hipb' src={logo} alt="hipb" />}
                           </Grid>
                        
                    </Grid>
                </Paper>


                <Modal
                        open={toggleChildTile}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                  
                         <MainChild data={renderData}/> 
                         
                    
                </Modal>    
        </>
    
    )
}

export default Tile
