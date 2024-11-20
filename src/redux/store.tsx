import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
