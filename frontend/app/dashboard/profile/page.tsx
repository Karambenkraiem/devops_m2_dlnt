"use client";

import { useEffect, useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

type User = {
  id: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 5 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Profil
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            ID : {user?.id}
          </Typography>

          <Typography variant="body1">
            Email : {user?.email}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}