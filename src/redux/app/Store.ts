import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import CartSlice from "../features/CartSlice";
import AuthSlice from "../features/AuthSlice";
import { productApi } from "../service/ProductApi";
import { authApi } from "../service/AuthApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,

    cart: CartSlice,
    auth: AuthSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);

// //sending hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
