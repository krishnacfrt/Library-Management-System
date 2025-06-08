import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    userId: "",
    isAuthenticated: false,
    error: "",
    showAuthPage: true,
    showRegisterPage: false,
  },
  reducers: {
    setShowAuthPage: (state, action) => {
      state.showAuthPage = action.payload;
      console.log("setShowAuthPage called with payload:", action.payload);
    },
    setUserDetails: (state, action) => {
      state.userId = action.payload;
    },
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setShowRegisterPage: (state, action) => {
      state.showRegisterPage = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = "";
      state.showAuthPage = True;
    },
  },
});

export const { setAuthentication, setUserDetails, logout, setShowAuthPage, setShowRegisterPage } =
  adminAuthSlice.actions;

export default adminAuthSlice.reducer;
