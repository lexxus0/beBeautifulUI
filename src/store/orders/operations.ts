import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { RootState } from "../store";
import { ICertificate, IOrder } from "@/types/orders";
import { ICartItem } from "@/types/cart";

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

    console.log("certificates ", res.data.data);
    return res.data.data as ICertificate[];
  } catch (e: unknown) {
    return rejectWithValue(handleError(e, "Failed to fetch all certificates"));
  }
});

export const fetchCertificateByNumber = createAsyncThunk<
  ICertificate,
  string,
  { rejectValue: string }
>("certificates/fetchByIds", async (number, { rejectWithValue }) => {
  try {
    const res = await instance.get(`/certificates/number/${number}`);

    // console.log('res.data.data cert: ', res.data.data);
    return res.data as ICertificate;
  } catch (e: unknown) {
    return rejectWithValue(handleError(e, "Failed to fetch certificate"));
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

export const createOrder = createAsyncThunk<
  IOrder,
  void,
  { state: RootState; rejectValue: string }
>("orders/create", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const draft = state.orders.draft;
    const user = state.auth.user;

    if (!draft.items.length) {
      return rejectWithValue("Кошик порожній");
    }

    const payload = {
      clientId: user?._id,
      items: draft.items.map((item: ICartItem) => ({
        product: item.product._id,
        selectedVolume: item.selectedVolume,
        quantity: item.quantity,
      })),
      customerName: `${user?.first_name ?? ""} ${user?.last_name ?? ""}`,
      phone: user?.phone ?? "",
      email: user?.email ?? "",
      comment: draft.comment ?? "",
      deliveryMethod: "nova_poshta",
      city: draft.delivery?.city ?? "",
      warehouse: draft.delivery?.warehouse ?? "",
      street: draft.delivery?.street ?? "",
      house: draft.delivery?.house ?? "",
      apartment: draft.delivery?.apartment ?? "",
      certificate: draft.certificate ?? null,
      totalAmount: draft.totalAmount,
      paymentMethod: draft.paymentMethod,
    };

    console.log("📦 ORDER PAYLOAD:", payload);
    const res = await instance.post("/orders", payload);

    console.log("🟢 ORDER CREATED ON BACKEND:", res.data);
    return res.data.order; // тут буде paymentLink
  } catch {
    return rejectWithValue("Не вдалося створити замовлення");
  }
});
