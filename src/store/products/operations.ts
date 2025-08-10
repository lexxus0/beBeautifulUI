import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { IProductResponse } from "@/types/types";
import axios from "axios";

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
      function sleep(ms: number) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        await sleep(2000)

      return {
        data: res.data.data,
        pagination: res.data.pagination,
      };
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        return {
          data: [],
          pagination: {
            total: 0,
            totalPages: 1,
          },
        };
      }
      return ThunkAPI.rejectWithValue(
        handleError(e, "Failed to fetch products")
      );
    }
  }
);
