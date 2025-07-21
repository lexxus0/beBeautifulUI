import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/store/products/slice";
import reviewsReducer from "@/store/reviews/slice";
import authReducer from "@/store/auth/slice";

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

export const store = configureStore({
  reducer: {
    products: persistReducer(productsPersistConfig, productsReducer),
    reviews: persistReducer(reviewsPersistConfig, reviewsReducer),
    auth: persistReducer(authPersistConfig, authReducer),
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
