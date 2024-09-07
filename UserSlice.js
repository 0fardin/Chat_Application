import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const UserSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    UserLogininfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { UserLogininfo } = UserSlice.actions;

export default UserSlice.reducer;
