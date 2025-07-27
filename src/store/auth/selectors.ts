import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
