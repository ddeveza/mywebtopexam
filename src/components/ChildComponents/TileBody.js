import React  from 'react'
import {Box, Grid} from '@material-ui/core'
import BreachEmailBody from './TileBodyComponent/BreachEmailBody';
import BreachPhoneBody from './TileBodyComponent/BreachPhoneBody';
import SecurityAPIBody from './TileBodyComponent/SecurityAPIBody';
import DormantBody from './TileBodyComponent/DormantBody';
import { useEffect, useRef,useState } from 'react'


const TileBody = ({data}) => {
    

  
    const style = {
        position: 'relative',
        height:'370px',
        bgcolor: 'background.paper',
      };

  
    const [toggleBreachEmail, setToggleBreachEmail] = useState(false)
    const [toggleDormant, setToggleDormant] = useState(false)
    const [togglePhoneNum, setTogglePhoneNum] = useState(false)
    const [toggleSecurityAPi, setToggleSecurityAPi] = useState(false)
 

    const  _isMounted = useRef(false);

useEffect(() => {
    _isMounted.current = true;
    return () => {
        _isMounted.current = false;
    }
}, [])

useEffect(() => {
    if (_isMounted){
        switch(data.Title) {
            case 'Breached Email Accounts' :{
                setToggleBreachEmail(true) ;
               
                break;
            }
            case 'NUMBER OF DORMANT ACCOUNTS' :{
                setToggleDormant(true);
                break;
            }
            case 'Breached Phone Numbers' :{
                setTogglePhoneNum(true);
                break;
            }
           
            default :{
                setToggleSecurityAPi(true);
                break;
            }
        }

    }
   
}, [data.Title])
   

   

   

     


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
