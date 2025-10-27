import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance, setAuthHeader } from "../init";
import { IReviewResponse, IReview } from "@/types/types";
import { CreateReviewData, UpdateReviewData } from "@/types/reviews";
import { setProductReviews } from "./slice";
import { RootState } from "../store";
import { refreshAndLoadUser } from "../auth/operations";
import { clearAuth } from "../auth/slice";


export const fetchReviews = createAsyncThunk<
  IReviewResponse,
  { productId?: string; limit: number; currentPage: number },
  { rejectValue: string }
>("reviews/fetchAll", async ({ productId, limit, currentPage }) => {
  try {
    let endpoint: string;
    let params: Record<string, string | number>;

    if (productId) {
      // Use product-specific endpoint
      endpoint = `/products/${productId}/reviews`;
      params = { page: currentPage, limit };
    } else {
      // Use general reviews endpoint
      endpoint = "/reviews";
      params = { page: currentPage, limit };
    }

    const res = await instance.get(endpoint, { params });

    // Transform backend reviews to frontend format
    const reviews = res.data.data || [];
    const transformedReviews: IReview[] = reviews.map((review: Record<string, unknown>) => ({
      _id: review._id,
      productId: review.productId,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment || "",
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      // Frontend-specific fields
      name: (review.author as { name?: string })?.name || "Користувач",
      location: "Київ", // This should come from user profile
      likes: 0, // These will be implemented later
      dislikes: 0,
      hasLiked: false,
      hasDisliked: false,
    }));

    return {
      data: transformedReviews,
      pagination: res.data.pagination || {
        total: res.data.data?.length || 0,
        perPage: limit,
        totalPages: Math.ceil((res.data.data?.length || 0) / limit),
        page: currentPage,
      },
    };
  } catch (e) {
    console.warn("Failed to fetch reviews:", e);
    // Return empty data instead of throwing error
    return {
      data: [],
      pagination: {
        total: 0,
        perPage: limit,
        totalPages: 0,
        page: currentPage,
      },
    };
  }
});

export const reactToReview = createAsyncThunk<
  { id: string; type: "like" | "dislike" },
  { id: string; type: "like" | "dislike" },
  { rejectValue: string }
>("reviews/react", async ({ id, type }, ThunkAPI) => {
  try {
    await instance.patch(`/web-reviews/${id}/react`, { type });
    return { id, type };
  } catch (e) {
    return ThunkAPI.rejectWithValue(handleError(e, `Failed to ${type} review`));
  }
});

// New operations for backend integration
export const createReview = createAsyncThunk<
  IReview,
  CreateReviewData,
  { rejectValue: string; state: RootState }
>("reviews/create", async (data, ThunkAPI) => {
  try {
    const state = ThunkAPI.getState();
    const user = state.auth.user;
    const accessToken = state.auth.accessToken;
    const isLoggedIn = state.auth.isLoggedIn;

    // Check if user is properly authenticated
    if (!user || !isLoggedIn) {
      return ThunkAPI.rejectWithValue("User must be logged in to create a review");
    }

    // If no access token in Redux state, try to refresh the session
    if (!accessToken) {
      try {
        const refreshResult = await ThunkAPI.dispatch(refreshAndLoadUser()).unwrap();
        if (refreshResult) {
          const updatedState = ThunkAPI.getState();
          const newToken = updatedState.auth.accessToken;
          if (newToken) {
            setAuthHeader(newToken);
          } else {
            return ThunkAPI.rejectWithValue("Session expired. Please log in again.");
          }
        }
      } catch {
        ThunkAPI.dispatch(clearAuth());
        return ThunkAPI.rejectWithValue("Session expired. Please log in again.");
      }
    } else {
      setAuthHeader(accessToken);
    }

    // Use proper API endpoint with correct data structure
    const reviewData = {
      productId: data.productId,
      rating: data.rating,
      comment: data.comment,
    };
    
    const res = await instance.post("/reviews", reviewData);
    
    // The API should return the complete review object
    const createdReview: IReview = {
      _id: res.data.data._id,
      productId: res.data.data.productId,
      userId: res.data.data.userId,
      rating: res.data.data.rating,
      comment: res.data.data.comment || "",
      createdAt: res.data.data.createdAt,
      updatedAt: res.data.data.updatedAt,
      // Frontend-specific fields
      name: res.data.data.author?.name || user.name || user.email || "Користувач",
      location: "Київ", // This should come from user profile or API
      likes: 0,
      dislikes: 0,
      hasLiked: false,
      hasDisliked: false,
    };
    
    return createdReview;
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'response' in e && (e as { response?: { status?: number } }).response?.status === 409) {
      return ThunkAPI.rejectWithValue("You have already reviewed this product");
    } else if (e && typeof e === 'object' && 'response' in e && (e as { response?: { status?: number } }).response?.status === 401) {
      ThunkAPI.dispatch(clearAuth());
      return ThunkAPI.rejectWithValue("Session expired. Please log in again.");
    }
    const errorMessage = e && typeof e === 'object' && 'response' in e 
      ? (e as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to create review"
      : "Failed to create review";
    return ThunkAPI.rejectWithValue(errorMessage);
  }
});

