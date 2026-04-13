"use client";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;

  const isAdmin = user?.role === "ADMIN";
  const isManager = user?.role === "MANAGER";

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6">DataServTech</Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Box>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar>
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                router.push("/dashboard/profile");
              }}
            >
              Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleMenuClose();
                router.push("/dashboard/settings");
              }}
            >
              Settings
            </MenuItem>

            {(isAdmin || isManager) && (
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  router.push("/dashboard/users");
                }}
              >
                Users
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                handleMenuClose();
                handleLogout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}