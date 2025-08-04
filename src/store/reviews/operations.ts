import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { IReviewResponse } from "@/types/types";

export const fetchReviews = createAsyncThunk<
  IReviewResponse,
  { limit: number; currentPage: number },
  { rejectValue: string }
>("reviews/fetchAll", async ({ limit, currentPage }, ThunkAPI) => {
  try {
    const res = await instance.get("/web-reviews", {
      params: { perPage: limit, page: currentPage },
    });

    return {
      data: res.data.data,
      pagination: res.data.pagination,
    };
  } catch (e) {
    return ThunkAPI.rejectWithValue(handleError(e, "Failed to fetch reviews"));
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
