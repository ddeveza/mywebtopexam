import React from 'react'
import {Box} from '@material-ui/core'
import BreachEmailBody from './TileBodyComponent/BreachEmailBody';
import BreachPhoneBody from './TileBodyComponent/BreachPhoneBody';
import SecurityAPIBody from './TileBodyComponent/SecurityAPIBody';
import DormantBody from './TileBodyComponent/DormantBody';


const TileBody = ({data}) => {
    

  
    const style = {
        position: 'relative',
        //transform: 'translate(-50%, -50%)',
        
        bgcolor: 'background.paper',
        border: '2px solid red',
        height :'52.5vh',
       // boxShadow: 24,
       
        p: 2,
        
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
        case 'Breached Phone Number' :{
            togglePhoneNum = true;
            break;
        }
        default :{
            toggleSecurityAPi = true;
            break;
        }
    }

     


    return (
        <Box sx={style}>
            
                {toggleBreachEmail&&<BreachEmailBody data={data}/>}
                {togglePhoneNum&&<BreachPhoneBody   data={data}/>}
                {toggleSecurityAPi&&<SecurityAPIBody data={data}/>}
                {toggleDormant&&<DormantBody data={data}/>}
           
            
            
        </Box>
           
       
    )
}

export default TileBody
