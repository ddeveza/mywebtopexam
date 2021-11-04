import { createSlice } from "@reduxjs/toolkit";

const initialValue ={
    Title:"MICROSOFT SECURE SCORE",
    about:"Below are the top consideration for your environment",
    value: "",
    securityControl:"",
    description:"" ,
    status:"",
    toggle:false, 
}
const msSecureScoreSlice = createSlice({
    name:'MSSecureScore',
    initialState: {data:initialValue},
    reducers:{

        setMSSecureScore:(state,action)=>{
            //console.log(action.payload);
            let newPayload = action.payload;
            state.data = {...initialValue,...newPayload}
            
        
        },
    
    }
})

export const {setMSSecureScore} = msSecureScoreSlice.actions;
export default msSecureScoreSlice.reducer;