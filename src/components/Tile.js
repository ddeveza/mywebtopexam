import React from 'react'
import "./Tile.css"
import { Paper , Grid, Container, Typography } from '@material-ui/core';
import logo from '../logo/hibp cropped.png'

function Tile({count}) {
    return (
       
            <Container maxWidth="sm" >
                <Paper m={200}>
                    <Grid container direction="column" alignItems="center" >
                        <Grid item  > 
                            <h3> Number of Breached </h3>
                            <h3> Email Accounts</h3>
                        </Grid>
                       
                        <Grid item > 
                            <span className="Count">{count} </span>
                           
                        </Grid>
                       
                    </Grid>

                    <Grid  container  direction="row"  justifyContent="flex-end"  alignItems="center">
                            <Grid item  > 
                               <h2>Power by </h2>
                            </Grid>

                            <Grid item   >   
                               <img src={logo} alt="hipb" width="80" height="40"/>
                           </Grid>
                        
                    </Grid>

                
                    
                </Paper>
        </Container>
    )
}

export default Tile
