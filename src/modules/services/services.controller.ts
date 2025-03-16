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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Roles('ADMIN')
  @Get()
  async findAll() {
    const services_ = await this.servicesService.findAll();
    if (!services_ || services_.length === 0)
      throw new HttpException('No existen servicios', HttpStatus.NOT_FOUND);
    return services_;
  }

  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service_ = await this.servicesService.findOne(+id);
    if (!service_)
      throw new HttpException('No existe el servicio', HttpStatus.NOT_FOUND);
    return service_;
  }

  @Roles('ADMIN')
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    try {
      return await this.servicesService.create(createServiceDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    try {
      return await this.servicesService.update(+id, updateServiceDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch(':id/status')
  async changeStatus(@Param('id') id: string) {
    try {
      return await this.servicesService.changeStatus(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
