import { createSlice } from "@reduxjs/toolkit";

const initialValue ={Title:"",description:"",countOfBreachedEmail:0,emails:[] }

const breachedEmailSlice = createSlice({
    name:'BreachedEmail',
    initialState: {data:initialValue},
    reducers:{

        setBreachEmailData:(state,action)=>{
            //console.log(action.payload);
            let newPayload = action.payload;
            state.data = {...initialValue,...newPayload}
            
        
        },
    
    }
})

export const {setBreachEmailData} = breachedEmailSlice.actions;
export default breachedEmailSlice.reducer;