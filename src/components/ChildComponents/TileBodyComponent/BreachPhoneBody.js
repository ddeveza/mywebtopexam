import React from 'react'

const BreachPhoneBody = ({data}) => {
    const {phones} = data;
   
    return (
        <div>
           {phones[0].map(eachPhone=>{
               console.log(eachPhone.phone);
               return (<li>{eachPhone.phone}</li>)
           })}
        </div>
    )
}

export default BreachPhoneBody
