import React from 'react'

import logo from '../logo/hibp cropped.png'
import MainChild from './ChildComponents/MainChild';
import TileLogic from './action/TileLogic';

import {makeStyles,
        Backdrop,
        Modal,
        Paper,
        Grid,
        Typography,
        CircularProgress} from '@material-ui/core'


const useStyles = makeStyles({
    
    tile:{
        
        backgroundColor:'rgba(255, 255, 255, 1)',
        boxSizing:'content-box', 
        WebkitFilter:'drop-shadow(3px 2px 3px  rgb(120 196 217))',
        padding:'20px 15px 25px 10px',
        width:'370px',
        height:'165px',
        color:'rgb(100 101 101)',
        cursor:'pointer', 
        
       
        
        
            
    },
    tileText :{
        fontFamily:'Lato, sans-serif',
        textTransform:'uppercase',
        fontSize:'18px',
        letterSpacing:'1px',
        margin:'0.001em',
     
        
    },
    tileHIBP:{
        fontFamily:'Lato, sans-serif',
        fontSize:'14px',
        letterSpacing:'1px'
    },

    imageHIPB:{
        
        width: '80px',
        height: '25px'
        
    },
    tileValue:{
        fontFamily:'Lato, sans-serif',
        fontSize:'78px',
        paddingBottom:'1px',
        marginBottom:'0.001em',
        height:'100px'
    },
    tileGridTitle:{
            padding:'0.1px',
            margin:'0px',
            
    }
})


function Tile({count,title,boolHipb,percentSign,loading}) {
    
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
                    <Grid container direction="column" alignItems="center" justifyContent="center" >
                        <Grid item  container  direction='column' justifyContent="center" alignItems="center" > 
                                <Grid item  className={classes.tileGridTitle}>
                                    <Typography  className={classes.tileText}>  {title1} </Typography>
                                </Grid>
                                <Grid item  >
                                    <Typography  className={classes.tileText}>  {title2} </Typography>
                                </Grid>
                                
                        </Grid> 
                       
                       
                        <Grid item > 
                            
                            {count? <Typography className={classes.tileValue}>{loading &&<CircularProgress/>}{count}{percentSign && "%"} </Typography>:<><CircularProgress/></>}
            
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
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                       
                        >
                  
                         <MainChild data={renderData}  close={()=>handleClose()}/> 
                         
                    
                </Modal>     

               
        </>
    
    )
}

export default Tile
