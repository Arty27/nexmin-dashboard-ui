import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IUserRole = "super_admin" | "accountant" | "support";

export interface User {
  id: string;
  name: string;
  email: string;
  role: IUserRole;
}

interface UserState {
  list: User[];
}

const initialState: UserState = {
  list: [
    {
      id: "U001",
      name: "John Admin",
      email: "admin@nexmin.com",
      role: "super_admin",
    },
    {
      id: "U002",
      name: "Riya Patel",
      email: "riya@nexmin.com",
      role: "accountant",
    },
    {
      id: "U003",
      name: "Alex Brown",
      email: "alex@nexmin.com",
      role: "support",
    },
  ],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.list.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
