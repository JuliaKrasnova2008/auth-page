import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./slices/userReducer.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
//исп если редакс на тс
export type RootState = ReturnType<typeof store.getState>; //тип всего стора
export type AppDispatch = typeof store.dispatch; //тип ф-ии dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
