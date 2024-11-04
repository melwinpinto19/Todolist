// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import modeReducer from "./modeSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    mode: modeReducer,
  },
});

export default store;
