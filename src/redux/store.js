import { configureStore } from "@reduxjs/toolkit";

import userReducer from './slices/userSlice'
import subscribeReducer from './slices/subscribeSlice'
import communityReducer from "./slices/communitySlice";

export const setupStore=(preloadedState = {})=>
{
    return configureStore({
        reducer:{
            user : userReducer,
            subscribe : subscribeReducer,
            community : communityReducer
        }, preloadedState
    })
    
}




