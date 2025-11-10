import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearAuthHeader,
  handleError,
  instance,
  setAuthHeader,
} from "../init";
import {
  IUpdateUserResponse,
  IUser,
  IUserResponse,
  RefreshResponse,
} from "@/types/types";
import { RootState } from "../store";
import { clearAuth } from "./slice";
import { AxiosError } from "axios";
import { clearCartState } from "../cart/slice";
import { syncCartFromGuest } from "../cart/operations";
import { clearAuthTokens, getAuthTokens } from "@/helpers/authUtils";

const appendIf = (form: FormData, key: string, v?: string) => {
  if (v && v.trim() !== "") form.append(key, v);
};

export const registerUser = createAsyncThunk<IUserResponse, IUser>(
  "users/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await instance.post("auth/register", credentials);
      const { accessToken, refreshToken } = res.data.data;

       if (accessToken) {
        setAuthHeader(accessToken);
      }

      // return res.data.data;
      return { accessToken, refreshToken };
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

    if (accessToken) {
      setAuthHeader(accessToken);
    }

    await dispatch(syncCartFromGuest()).unwrap();

    // Fetch current user info immediately after login
    const userRes = await instance.get("/auth/current");

    // return {
    //   ...res.data.data,
    //   user: userRes.data.data,
    // };
    return {
      accessToken,
      refreshToken,
      user: userRes.data.data as IUser,
    };
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to login."));
  }
});

export const refreshUser = createAsyncThunk<
  RefreshResponse,
  void,
  { state: RootState }
>("auth/refresh", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    let refreshToken = state.auth.refreshToken;
    let accessToken = state.auth.accessToken;

    if (!refreshToken || !accessToken) {
      const loaded = getAuthTokens();
      refreshToken = loaded.refreshToken;
      accessToken = accessToken ?? loaded.accessToken;
    }

    if (!refreshToken) {
      return rejectWithValue("No refresh token found");
    }

    if (accessToken) {
      setAuthHeader(accessToken);
    }

    const res = await instance.post("/auth/refresh", { refreshToken });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      res.data.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
      }

    setAuthHeader(newAccessToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    const e = error as AxiosError<{ message?: string }>;

    clearAuthHeader();
    clearAuthTokens();

    return rejectWithValue(
      e.response?.data?.message || "Failed to refresh session"
    );
  }
});

export const getCurrentUser = createAsyncThunk<
  IUser,
  void,
  { state: RootState }
>("users/current", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    let accessToken = state.auth.accessToken;
    console.log(accessToken);

    if (!accessToken) {
      const loaded = getAuthTokens();
      accessToken = loaded.accessToken;
    }

    if (!accessToken) {
      return thunkAPI.rejectWithValue("No access token found.");
    }

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
>(
  "users/refreshAndLoad",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();

    // If no tokens exist in Redux state, try to get them from localStorage
    let accessToken = state.auth.accessToken;
    let refreshToken = state.auth.refreshToken;

    if (!accessToken || !refreshToken) {
      const loaded = getAuthTokens();
      accessToken = accessToken ?? loaded.accessToken;
      refreshToken = refreshToken ?? loaded.refreshToken;
    }

    if (!refreshToken) {
      return rejectWithValue("No authentication tokens found.");
    }

    try {
      if (accessToken) {
        setAuthHeader(accessToken);
      }
      // 1) спроба отримати юзера з поточним accessToken
      try {
        const res = await instance.get("/auth/current");
        return res.data.data as IUser;
      } catch (error: unknown) {
        const err = error as AxiosError;
        if (err?.response?.status !== 401) {
          throw error; // інша помилка — пробросимо далі
        }
      }

      // 2) якщо 401 — пробуємо рефрешнути
      const refreshResult = await dispatch(refreshUser()).unwrap();

      setAuthHeader(refreshResult.accessToken);

      const res = await instance.get("/auth/current");
      return res.data.data as IUser;
    } catch {
     // 3) якщо нічого не вийшло — дропаємо сесію
     dispatch(clearAuth());
     clearAuthHeader();
     clearAuthTokens();
 
     return rejectWithValue("Session expired, please log in again.");
    }
  }
);

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
      return rejectWithValue(
        e.response?.data?.message || e.message || "Failed to update."
      );
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
