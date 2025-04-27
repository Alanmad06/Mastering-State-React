import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      state.email = action.payload;
    },
    clearUser(state) {
      state.email = "";
    },
  },
});

export const { addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
