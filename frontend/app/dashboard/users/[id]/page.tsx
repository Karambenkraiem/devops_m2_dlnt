

"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
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
import { useParams, useRouter } from "next/navigation";
import { User } from "../../../types/user";

export default function UserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("PERSONNE_PHYSIQUE");
  const [address, setAddress] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [photoUrl, setPhotoUrl] = useState("");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://94.23.107.217:3001/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Unable to load user.");
        return;
      }

      setTargetUser(data);
      setName(data.name || "");
      setEmail(data.email || "");
      setPhoneNumber(data.phoneNumber || "");
      setType(data.type || "PERSONNE_PHYSIQUE");
      setAddress(data.address || "");
      setTaxNumber(data.taxNumber || "");
      setStatus(data.status || "ACTIVE");
      setPhotoUrl(data.photoUrl || "");
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

    fetchUser();
  }, [router, userId]);

  const handleUpdate = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://94.23.107.217:3001/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          type,
          address: type === "SOCIETE" ? address : undefined,
          taxNumber: type === "SOCIETE" ? taxNumber : undefined,
          status,
          photoUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Update failed.");
        return;
      }

      setTargetUser(data);
      setSuccessMessage("User updated successfully.");
    } catch {
      setErrorMessage("Server connection error.");
    }
  };

  const handleDelete = async () => {
    if (currentUser?.role !== "ADMIN") return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://94.23.107.217:3001/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Delete failed.");
        return;
      }

      router.push("/dashboard/users");
    } catch {
      setErrorMessage("Server connection error.");
    }
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        User Details
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

      {targetUser && (
        <Stack spacing={2}>
          <Avatar
            src={photoUrl || undefined}
            sx={{ width: 72, height: 72 }}
          >
            {name?.charAt(0).toUpperCase()}
          </Avatar>

          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Phone Number"
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
                label="Address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                label="Tax Number"
                fullWidth
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
              />
            </>
          )}

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

          <TextField
            label="Photo URL placeholder"
            fullWidth
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>

            {currentUser?.role === "ADMIN" && targetUser.role === "CLIENT" && (
              <Button color="error" variant="outlined" onClick={handleDelete}>
                Delete client
              </Button>
            )}

            <Button variant="outlined" onClick={() => router.push("/dashboard/users")}>
              Back
            </Button>

            <Button variant="outlined" onClick={() => router.push("/")}>
              Home
            </Button>
          </Stack>
        </Stack>
      )}
    </Paper>
  );
}