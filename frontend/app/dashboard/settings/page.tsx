// "use client";

// import { useEffect, useState } from "react";
// import {
//   Alert,
//   Box,
//   Button,
//   Container,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";

// type User = {
//   id: string;
//   email: string;
// };

// export default function SettingsPage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       console.log("parsedUser:", parsedUser);

//       setUser(parsedUser);
//       setEmail(parsedUser.email || "");
//     }
//   }, []);

// //   const handleUpdate = async () => {
// //     setSuccessMessage("");
// //     setErrorMessage("");

// //     if (!user?.id) {
// //       setErrorMessage("Utilisateur introuvable, Veuillez reconnecter");
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem("token");

// //       const body: { email?: string; password?: string } = {};

// //       if (email) {
// //         body.email = email;
// //       }

// //       if (password) {
// //         body.password = password;
// //       }

      


// //       const response = await fetch("http://localhost:3001/users/${user.id}",{
// //           method: "PATCH",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //           body: JSON.stringify(body),
// //         }
// //       );

// //       const data = await response.json();

// //       if (!response.ok) {
// //         setErrorMessage(
// //           Array.isArray(data.message)
// //             ? data.message[0]
// //             : data.message || "Erreur lors de la mise à jour."
// //         );
// //         return;
// //       }

// //       const updatedUser = {
// //         id: data.id,
// //         email: data.email,
// //       };

// //       localStorage.setItem("user", JSON.stringify(updatedUser));
// //       setUser(updatedUser);
// //       setPassword("");
// //       setSuccessMessage("Informations mises à jour avec succès.");
// //     } catch {
// //       setErrorMessage("Erreur de connexion au serveur.");
// //     }
// //   };


// const handleUpdate = async () => {
//   setSuccessMessage("");
//   setErrorMessage("");

//   if (!user || !user.id) {
//     setErrorMessage("Utilisateur introuvable. Veuillez vous reconnecter.");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("token");

//     const body: { email?: string; password?: string } = {};

//     if (email.trim()) {
//       body.email = email.trim();
//     }

//     if (password.trim()) {
//       body.password = password.trim();
//     }

//     console.log("Updating user with id:", user.id);
//     console.log("Body sent:", body);

//     const response = await fetch(`http://localhost:3001/users/${user.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();
//     console.log("Response:", data);

//     if (!response.ok) {
//       setErrorMessage(
//         Array.isArray(data.message)
//           ? data.message[0]
//           : data.message || "Erreur lors de la mise à jour."
//       );
//       return;
//     }

//     const updatedUser = {
//       id: data.id,
//       email: data.email,
//     };

//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);
//     setPassword("");
//     setSuccessMessage("Informations mises à jour avec succès.");
//   } catch (error) {
//     console.error(error);
//     setErrorMessage("Erreur de connexion au serveur.");
//   }
// };


//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 5 }}>
//       <Container maxWidth="sm">
//         <Paper sx={{ p: 4, borderRadius: 3 }}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Paramètres
//           </Typography>

//           {errorMessage && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {errorMessage}
//             </Alert>
//           )}

//           {successMessage && (
//             <Alert severity="success" sx={{ mb: 2 }}>
//               {successMessage}
//             </Alert>
//           )}

//           <Stack spacing={2}>
//             <TextField
//               label="Nouvel email"
//               type="email"
//               fullWidth
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <TextField
//               label="Nouveau mot de passe"
//               type="password"
//               fullWidth
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <Button variant="contained" onClick={handleUpdate}>
//               Enregistrer les modifications
//             </Button>
//           </Stack>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { User } from "../../types/user";

export default function SettingsPage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [targetUserId, setTargetUserId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("PERSONNE_PHYSIQUE");
  const [address, setAddress] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      setCurrentUser(user);
      setTargetUserId(user.id);
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setType(user.type || "PERSONNE_PHYSIQUE");
      setAddress(user.address || "");
      setTaxNumber(user.taxNumber || "");
      setPhotoUrl(user.photoUrl || "");
      setStatus(user.status || "ACTIVE");
    }
  }, [router]);

  const isAdmin = currentUser?.role === "ADMIN";
  const isManager = currentUser?.role === "MANAGER";

  const handleUpdate = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!targetUserId) {
      setErrorMessage("User not found.");
      return;
    }

    if (!name || !email || !phoneNumber) {
      setErrorMessage("Name, email and phone number are required.");
      return;
    }

    if (type === "SOCIETE" && (!address || !taxNumber)) {
      setErrorMessage("Address and tax number are required for SOCIETE.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const body: Record<string, string> = {
        name,
        email,
        phoneNumber,
        type,
        photoUrl,
      };

      if (type === "SOCIETE") {
        body.address = address;
        body.taxNumber = taxNumber;
      }

      if (password.trim()) {
        body.password = password;
      }

      if (isAdmin || isManager) {
        body.status = status;
      }

      const response = await fetch(`http://localhost:3001/users/${targetUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          Array.isArray(data.message)
            ? data.message[0]
            : data.message || "Update failed."
        );
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      setCurrentUser(data);
      setPassword("");
      setSuccessMessage("Data updated successfully.");
    } catch {
      setErrorMessage("Server connection error.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 5 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Settings
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
              label="Name *"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Email *"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Phone Number *"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="PERSONNE_PHYSIQUE">Personne physique</MenuItem>
                <MenuItem value="SOCIETE">Societe</MenuItem>
              </Select>
            </FormControl>

            {type === "SOCIETE" && (
              <>
                <TextField
                  label="Address *"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                  label="Tax Number *"
                  fullWidth
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                />
              </>
            )}

            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              label="Photo URL placeholder"
              fullWidth
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />

            {(isAdmin || isManager) && (
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="INACTIVE">Inactive</MenuItem>
                  <MenuItem value="SUSPENDU">Suspendu</MenuItem>
                </Select>
              </FormControl>
            )}

            <Button variant="contained" onClick={handleUpdate}>
              Save changes
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}