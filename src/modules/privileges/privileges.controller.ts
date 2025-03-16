import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrivilegesService } from './privileges.service';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('privileges')
export class PrivilegesController {
  constructor(private readonly privilegesService: PrivilegesService) {}

  @Roles('ADMIN')
  @Get()
  findAll() {
    try {
      return this.privilegesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.privilegesService.findOne(+id);
    } catch (error) {
      console.log(error);
    }
  }

  @Roles('ADMIN')
  @Post()
  create(@Body() createPrivilegeDto: CreatePrivilegeDto) {
    try {
      return this.privilegesService.create(createPrivilegeDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrivilegeDto: UpdatePrivilegeDto,
  ) {
    try {
      return this.privilegesService.update(+id, updatePrivilegeDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.privilegesService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
