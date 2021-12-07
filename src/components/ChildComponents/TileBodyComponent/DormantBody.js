import React from 'react';
import {Box , Typography ,makeStyles} from '@material-ui/core'


const styles = makeStyles({
    header : {
        fontWeight : '700',
        fontSize : '20px',
        color :'rgba(42, 129, 163, 1)',
       
    },

    body :{
        color :'rgb(100 101 101)'
    }
})

const DormantBody = ({data}) => {
    const classes = styles();

    const formatDate = (value)=> {
        let date = new Date(value);
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return day + '-' + month + '-' + year;
    }


   

    const tableContainer = {
            height:'331px',
            width:'800px',
            paddingLeft:'57px',
            paddingRight:'50px',
            display:'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            margin:'auto'
       
    }
    
  

    const {details} = data;
    
    return (
        <>
        <Box sx={{display:'flex', justifyContent:'flex-start', marginTop:'20px', marginBottom:'12px', paddingLeft:'177px'}}>
           <Typography style={{color:'rgb(100 101 101)'}}> The Accounts below have not logged into your environment for 30 or more days </Typography>
        </Box>
        <div style={tableContainer}>
           
            <Box>
                <Typography className={classes.header}>Name</Typography>
                {details.map((detail, index)=> <Typography key={index} className={classes.body}>{detail.mail}</Typography>)}      
            </Box>

            <Box sx={{display:'flex', flexDirection:'column',alignItems: 'center' }}>
               <Typography className={classes.header}>Last Sign in Date</Typography>
                {details.map((detail,index)=> <Typography key={index} className={classes.body}>{formatDate(detail.lastSignIn)}</Typography>)}            
            </Box>
           

            <Box sx={{display:'flex', flexDirection:'column',alignItems: 'center' }}>
                <Typography className={classes.header}>Days since last sign in</Typography>
                {details.map((detail, index)=> <Typography key={index} className={classes.body}>{detail.daysLastSignIn}</Typography>)}                  
            </Box>
        </div>
        </>
    )
}

export default DormantBody

  