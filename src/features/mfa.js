import { createSlice } from "@reduxjs/toolkit";

const initialValue ={
    Title:"of people in the business are using MFA",
    //about:"Below are the top consideration for your environment",
    value: "",
    securityControl:"",
    description:"" ,
    status:"",
    toggle:false,
}
const mfaSlice = createSlice({
    name:'MFA',
    initialState: {data:initialValue},
    reducers:{

        setMFA:(state,action)=>{
            //console.log(action.payload);
            let newPayload = action.payload;
            state.data = {...initialValue,...newPayload}
            
        
        },
    
    }
})

export const {setMFA} = mfaSlice.actions;
export default mfaSlice.reducer;