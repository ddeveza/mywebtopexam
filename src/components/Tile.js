import React from 'react'
import { Paper , Grid, Typography } from '@material-ui/core';
import logo from '../logo/hibp cropped.png'
import MainChild from './ChildComponents/MainChild';
import {Modal} from '@material-ui/core'
import TileLogic from './action/TileLogic';
import {makeStyles} from '@material-ui/core'


const useStyles = makeStyles({
    
    tile:{
        
        backgroundColor:'rgba(255, 255, 255, 1)',
        boxSizing:'content-box', 
        WebkitFilter:'drop-shadow(3px 2px 3px  rgb(120 196 217))',
        padding:'20px 15px 25px 10px',
        width:'300px',
        height:'140px',
        color:'rgb(100 101 101)',
        cursor:'pointer', 
       
        
        
            
    },
    tileText :{
        fontFamily:'Lato, sans-serif',
        textTransform:'uppercase',
        fontSize:'1vw',
        letterSpacing:'1px'
        
    },
    tileHIBP:{
        fontSize:'0.8vw'
    },

    imageHIPB:{
        
        width: '4vw',
        height: '3vh'
        
    },
    tileValue:{
        fontFamily:'Lato, sans-serif',
        fontSize:'4vw'
    },
    tileGridTitle:{

    }
})


function Tile({count,title,boolHipb,percentSign}) {
    
    const classes = useStyles();

    const { renderData,
            handleClose,
            handleOpen,
            title1,
            title2,
            toggleChildTile} = TileLogic(title);

   
 
    return (
       <>
           
                <Paper onClick={handleOpen} className={classes.tile}>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Grid item  container  direction='column' justifyContent="center" alignItems="center" > 
                                <Grid item  >
                                    <Typography  className={classes.tileText}>  {title1} </Typography>
                                </Grid>
                                <Grid item  >
                                    <Typography  className={classes.tileText}>  {title2} </Typography>
                                </Grid>
                                
                        </Grid> 
                       
                       
                        <Grid item > 
                            <Typography className={classes.tileValue}>{count}{percentSign && "%"} </Typography>
                           
                        </Grid>
                       
                    </Grid>

                    <Grid  container  direction="row"  justifyContent="flex-end"  alignItems="center" spacing={1}>
                           
                            <Grid item  > 
                               <Typography className={classes.tileHIBP}>{boolHipb && 'Powered by'}</Typography>
                            </Grid>

                            <Grid item   >   
                                {boolHipb && <img className={classes.imageHIPB} src={logo} alt="hipb" />}
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
