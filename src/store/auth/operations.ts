import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthHeader, handleError, instance, setAuthHeader } from "../init";
import { IUser, IUserResponse } from "@/types/types";
import { RootState } from "../store";

export const registerUser = createAsyncThunk<IUserResponse, IUser>(
  "users/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("Payload for register:", credentials);
      const res = await instance.post("auth/register", credentials);
      setAuthHeader(res.data.data.token);
      return res.data.data;
    } catch (e) {
      if (typeof e === "object" && e !== null && "response" in e) {
        const err = e as { response: { status: number; data: unknown } };
        console.error("Status:", err.response.status);
        console.error("Response data:", err.response.data);
      }
      return rejectWithValue(handleError(e, "Failed to register."));
    }
  }
);

export const loginUser = createAsyncThunk<
  IUserResponse & { user: IUser },
  Partial<IUser>
>("users/signin", async (credentials, { rejectWithValue }) => {
  try {
    const res = await instance.post("auth/login", credentials);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, refreshToken } = res.data.data;

    setAuthHeader(accessToken);

    // Fetch current user info immediately after login
    const userRes = await instance.get("/auth/current");

    return {
      ...res.data.data,
      user: userRes.data.data,
    };
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to login."));
  }
});

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
    const state = thunkAPI.getState();
    const accessToken = state.auth.accessToken;
    console.log(accessToken);
    setAuthHeader(accessToken);
    const res = await instance.get("/auth/current");
    return res.data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(handleError(e, "Failed to load user."));
  }
});

export const refreshAndLoadUser = createAsyncThunk<
  IUser,
  void,
  { state: RootState }
>("users/refreshAndLoad", async (_, thunkAPI) => {
  try {
    const refreshResult = await thunkAPI.dispatch(refreshUser()).unwrap();

    setAuthHeader(refreshResult.accessToken);

    const res = await instance.get("/auth/current");
    return res.data.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(
      handleError(e, "Session expired, please log in again.")
    );
  }
});

export const signoutUser = createAsyncThunk<void, void, { state: RootState }>(
  "users/signout",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    if (!token) return rejectWithValue("User is not authenticated.");

    try {
      await instance.post("auth/logout", { accessToken: token });
      clearAuthHeader();
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to signout."));
    }
  }
);
