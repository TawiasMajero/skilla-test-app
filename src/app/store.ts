import { configureStore } from "@reduxjs/toolkit";
import { skillaApi } from "./api/skillaApi";

export const store = configureStore({
  reducer: {
    [skillaApi.reducerPath]: skillaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(skillaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
