/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PackageServiceService } from './package-service.service';
import { CreatePackageServiceDto } from './dto/create-package-service.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Package-Service')
@Controller('package-services')
export class PackageServiceController {
  constructor(private readonly packageServiceService: PackageServiceService) {}

  @Roles('ADMIN')
  @Get(':idPackage')
  @ApiOperation({ summary: 'Get all package-service relationships' })
  @ApiResponse({
    status: 200,
    description: 'Return all package-service relationships.',
  })
  @ApiResponse({
    status: 404,
    description: 'No package-service relationships found.',
  })
  async findByPackage(@Param('idPackage') idPackage: string) {
    const packageServices =
      await this.packageServiceService.findByPackage(+idPackage);

    if (!packageServices || packageServices.length === 0) {
      throw new HttpException(
        'No package-service relationships found',
        HttpStatus.NOT_FOUND,
      );
    }

    return packageServices;
  }

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new package-service relationship' })
  @ApiResponse({
    status: 201,
    description:
      'The package-service relationship has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createPackageServiceDto: CreatePackageServiceDto[]) {
    try {
      const createdPackageService = await this.packageServiceService.create(
        createPackageServiceDto,
      );

      if (!createdPackageService) {
        throw new HttpException(
          'Failed to create the package-service relationship',
          HttpStatus.BAD_REQUEST,
        );
      }

      return createdPackageService;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({
    summary: 'Delete of a package-service relationship',
  })
  @ApiResponse({
    status: 200,
    description:
      'The package-service relationship has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Package-service relationship not found.',
  })
  async changeStatus(@Param('id') id: string) {
    const packageService = await this.packageServiceService.changeStatus(+id);

    if (!packageService) {
      throw new HttpException(
        'Package-service relationship not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return packageService;
  }
}
