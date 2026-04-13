

// import { useEffect, useState } from "react";
// import {
//   Alert,
//   Box,
//   Button,
//   Container,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { User } from "../../types/user";
// import Navbar from "@/components/Navbar";

// export default function SettingsPage() {
//   const router = useRouter();

//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [targetUserId, setTargetUserId] = useState("");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [type, setType] = useState("PERSONNE_PHYSIQUE");
//   const [address, setAddress] = useState("");
//   const [taxNumber, setTaxNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [photoUrl, setPhotoUrl] = useState("");
//   const [status, setStatus] = useState("ACTIVE");

//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     if (storedUser) {
//       const user = JSON.parse(storedUser) as User;
//       setCurrentUser(user);
//       setTargetUserId(user.id);
//       setName(user.name || "");
//       setEmail(user.email || "");
//       setPhoneNumber(user.phoneNumber || "");
//       setType(user.type || "PERSONNE_PHYSIQUE");
//       setAddress(user.address || "");
//       setTaxNumber(user.taxNumber || "");
//       setPhotoUrl(user.photoUrl || "");
//       setStatus(user.status || "ACTIVE");
//     }
//   }, [router]);

//   const isAdmin = currentUser?.role === "ADMIN";
//   const isManager = currentUser?.role === "MANAGER";

//   const handleUpdate = async () => {
//     setSuccessMessage("");
//     setErrorMessage("");

//     if (!targetUserId) {
//       setErrorMessage("User not found.");
//       return;
//     }

//     if (!name || !email || !phoneNumber) {
//       setErrorMessage("Name, email and phone number are required.");
//       return;
//     }

//     if (type === "SOCIETE" && (!address || !taxNumber)) {
//       setErrorMessage("Address and tax number are required for SOCIETE.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const body: Record<string, string> = {
//         name,
//         email,
//         phoneNumber,
//         type,
//         photoUrl,
//       };

//       if (type === "SOCIETE") {
//         body.address = address;
//         body.taxNumber = taxNumber;
//       }

//       if (password.trim()) {
//         body.password = password;
//       }

//       if (isAdmin || isManager) {
//         body.status = status;
//       }

//       const response = await fetch(`http://localhost:3001/users/${targetUserId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setErrorMessage(
//           Array.isArray(data.message)
//             ? data.message[0]
//             : data.message || "Update failed."
//         );
//         return;
//       }

//       localStorage.setItem("user", JSON.stringify(data));
//       setCurrentUser(data);
//       setPassword("");
//       setSuccessMessage("Data updated successfully.");
//     } catch {
//       setErrorMessage("Server connection error.");
//     }
//   };

//   return (
//     <>
//   <Navbar />
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 5 }}>
//       <Container maxWidth="sm">
//         <Paper sx={{ p: 4, borderRadius: 3 }}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Settings
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
//               label="Name *"
//               fullWidth
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />

//             <TextField
//               label="Email *"
//               type="email"
//               fullWidth
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <TextField
//               label="Phone Number *"
//               fullWidth
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />

//             <FormControl fullWidth>
//               <InputLabel>Type</InputLabel>
//               <Select
//                 value={type}
//                 label="Type"
//                 onChange={(e) => setType(e.target.value)}
//               >
//                 <MenuItem value="PERSONNE_PHYSIQUE">Personne physique</MenuItem>
//                 <MenuItem value="SOCIETE">Societe</MenuItem>
//               </Select>
//             </FormControl>

//             {type === "SOCIETE" && (
//               <>
//                 <TextField
//                   label="Address *"
//                   fullWidth
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//                 <TextField
//                   label="Tax Number *"
//                   fullWidth
//                   value={taxNumber}
//                   onChange={(e) => setTaxNumber(e.target.value)}
//                 />
//               </>
//             )}

//             <TextField
//               label="New Password"
//               type="password"
//               fullWidth
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <TextField
//               label="Photo URL placeholder"
//               fullWidth
//               value={photoUrl}
//               onChange={(e) => setPhotoUrl(e.target.value)}
//             />

//             {(isAdmin || isManager) && (
//               <FormControl fullWidth>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={status}
//                   label="Status"
//                   onChange={(e) => setStatus(e.target.value)}
//                 >
//                   <MenuItem value="ACTIVE">Active</MenuItem>
//                   <MenuItem value="INACTIVE">Inactive</MenuItem>
//                   <MenuItem value="SUSPENDU">Suspendu</MenuItem>
//                 </Select>
//               </FormControl>
//             )}

//             <Button variant="contained" onClick={handleUpdate}>
//               Save changes
//             </Button>
//           </Stack>
//         </Paper>
//       </Container>
//     </Box>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  Alert,
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

        <Button variant="outlined" onClick={() => router.push("/")}>
          Back to home
        </Button>
      </Stack>
    </Paper>
  );
}