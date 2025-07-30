import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthHeader, handleError, instance, setAuthHeader } from "../init";
import { IUser, IUserResponse } from "@/types/types";
import { RootState } from "../store";

export const registerUser = createAsyncThunk<IUserResponse, IUser>(
  "users/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await instance.post("auth/register", credentials);
      setAuthHeader(res.data.data.token);
      return res.data.data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to register."));
    }
  }
);

export const loginUser = createAsyncThunk<IUserResponse, Partial<IUser>>(
  "users/signin",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await instance.post("auth/login", credentials);
      setAuthHeader(res.data.data.accessToken);
      return res.data.data;
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to login."));
    }
  }
);

export const refreshUser = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  void,
  { state: RootState }
>("users/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const accessToken = state.auth.accessToken;
  const persistedToken = state.auth.refreshToken;

  if (!accessToken) {
    return thunkAPI.rejectWithValue("No token found.");
  }

  try {
    setAuthHeader(accessToken);
    const res = await instance.post("auth/refresh", {
      refreshToken: persistedToken,
    });
    return res.data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(handleError(e, "Failed to refresh user."));
  }
});

export const getCurrentUser = createAsyncThunk<
  IUser,
  void,
  { state: RootState }
>("users/current", async (_, thunkAPI) => {
  try {
    const res = await instance.get("/auth/current");
    return res.data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(handleError(e, "Failed to load user."));
  }
});

export const signoutUser = createAsyncThunk<void, void, { state: RootState }>(
  "users/signout",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    if (!token) return rejectWithValue("User is not authenticated.");

    try {
      setAuthHeader(token);
      await instance.post("auth/logout");
      clearAuthHeader();
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to signout."));
    }
  }
);
