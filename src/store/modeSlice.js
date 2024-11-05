import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  initialState: {
    isDark: localStorage.getItem("isDark") === "true",
  },
  reducers: {
    toggleMode: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("isDark", state.isDark);
    },
  },
});

export const { toggleMode } = modeSlice.actions;

export default modeSlice.reducer;
