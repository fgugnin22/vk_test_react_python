import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { reducer } from "./slice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Api } from "./api.ts";

export const store = configureStore({
  reducer: {
    root: reducer,
    [Api.reducerPath]: Api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
