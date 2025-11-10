import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ordersData } from "../data/orders";

export interface Order {
  orderId: string;
  customerName: string;
  store: string;
  items: string[];
  amount: string;
  date: string;
  orderStatus: "Out for Delivery" | "Preparing" | "Delivered" | "Cancelled";
  paymentStatus: "Paid" | "Refunded" | "Pending";
  address: string;
  deliveryPartner: string;
}

interface OrdersState {
  list: Order[];
  selectedOrder: Order | null;
}

const initialState: OrdersState = {
  list: ordersData,
  selectedOrder: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    selectOrder: (state, action: PayloadAction<Order>) => {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
});

export const { selectOrder, clearSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
