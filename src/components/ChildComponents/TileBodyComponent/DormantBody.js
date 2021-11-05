import React from 'react'

const DormantBody = ({data}) => {


    const formatDate = (value)=> {
        let date = new Date(value);
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return day + '-' + month + '-' + year;
    }




    const {details} = data;
    
    return (
        <div>
            <table>
            <tr>
                <th>Name</th>
                <th>Last Sign in Date</th>
                <th>Days since last sign in</th>
            </tr>
            
                {details.map(detail=>{
                    
                    return (
                        <>
                            <tr>
                                <td>{detail.mail}</td>
                                <td>{formatDate(detail.lastSignIn)}</td>
                                <td>{detail.daysLastSignIn}</td>
                            </tr>
                        </>    
                     )


                })}
            
            </table>

        </div>
    )
}

export default DormantBody
