import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { ICertificate, IOrder } from "@/types/types";

export const fetchAllOrders = createAsyncThunk<
  IOrder[],
  void,
  { rejectValue: string }
>("orders/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await instance.get("/orders");
    // console.log("orders:", res.data.data);
    return res.data.data as IOrder[];
  } catch (e: unknown) {
    return rejectWithValue(handleError(e, "Failed to fetch all orders"));
  }
});

export const fetchAllCertificates = createAsyncThunk<
  ICertificate[],
  void,
  { rejectValue: string }
>("certificates/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await instance.get(`/certificates`);

    // console.log("certificates ", res.data.data);
    return res.data.data as ICertificate[];
  } catch (e: unknown) {
    return rejectWithValue(handleError(e, "Failed to fetch all certificates"));
  }
});

export const fetchCertificateById = createAsyncThunk<
  ICertificate,
  string,
  { rejectValue: string }
>("certificates/fetchByIds", async (id, { rejectWithValue }) => {
  try {
    const res = await instance.get(`/certificates/${id}`);

    return res.data.data as ICertificate;
  } catch (e: unknown) {
    return rejectWithValue(handleError(e, "Failed to fetch certificate"));
  }
});
