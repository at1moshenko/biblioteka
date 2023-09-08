import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  auth: null,
  profileRendering: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
    setProfileRendering(state, action) {
      state.profileRendering = action.payload;
    },
  },
});

export const { setAuth, setProfileRendering } = authSlice.actions;
export default authSlice.reducer;
