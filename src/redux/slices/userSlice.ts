import { createSlice } from "@reduxjs/toolkit";
import { UserDataProps } from "../../types";

export interface UserProps {
  user: UserDataProps | null;
  isAuthenticated: boolean;
}

const initialState: UserProps = {
  user: null,
  isAuthenticated: false, 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true; 
    },
    clearUserData: (state) => {
      state.user = null;
      state.isAuthenticated = false; 
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
