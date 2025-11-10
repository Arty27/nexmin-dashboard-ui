"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import ordersReducer from "../features/ordersSlice";
import accountsReducer from "../features/accountsSlice";
import usersReducer from "../features/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    accounts: accountsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
