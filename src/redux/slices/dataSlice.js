import { createSlice } from "@reduxjs/toolkit";
import dummyData from "../../data/dummyData.json";

const initialState = dummyData;

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    approvePurchase: (state, { payload: id }) => {
      state.purchases = state.purchases.map((p) =>
        p.id === id ? { ...p, status: "Approved" } : p
      );
    },
    updateContributionRate: (state, { payload }) => {
      state.contributionRate = payload;
    },
  },
});

export const { approvePurchase, updateContributionRate } = dataSlice.actions;
export default dataSlice.reducer;
