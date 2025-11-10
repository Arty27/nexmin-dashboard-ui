"use client";

import { Alert, Button, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import { login } from "../features/authSlice";
import Image from "next/image";

export default function LoginPage() {
  const [role, setRole] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    if (!role) {
      setShowAlert(true);
      return;
    }
    dispatch(login(role as any));
    if (role === "super_admin") {
      router.push("/dashboard/users");
    } else if (role === "accountant") {
      router.push("/dashboard/accounts");
    } else {
      router.push("/dashboard/orders");
    }
  };

  return (
    <div className="container  ">
      <div className="flex">
        <div className="w-3/5 bg-[#5c3cbb] flex items-center justify-center">
          <Image
            src="/images/nexmin1.avif"
            alt="Nexmin Logo"
            width={"400"}
            height={"200"}
          />
        </div>
        <div className="w-2/5 flex flex-col items-start justify-center h-screen gap-4 px-8">
          <Image
            src="/images/nexmin2.avif"
            alt="Nexmin Logo"
            width={"200"}
            height={"200"}
          />
          <Typography variant="h5">Hello!</Typography>
          <Typography variant="h6">Welcome back!</Typography>
          <Select
            displayEmpty
            className="w-64"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="super_admin">Super Admin</MenuItem>
            <MenuItem value="accountant">Accountant</MenuItem>
            <MenuItem value="support">Support</MenuItem>
          </Select>
          <Button variant="contained" color="secondary" onClick={handleLogin}>
            Continue
          </Button>
          {showAlert && <Alert severity="warning">Please select a role</Alert>}
        </div>
      </div>
    </div>
  );
}
