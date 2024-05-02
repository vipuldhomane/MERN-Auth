import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: { user: userReducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // this will prevent us from errors
      serializableCheck: false,
    }),
});
