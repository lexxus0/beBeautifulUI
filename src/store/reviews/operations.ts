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
