// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import modeReducer from "./modeSlice";
import rewardReducer from "./rewardSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    mode: modeReducer,
    rewards: rewardReducer,
  },
});

export default store;
