"use client";
import { createSlice } from "@reduxjs/toolkit";
import { TUserLogin } from "../../types/typeUser";

const getCurrentUser = (): TUserLogin | null => {
  if (typeof window !== "undefined") {
    const currentUser = localStorage.getItem("userLogin");
    return currentUser ? JSON.parse(currentUser) : null;
  }
  return null;
};

const initialState = {
  userLogin: getCurrentUser(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});
export const { setUserLogin } = userSlice.actions;
export default userSlice.reducer;
