

"use client";

import { Paper, Typography } from "@mui/material";

export default function DashboardPage() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;

  return (
    
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      <Typography sx={{ mb: 2 }}>
        Welcome {user?.name || "user"}.
      </Typography>

      <Typography sx={{ mb: 1 }}>Role: {user?.role}</Typography>
      <Typography sx={{ mb: 1 }}>Type: {user?.type}</Typography>
      <Typography>Status: {user?.status}</Typography>
    </Paper>
  );
}