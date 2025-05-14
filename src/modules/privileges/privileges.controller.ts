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
  async findAll() {
    return await this.privilegesService.findAll();
  }

  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.privilegesService.findOne(+id);
  }

  @Roles('ADMIN')
  @Post()
  async create(@Body() createPrivilegeDto: CreatePrivilegeDto) {
    return await this.privilegesService.create(createPrivilegeDto);
  }

  @Roles('ADMIN')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePrivilegeDto: UpdatePrivilegeDto,
  ) {
    return await this.privilegesService.update(+id, updatePrivilegeDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.privilegesService.remove(+id);
  }
}
