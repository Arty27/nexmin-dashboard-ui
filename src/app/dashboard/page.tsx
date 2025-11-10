"use client";

import { Typography } from "@mui/material";
import { useAppSelector } from "../../store/store";

export default function Dashboard() {
  const { role } = useAppSelector((state) => state.auth);

  return (
    <div>
      <Typography variant="h5">Welcome!</Typography>
      <Typography>Logged in as: {role}</Typography>
    </div>
  );
}
