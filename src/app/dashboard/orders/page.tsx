"use client";

import { clearSelectedOrder, Order, selectOrder } from "@/features/ordersSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function Orders() {
  const { list, selectedOrder } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (order: Order) => {
    dispatch(selectOrder(order));
  };

  const handleCloseModal = () => {
    dispatch(clearSelectedOrder());
  };
  return (
    <div>
      <div className="bg-white px-4 py-4 font-medium rounded-xl text-2xl mb-4">
        <span>Orders</span>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              "& .MuiTableCell-head": {
                fontWeight: "bold",
              },
            }}
          >
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item: Order) => {
                const orderBg =
                  item.orderStatus === "Out for Delivery"
                    ? "bg-blue-500"
                    : item.orderStatus === "Delivered"
                    ? "bg-green-600"
                    : item.orderStatus === "Cancelled"
                    ? "bg-red-600"
                    : "bg-orange-500";
                const paymentBg =
                  item.paymentStatus === "Paid"
                    ? "bg-green-600"
                    : item.paymentStatus === "Pending"
                    ? "bg-orange-500"
                    : "bg-gray-400";
                return (
                  <TableRow
                    key={item.orderId}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(item)}
                  >
                    <TableCell>{item.orderId}</TableCell>
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      <div
                        className={`${orderBg} text-white py-1 rounded-2xl px-2 w-fit`}
                      >
                        {item.orderStatus}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`${paymentBg} text-white py-1 rounded-2xl px-2 w-fit`}
                      >
                        {item.paymentStatus}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[7, 10, 20, 25]}
          component="div"
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal to view order details */}
      <Modal open={!!selectedOrder} onClose={handleCloseModal}>
        <Box sx={style}>
          {selectedOrder && (
            <>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Order Details
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="body2" color="text.secondary">
                Order ID
              </Typography>
              <Typography variant="body1" mb={1}>
                {selectedOrder.orderId}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Customer Name
              </Typography>
              <Typography variant="body1" mb={1}>
                {selectedOrder.customerName}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Store
              </Typography>
              <Typography variant="body1" mb={1}>
                {selectedOrder.store}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Delivery Partner
              </Typography>
              <Typography variant="body1" mb={1}>
                {selectedOrder.deliveryPartner}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Address
              </Typography>
              <Typography variant="body1" mb={2}>
                {selectedOrder.address}
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="body2" color="text.secondary">
                Ordered Items
              </Typography>
              <List dense sx={{ mb: 1 }}>
                {selectedOrder.items.map((item: string, index: number) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText primary={`• ${item}`} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 1.5 }} />

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Order Status
                  </Typography>
                  <Chip
                    label={selectedOrder.orderStatus}
                    color={
                      selectedOrder.orderStatus === "Out for Delivery"
                        ? "primary"
                        : selectedOrder.orderStatus === "Preparing"
                        ? "info"
                        : selectedOrder.orderStatus === "Delivered"
                        ? "success"
                        : "error"
                    }
                    size="small"
                  />
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Payment
                  </Typography>
                  <Chip
                    label={selectedOrder.paymentStatus}
                    color={
                      selectedOrder.paymentStatus === "Pending"
                        ? "warning"
                        : selectedOrder.paymentStatus === "Paid"
                        ? "success"
                        : "default"
                    }
                    size="small"
                  />
                </Box>
              </Box>

              <Typography
                variant="h6"
                fontWeight={600}
                textAlign="right"
                gutterBottom
              >
                Total: {selectedOrder.amount}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                onClick={handleCloseModal}
                sx={{ mt: 1, borderRadius: 2 }}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
