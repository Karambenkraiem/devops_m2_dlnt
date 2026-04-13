// import {
//   ConflictException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
// import * as bcrypt from 'bcrypt';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Injectable()
// export class UsersService {
//   constructor(private readonly prisma: PrismaService) {}

//   async create(createUserDto: CreateUserDto) {
//     try {
//       const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

//       return await this.prisma.user.create({
//         data: {
//           email: createUserDto.email,
//           password: hashedPassword,
//         },
//         select: {
//           id: true,
//           email: true,
//         },
//       });
//     } catch (error) {
//       if (
//         error instanceof Prisma.PrismaClientKnownRequestError &&
//         error.code === 'P2002'
//       ) {
//         throw new ConflictException('Email already exists');
//       }
//       throw error;
//     }
//   }

//   async findAll() {
//     return this.prisma.user.findMany({
//       select: {
//         id: true,
//         email: true,
//       },
//     });
//   }

//   async findOne(id: string) {
//     const user = await this.prisma.user.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         email: true,
//       },
//     });

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     return user;
//   }

//   async findByEmail(email: string) {
//     return this.prisma.user.findUnique({
//       where: { email },
//     });
//   }

//   async update(id: string, updateUserDto: UpdateUserDto) {
//     const existingUser = await this.prisma.user.findUnique({
//       where: { id },
//     });

//     if (!existingUser) {
//       throw new NotFoundException('User not found');
//     }

//     const data: Partial<UpdateUserDto> = { ...updateUserDto };

//     if (updateUserDto.password) {
//       data.password = await bcrypt.hash(updateUserDto.password, 10);
//     }

//     try {
//       return await this.prisma.user.update({
//         where: { id },
//         data,
//         select: {
//           id: true,
//           email: true,
//         },
//       });
//     } catch (error) {
//       if (
//         error instanceof Prisma.PrismaClientKnownRequestError &&
//         error.code === 'P2002'
//       ) {
//         throw new ConflictException('Email already exists');
//       }
//       throw error;
//     }
//   }

//   async remove(id: string) {
//     const existingUser = await this.prisma.user.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         email: true,
//       },
//     });

//     if (!existingUser) {
//       throw new NotFoundException('User not found');
//     }

//     await this.prisma.user.delete({
//       where: { id },
//     });

//     return {
//       message: 'User deleted successfully',
//     };
//   }
// }

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserDto,
  
  UserRole,
  UserType,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.type === UserType.SOCIETE) {
        if (!createUserDto.address || !createUserDto.taxNumber) {
          throw new ForbiddenException(
            'Address and tax number are required for SOCIETE',
          );
        }
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      return await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword,
          role: createUserDto.role,
          type: createUserDto.type,
          phoneNumber: createUserDto.phoneNumber,
          address: createUserDto.address,
          taxNumber: createUserDto.taxNumber,
          status: createUserDto.status || 'ACTIVE',
          photoUrl: createUserDto.photoUrl,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          type: true,
          phoneNumber: true,
          address: true,
          taxNumber: true,
          status: true,
          photoUrl: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(search?: string) {
    return this.prisma.user.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { phoneNumber: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        type: true,
        phoneNumber: true,
        address: true,
        taxNumber: true,
        status: true,
        photoUrl: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        type: true,
        phoneNumber: true,
        address: true,
        taxNumber: true,
        status: true,
        photoUrl: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const data: any = { ...updateUserDto };

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (
      (updateUserDto.type || existingUser.type) === UserType.SOCIETE &&
      (!data.address && !existingUser.address || !data.taxNumber && !existingUser.taxNumber)
    ) {
      throw new ForbiddenException(
        'Address and tax number are required for SOCIETE',
      );
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          type: true,
          phoneNumber: true,
          address: true,
          taxNumber: true,
          status: true,
          photoUrl: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async deleteClient(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    if (existingUser.role !== UserRole.CLIENT) {
      throw new ForbiddenException('Only clients can be deleted');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'Client deleted successfully' };
  }
}