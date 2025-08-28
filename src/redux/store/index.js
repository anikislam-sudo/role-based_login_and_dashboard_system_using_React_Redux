import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import dataReducer from "../slices/dataSlice";
import loaderReducer from "../slices/loaderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    loader: loaderReducer,
  },
});

export default store;
