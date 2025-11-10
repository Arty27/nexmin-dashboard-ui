"use client";

import { markAsPaid } from "@/features/accountsSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

export default function AccountsHome() {
  const { list } = useAppSelector((state) => state.accounts);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<"All" | "Paid" | "Pending">("All");

  const filteredList =
    filter === "All"
      ? list
      : list.filter((item) => item.paymentStatus === filter);

  return (
    <div>
      <div className="bg-white px-4 py-4 font-medium rounded-xl text-2xl mb-4">
        <span>Accounts</span>
      </div>
      <Box className="flex gap-2 mb-4">
        {["All", "Paid", "Pending"].map((i) => (
          <Button
            key={i}
            variant={filter === i ? "contained" : "outlined"}
            onClick={() => setFilter(i as any)}
          >
            {i}
          </Button>
        ))}
      </Box>
      {/* Accounts Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Amount ($)</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredList.map((acc) => (
              <TableRow key={acc.id}>
                <TableCell>{acc.id}</TableCell>
                <TableCell>{acc.customerName}</TableCell>
                <TableCell>{acc.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={acc.paymentStatus}
                    color={acc.paymentStatus === "Paid" ? "success" : "warning"}
                  />
                </TableCell>
                <TableCell>{acc.dueDate}</TableCell>
                <TableCell align="center">
                  {acc.paymentStatus === "Pending" && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => dispatch(markAsPaid(acc.id))}
                    >
                      Mark as Paid
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
