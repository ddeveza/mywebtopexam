import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'Auth',
    initialState: false,
    reducers:{

        isAuth:(state,payload)=>state = payload,
    
    }
})

export const {isAuth} = authSlice.actions;
export default authSlice.reducer;