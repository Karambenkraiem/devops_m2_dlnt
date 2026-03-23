"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type User = {
  id: string;
  email: string;
};

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("parsedUser:", parsedUser);

      setUser(parsedUser);
      setEmail(parsedUser.email || "");
    }
  }, []);

//   const handleUpdate = async () => {
//     setSuccessMessage("");
//     setErrorMessage("");

//     if (!user?.id) {
//       setErrorMessage("Utilisateur introuvable, Veuillez reconnecter");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const body: { email?: string; password?: string } = {};

//       if (email) {
//         body.email = email;
//       }

//       if (password) {
//         body.password = password;
//       }

      


//       const response = await fetch("http://localhost:3001/users/${user.id}",{
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(body),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setErrorMessage(
//           Array.isArray(data.message)
//             ? data.message[0]
//             : data.message || "Erreur lors de la mise à jour."
//         );
//         return;
//       }

//       const updatedUser = {
//         id: data.id,
//         email: data.email,
//       };

//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setUser(updatedUser);
//       setPassword("");
//       setSuccessMessage("Informations mises à jour avec succès.");
//     } catch {
//       setErrorMessage("Erreur de connexion au serveur.");
//     }
//   };


const handleUpdate = async () => {
  setSuccessMessage("");
  setErrorMessage("");

  if (!user || !user.id) {
    setErrorMessage("Utilisateur introuvable. Veuillez vous reconnecter.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const body: { email?: string; password?: string } = {};

    if (email.trim()) {
      body.email = email.trim();
    }

    if (password.trim()) {
      body.password = password.trim();
    }

    console.log("Updating user with id:", user.id);
    console.log("Body sent:", body);

    const response = await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (!response.ok) {
      setErrorMessage(
        Array.isArray(data.message)
          ? data.message[0]
          : data.message || "Erreur lors de la mise à jour."
      );
      return;
    }

    const updatedUser = {
      id: data.id,
      email: data.email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setPassword("");
    setSuccessMessage("Informations mises à jour avec succès.");
  } catch (error) {
    console.error(error);
    setErrorMessage("Erreur de connexion au serveur.");
  }
};


  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 5 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Paramètres
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
              label="Nouvel email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Nouveau mot de passe"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" onClick={handleUpdate}>
              Enregistrer les modifications
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}