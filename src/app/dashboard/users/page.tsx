"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { User } from "@/features/userSlice";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { addUser, deleteUser, IUserRole } from "@/features/userSlice";

const modalStyle = {
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

function generateNextId(array: any[], prefix = "U") {
  const numbers = array.map((item) =>
    parseInt(item.id.replace(prefix, ""), 10)
  );
  const maxNumber = Math.max(...numbers);
  const nextNumber = String(maxNumber + 1).padStart(3, "0");
  return `${prefix}${nextNumber}`;
}

export default function Users() {
  const { list } = useAppSelector((state) => state.users);
  const { role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "accountant",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return alert("Fill all fields");
    const id = generateNextId(list);
    dispatch(addUser({ id, ...newUser }));
    setNewUser({ name: "", email: "", role: "accountant" });
    setOpen(false);
  };

  if (role !== "super_admin") {
    return (
      <Typography color="error" variant="h6">
        Access Denied! Only Super Admin can view this Page!
      </Typography>
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center bg-white px-4 py-4 font-medium rounded-xl text-2xl mb-4">
        <span>Users</span>
        <Button variant="contained" onClick={() => setOpen(true)}>
          + Add User
        </Button>
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
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="center">
                    {user.role !== "super_admin" && (
                      <button
                        className="text-red-600"
                        onClick={() => dispatch(deleteUser(user.id))}
                      >
                        <DeleteIcon />
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Add New User
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label="Name"
            type="email"
            fullWidth
            margin="dense"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <Select
            fullWidth
            value={newUser.role}
            onChange={(e: SelectChangeEvent<IUserRole>) =>
              setNewUser({ ...newUser, role: e.target.value as IUserRole })
            }
            className="mt-2"
          >
            <MenuItem value="super_admin">Super Admin</MenuItem>
            <MenuItem value="accountant">Accountant</MenuItem>
            <MenuItem value="support">Support Staff</MenuItem>
          </Select>
          <Box>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddUser}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
