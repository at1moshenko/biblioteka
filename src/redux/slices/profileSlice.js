import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  profileRendering: true,
};

export const profileRendering = createSlice({
  name: "profileRendering",
  initialState,
  reducers: {
    setProfileRendering(state, action) {
      state.profileRendering = action.payload;
    },
  },
});

export const { setProfileRendering } = profileRendering.actions;
export default profileRendering.reducer;
