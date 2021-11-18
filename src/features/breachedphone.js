import { createSlice } from "@reduxjs/toolkit";


const initialValue ={
        Title:'Breached Phone Numbers',
        about:`These phone numbers have been detected as being found on website that have been breached`,
        value:0,
        phones:[],
        toggle:false,
               
}

const breachedPhoneSlice = createSlice({
    name:'BreachedPhone',
    initialState: {data:initialValue},
    reducers:{

        setBreachPhoneData:(state,action)=>{
            //console.log(action.payload);
            let newPayload = action.payload;
            state.data = {...initialValue,...newPayload}
            
        
        },
        setToggle:(state,action)=> {
            state.data.toggle = !state.data.toggle;
        },


    
    }
})

export const {setBreachPhoneData,setToggle} = breachedPhoneSlice.actions;
export default breachedPhoneSlice.reducer;