import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/store/products/slice";
import reviewsReducer from "@/store/reviews/slice";
import authReducer from "@/store/auth/slice";
import ordersReducer from "@/store/orders/slice";
import cartReducer from "@/store/cart/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const productsPersistConfig = {
  key: "products",
  storage,
};

const reviewsPersistConfig = {
  key: "reviews",
  storage,
};
const authPersistConfig = {
  key: "auth",
  storage,
};
const cartPersistConfig = {
  key: "cart",
  storage,
};
const ordersPersistConfig = {
  key: "orders",
  storage,
};

export const store = configureStore({
  reducer: {
    products: persistReducer(productsPersistConfig, productsReducer),
    reviews: persistReducer(reviewsPersistConfig, reviewsReducer),
    auth: persistReducer(authPersistConfig, authReducer),
    orders: persistReducer(ordersPersistConfig, ordersReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
