import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartState";
import { todoReducer } from "./TodoState";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;