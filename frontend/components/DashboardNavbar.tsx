// "use client";

// import {
//     AppBar,
//     Avatar,
//     Box,
//     IconButton,
//     Menu,
//     MenuItem,
//     Toolbar,
//     Typography,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { User } from "@/app/types/user";

// export default function DashboardNavbar() {
//     const router = useRouter();
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);




//     const [user, setUser] = useState<User | null>(null);
//     const user =
//         typeof window !== "undefined"
//             ? JSON.parse(localStorage.getItem("user") || "{}")
//             : null;




//     const isAdmin = user?.role === "ADMIN";
//     const isManager = user?.role === "MANAGER";

//     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         router.push("/");
//     };

//     return (
//         <AppBar
//             position="fixed"
//             sx={{
//                 zIndex: 1300,
//                 backgroundColor: "#1976d2",
//             }}
//         >
//             <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <IconButton color="inherit" onClick={() => router.push("/")}>
//                         <HomeIcon />
//                     </IconButton>

//                     <Typography variant="h6" fontWeight="bold">
//                         DataServTech
//                     </Typography>
//                 </Box>

//                 <Box>
//                     <IconButton onClick={handleMenuOpen} color="inherit">
//                         {/* <Avatar>
//               {user?.name?.charAt(0)?.toUpperCase() || "U"}
//             </Avatar> */}

//                         <Avatar src={user?.photoUrl || undefined}>
//                             {user?.name?.charAt(0)?.toUpperCase() || "U"}
//                         </Avatar>

                      
//                     </IconButton>

//                     <Menu
//                         anchorEl={anchorEl}
//                         open={Boolean(anchorEl)}
//                         onClose={handleMenuClose}
//                     >
//                         <MenuItem
//                             onClick={() => {
//                                 handleMenuClose();
//                                 router.push("/dashboard/profile");
//                             }}
//                         >
//                             Profile
//                         </MenuItem>

//                         <MenuItem
//                             onClick={() => {
//                                 handleMenuClose();
//                                 router.push("/dashboard/settings");
//                             }}
//                         >
//                             Settings
//                         </MenuItem>

//                         {(isAdmin || isManager) && (
//                             <MenuItem
//                                 onClick={() => {
//                                     handleMenuClose();
//                                     router.push("/dashboard/users");
//                                 }}
//                             >
//                                 Users
//                             </MenuItem>
//                         )}

//                         <MenuItem
//                             onClick={() => {
//                                 handleMenuClose();
//                                 handleLogout();
//                             }}
//                         >
//                             Logout
//                         </MenuItem>
//                     </Menu>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// }

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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../app/types/user";

export default function DashboardNavbar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1300,
        backgroundColor: "#1976d2",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" onClick={() => router.push("/")}>
            <HomeIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold">
            DataServTech
          </Typography>
        </Box>

        <Box>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar src={user?.photoUrl || undefined}>
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