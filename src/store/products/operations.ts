import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { IProductResponse } from "@/types/types";

export const fetchProducts = createAsyncThunk<
  IProductResponse,
  {
    limit: number;
    currentPage: number;
    category?: string;
    volumeOptions?: string;
    keyword?: string;
  },
  { rejectValue: string }
>(
  "products/fetchAll",
  async (
    { limit, currentPage, category, volumeOptions, keyword },
    ThunkAPI
  ) => {
    try {
      const res = await instance.get("/products", {
        params: {
          perPage: limit,
          page: currentPage,
          category,
          volumeOptions,
          keyword,
        },
      });

      return {
        data: res.data.data,
        pagination: res.data.pagination,
      };
    } catch (e) {
      return ThunkAPI.rejectWithValue(
        handleError(e, "Failed to fetch products")
      );
    }
  }
);