export const updateReview = createAsyncThunk<
  IReview,
  { id: string; data: UpdateReviewData },
  { rejectValue: string }
>("reviews/update", async ({ id, data }, ThunkAPI) => {
  try {
    const res = await instance.patch(`/reviews/${id}`, data);
    return res.data.data;
  } catch (e: unknown) {
    const errorMessage = e && typeof e === 'object' && 'response' in e 
      ? (e as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to update review"
      : "Failed to update review";
    return ThunkAPI.rejectWithValue(errorMessage);
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
    const errorMessage = e && typeof e === 'object' && 'response' in e 
      ? (e as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to delete review"
      : "Failed to delete review";
    return ThunkAPI.rejectWithValue(errorMessage);
  }
});

export const fetchProductReviews = createAsyncThunk<
  { productId: string; reviews: IReview[] },
  { productId: string; limit?: number },
  { rejectValue: string; state: RootState }
>("reviews/fetchProduct", async ({ productId, limit = 10 }, ThunkAPI) => {
  try {
    const state = ThunkAPI.getState();
    const accessToken = state.auth.accessToken;
    
    // Set auth header if available
    if (accessToken) {
      setAuthHeader(accessToken);
    }

    // Use proper product-specific endpoint
    const res = await instance.get(`/products/${productId}/reviews`, {
      params: { 
        limit, 
        page: 1
      },
    });

    const reviews = res.data.data || [];
    
    // Transform backend reviews to frontend format
    const transformedReviews: IReview[] = reviews.map((review: Record<string, unknown>) => ({
      _id: review._id,
      productId: review.productId,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment || "",
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      // Frontend-specific fields
      name: (review.author as { name?: string })?.name || "Користувач",
      location: "Київ", // This should come from user profile
      likes: 0, // These will be implemented later
      dislikes: 0,
      hasLiked: false,
      hasDisliked: false,
    }));
    
    // Update the store with product-specific reviews
    ThunkAPI.dispatch(setProductReviews({ productId, reviews: transformedReviews }));
    
    return { productId, reviews: transformedReviews };
  } catch (e) {
    console.warn("Failed to fetch product reviews:", e);
    // Return empty array on error
    return { productId, reviews: [] };
  }
});

export const fetchReviewSummary = createAsyncThunk<
  { productId: string; summary: { avg: number; count: number } },
  { productId: string },
  { rejectValue: string }
>("reviews/summary", async ({ productId }, ThunkAPI) => {
  try {
    const res = await instance.get(`/products/${productId}/reviews/summary`);
    return { productId, summary: res.data.data };
  } catch (e: unknown) {
    const errorMessage = e && typeof e === 'object' && 'message' in e 
      ? (e as { message?: string }).message || "Failed to fetch review summary"
      : "Failed to fetch review summary";
    return ThunkAPI.rejectWithValue(errorMessage);
  }
});
