import React from 'react'
import "./Tile.css"
import { Paper , Grid, Container, Typography } from '@material-ui/core';
import logo from '../logo/hibp cropped.png'

function Tile({count,clickMe}) {
    return (
       
            <Container maxWidth="sm" onClick ={clickMe}>
                <Paper m={200}>
                    <Grid container direction="column" alignItems="center" >
                        <Grid item  container  direction='column' justifyContent="center" alignItems="center" > 
                                <Grid item  >
                                <span className='breachText'>  Number of Breached </span>
                                </Grid>
                                <Grid item >
                                    <span className='breachText'>  Email  Accounts </span>
                                </Grid>
                        </Grid> 
                       
                       
                        <Grid item > 
                            <span className="Count">{count} </span>
                           
                        </Grid>
                       
                    </Grid>

                    <Grid  container  direction="row"  justifyContent="flex-end"  alignItems="center">
                            <Grid item  > 
                               <span className='powerBy'>Power by</span>
                            </Grid>

                            <Grid item   >   
                               <img className='hipb' src={logo} alt="hipb" />
                           </Grid>
                        
                    </Grid>

                
                    
                </Paper>
        </Container>
    )
}

export default Tile
