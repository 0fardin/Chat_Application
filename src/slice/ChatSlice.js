import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const ChatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    Chattinginfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { Chattinginfo } = ChatSlice.actions;

export default ChatSlice.reducer;
