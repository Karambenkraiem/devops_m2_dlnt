// "use client";

// import { useState } from "react";
// import {
//   Alert,
//   Box,
//   Button,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import type { SelectChangeEvent } from "@mui/material/Select";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [role, setRole] = useState("CLIENT");
//   const [type, setType] = useState("PERSONNE_PHYSIQUE");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [taxNumber, setTaxNumber] = useState("");
//   const [photoUrl, setPhotoUrl] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     setErrorMessage("");
//     setSuccessMessage("");

//     if (!name || !email || !password || !confirmPassword || !phoneNumber) {
//       setErrorMessage("Veuillez remplir tous les champs obligatoires.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setErrorMessage("Les mots de passe ne correspondent pas.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch("http://localhost:3001/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           role,
//           type,
//           phoneNumber,
//           address: type === "SOCIETE" ? address : undefined,
//           taxNumber: type === "SOCIETE" ? taxNumber : undefined,
//           status: "ACTIVE",
//           photoUrl,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setErrorMessage(
//           Array.isArray(data.message)
//             ? data.message[0]
//             : data.message || "Erreur lors de l'inscription."
//         );
//         return;
//       }

//       setSuccessMessage("Inscription réussie. Redirection vers la connexion...");
//       setTimeout(() => {
//         router.push("/login");
//       }, 1500);
//     } catch {
//       setErrorMessage("Erreur de connexion au serveur.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#f4f6f8",
//         px: 2,
//       }}
//     >
//       <Paper
//         elevation={5}
//         sx={{
//           p: 5,
//           borderRadius: 4,
//           width: "100%",
//           maxWidth: 450,
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
//           Inscription
//         </Typography>

//         {errorMessage && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {errorMessage}
//           </Alert>
//         )}

//         {successMessage && (
//           <Alert severity="success" sx={{ mb: 2 }}>
//             {successMessage}
//           </Alert>
//         )}

//         <Stack spacing={2}>
//           <TextField
//             label="Name"
//             fullWidth
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <TextField
//             label="Email"
//             type="email"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <TextField
//             label="Phone Number"
//             fullWidth
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//           />

//           <TextField
//             label="Mot de passe"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <TextField
//             label="Confirmer le mot de passe"
//             type="password"
//             fullWidth
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />

//           <TextField
//             label="Photo URL"
//             fullWidth
//             value={photoUrl}
//             onChange={(e) => setPhotoUrl(e.target.value)}
//           />

//           <FormControl fullWidth>
//             <InputLabel>Role</InputLabel>
//             <Select
//               value={role}
//               label="Role"
//               onChange={(e: SelectChangeEvent) => setRole(e.target.value)}
//             >
//               <MenuItem value="CLIENT">Client</MenuItem>
//               <MenuItem value="TECHNICIEN">Technicien</MenuItem>
//               <MenuItem value="MANAGER">Manager</MenuItem>
//               <MenuItem value="ADMIN">Admin</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel>Type</InputLabel>
//             <Select
//               value={type}
//               label="Type"
//               onChange={(e: SelectChangeEvent) => setType(e.target.value)}
//             >
//               <MenuItem value="PERSONNE_PHYSIQUE">Personne physique</MenuItem>
//               <MenuItem value="SOCIETE">Société</MenuItem>
//             </Select>
//           </FormControl>

//           {type === "SOCIETE" && (
//             <>
//               <TextField
//                 label="Adresse"
//                 fullWidth
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//               <TextField
//                 label="Numéro fiscal"
//                 fullWidth
//                 value={taxNumber}
//                 onChange={(e) => setTaxNumber(e.target.value)}
//               />
//             </>
//           )}

//           <Button
//             variant="contained"
//             onClick={handleRegister}
//             disabled={loading}
//             sx={{ py: 1.5 }}
//           >
//             {loading ? "Inscription..." : "S'inscrire"}
//           </Button>

//           <Button variant="text" onClick={() => router.push("/login")}>
//             Retour à la connexion
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// }
"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
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

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("CLIENT");
  const [type, setType] = useState("PERSONNE_PHYSIQUE");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (type === "SOCIETE" && (!address || !taxNumber)) {
      setErrorMessage("Address and tax number are required for SOCIETE.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          type,
          phoneNumber,
          address: type === "SOCIETE" ? address : undefined,
          taxNumber: type === "SOCIETE" ? taxNumber : undefined,
          status: "ACTIVE",
          photoUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          Array.isArray(data.message)
            ? data.message[0]
            : data.message || "Registration failed."
        );
        return;
      }

      setSuccessMessage("Registration successful. Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setErrorMessage("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
        px: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          maxWidth: 520,
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Register
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
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="TECHNICIEN">Technicien</MenuItem>
              <MenuItem value="MANAGER">Manager</MenuItem>
              <MenuItem value="CLIENT">Client</MenuItem>
            </Select>
          </FormControl>

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
            label="Photo URL placeholder"
            fullWidth
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <TextField
            label="Password *"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Confirm Password *"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleRegister}
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          <Button variant="text" onClick={() => router.push("/login")}>
            Back to login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}