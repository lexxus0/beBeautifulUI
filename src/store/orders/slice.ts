import {
  ICertificate,
  IDelivery,
  IOrder,
  IOrderDraft,
  IOrderItem,
  PaymentChoice,
} from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllCertificates,
  fetchAllOrders,
  fetchCertificateById,
} from "./operations";

interface OrderState {
  draft: IOrderDraft;
  currentOrder: IOrder | null;
  orders: IOrder[] | null;
  certificates: ICertificate[] | null;
  error: string | null;
  isLoading: boolean;
}

const initialDraft: IOrderDraft = {
  items: [],
  delivery: null,
  paymentMethod: null,
  comment: "",
  certificate: null,
  amount: 0,
  totalAmount: 0,
};

const initialState: OrderState = {
  draft: initialDraft,
  currentOrder: null,
  orders: null,
  certificates: null,
  error: null,
  isLoading: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setFromBasket(
      state,
      action: PayloadAction<{ items: IOrderItem[]; amount: number }>
    ) {
      state.draft.items = action.payload.items;
      state.draft.amount = action.payload.amount;
      state.draft.totalAmount = action.payload.amount;
    },
    setDelivery(state, action: PayloadAction<IDelivery>) {
      state.draft.delivery = action.payload;
    },

    setPaymentMethod(state, action: PayloadAction<PaymentChoice>) {
      state.draft.paymentMethod = action.payload;
    },

    setComment(state, action: PayloadAction<string>) {
      state.draft.comment = action.payload;
    },

    setCertificate(state, action: PayloadAction<ICertificate | null>) {
      state.draft.certificate = action.payload;
    },

    setTotalAmount(state, action: PayloadAction<number>) {
      state.draft.totalAmount = action.payload;
    },

    resetOrderState(state) {
      state.draft = initialDraft;
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.orders = action.payload;
        // console.log("state.orders: ", state.draft.certificate);
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Не вдалося завантажити сертифікати";
        state.isLoading = false;
      })
      .addCase(fetchAllCertificates.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchAllCertificates.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.certificates = action.payload;
        // console.log("state.draft.certificate: ", state.draft.certificate);
      })
      .addCase(fetchAllCertificates.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Не вдалося завантажити сертифікати";
        state.isLoading = false;
      })
      .addCase(fetchCertificateById.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchCertificateById.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.draft.certificate = action.payload;
        // console.log("state.draft.certificate: ", state.draft.certificate);
      })
      .addCase(fetchCertificateById.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Не вдалося завантажити сертифікати";
        state.isLoading = false;
      });
  },
});

export const {
  setFromBasket,
  setDelivery,
  setPaymentMethod,
  setComment,
  setCertificate,
  setTotalAmount,
  resetOrderState,
} = ordersSlice.actions;

export default ordersSlice.reducer;
