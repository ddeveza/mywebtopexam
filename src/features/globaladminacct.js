import { createSlice } from "@reduxjs/toolkit";

const initialValue ={
        Title:"Global Administrator Accounts",
        about:"For Security purpose we cannot display which accounts have Global Admin access",
        value: "",
        securityControl:"",
        description:"" ,
        status:"",
        toggle:false,
    }

const globalAdminAcctSlice = createSlice({
    name:'GlobalAdminAccount',
    initialState: {data:initialValue},
    reducers:{

        setGlobalAdminAcct:(state,action)=>{
            //console.log(action.payload);
            let newPayload = action.payload;
            state.data = {...initialValue,...newPayload}
            
        
        },
    
    }
})

export const {setGlobalAdminAcct} = globalAdminAcctSlice.actions;
export default globalAdminAcctSlice.reducer;