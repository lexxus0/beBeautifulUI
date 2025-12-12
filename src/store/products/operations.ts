import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { IProduct, IProductResponse } from "@/types/types";
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

      // console.log("LIST PRODUCT RAW:", res.data);
      // console.log("LIST PRODUCT KEYS:", Object.keys(res.data.data[0]));

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

export const fetchProductsHome = createAsyncThunk<
  { data: Record<string, IProduct[]> },
  void,
  { rejectValue: string }
>("products/fetchHome", async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get("/products/home");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch home products"
      );
    }
    return rejectWithValue("Failed to fetch home products");
  }
});

export const fetchProductById = createAsyncThunk<
  IProduct,
  string,
  { rejectValue: string }
>("products/fetchById", async (id, ThunkAPI) => {
  try {
    const res = await instance.get(`/products/${id}`);

    // console.log("DETAIL PRODUCT RAW:", res.data);
    // console.log("DETAIL PRODUCT KEYS:", Object.keys(res.data.data || res.data));

    const product = res.data.data as IProduct;
    // console.log("product: ", product);

    if (!product) {
      throw new Error("Product data is missing in response");
    }

    return product;
  } catch (error: unknown) {
    console.error("Failed to fetch product:", error);

    return ThunkAPI.rejectWithValue(
      handleError(error, "Failed to fetch product")
    );
  }
});

export const fetchProductsByIds = createAsyncThunk<
  IProduct[],
  string[],
  { rejectValue: string }
>("products/fetchByIds", async (ids, ThunkAPI) => {
  try {
    const responses = await Promise.all(
      ids.map((id) => instance.get(`/products/${id}`))
    );
    const data = responses.map((res) => res.data.data as IProduct);

    return data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return [];
    }
    return ThunkAPI.rejectWithValue(
      handleError(e, "Failed to fetch recently viewed products")
    );
  }
});
