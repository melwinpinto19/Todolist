import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  initialState: {
    isDark: false,
  },
  reducers: {
    toggleMode: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleMode } = modeSlice.actions;

export default modeSlice.reducer;
