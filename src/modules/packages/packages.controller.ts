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
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Roles('ADMIN', 'CLIENT')
  @Get()
  async findAll() {
    const packages_ = await this.packagesService.findAll();
    if (!packages_)
      throw new HttpException('No existen paquetes', HttpStatus.NOT_FOUND);
    return packages_;
  }

  @Roles('ADMIN', 'CLIENT')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const package_ = await this.packagesService.findOne(+id);
    if (!package_)
      throw new HttpException('No existe ese paquete', HttpStatus.NOT_FOUND);
  }

  @Roles('ADMIN')
  @Post()
  async create(@Body() createPackageDto: CreatePackageDto) {
    try {
      return await this.packagesService.create(createPackageDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    try {
      return await this.packagesService.update(+id, updatePackageDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string) {
    try {
      return await this.packagesService.changeStatus(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
