import React from 'react'
import "./Tile.css"
import { Paper , Grid, Container, Typography } from '@material-ui/core';
import logo from '../logo/hibp cropped.png'

function Tile({count,clickMe,title,boolHipb,percentSign}) {

    const [title1,title2] = title.split(',');
    console.log(title);

    return (
       
            <Container maxWidth="sm" onClick ={clickMe} fixed='true'>
                <Paper m={200}>
                    <Grid container direction="column" alignItems="center" >
                        <Grid item  container  direction='column' justifyContent="center" alignItems="center" > 
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

                    <Grid  container  direction="row"  justifyContent="flex-end"  alignItems="center">
                            <Grid item  > 
                               <span className='powerBy'>{boolHipb && 'Power by'}</span>
                            </Grid>

                            <Grid item   >   
                                {boolHipb && <img className='hipb' src={logo} alt="hipb" />}
                           </Grid>
                        
                    </Grid>

                
                    
                </Paper>
        </Container>
    )
}

export default Tile
