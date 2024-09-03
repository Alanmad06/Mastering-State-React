import { createSlice } from "@reduxjs/toolkit";
import { subscribeEmail,unsubscribeEmail } from "./thunksSubscribeSlice";




const initialState = {
  subscribed: false,
  loading: false,
};



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
          window.alert(JSON.stringify(data));
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
      })
      .addCase('RESET_STORE', () => {
        return initialState;
      });
  },
});

export const { changeSubscription, changeLoading } = subscribeSlice.actions;
export default subscribeSlice.reducer;
