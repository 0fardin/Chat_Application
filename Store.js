import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./src/slice/UserSlice";
import ChatSlice from "./src/slice/ChatSlice";

export const store = configureStore({
  reducer: {
    Userinfo: UserSlice,
    Chattinginfo: ChatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
