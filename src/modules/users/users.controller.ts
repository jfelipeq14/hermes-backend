/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN')
  @Get()
  async findAll() {
    const users_ = await this.usersService.findAll();
    if (!users_ || users_.length === 0)
      throw new HttpException('No existen usuarios', HttpStatus.NOT_FOUND);
    return users_;
  }

  @Roles('ADMIN')
  @Get('clients')
  async findAllClients() {
    const clients_ = await this.usersService.findAllClients();
    if (!clients_ || clients_.length === 0)
      throw new HttpException('No existen clientes', HttpStatus.NOT_FOUND);
    return clients_;
  }

  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user_ = await this.usersService.findOne(+id);
    if (!user_)
      throw new HttpException('No existe ese usuario', HttpStatus.NOT_FOUND);
    return user_;
  }

  @Roles('ADMIN')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch('changeStatus/:id')
  async changeStatus(@Param('id') id: string) {
    try {
      return await this.usersService.changeStatus(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
