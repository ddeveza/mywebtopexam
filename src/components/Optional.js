import React ,{useState}from 'react'
import imgForward from '../logo/icons8-forward.png';
import imgBack from '../logo/icons8-back.png';
import { Paper , Grid, Container, Typography } from '@material-ui/core';




function Optional({emailBreach}) {
   
    let dataLength = emailBreach.length;
    
   
    const [forward, setForward] = useState(-1);
    const  [reverse , setReverse] = useState(-1);
    const [toggleBack,setToggleBack] = useState(false)
    const [toggleFor,setToggleFor] = useState(true)
    
    const forwardClick = () => {
      
      
      
         setForward(forward+1);
       
        
        

    };
    const reverseClick = () => {
                
                setReverse(forward-1);
            
            
    };
    
    return (
        <Container >
           
           <img src={imgForward}  onClick={forwardClick}/>
             

            {emailBreach.map((eachEmailBreach,index)=>{
                if (index == forward ){
                let email = eachEmailBreach.email[0];
                let CompromiseDatas = eachEmailBreach[0].DataClasses;
                let Description = eachEmailBreach[0].Description;
                console.log(CompromiseDatas);
                
                return (
                   
                        <>
                            <h1>{email}</h1>
                            <p><strong>Description :  </strong>{Description}</p>
                            <h4> CompromiseData</h4>{CompromiseDatas.map(CompData =>` ${CompData},`)}
                        </>
                    
                )
              } 
            })}
            
          

        </Container>
    )
}

export default Optional;
