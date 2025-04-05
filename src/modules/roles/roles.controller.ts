/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IsPublic } from '../auth/decorators/public.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @IsPublic()
  @Get()
  async findAll() {
    const roles_ = await this.rolesService.findAll();
    if (!roles_)
      throw new HttpException('No roles found', HttpStatus.NOT_FOUND);
    return roles_;
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role_ = await this.rolesService.findOne(+id);
    if (!role_) throw new HttpException('No role found', HttpStatus.NOT_FOUND);
    return role_;
  }

  @IsPublic()
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return await this.rolesService.create(createRoleDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @IsPublic()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      return await this.rolesService.update(+id, updateRoleDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @IsPublic()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.rolesService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
