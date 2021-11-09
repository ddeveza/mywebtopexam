import React , {useState, useEffect}from 'react'
import {Grid} from '@material-ui/core'
import forwardImg from '../../../logo/Assets/icons8-forward.png';
import backwardImg from '../../../logo/Assets/icons8-back.png';
import { setToggle } from '../../../features/breachedemail';

const SecurityAPIBody = ({data}) => {
    
    const [index, setIndex] = useState(0);
    const [toggleForArrow, setToggleForArrow] = useState(false);
    const [toggleBackArrow, setToggleBackArrow] = useState(false);

    const dataLength = data.securityControl.length;
    useEffect(() => {
       if (dataLength > 1) setToggleForArrow(true)
    }, [])
    const _forwardClick = (data) =>{
        if (dataLength > 1  ) {

          setIndex(currentVal => {
              if (currentVal == dataLength-2) {
                setToggleForArrow(false);
                setToggleBackArrow(true);
                return currentVal+1;
              }else {
                setToggleBackArrow(true);
                return currentVal+1;
              }
          });
         
          
        }

        
    }

    const _backwardClick = (data) =>{
      if (dataLength > 1 ) {
        setIndex(currentVal => {
          
              if(currentVal == 1) {
                setToggleBackArrow(false);
                setToggleForArrow(true);
                return currentVal-1;
              }else {
                setToggleForArrow(true);
                return currentVal-1;
              }
          
          });
       
      }
  }
        
    return (
      
       !(data.Title==="MICROSOFT SECURE SCORE") ?  
            <div>
              <br/>  {`Security Control: ${data.securityControl}`} 
              <br/> {`Description: ${data.description}`}
              <br/> {`Status:${data.status}`}
            </div>
          : <div>
               {/*data.securityControl.map(eachData=><li>{eachData.controlName}</li>)*/}
               <Grid container direction='row'justifyContent="space-evenly">
                    <Grid container item xs={2} justifyContent='center' alignItems='center' >
                       {(toggleBackArrow) && <img src={backwardImg} onClick={()=>_backwardClick(data.securityControl)}/>}
                    </Grid>
                    <Grid container item direction='column' xs={8} alignItems='flex-start' spacing={4}>
                          <Grid item>Security Control : {data.securityControl[index].controlName}</Grid>
                          <Grid item>Description: {data.securityControl[index].description}</Grid>
                          <Grid item>Status</Grid>
                    </Grid>
                 <Grid container item xs={2} justifyContent='center' alignItems='center' >
                        {(toggleForArrow ) && <img src={forwardImg} onClick={()=>_forwardClick(data.securityControl)}/>}
                  </Grid>
               </Grid>
            </div>
            
          
    );
    
}

export default SecurityAPIBody
