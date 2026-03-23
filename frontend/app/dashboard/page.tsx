// "use client";

// import { useEffect, useState } from "react";
// import {
//   AppBar,
//   Box,
//   Button,
//   Container,
//   Paper,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { useRouter } from "next/navigation";

// type User = {
//   id: string;
//   email: string;
// };

// export default function DashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);

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

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/login");
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
//       <AppBar position="static">
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Typography variant="h6">Dashboard DataServTech</Typography>
//           <Button color="inherit" onClick={handleLogout}>
//             Déconnexion
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Container sx={{ py: 5 }}>
//         <Paper sx={{ p: 4, borderRadius: 3 }}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Tableau de bord
//           </Typography>

//           <Typography variant="body1" sx={{ mb: 2 }}>
//             Bienvenue {user?.email || "utilisateur"}.
//           </Typography>

//           <Typography variant="body1">
//             Cette page servira de base pour ajouter progressivement toutes les
//             fonctionnalités de votre application.
//           </Typography>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Dashboard DataServTech</Typography>

          <Box>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar>{user?.email?.charAt(0).toUpperCase() || "U"}</Avatar>
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
                Profil
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  router.push("/dashboard/settings");
                }}
              >
                Paramètres
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleLogout();
                }}
              >
                Déconnexion
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 5 }}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Tableau de bord
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Bienvenue {user?.email || "utilisateur"}.
          </Typography>

          <Typography variant="body1">
            Cette page servira de base pour ajouter progressivement les fonctionnalités.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}