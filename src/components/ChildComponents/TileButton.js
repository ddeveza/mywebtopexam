import React from 'react'
import {Button, makeStyles} from '@material-ui/core'

const styles = makeStyles({
        buttonStyle:{
                margin:'10px',
                boxSizing: 'content-box',
                backgroundColor:'rgba(42, 129, 163, 1)',
                width:'200px',
                height:'40px',
                WebkitFilter:'drop-shadow(2px 5px 3px rgba(112, 112, 112, 1))',
                color:'rgba(255, 255, 255, 1)',
                fontWeight:'500',
                '&:hover': {
                    backgroundColor:'rgb(95 165 193)'                    
                }


        }
})

 const TileButton = ({desc}) => {
        const classes = styles();
    return (
        
            <Button className={classes.buttonStyle} >{desc}</Button>
        
    )
}

export default TileButton;
