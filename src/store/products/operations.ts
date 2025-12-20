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

      const products: IProduct[] = res.data.data;

      const productsById: Record<string, IProduct> = {};
      const ids: string[] = [];

      products.forEach((product: IProduct) => {
        productsById[product._id] = product;
        ids.push(product._id);
      });

      return {
        productsById,
        productsListIds: ids,
        pagination: res.data.pagination,
      };
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        return {
          productsById: {},
          productsListIds: [],
          pagination: { total: 0, totalPages: 1 },
        };
      }
      return ThunkAPI.rejectWithValue(
        handleError(e, "Failed to fetch products")
      );
    }
  }
);

export const fetchProductsHome = createAsyncThunk<
  {
    productsById: Record<string, IProduct>;
    productsByCategoryIds: Record<string, string[]>;
  },
  void,
  { rejectValue: string }
>("products/fetchHome", async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get("/products/home");
    const data: Record<string, IProduct[]> = response.data.data;

    const productsById: Record<string, IProduct> = {};
    const productsByCategoryIds: Record<string, string[]> = {};

    for (const category in data) {
      const categoryData = data[category];
      productsByCategoryIds[category] = categoryData.map(
        (product: IProduct) => product._id
      );

      categoryData.forEach((product: IProduct) => {
        productsById[product._id] = product;
      });
    }
    return {
      productsById,
      productsByCategoryIds,
    };
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
  {
    product: IProduct;
    productId: string;
  },
  string,
  { rejectValue: string }
>("products/fetchById", async (id, ThunkAPI) => {
  try {
    const res = await instance.get(`/products/${id}`);
    const product = res.data.data as IProduct;

    if (!product) {
      throw new Error("Product data is missing in response");
    }

    return { product, productId: id };
  } catch (error: unknown) {
    console.error("Failed to fetch product:", error);

    return ThunkAPI.rejectWithValue(
      handleError(error, "Failed to fetch product")
    );
  }
});

export const fetchProductsByIds = createAsyncThunk<
  {
    productsById: Record<string, IProduct>;
    recentlyViewedIds: string[];
  },
  string[],
  { rejectValue: string }
>("products/fetchByIds", async (ids, ThunkAPI) => {
  try {
    const productsById: Record<string, IProduct> = {};
        const validIds: string[] = [];

    for (const id of ids) {
      try {
        const res = await instance.get(`/products/${id}`);
        const product = res.data.data as IProduct;
        productsById[id] = product;
        validIds.push(id);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.warn("Removing missing product:", id);
        } else {
          throw error;
        }
      }
    }
    localStorage.setItem("visitedProducts", JSON.stringify(validIds));
    return {productsById, recentlyViewedIds: validIds};
  } catch (e: unknown) {
    return ThunkAPI.rejectWithValue(
      handleError(e, "Failed to fetch recently viewed products")
    );
  }
});
