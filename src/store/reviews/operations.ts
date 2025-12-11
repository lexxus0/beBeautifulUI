import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance, setAuthHeader } from "../init";
import {
  CreateReviewData,
  IUIReview,
  IProductReviewResponse,
  IWebReviewResponse,
  UpdateReviewData,
} from "@/types/reviews";
import { RootState } from "../store";
import { refreshAndLoadUser } from "../auth/operations";
import { clearAuth } from "../auth/slice";
import { normalizeReview } from "@/helpers/normalizeReview";

export const fetchWebReviews = createAsyncThunk<
  IUIReview[],
  void,
  { rejectValue: string; state: RootState }
>("reviews/fetchWeb", async (_, ThunkAPI) => {
  try {
    const { auth } = ThunkAPI.getState();
    const currentUserId = auth.user?._id;

    const res = await instance.get<IWebReviewResponse>("/web-reviews", {
      params: { page: 1, limit: 20 },
    });

    return res.data.data.map((r) => normalizeReview(r, currentUserId));
  } catch {
    return ThunkAPI.rejectWithValue("Failed to fetch web reviews");
  }
});

export const fetchProductReviews = createAsyncThunk<
  { productId: string; reviews: IUIReview[] },
  { productId: string },
  { rejectValue: string; state: RootState }
>("reviews/fetchProduct", async ({ productId }, ThunkAPI) => {
  try {
    const { auth } = ThunkAPI.getState();
    const currentUserId = auth.user?._id;

    const res = await instance.get<IProductReviewResponse>(
      `/products/${productId}/reviews`,
      { params: { page: 1, limit: 20 } }
    );

    return {
      productId,
      reviews: res.data.data.map((r) => normalizeReview(r, currentUserId)),
    };
  } catch {
    return ThunkAPI.rejectWithValue("Failed to fetch product reviews");
  }
});

export const reactToWebReview = createAsyncThunk<
  IUIReview,
  { id: string; type: "like" | "dislike" },
  { rejectValue: string; state: RootState }
>("reviews/reactWeb", async ({ id, type }, ThunkAPI) => {
  try {
    const { auth } = ThunkAPI.getState();
    const currentUserId = auth.user?._id;

    const res = await instance.patch(`/web-reviews/${id}/react`, { type });
    return normalizeReview(res.data.data, currentUserId);
  } catch (error) {
    return ThunkAPI.rejectWithValue(
      handleError(error, `Failed to ${type} review`)
    );
  }
});

export const reactToProductReview = createAsyncThunk<
  IUIReview,
  { id: string; type: "like" | "dislike" },
  { state: RootState; rejectValue: string }
>("reviews/reactProduct", async ({ id, type }, ThunkAPI) => {
  try {
    const { auth } = ThunkAPI.getState();
    const currentUserId = auth.user?._id;

    const res = await instance.patch(`/reviews/${id}/react`, { type });
    return normalizeReview(res.data.data, currentUserId);
  } catch (error) {
    return ThunkAPI.rejectWithValue(
      handleError(error, `Failed to ${type} review`)
    );
  }
});

// New operations for backend integration
export const createReview = createAsyncThunk<
  IUIReview,
  CreateReviewData,
  { rejectValue: string; state: RootState }
>("reviews/create", async (data, ThunkAPI) => {
  try {
    const state = ThunkAPI.getState();
    const user = state.auth.user;
    const accessToken = state.auth.accessToken;
    // const isLoggedIn = state.auth.isLoggedIn;

    // Check if user is properly authenticated
    if (!user) {
      return ThunkAPI.rejectWithValue(
        "User must be logged in to create a review"
      );
    }

    // If no access token in Redux state, try to refresh the session
    if (!accessToken) {
      try {
        await ThunkAPI.dispatch(refreshAndLoadUser()).unwrap();
      } catch {
        ThunkAPI.dispatch(clearAuth());
        return ThunkAPI.rejectWithValue("Please log in again.");
      }
    }
    setAuthHeader(accessToken);

    const res = await instance.post("/reviews", data);

    return normalizeReview(res.data.data, user._id);
  } catch (e: unknown) {
    return ThunkAPI.rejectWithValue(handleError(e, "Failed to create review"));
  }
});

export const updateReview = createAsyncThunk<
  IUIReview,
  { id: string; data: UpdateReviewData },
  { rejectValue: string; state: RootState }
>("reviews/update", async ({ id, data }, ThunkAPI) => {
  try {
    const { auth } = ThunkAPI.getState();
    const currentUserId = auth.user?._id;

    const res = await instance.patch(`/reviews/${id}`, data);

    return normalizeReview(res.data.data, currentUserId);
  } catch (e: unknown) {
    return ThunkAPI.rejectWithValue(handleError(e, "Failed to update review"));
  }
});

export const deleteReview = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>("reviews/delete", async ({ id }, ThunkAPI) => {
  try {
    await instance.delete(`/reviews/${id}`);
    return { id };
  } catch (e: unknown) {
    return ThunkAPI.rejectWithValue(handleError(e, "Failed to delete review"));
  }
});
