import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("auth-token") || null,
  role: localStorage.getItem("user-role") || null,
  user: JSON.parse(localStorage.getItem("user-data") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      const { token, role, user } = payload;
      state.token = token;
      state.role = role;
      state.user = user;
      localStorage.setItem("auth-token", token);
      localStorage.setItem("user-role", role);
      localStorage.setItem("user-data", JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      localStorage.removeItem("auth-token");
      localStorage.removeItem("user-role");
      localStorage.removeItem("user-data");
      localStorage.removeItem("admin-token");
      localStorage.removeItem("merchant-token");
      localStorage.removeItem("member-token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
