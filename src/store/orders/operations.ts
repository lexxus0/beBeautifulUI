import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance } from "../init";
import { RootState } from "../store";
import { ICertificate, IOrderItemDraft, IOrderResponse } from "@/types/orders";

export const fetchAllOrders = createAsyncThunk<
  IOrderResponse[],
  void,
  { rejectValue: string }
>("orders/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await instance.get("/orders");
    return res.data as IOrderResponse[];
  } catch (e: unknown) {
    return rejectWithValue(handleError(e, "Failed to fetch all orders"));
  }
});

export const fetchOrderById = createAsyncThunk<
  IOrderResponse,
  string,
  { rejectValue: string }
>("orders/fetchById", async (id, { rejectWithValue }) => {
  try {
    const res = await instance.get(`/orders/${id}`);
    return res.data as IOrderResponse;
  } catch (e: unknown) {
    return rejectWithValue(handleError(e, "Failed to fetch order by id"));
  }
});


export const fetchAllCertificates = createAsyncThunk<
  ICertificate[],
  void,
  { rejectValue: string }
>("certificates/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await instance.get(`/certificates`);
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

export const spendCertificate = createAsyncThunk<
  ICertificate,
  { number: string; amount: number },
  { rejectValue: string }
>("certificates/spend", async ({ number, amount }, { rejectWithValue }) => {
  try {
    const res = await instance.patch(`/certificates/spend/${number}`, {
      amount,
    });
    return res.data as ICertificate;
  } catch (e: unknown) {
    return rejectWithValue(handleError(e, "Failed to spend certificate"));
  }
});

export const createOrder = createAsyncThunk<
  IOrderResponse,
  void,
  { state: RootState; rejectValue: string }
>("orders/create", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const draft = state.orders.draft;
    const user = state.auth.user;

    if (!draft.items.length) return rejectWithValue("Кошик порожній");
    if (!draft.delivery) return rejectWithValue("Оберіть доставку");
    if (!draft.paymentMethod) return rejectWithValue("Оберіть метод оплати");

    const customerName = (
      draft.customer?.customerName ??
      `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()
    ).trim();

    const phone = (draft.customer?.phone ?? user?.telephone ?? "").trim();

    const email =
      (draft.customer?.email ?? user?.email ?? "").trim() || undefined;

    if (!customerName || !phone) {
      return rejectWithValue("Заповніть дані отримувача (імʼя та телефон)");
    }

    const hasCert =
      !!draft.certificateCode && (draft.certificateDiscount ?? 0) > 0;

    const payload = {
      clientId: user?._id ?? null,
      items: draft.items.map((item: IOrderItemDraft) => ({
        product: item.product?._id,
        selectedVolume: item.selectedVolume,
        quantity: item.quantity,
      })),

      customerName,
      phone,
      email,

      deliveryType: draft.delivery.deliveryType,
      city: draft.delivery.city,
      branchNumber:
        draft.delivery.deliveryType === "branch"
          ? draft.delivery.branchNumber
          : undefined,
      street:
        draft.delivery.deliveryType === "address"
          ? draft.delivery.street
          : undefined,
      house:
        draft.delivery.deliveryType === "address"
          ? draft.delivery.house
          : undefined,
      apartment:
        draft.delivery.deliveryType === "address"
          ? draft.delivery.apartment
          : undefined,
      paymentMethod: draft.paymentMethod,

      comment: draft.comment ?? "",
      certificateCode: hasCert ? draft.certificateCode : undefined,
      certificateDiscount: hasCert ? draft.certificateDiscount : undefined,
    };

    const payloadClean = Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== undefined)
    );

    const res = await instance.post("/orders", payloadClean);
    return res.data.order as IOrderResponse;
  } catch (e: unknown) {
    return rejectWithValue(handleError(e, "Не вдалося створити замовлення"));
  }
});
