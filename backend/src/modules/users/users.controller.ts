import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateUserDto } from './dto/create-user.dto';


const storage = diskStorage({
  destination: './uploads',
  filename: (_req, file, callback) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
    callback(null, uniqueName);
  },
});


@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)



export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @Roles('ADMIN', 'MANAGER')
  findAll(@Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

  @Get(':id')
  @Roles('ADMIN', 'MANAGER')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('me/profile')
  getMyProfile(@Req() req: any) {
    return this.usersService.findOne(req.user.id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'MANAGER', 'CLIENT', 'TECHNICIEN')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    const user = req.user;

    if (user.role === 'CLIENT' || user.role === 'TECHNICIEN') {
      if (user.id !== id) {
        throw new Error('You can only update your own profile');
      }
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.usersService.deleteClient(id);
  }



  @Post(':id/upload-photo')
  @UseInterceptors(FileInterceptor('photo', { storage }))
  uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const user = req.user;

    if (user.role === 'CLIENT' || user.role === 'TECHNICIEN') {
      if (user.id !== id) {
        throw new Error('You can only update your own photo');
      }
    }

    const photoUrl = `http://94.23.107.217/uploads/${file.filename}`;
    return this.usersService.update(id, { photoUrl });
  }

  @Post('admin-create')
  @Roles('ADMIN')
  createByAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

}


