import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { IProductResponse } from "@/types/types";

export const fetchProducts = createAsyncThunk<
  IProductResponse,
  { limit: number; currentPage: number; category?: string },
  { rejectValue: string }
>("products/fetchAll", async ({ limit, currentPage, category }, ThunkAPI) => {
  try {
    const res = await instance.get("/products", {
      params: { perPage: limit, page: currentPage, category },
    });

    return {
      data: res.data.data,
      pagination: res.data.pagination,
    };
  } catch (e) {
    return ThunkAPI.rejectWithValue(handleError(e, "Failed to fetch products"));
  }
});
