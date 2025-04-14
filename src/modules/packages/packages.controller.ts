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
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Package } from './entities/package.entity';

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all packages' })
  @ApiResponse({ status: 200, description: 'Return all packages.' })
  @ApiResponse({ status: 404, description: 'No packages found.' })
  async findAll(): Promise<Package[]> {
    const packagesFound = await this.packagesService.findAll();

    if (!packagesFound || packagesFound.length === 0) {
      throw new HttpException('No packages found', HttpStatus.NOT_FOUND);
    }

    return packagesFound;
  }

  @Roles('ADMIN')
  @Get('active')
  @ApiOperation({ summary: 'Get all packages with status true' })
  @ApiResponse({
    status: 200,
    description: 'Return all packages with status true.',
  })
  @ApiResponse({ status: 404, description: 'No packages found.' })
  async findAllActive(): Promise<Package[]> {
    const packagesFound = await this.packagesService.findAllActive();

    if (!packagesFound || packagesFound.length === 0) {
      throw new HttpException('No packages found', HttpStatus.NOT_FOUND);
    }

    return packagesFound;
  }

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new package' })
  @ApiResponse({
    status: 201,
    description: 'The package has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createPackageDto: CreatePackageDto): Promise<Package> {
    try {
      const createdPackage =
        await this.packagesService.create(createPackageDto);

      if (!createdPackage) {
        throw new HttpException(
          'Failed to create the package',
          HttpStatus.BAD_REQUEST,
        );
      }

      return createdPackage;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a package by ID' })
  @ApiResponse({
    status: 200,
    description: 'The package has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Package not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ): Promise<Package> {
    try {
      const updatedPackage = await this.packagesService.update(
        +id,
        updatePackageDto,
      );

      if (!updatedPackage) {
        throw new HttpException('Package not found', HttpStatus.NOT_FOUND);
      }

      return updatedPackage;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id/change-status')
  @ApiOperation({ summary: 'Change the status of a package by ID' })
  @ApiResponse({
    status: 200,
    description: 'The package status has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Package not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async changeStatus(@Param('id') id: string): Promise<Package> {
    try {
      const updatedStatus = await this.packagesService.changeStatus(+id);

      if (!updatedStatus) {
        throw new HttpException('Package not found', HttpStatus.NOT_FOUND);
      }

      return updatedStatus;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
