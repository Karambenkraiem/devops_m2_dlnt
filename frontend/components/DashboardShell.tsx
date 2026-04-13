"use client";

import { Box, Toolbar } from "@mui/material";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <DashboardNavbar />
      <DashboardSidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}