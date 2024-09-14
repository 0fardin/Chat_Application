import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";

export const store = configureStore({
  reducer: {
    Userinfo: UserSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
