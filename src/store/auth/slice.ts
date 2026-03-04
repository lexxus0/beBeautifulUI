import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  refreshUser,
  signoutUser,
  getCurrentUser,
  refreshAndLoadUser,
  updateUser,
} from "./operations";
import { IUser, RegisterError } from "@/types/types";
import { clearAuthTokens } from "@/helpers/authUtils";
interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
      state.error = null;
      clearAuthTokens();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken ?? null;
        state.error = null;
         // зберігаємо токени
         if (typeof window !== "undefined" && state.accessToken) {
          localStorage.setItem("accessToken", state.accessToken);
          if (state.refreshToken) {
            localStorage.setItem("refreshToken", state.refreshToken);
          }
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        const p = action.payload as RegisterError | undefined;
        state.error = p?.message || action.error.message || "Failed to register.";
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken ?? null;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.error = null;
          // зберігаємо токени
          if (typeof window !== "undefined" && state.accessToken) {
            localStorage.setItem("accessToken", state.accessToken);
            if (state.refreshToken) {
              localStorage.setItem("refreshToken", state.refreshToken);
            }
          }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.error = action.payload as string;
        // Clear tokens on refresh failure
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        // state.isLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(refreshAndLoadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
        // Ensure tokens are preserved from the refresh operation
        // The tokens should be updated by the refreshUser operation
      })
      .addCase(refreshAndLoadUser.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(signoutUser.fulfilled, () => {
        return initialState;
      })
      .addCase(signoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
