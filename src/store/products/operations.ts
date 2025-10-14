import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { IProduct, IProductResponse, UpdateCartPayload } from "@/types/types";
import axios from "axios";
import { toast } from "react-hot-toast";


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

export const updateCart = createAsyncThunk<void, UpdateCartPayload>(
  "products/updateCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      await instance.post("/cart", {
        productId,
        quantity,
      });

      toast.success("Товар додано до кошика", { position: "top-right" });
    } catch {
      const message = "Не вдалося додати товар до кошика";
      toast.error(message, { position: "top-right" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);
