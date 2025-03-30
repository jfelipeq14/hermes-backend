/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Put,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PackageServiceService } from './package-service.service';
import { CreatePackageServiceDto } from './dto/create-package-service.dto';
import { UpdatePackageServiceDto } from './dto/update-package-service.dto';
import { IsPublic } from '../auth/decorators/public.decorator';
// import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('package-services')
@Controller('package-services')
export class PackageServiceController {
  constructor(private readonly packageServiceService: PackageServiceService) {}

  @IsPublic()
  @Get('/package/:idPackage')
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

  @IsPublic()
  @Get(':id')
  @ApiOperation({ summary: 'Get a package-service relationship by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the package-service relationship.',
  })
  @ApiResponse({
    status: 404,
    description: 'Package-service relationship not found.',
  })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async findOne(@Param('id') id: string) {
    try {
      const packageService = await this.packageServiceService.findOne(+id);

      if (!packageService) {
        throw new HttpException(
          'Package-service relationship not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return packageService;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Create a new package-service relationship' })
  @ApiResponse({
    status: 201,
    description:
      'The package-service relationship has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createPackageServiceDto: CreatePackageServiceDto) {
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

  @IsPublic()
  @Put(':id')
  @ApiOperation({ summary: 'Update a package-service relationship by ID' })
  @ApiResponse({
    status: 200,
    description:
      'The package-service relationship has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Package-service relationship not found.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(
    @Param('id') id: string,
    @Body() updatePackageServiceDto: UpdatePackageServiceDto,
  ) {
    try {
      const updatedPackageService = await this.packageServiceService.update(
        +id,
        updatePackageServiceDto,
      );

      if (!updatedPackageService) {
        throw new HttpException(
          'Package-service relationship not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedPackageService;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @IsPublic()
  @Patch(':id')
  @ApiOperation({ summary: 'Delete a package-service relationship by ID' })
  @ApiResponse({
    status: 200,
    description:
      'The package-service relationship has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Package-service relationship not found.',
  })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async changeStatus(@Param('id') id: string) {
    try {
      const deletedPackageService =
        await this.packageServiceService.changeStatus(+id);

      if (!deletedPackageService) {
        throw new HttpException(
          'Package-service relationship not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return deletedPackageService;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
