import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hide : false
}

const communitySlice = createSlice({
    name : "community",
    initialState,
    reducers :{
        changeHide(state){
            state.hide = !state.hide
        }
    }

})

export const {changeHide} = communitySlice.actions
export default communitySlice.reducer