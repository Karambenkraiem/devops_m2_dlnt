// // "use client";

// // import { useEffect, useState } from "react";
// // import { Box, Container, Paper, Typography } from "@mui/material";

// // type User = {
// //   id: string;
// //   email: string;
// // };

// // export default function ProfilePage() {
// //   const [user, setUser] = useState<User | null>(null);

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("user");
// //     if (storedUser) {
// //       setUser(JSON.parse(storedUser));
// //     }
// //   }, []);

// //   return (
// //     <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 5 }}>
// //       <Container maxWidth="md">
// //         <Paper sx={{ p: 4, borderRadius: 3 }}>
// //           <Typography variant="h4" fontWeight="bold" gutterBottom>
// //             Profil
// //           </Typography>

// //           <Typography variant="body1" sx={{ mb: 2 }}>
// //             ID : {user?.id}
// //           </Typography>

// //           <Typography variant="body1">
// //             Email : {user?.email}
// //           </Typography>
// //         </Paper>
// //       </Container>
// //     </Box>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import { Alert, Avatar, Box, Container, Paper, Stack, Typography } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { User } from "../../types/user";
// import Navbar from "@/components/Navbar";

// export default function ProfilePage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         router.push("/login");
//         return;
//       }

//       try {
//         const response = await fetch("/api/users/me/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           setErrorMessage(data.message || "Unable to load profile.");
//           return;
//         }

//         setUser(data);
//         localStorage.setItem("user", JSON.stringify(data));
//       } catch {
//         setErrorMessage("Server connection error.");
//       }
//     };

//     fetchProfile();
//   }, [router]);

//   return (
//     <>
//   <Navbar />

 

    
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 5 }}>
//       <Container maxWidth="md">
//         <Paper sx={{ p: 4, borderRadius: 3 }}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Profile
//           </Typography>

//           {errorMessage && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {errorMessage}
//             </Alert>
//           )}

//           {user && (
//             <Stack spacing={2}>
//               <Avatar
//                 src={user.photoUrl || undefined}
//                 sx={{ width: 72, height: 72 }}
//               >
//                 {user.name?.charAt(0).toUpperCase()}
//               </Avatar>

//               <Typography><strong>Name:</strong> {user.name}</Typography>
//               <Typography><strong>Email:</strong> {user.email}</Typography>
//               <Typography><strong>Role:</strong> {user.role}</Typography>
//               <Typography><strong>Type:</strong> {user.type}</Typography>
//               <Typography><strong>Phone Number:</strong> {user.phoneNumber}</Typography>
//               <Typography><strong>Status:</strong> {user.status}</Typography>
//               <Typography><strong>Address:</strong> {user.address || "-"}</Typography>
//               <Typography><strong>Tax Number:</strong> {user.taxNumber || "-"}</Typography>
//               <Typography><strong>Photo URL:</strong> {user.photoUrl || "-"}</Typography>
//             </Stack>
//           )}
//         </Paper>
//       </Container>
//     </Box>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Alert, Avatar, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { User } from "../../types/user";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("/api/users/me/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message || "Unable to load profile.");
          return;
        }

        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch {
        setErrorMessage("Server connection error.");
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Profile
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {user && (
        <Stack spacing={2}>
          <Avatar src={user.photoUrl || undefined} sx={{ width: 72, height: 72 }}>
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>

          <Typography><strong>Name:</strong> {user.name}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          <Typography><strong>Role:</strong> {user.role}</Typography>
          <Typography><strong>Type:</strong> {user.type}</Typography>
          <Typography><strong>Phone Number:</strong> {user.phoneNumber}</Typography>
          <Typography><strong>Status:</strong> {user.status}</Typography>
          <Typography><strong>Address:</strong> {user.address || "-"}</Typography>
          <Typography><strong>Tax Number:</strong> {user.taxNumber || "-"}</Typography>
          <Typography><strong>Photo URL:</strong> {user.photoUrl || "-"}</Typography>
        </Stack>
      )}
    </Paper>
  );
}