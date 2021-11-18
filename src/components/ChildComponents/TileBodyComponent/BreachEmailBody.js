import React from 'react'
import {Box, Typography , makeStyles} from '@material-ui/core'
const styles = makeStyles({
    emailStyle:{
        fontSize:'20px'
    }
})
const BreachEmailBody = ({data}) => {
   const {emails} = data;
   const classes = styles();
   const fakeData = ['dennis@mywebtop.au.com', 'admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com',"dennis@mywebtop.au.com", 'admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','dennis@mywebtop.au.com', 'admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com',"dennis@mywebtop.au.com", 'admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com']
   
    return (
       /*  <div>
           {emails[0].map(eachEmail=>{
               console.log(eachEmail.email);
               return (<li>{eachEmail.email}</li>)
           })}
        </div> */

        <Box sx={{display:'flex' , flexDirection:'column' , flexWrap:'wrap' , justifyContent:'stretch', height:'400px',width:'800px',alignContent: 'center', }}>
            {fakeData.map(data=>{

                  return ( 

                        <Box sx={{marginRight:'30px'}}>
                            <Typography className={classes.emailStyle}> {data} </Typography>
                            
                        </Box>
                  )
        
        
        
            })}
        </Box>
    )
}

export default BreachEmailBody
