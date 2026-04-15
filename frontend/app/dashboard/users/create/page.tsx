"use client";

import { useState } from "react";
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
import { useEffect } from "react";

export default function CreateUserByAdminPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("CLIENT");
    const [type, setType] = useState("PERSONNE_PHYSIQUE");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [taxNumber, setTaxNumber] = useState("");
    const [status, setStatus] = useState("ACTIVE");
    const [photoUrl, setPhotoUrl] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.role !== "ADMIN") {
                router.push("/dashboard");
            }
        }
    }, [router]);

    const handleCreate = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!name || !email || !password || !phoneNumber) {
            setErrorMessage("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        if (type === "SOCIETE" && (!address || !taxNumber)) {
            setErrorMessage("Adresse et numéro fiscal sont requis pour une société.");
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch("http://94.23.107.217:3001/users/admin-create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
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
                    status,
                    photoUrl,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(
                    Array.isArray(data.message)
                        ? data.message[0]
                        : data.message || "Erreur lors de la création du compte."
                );
                return;
            }

            setSuccessMessage("Compte créé avec succès.");

            setTimeout(() => {
                router.push("/dashboard/users");
            }, 1200);
        } catch {
            setErrorMessage("Erreur de connexion au serveur.");
        } finally {
            setLoading(false);
        }
    };






    return (
        <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Ajouter un nouveau compte
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
                    label="Nom *"
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
                    label="Mot de passe *"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                    label="Téléphone *"
                    fullWidth
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <FormControl fullWidth>
                    <InputLabel>Rôle</InputLabel>
                    <Select
                        value={role}
                        label="Rôle"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="MANAGER">Manager</MenuItem>
                        <MenuItem value="TECHNICIEN">Technicien</MenuItem>
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
                        <MenuItem value="SOCIETE">Société</MenuItem>
                    </Select>
                </FormControl>

                {type === "SOCIETE" && (
                    <>
                        <TextField
                            label="Adresse *"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            label="Numéro fiscal *"
                            fullWidth
                            value={taxNumber}
                            onChange={(e) => setTaxNumber(e.target.value)}
                        />
                    </>
                )}

                <FormControl fullWidth>
                    <InputLabel>Statut</InputLabel>
                    <Select
                        value={status}
                        label="Statut"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="INACTIVE">Inactive</MenuItem>
                        <MenuItem value="SUSPENDU">Suspendu</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Photo URL"
                    fullWidth
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                />

                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleCreate} disabled={loading}>
                        {loading ? "Création..." : "Créer le compte"}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => router.push("/dashboard/users")}
                    >
                        Retour
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}