import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}



  @Get()
  findAll() {
   try {
      return this.rolesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.rolesService.findOne(+id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return this.rolesService.create(createRoleDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      return this.rolesService.update(+id, updateRoleDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.rolesService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
