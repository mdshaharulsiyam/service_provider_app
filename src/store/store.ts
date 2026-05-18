import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { salonApi } from "./salonApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [salonApi.reducerPath]: salonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(salonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
