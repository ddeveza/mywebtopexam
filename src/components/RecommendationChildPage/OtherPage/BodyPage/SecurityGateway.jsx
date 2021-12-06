import React from 'react'
import {Box , Typography} from '@material-ui/core'

const SecurityGateway = () => {
    return (
       <Box sx={{display:'flex', flexDirection:'column' , padding:'0 180px 0 190px' ,color:'rgb(100 101 101)'}}>
           <Typography style={{marginBottom:'20px'}}>
                The modern workplace exists everywhere. For small business to be 
                efefctive they need to be nimble and flexible to adapt to market changes.
                Whether those changes are due to a pandemic, a need to service a new geographical
                market, or simply to provide employees with the flexibility we all desire in our lives.
           </Typography>
           <Typography style={{marginBottom:'20px'}}>
               Addionally, applications and services are becoming increasingly
               cloud-delivered, and workers often access business data using personal 
               devices. Implementing a Cloud Security Gateway allows your business to safely use cloud services
               while protecting your sensitive corporate data.
           </Typography>
           <Typography style={{marginBottom:'20px'}}>
               The implementation and configuration of a Cloud Security Gateway is no something we recommend
               attempting yourself, unless you are familiar with these solutions. 
               If you'd like further information on implementing a Cloud Security Gateway click the More Infor button below 
               and one of our Solution Architects will be in touch.
           </Typography>
       </Box>
    )
}

export default SecurityGateway
