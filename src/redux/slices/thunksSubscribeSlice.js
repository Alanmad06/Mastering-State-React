import { addUser, clearUser } from "./userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";


const urlSubscribe = "http://localhost:3000/subscribe";
const urlUnsubscribe = "http://localhost:3000/unsubscribe";

export const subscribeEmail = createAsyncThunk(
    "subscribe/subscribeEmail",
    async (email, { dispatch, rejectWithValue }) => {
      const body = {
        email: email,
      };
  
      const requestInitSubscribe = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
  
      try {
        const response = await fetch(urlSubscribe, requestInitSubscribe);
        const data = await response.json();
        dispatch(addUser(email));
        if (data.error) dispatch(clearUser());
        return data;
      } catch (error) {
        console.error(error);
        dispatch(clearUser());
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const unsubscribeEmail = createAsyncThunk(
    "subscribe/unsubscribeEmail",
    async (_, { rejectWithValue, dispatch }) => {
      const requestInitUnsubscribe = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const response = await fetch(urlUnsubscribe, requestInitUnsubscribe);
        const data = await response.json();
        dispatch(clearUser());
  
        return data;
      } catch (error) {
        console.error(error);
        return rejectWithValue(error.message);
      }
    }
  );