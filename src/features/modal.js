import { createSlice } from "@reduxjs/toolkit";


const modalTileSlice = createSlice({
    name:'TileModal',
    initialState: false,
    reducers:{

        closeModal:state=>state = false,
        openModal:(state,action)=>{
            console.log(state)
            state  = !state;
            return state;
        }
    
    }
})

export const {closeModal,openModal} = modalTileSlice.actions;
export default modalTileSlice.reducer;