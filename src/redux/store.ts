import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      orders: orderReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
