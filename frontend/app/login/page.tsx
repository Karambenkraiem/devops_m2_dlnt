// "use client";

// import { useState } from "react";
// import {
//   Alert,
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setErrorMessage("");

//     if (!email || !password) {
//       setErrorMessage("Veuillez remplir l'email et le mot de passe.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch("http://localhost:3001/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setErrorMessage(data.message || "Email ou mot de passe incorrect.");
//         return;
//       }

//       localStorage.setItem("token", data.access_token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       router.push("/dashboard");
//     } catch (error) {
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
//           Connexion
//         </Typography>

//         {errorMessage && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {errorMessage}
//           </Alert>
//         )}

//         <TextField
//           label="Email"
//           type="email"
//           fullWidth
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <TextField
//           label="Mot de passe"
//           type="password"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button
//           variant="contained"
//           fullWidth
//           sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
//           onClick={handleLogin}
//           disabled={loading}
//         >
//           {loading ? "Connexion..." : "Se connecter"}
//         </Button>
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
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Veuillez remplir l'email et le mot de passe.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          Array.isArray(data.message)
            ? data.message[0]
            : data.message || "Email ou mot de passe incorrect."
        );
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch {
      setErrorMessage("Erreur de connexion au serveur.");
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
          maxWidth: 450,
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Connexion
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </Button>

        <Stack spacing={1.5} sx={{ mt: 3, textAlign: "center" }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => router.push("/forgot-password")}
          >
            Mot de passe oublié ?
          </Link>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => router.push("/register")}
          >
            Inscription
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}