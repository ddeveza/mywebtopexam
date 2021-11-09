import React from 'react'

const SecurityAPIBody = ({data}) => {

    
        
    return (
      
       !(data.Title==="MICROSOFT SECURE SCORE") ?  
            <div>
              <br/>  {`Security Control: ${data.securityControl}`} 
              <br/> {`Description: ${data.description}`}
              <br/> {`Status:${data.status}`}
            </div>
          : <div>
               {data.securityControl.map(eachData=><li>{eachData.controlName}</li>)}
            </div>
            
          
    );
    
}

export default SecurityAPIBody
