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
import { useRouter } from "next/navigation";
import { User } from "../../types/user";

export default function UsersPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUsers = async (searchValue = "") => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3001/users?search=${encodeURIComponent(searchValue)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Unable to load users.");
        return;
      }

      setUsers(data);
    } catch {
      setErrorMessage("Server connection error.");
    }
  };

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

      if (user.role !== "ADMIN" && user.role !== "MANAGER") {
        router.push("/dashboard");
        return;
      }
    }

    fetchUsers();
  }, [router]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 5 }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            All Users
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
            <TextField
              label="Search user"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="contained" onClick={() => fetchUsers(search)}>
              Search
            </Button>
          </Stack>

          <Stack spacing={2}>
            {users.map((user) => (
              <Paper
                key={user.id}
                variant="outlined"
                sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <Box>
                  <Typography fontWeight="bold">{user.name}</Typography>
                  <Typography>{user.email}</Typography>
                  <Typography variant="body2">
                    {user.role} • {user.status}
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => router.push(`/dashboard/users/${user.id}`)}
                >
                  View
                </Button>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}