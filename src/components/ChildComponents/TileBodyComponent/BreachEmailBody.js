import React from 'react'

const BreachEmailBody = ({data}) => {
   const {emails} = data;
   
    return (
        <div>
           {emails[0].map(eachEmail=>{
               console.log(eachEmail.email);
               return (<li>{eachEmail.email}</li>)
           })}
        </div>
    )
}

export default BreachEmailBody
