export type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TECHNICIEN" | "MANAGER" | "CLIENT";
  type: "PERSONNE_PHYSIQUE" | "SOCIETE";
  phoneNumber: string;
  address?: string | null;
  taxNumber?: string | null;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDU";
  photoUrl?: string | null;
};