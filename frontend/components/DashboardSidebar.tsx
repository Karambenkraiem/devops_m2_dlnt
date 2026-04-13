"use client";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import { usePathname, useRouter } from "next/navigation";

const drawerWidth = 240;

export default function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;

  const isAdmin = user?.role === "ADMIN";
  const isManager = user?.role === "MANAGER";

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
      visible: true,
    },
    {
      text: "Profile",
      icon: <PersonIcon />,
      path: "/dashboard/profile",
      visible: true,
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      path: "/dashboard/settings",
      visible: true,
    },
    {
      text: "Users",
      icon: <GroupIcon />,
      path: "/dashboard/users",
      visible: isAdmin || isManager,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0f172a",
          color: "#fff",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", mt: 2 }}>
        <Typography
          variant="h6"
          sx={{ px: 3, pb: 2, fontWeight: "bold", color: "#fff" }}
        >
          Admin Panel
        </Typography>

        <List>
          {menuItems
            .filter((item) => item.visible)
            .map((item) => {
              const selected =
                pathname === item.path ||
                (item.path !== "/dashboard" && pathname.startsWith(item.path));

              return (
                <ListItemButton
                  key={item.text}
                  selected={selected}
                  onClick={() => router.push(item.path)}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    mb: 0.5,
                    color: "#fff",
                    "&.Mui-selected": {
                      backgroundColor: "#1976d2",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              );
            })}
        </List>
      </Box>
    </Drawer>
  );
}