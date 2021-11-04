import { createSlice } from "@reduxjs/toolkit";

const initialValue ={
        Title:'Breached Email Accounts',
        about:`These email addresses are detected as being found on websites that have been breached.
                     To improve your security, ensure every password you use is unique`,
        value:0,
        emails:[],
        toggle:false,       
}

const breachedEmailSlice = createSlice({
    name:'BreachedEmail',
    initialState: {data:initialValue},
    reducers:{

        setBreachEmailData:(state,action)=>{
            //console.log(action.payload);
            let newPayload = action.payload;
            state.data = {...initialValue,...newPayload}
            
        
        },
        setToggle:(state,action)=> {
            state.data.toggle = !state.data.toggle;
        }
    
    }
})

export const {setBreachEmailData,setToggle} = breachedEmailSlice.actions;
export default breachedEmailSlice.reducer;