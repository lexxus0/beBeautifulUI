import {
  ICertificate,
  IDeliveryDraft,
  IOrderItemDraft,
  IOrderDraft,
  IOrderResponse,
  PaymentMethod,
} from "@/types/orders";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  fetchAllCertificates,
  fetchAllOrders,
  fetchCertificateByNumber,
  fetchOrderById,
  spendCertificate,
} from "./operations";

interface OrderState {
  draft: IOrderDraft;
  currentOrder: IOrderResponse | null;
  orders: IOrderResponse[] | null;
  certificates: ICertificate[] | null;
  error: string | null;
  isLoading: boolean;
}

const initialDraft: IOrderDraft = {
  items: [],
  delivery: null,
  paymentMethod: null,
  customer: null,
  comment: "",
  certificateCode: null,
  certificateDiscount: 0,
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
      action: PayloadAction<{ items: IOrderItemDraft[]; amount: number }>
    ) {
      state.draft.items = action.payload.items;
      state.draft.amount = action.payload.amount;

      const discount = state.draft.certificateDiscount ?? 0;
      state.draft.totalAmount = Math.max(action.payload.amount - discount, 0);
    },
    setCustomer(
      state,
      action: PayloadAction<{
        customerName: string;
        phone: string;
        email?: string;
      }>
    ) {
      state.draft.customer = action.payload;
    },
    clearCustomer(state) {
      state.draft.customer = null;
    },
    setDelivery(state, action: PayloadAction<IDeliveryDraft>) {
      state.draft.delivery = action.payload;
    },

    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.draft.paymentMethod = action.payload;
    },

    setComment(state, action: PayloadAction<string>) {
      state.draft.comment = action.payload;
    },

    setCertificateCode(state, action: PayloadAction<string | null>) {
      state.draft.certificateCode = action.payload;
    },

    setCertificateDiscount(state, action: PayloadAction<number>) {
      state.draft.certificateDiscount = action.payload;
      state.draft.totalAmount = Math.max(
        state.draft.amount - action.payload,
        0
      );
    },

    clearCertificate(state) {
      state.draft.certificateCode = null;
      state.draft.certificateDiscount = 0;
      state.draft.totalAmount = state.draft.amount;
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
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Не вдалося завантажити замовлення";
        state.isLoading = false;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Не вдалося завантажити замовлення";
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
      })
      .addCase(fetchAllCertificates.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Не вдалося завантажити сертифікати";
        state.isLoading = false;
      })
      .addCase(fetchCertificateByNumber.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchCertificateByNumber.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;

        const cert = action.payload;

        if (!cert.isActive || (cert.balance ?? 0) <= 0) {
          state.error = !cert.isActive
            ? "Сертифікат не активний. Зверніться до менеджера"
            : "На сертифікаті нульовий баланс";

          state.draft.certificateCode = null;
          state.draft.certificateDiscount = 0;
          state.draft.totalAmount = state.draft.amount;
          return;
        }

        const amount = state.draft.amount;
        const certBalance = cert.balance ?? cert.amount ?? 0;
        const discount = Math.min(amount, certBalance);

        state.draft.certificateCode = cert.number;
        state.draft.certificateDiscount = discount;
        state.draft.totalAmount = Math.max(amount - discount, 0);
      })
      .addCase(fetchCertificateByNumber.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Не вдалося завантажити сертифікати";
        state.isLoading = false;
      })
      .addCase(spendCertificate.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })

      .addCase(spendCertificate.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(spendCertificate.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Не вдалося списати сертифікат";
      })
      .addCase(createOrder.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload; // тут буде paymentLink
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Не вдалося створити замовлення";
        state.isLoading = false;
      });
  },
});

export const {
  setFromBasket,
  setCustomer,
  clearCustomer,
  setDelivery,
  setPaymentMethod,
  setComment,
  setCertificateCode,
  setCertificateDiscount,
  clearCertificate,
  setTotalAmount,
  resetOrderState,
} = ordersSlice.actions;

export default ordersSlice.reducer;
