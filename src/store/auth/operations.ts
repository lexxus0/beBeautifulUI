import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthHeader, handleError, instance, setAuthHeader } from "../init";
import { IUpdateUserResponse, IUser, IUserResponse } from "@/types/types";
import { RootState } from "../store";
import { clearAuth } from "./slice";
import { AxiosError } from "axios";
import { clearCartState } from "../cart/slice";
import { syncCartFromGuest } from "../cart/operations";

const appendIf = (form: FormData, key: string, v?: string) => {
  if (v && v.trim() !== "") form.append(key, v);
};

export const registerUser = createAsyncThunk<IUserResponse, IUser>(
  "users/signup",
  async (credentials, { rejectWithValue }) => {
    try {
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
>("users/signin", async (credentials, { rejectWithValue, dispatch }) => {
  try {
    const res = await instance.post("auth/login", credentials);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, refreshToken } = res.data.data;

    setAuthHeader(accessToken);

    await dispatch(syncCartFromGuest()).unwrap();

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

  if (!accessToken || !persistedToken) {
    return thunkAPI.rejectWithValue("No tokens found.");
  }

  try {
    setAuthHeader(accessToken);
    const res = await instance.post("auth/refresh", {
      refreshToken: persistedToken,
    });
    return res.data.data;
  } catch (e: unknown) {
    // If refresh fails with 401, clear the auth state
    if (
      e &&
      typeof e === "object" &&
      "response" in e &&
      (e as { response?: { status?: number } }).response?.status === 401
    ) {
      clearAuthHeader();
      thunkAPI.dispatch(clearAuth());
    }
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
  const state = thunkAPI.getState();

  // If no tokens exist in Redux state, try to get them from localStorage
  let accessToken = state.auth.accessToken;
  let refreshToken = state.auth.refreshToken;

  if (!accessToken || !refreshToken) {
    if (typeof window !== "undefined") {
      accessToken = localStorage.getItem("accessToken");
      refreshToken = localStorage.getItem("refreshToken");
    }
  }

  // If still no tokens exist, don't try to refresh
  if (!accessToken || !refreshToken) {
    return thunkAPI.rejectWithValue("No authentication tokens found.");
  }

  try {
    // Set the auth header with the current access token
    setAuthHeader(accessToken);

    const refreshResult = await thunkAPI.dispatch(refreshUser()).unwrap();

    setAuthHeader(refreshResult.accessToken);

    const res = await instance.get("/auth/current");
    console.log("refreshAndLoadUser ", res.data.data);
    return res.data.data;
  } catch (e: unknown) {
    // If refresh fails, clear auth state and localStorage
    if (
      (e &&
        typeof e === "object" &&
        "response" in e &&
        (e as { response?: { status?: number } }).response?.status === 401) ||
      (e &&
        typeof e === "object" &&
        "message" in e &&
        (e as { message?: string }).message?.includes("No tokens found"))
    ) {
      clearAuthHeader();
      thunkAPI.dispatch(clearAuth());

      // Clear invalid tokens from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }

      // Silently fail - user will need to log in again
      return thunkAPI.rejectWithValue("Session expired");
    }
    return thunkAPI.rejectWithValue(
      handleError(e, "Session expired, please log in again.")
    );
  }
});

export const updateUser = createAsyncThunk<IUpdateUserResponse, IUser>(
  "users/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("🟢 payload перед відправкою:", payload);
      const form = new FormData();

      appendIf(form, "name", payload.name);
      appendIf(form, "first_name", payload.name);
      appendIf(form, "last_name", payload.surname);

      appendIf(form, "email", payload.email);
      // appendIf(form, "gender", payload.gender);
      // appendIf(form, "language", payload.language);
      // appendIf(form, "phone", payload.phone);
      // appendIf(form, "birthday", payload.birthday);
      appendIf(form, "password", payload.password);
      if (payload.avatarUrl) {
        form.append("avatarUrlLocal", payload.avatarUrl); // 👈 multer.single('avatarUrlLocal')
      }

      // Для діагностики:
      for (const [k, v] of form.entries()) {
        console.log("📦 FormData", k, v);
      }

      const res = await instance.patch<IUpdateUserResponse>(
        "auth/update-current-user",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // if (res.data.token) setAuthHeader(res.data.token);
    console.log("✅ server:", res.data);
      return res.data;
    } catch (error) {
      const e = error as AxiosError<{ message?: string }>;
      console.error("❌ updateUser", e.response?.data || e.message);
      return rejectWithValue(e.response?.data?.message || e.message || "Failed to update.");
    }
  }
);

export const signoutUser = createAsyncThunk<void, void, { state: RootState }>(
  "users/signout",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    if (!token) return rejectWithValue("User is not authenticated.");

    try {
      await instance.post("auth/logout", { accessToken: token });
      clearAuthHeader();
    } catch (e) {
      return rejectWithValue(handleError(e, "Failed to signout."));
    } finally {

      clearAuthHeader();

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("guestCart");
      }

      dispatch(clearCartState());
    }
  }
);
