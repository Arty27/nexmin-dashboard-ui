"use client";

import { useAppSelector } from "@/store/store";
import {
  Typography,
  Paper,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { saveAs } from "file-saver";

const parseAmount = (val: string) => Number(val.replace(/[^0-9.]/g, ""));
const parseMonth = (date: string) => date.split("/")[1] + "/2025"; // using MM/YYYY

export default function ReportsPage() {
  const { list: orders } = useAppSelector((state) => state.orders);
  const { role } = useAppSelector((state) => state.auth);

  if (role !== "super_admin" && role !== "accountant") {
    return (
      <Typography color="error" variant="h6">
        Access Denied — Only Super Admin & Accountant can view Reports.
      </Typography>
    );
  }

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc, o) => acc + parseAmount(o.amount),
    0
  );
  const pendingPayments = orders.filter(
    (o) => o.paymentStatus === "Pending"
  ).length;
  const deliveredOrders = orders.filter((o) =>
    o.orderStatus.toLowerCase().includes("delivered")
  ).length;

  const monthly = orders.reduce((acc: Record<string, number>, o) => {
    const m = parseMonth(o.date);
    acc[m] = (acc[m] || 0) + 1;
    return acc;
  }, {});

  const downloadCSV = () => {
    const headers = [
      "Order ID",
      "Customer Name",
      "Store",
      "Amount",
      "Date",
      "Order Status",
      "Payment Status",
    ];
    const rows = orders.map((o) =>
      [
        o.orderId,
        o.customerName,
        o.store,
        o.amount,
        o.date,
        o.orderStatus,
        o.paymentStatus,
      ].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "monthly_orders_report.csv");
  };

  return (
    <Box>
      <div className="bg-white px-4 py-4 font-medium rounded-xl text-2xl mb-4">
        <span>Reports & Analytics</span>
      </div>

      <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
        <div className="p-4 text-center rounded-2xl bg-white">
          <Typography variant="subtitle1">Total Orders</Typography>
          <Typography variant="h6">{totalOrders}</Typography>
        </div>
        <div className="p-4 text-center rounded-2xl bg-white">
          <Typography variant="subtitle1">Delivered Orders</Typography>
          <Typography variant="h6">{deliveredOrders}</Typography>
        </div>
        <div className="p-4 text-center rounded-2xl bg-white">
          <Typography variant="subtitle1">Pending Payments</Typography>
          <Typography variant="h6">{pendingPayments}</Typography>
        </div>
        <div className="p-4 text-center rounded-2xl bg-white">
          <Typography variant="subtitle1">Total Revenue</Typography>
          <Typography variant="h6">£{totalRevenue.toFixed(2)}</Typography>
        </div>
      </Box>

      <div className="flex justify-between bg-white px-4 py-4 font-medium rounded-xl text-xl mb-4">
        <span>Monthly Orders</span>
        <Button variant="contained" size="small" onClick={downloadCSV}>
          Download CSV
        </Button>
      </div>
      <Table component={Paper} className="w-fit" size="small">
        <TableHead
          sx={{
            "& .MuiTableCell-head": {
              fontWeight: "bold",
            },
          }}
        >
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Total Orders</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(monthly).map(([month, count]) => (
            <TableRow key={month}>
              <TableCell>{month}</TableCell>
              <TableCell>{count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box className="flex justify-end mt-6"></Box>
    </Box>
  );
}
