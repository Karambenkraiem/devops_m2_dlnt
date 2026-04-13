import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  TECHNICIEN = 'TECHNICIEN',
  MANAGER = 'MANAGER',
  CLIENT = 'CLIENT',
}

export enum UserType {
  PERSONNE_PHYSIQUE = 'PERSONNE_PHYSIQUE',
  SOCIETE = 'SOCIETE',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDU = 'SUSPENDU',
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsEnum(UserType)
  type: UserType;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  taxNumber?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}