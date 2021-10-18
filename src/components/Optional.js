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
      
      
      
         setForward(forward=>{

            if (forward < dataLength-1) {
                console.log(forward);
                return forward+1;
            }else {
                setToggleFor(false);
                setToggleBack(true);
                setReverse(forward);

            }

         }
            
            
            
        );
       
        
        

    };
    const reverseClick = () => {
                

    
                setReverse(reverse => {
                    if (reverse <= 0 ) {
                        setToggleFor(true);
                        setToggleBack(false);
                        setForward(reverse);
                    }
                    else return reverse-1;
                
                
                });
               
            
            
    };
    
    return (
        <Container >
            
          {toggleFor && <img src={imgForward}  onClick={forwardClick}/>}
          {toggleBack && <img src={imgBack}  onClick={reverseClick}/>}

            {emailBreach.map((eachEmailBreach,index)=>{
                
                if (index == forward || index==reverse){
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
