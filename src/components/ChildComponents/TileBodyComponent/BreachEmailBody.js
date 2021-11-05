import React from 'react'

const BreachEmailBody = ({data}) => {
   const {emails} = data;
   
    return (
        <div>
           {data&&emails.map(email=>{
               return <li>{email[0].userPrincipalName}</li>
           })}
        </div>
    )
}

export default BreachEmailBody
