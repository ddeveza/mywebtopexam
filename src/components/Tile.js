import React from 'react'
import "./Tile.css"
import { Paper , Grid } from '@material-ui/core';
import logo from '../logo/hibp cropped.png'
import MainChild from './ChildComponents/MainChild';
import {Modal} from '@material-ui/core'
import TileLogic from './action/TileLogic';




function Tile({count,clickMe,title,boolHipb,percentSign}) {

    const { renderData,
            handleClose,
            handleOpen,
            title1,
            title2,
            toggleChildTile} = TileLogic(title);

   
 
    return (
       <>
           
                <Paper onClick={handleOpen}>
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
