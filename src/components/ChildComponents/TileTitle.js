import React from 'react'
import {Box,Grid, Typography, makeStyles} from '@material-ui/core'



const styles = makeStyles({
    titleValue:{
        fontSize:'80px',
        padding:'0px',
        color:'rgba(42, 129, 163, 1)'
      
        
        
    },
    mainTitle: {
        fontFamily: "Lato, sans-serif",
        fontSize:'28px',
        letterSpacing:'1px',
        textTransform: 'uppercase',
        color:'rgba(42, 129, 163, 1)'
    },

    aboutStyle:{
        color:'rgb(100 101 101)',
        fontWeight:'5px',
        letterSpacing:'1px',
    }
});

const TileTitle = ({title,value,about}) => {

    const classes = styles();


    const style = {
        position: 'relative',
        bgcolor: 'background.paper',
        p:1
        
      };

    const styleTitleContainer = {
        display:'flex' , 
        flexDirection: 'column',
        justifyContent:'center' ,
       
        paddingLeft:'20px' 
    }

    const styleTitle = {
        marginBottom :'10px',
        marginTop:'20px',
    }

  

    return (
        <Box sx={style}>
            <Grid container spacing={12} >
                <Grid item xs={2} >
                    <Box sx={{display:'flex' ,justifyContent:'center'}}>
                        <Typography className={classes.titleValue} >  {value}</Typography>
                    </Box>
                </Grid>
                <Grid  item xs={10} container >
                    <Box sx={styleTitleContainer}>
                            <Box sx={styleTitle}>
                                <Typography className={classes.mainTitle}> {title}</Typography>
                            </Box>
                            <Box >
                                <Typography className={classes.aboutStyle}> {about}</Typography>
                            </Box>
                    </Box> 
                       
                </Grid>
            </Grid>
                    
        </Box>
           
      
    )
}

export default TileTitle
