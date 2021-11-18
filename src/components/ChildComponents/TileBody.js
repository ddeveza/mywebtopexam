import React from 'react'
import {Box, Grid} from '@material-ui/core'
import BreachEmailBody from './TileBodyComponent/BreachEmailBody';
import BreachPhoneBody from './TileBodyComponent/BreachPhoneBody';
import SecurityAPIBody from './TileBodyComponent/SecurityAPIBody';
import DormantBody from './TileBodyComponent/DormantBody';


const TileBody = ({data}) => {
    

  
    const style = {
        position: 'relative',
        height:'370px',
        bgcolor: 'background.paper',
      };

    let toggleBreachEmail = false ;
    let toggleDormant = false;
    let togglePhoneNum = false;
    let toggleSecurityAPi = false;

    switch(data.Title) {
        case 'Breached Email Accounts' :{
            toggleBreachEmail = true ;
           
           

            break;
        }
        case 'NUMBER OF DORMANT ACCOUNTS' :{
            toggleDormant = true;
            break;
        }
        case 'Breached Phone Numbers' :{
            togglePhoneNum = true;
            break;
        }
       
        default :{
            toggleSecurityAPi = true;
            break;
        }
    }

     


    return (
        <Grid container>
                 <Box sx={style}>
                
                        {toggleBreachEmail&&<BreachEmailBody data={data}/>}
                        {togglePhoneNum&&<BreachPhoneBody   data={data}/>}
                        {toggleSecurityAPi&&<SecurityAPIBody data={data} title={data.Title}/>}
                        {toggleDormant&&<DormantBody data={data}/>}
        
            
            
        </Box>

        </Grid>
           
           
       
    )
}

export default TileBody
