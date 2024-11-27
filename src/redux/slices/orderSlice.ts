import { createSlice } from "@reduxjs/toolkit";
import { OrderDataProps } from "../../types";

export interface OrderProps {
  order: OrderDataProps[] | null;
}

const initialState: OrderProps = {
  order: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderData: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { orderData } = orderSlice.actions;

export default orderSlice.reducer;
