import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountRecord {
  id: string;
  customerName: string;
  amount: number;
  paymentStatus: "Paid" | "Pending";
  dueDate: string;
}

interface AccountsState {
  list: AccountRecord[];
}

const initialState: AccountsState = {
  list: [
    {
      id: "ACC-2001",
      customerName: "John Doe",
      amount: 250,
      paymentStatus: "Pending",
      dueDate: "2025-11-10",
    },
    {
      id: "ACC-2002",
      customerName: "Jane Smith",
      amount: 480,
      paymentStatus: "Paid",
      dueDate: "2025-10-30",
    },
    {
      id: "ACC-2003",
      customerName: "David Lee",
      amount: 320,
      paymentStatus: "Pending",
      dueDate: "2025-11-12",
    },
  ],
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    markAsPaid: (state, action: PayloadAction<string>) => {
      const account = state.list.find((item) => item.id === action.payload);
      if (account) account.paymentStatus = "Paid";
    },
  },
});

export const { markAsPaid } = accountsSlice.actions;
export default accountsSlice.reducer;
