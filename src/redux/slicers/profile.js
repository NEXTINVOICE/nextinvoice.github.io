import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "profile",
  initialState: {
    user: null,
    pass: null,
  },
  reducers: {
    login: (state, action) => {
      console.log("dispatching");
      return action.payload;
    },
    logout: (state, action) => ({ user: null, pass: null }),
  },
});

export const { login, logout } = profile.actions;
export default profile.reducer;
