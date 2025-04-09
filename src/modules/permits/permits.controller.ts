/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PermitsService } from './permits.service';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('permits')
export class PermitsController {
  constructor(private readonly permitsService: PermitsService) {}

  @Roles('ADMIN')
  @Get()
  async findAll() {
    const permits_ = await this.permitsService.findAll();
    if (!permits_)
      throw new HttpException('No permits found', HttpStatus.NOT_FOUND);
    return permits_;
  }

  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const permit_ = await this.permitsService.findOne(+id);
    if (!permit_)
      throw new HttpException('No permit found', HttpStatus.NOT_FOUND);
    return permit_;
  }

  @Roles('ADMIN')
  @Post()
  async create(@Body() createPermitDto: CreatePermitDto) {
    try {
      return await this.permitsService.create(createPermitDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermitDto: UpdatePermitDto,
  ) {
    try {
      return await this.permitsService.update(+id, updatePermitDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.permitsService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
