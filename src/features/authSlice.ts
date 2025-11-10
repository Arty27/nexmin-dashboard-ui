import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "super_admin" | "accountant" | "support" | null;

interface AuthState {
  isAuthenticated: Boolean;
  role: UserRole;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserRole>) => {
      state.isAuthenticated = true;
      state.role = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
