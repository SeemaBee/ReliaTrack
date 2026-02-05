import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;