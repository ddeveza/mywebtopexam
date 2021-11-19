import React from 'react'
import {Box, Typography , makeStyles} from '@material-ui/core'
const styles = makeStyles({
    emailStyle:{
        fontSize:'20px',
        color:'rgba(42, 129, 163, 1)',
        cursor:'pointer',
        '&:hover':{
            color:'rgb(166 197 209)'  
        },
        
    }
})
const BreachEmailBody = ({data}) => {
   const {emails} = data;
   const classes = styles();
   const fakeData = ['dennis@mywebtop.au.com', 'admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com',"dennis@mywebtop.au.com", 'admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','dennis@mywebtop.au.com', 'admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com',"dennis@mywebtop.au.com", 'admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com','admin@emmslab.com']
   const boxStyle ={
       display:'flex' , 
       flexDirection:'column' , 
       flexWrap:'wrap' , 
       justifyContent:'stretch', 
       height:'400px',width:'800px',
       alignContent: 'space-around', 
       paddingLeft:'100px',
       paddingRight:'100px'}
    return (
       /*  <div>
           {emails[0].map(eachEmail=>{
               console.log(eachEmail.email);
               return (<li>{eachEmail.email}</li>)
           })}
        </div> */

        <Box sx={boxStyle}>
            {emails[0].map(data=>{

                  return ( 

                        <Box sx={{marginRight:'30px'}}>
                            <Typography className={classes.emailStyle} onClick={()=>console.log(JSON.parse(data.data))}> {data.email} </Typography>
                            
                        </Box>
                  )
        
        
        
            })}
        </Box>
    )
}

export default BreachEmailBody
