import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUser, clearUser } from "./userSlice";

const urlSubscribe = "http://localhost:3000/subscribe";
const urlUnsubscribe = "http://localhost:3000/unsubscribe";

const initialState = {
  subscribed: false,
  loading: false,
};

export const subscribeEmail = createAsyncThunk(
  "subscribe/subscribeEmail",
  async (email, { dispatch, rejectWithValue }) => {
    const body = {
      email: email,
    };

    

    const requestInitSubscribe = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    };

  

    try {
      const response = await fetch(urlSubscribe, requestInitSubscribe);
      const data = await response.json();
      dispatch(addUser(email));
      if(data.error) dispatch(clearUser())
      return data;
    } catch (error) {
      console.error(error);
      dispatch(clearUser())
      return rejectWithValue(error.message);
    }
  }
);

export const unsubscribeEmail = createAsyncThunk(
  "subscribe/unsubscribeEmail",
  async (_, { rejectWithValue ,dispatch }) => {
   


    

    const requestInitUnsubscribe = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(urlUnsubscribe, requestInitUnsubscribe);
      const data = await response.json();
      dispatch(clearUser())
      
      return data;
    } catch (error) {
      
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {
    changeSubscription(state, action) {
      state.subscribed = action.payload;
    },
    changeLoading(state) {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(subscribeEmail.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;

        if (data.error) {
          alert(JSON.stringify(data));
          state.subscribed = false;
          
        } else {
          state.subscribed = true;
        }
      })
      .addCase(subscribeEmail.rejected, (state) => {
        state.loading = false;
      })

      .addCase(unsubscribeEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(unsubscribeEmail.fulfilled, (state) => {
        state.loading = false;
        state.subscribed = false;
      })
      .addCase(unsubscribeEmail.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { changeSubscription, changeLoading } = subscribeSlice.actions;
export default subscribeSlice.reducer;
