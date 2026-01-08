import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthHeader, handleError, instance, setAuthHeader } from "../init";
import {
  IUpdateUserApiUser,
  IUpdateUserPayload,
  IUser,
  IUserResponse,
  RefreshResponse,
  RegisterError,
  ServerErrorBody,
} from "@/types/types";
import { RootState } from "../store";
import { clearAuth } from "./slice";
import { AxiosError, isAxiosError } from "axios";
import { clearCartState } from "../cart/slice";
import { clearAuthTokens, getAuthTokens } from "@/helpers/authUtils";
import { appendIf } from "@/helpers/hooks/appendIf";
import { normalizeBackendImageUrl } from "@/helpers/normalizeImage";

export const registerUser = createAsyncThunk<
  IUserResponse,
  IUser,
  { rejectValue: RegisterError }
>("users/signup", async (credentials, { rejectWithValue }) => {
  try {
    const payload = {
      first_name: credentials.first_name,
      email: credentials.email,
      password: credentials.password,
      agree: credentials.agree,
    };
    const res = await instance.post("auth/register", payload);

    if (!res.data?.data) {
      return rejectWithValue({
        code: 500,
        message: "Invalid server response.",
      });
    }

    const { accessToken, refreshToken } = res.data.data;

    if (!accessToken) {
      return rejectWithValue({
        code: 500,
        message: "No access token in response.",
      });
    }

    setAuthHeader(accessToken);

    return { accessToken, refreshToken };
  } catch (err: unknown) {
    if (isAxiosError<ServerErrorBody>(err)) {
      const status = err.response?.status;
      const body = err.response?.data;

      // 🎯 спец-кейс: email вже зайнятий
      if (status === 409) {
        return rejectWithValue({
          code: 409,
          field: "email",
          message: body?.data || "Цей email вже використовується",
        });
      }

      // інші помилки
      return rejectWithValue({
        code: status ?? 500,
        message: body?.message || "Failed to register.",
      });
    }

    return rejectWithValue({ code: 500, message: "Unexpected error." });
  }
});

export const loginUser = createAsyncThunk<
  IUserResponse & { user: IUser },
  Partial<IUser>
>("users/signin", async (credentials, { rejectWithValue }) => {
  try {
    const res = await instance.post("auth/login", credentials);
    const { accessToken, refreshToken } = res.data.data;

    if (accessToken) {
      setAuthHeader(accessToken);
    }
    const userRes = await instance.get("/auth/current");

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
    // console.log(accessToken);

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

export const updateUser = createAsyncThunk<IUser, IUpdateUserPayload>(
  "users/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      // console.log("🟢 payload перед відправкою:", payload);
      const form = new FormData();

      appendIf(form, "first_name", payload.first_name);
      appendIf(form, "last_name", payload.last_name);

      appendIf(form, "email", payload.email);
      // appendIf(form, "gender", payload.gender);
      // appendIf(form, "language", payload.language);
      appendIf(form, "telephone", payload.telephone);
      appendIf(form, "dateOfBirth", payload.dateOfBirth);
      appendIf(form, "password", payload.password);
      if (payload.photo) {
        form.append("photo", payload.photo);
      }

      // Для діагностики:
      // for (const [k, v] of form.entries()) {
      //   console.log("📦 FormData", k, v);
      // }

      const res = await instance.patch<{
        status: number;
        message: string;
        data: IUpdateUserApiUser;
      }>("auth/update-current-user", form);

      // console.log("✅ server:", res.data);

      const user = res.data.data;

      const normalized: IUser = {
        ...user,
        photo: normalizeBackendImageUrl(user.photo),
      };

      return normalized;
    } catch (error) {
      const e = error as AxiosError<{ message?: string }>;
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
