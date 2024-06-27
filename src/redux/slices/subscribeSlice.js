import { createSlice } from "@reduxjs/toolkit";

const initialState ={
 isItSubscribed: false,
  isLoading: false,
}

export const subscribeSlicer = createSlice({
    name: 'subscribe',
    initialState,
    reducers:{
        changeSubscription(state,action){
            state.isItSubscribed = action.payload
        },
        changeLoading(state){
            state.isLoading = !state.isLoading
        }
    }
})

export const {changeSubscription,changeLoading} = subscribeSlicer.actions
export default subscribeSlicer.reducer