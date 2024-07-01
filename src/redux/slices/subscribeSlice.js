import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUser, clearUser } from "./userSlice";

const url = "http://localhost:3002/subscribe";

const initialState = {
  subscribed: false,
  loading: false,
};

export const subscribeEmail = createAsyncThunk(
  "subscribe/subscribeEmail",
  async (email, { dispatch, rejectWithValue }) => {
    const body = {
      email: email,
      id: email,
    };

    console.log('subscribeEmail');

    const requestInitSubscribe = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    };

    dispatch(addUser(email));

    try {
      const response = await fetch(url, requestInitSubscribe);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const unsubscribeEmail = createAsyncThunk(
  "subscribe/unsubscribeEmail",
  async (_, { getState, rejectWithValue ,dispatch }) => {
    console.log('unsubscribeEmail');


    const { email } = getState().user;

    const requestInitUnsubscribe = {
      method: "DELETE",
    };

    try {
      const response = await fetch(`${url}/${email}`, requestInitUnsubscribe);
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
