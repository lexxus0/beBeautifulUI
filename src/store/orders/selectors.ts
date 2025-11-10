import { RootState } from "../store";

export const selectDraft = (state: RootState) => state.orders.draft;
export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectCertificate = (state: RootState) =>
  state.orders.draft.certificate;
