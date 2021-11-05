import React from 'react'

const SecurityAPIBody = ({data}) => {
    const {description,status,securityControl} = data;
        
    return (
        <div>
          <br/>  {`Security Control: ${securityControl}`} 
          <br/> {`Description: ${description}`}
          <br/> {`Status:${status}`}
        </div>
    )
}

export default SecurityAPIBody
