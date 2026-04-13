

// import { useEffect, useState } from "react";
// import {
//   AppBar,
//   Avatar,
//   Box,
//   Button,
//   Container,
//   IconButton,
//   Menu,
//   MenuItem,
//   Paper,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { User } from "../types/user";
// import Navbar from "@/components/Navbar";

// export default function DashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, [router]);

//   const isAdmin = user?.role === "ADMIN";
//   const isManager = user?.role === "MANAGER";

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/login");
//   };

//   return (
//     <>
//   <Navbar />
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>

//       <Container sx={{ py: 5 }}>
//         <Paper sx={{ p: 4, borderRadius: 3 }}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Dashboard
//           </Typography>

//           <Typography sx={{ mb: 2 }}>
//             Welcome {user?.name || "user"}.
//           </Typography>

//           <Typography sx={{ mb: 1 }}>
//             Role: {user?.role}
//           </Typography>

//           <Typography sx={{ mb: 1 }}>
//             Type: {user?.type}
//           </Typography>

//           <Typography>
//             You can add your modules here progressively.
//           </Typography>
//         </Paper>
//       </Container>
//     </Box>
//     </>
//   );
// }

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