import { configureStore } from "@reduxjs/toolkit";
import AdminAuthReducer from "./adminAuthSlice";

export const store = configureStore({
  reducer: {
    adminAuth: AdminAuthReducer,
  },
});