/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
// import { Roles } from '../auth/decorators/roles.decorator';
import { IsPublic } from '../auth/decorators/public.decorator';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({ status: 200, description: 'Return all services.' })
  @ApiResponse({ status: 404, description: 'No services found.' })
  async findAll() {
    const services = await this.servicesService.findAll();

    if (!services || services.length === 0) {
      throw new HttpException('No services found', HttpStatus.NOT_FOUND);
    }

    return services;
  }

  // @IsPublic()
  // @Get('package/:id')
  // @ApiOperation({ summary: 'Get all services' })
  // @ApiResponse({ status: 200, description: 'Return all services.' })
  // @ApiResponse({ status: 404, description: 'No services found.' })
  // async findByPackage(@Param('id') idPackage: string) {
  //   const servicesByPackage =
  //     await this.servicesService.findByPackage(+idPackage);

  //   if (!servicesByPackage || servicesByPackage.length === 0) {
  //     throw new HttpException('No services found', HttpStatus.NOT_FOUND);
  //   }

  //   return servicesByPackage;
  // }

  @IsPublic()
  @Get(':id')
  @ApiOperation({ summary: 'Get a service by ID' })
  @ApiResponse({ status: 200, description: 'Return the service.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async findOne(@Param('id') id: string) {
    try {
      const service = await this.servicesService.findOne(+id);

      if (!service) {
        throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
      }

      return service;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({
    status: 201,
    description: 'The service has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createServiceDto: CreateServiceDto) {
    try {
      return await this.servicesService.create(createServiceDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @IsPublic()
  @Put(':id')
  @ApiOperation({ summary: 'Update a service by ID' })
  @ApiResponse({
    status: 200,
    description: 'The service has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    try {
      const updatedService = await this.servicesService.update(
        +id,
        updateServiceDto,
      );

      if (!updatedService) {
        throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
      }

      return updatedService;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @IsPublic()
  @Patch(':id')
  @ApiOperation({ summary: 'Change the status of a service by ID' })
  @ApiResponse({
    status: 200,
    description: 'The service status has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async changeStatus(@Param('id') id: string) {
    try {
      const updatedService = await this.servicesService.changeStatus(+id);

      if (!updatedService) {
        throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
      }

      return updatedService;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
