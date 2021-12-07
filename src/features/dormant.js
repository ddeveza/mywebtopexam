import { createSlice } from "@reduxjs/toolkit";

const initialValue ={
    Title:"NUMBER OF DORMANT ACCOUNTS",
    about:`Dormant accounts can be a security risk to your business as these accounts may
           belong to someone who no longer works for the organisation`,
    value: "",
    details:[],
   
    
}
const dormantSlice = createSlice({
    name:'Dormant',
    initialState: {data:initialValue},
    reducers:{

        setDormant:(state,action)=>{
            //console.log(action.payload);
            let newPayload = action.payload;
            state.data = {...initialValue,...newPayload}
            
        
        },
    
    }
})

export const {setDormant} = dormantSlice.actions;
export default dormantSlice.reducer;