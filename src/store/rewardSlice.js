import { createSlice } from "@reduxjs/toolkit";
import { getRewards, setRewards } from "../utils/localStorage";

const rewardSlice = createSlice({
  name: "rewards",
  initialState: {
    rewards: getRewards(),
  },
  reducers: {
    addReward: (state, payload) => {
      state.rewards[payload.payload] = 10;
      setRewards(state.rewards);
    },
    removeReward: (state, payload) => {
      delete state.rewards[payload.payload];
      setRewards(state.rewards);
    },
  },
});

export const { addReward, removeReward } = rewardSlice.actions;

export default rewardSlice.reducer;
