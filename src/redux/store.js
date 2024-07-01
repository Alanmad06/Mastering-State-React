import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import subscribeReducer from './slices/subscribeSlice'

export const store = configureStore({
    reducer:{
        user : userReducer,
        subscribe : subscribeReducer
    }
})