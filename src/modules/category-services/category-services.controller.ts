/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryServicesService } from './category-services.service';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';
import { CategoryService } from './entities/category-service.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Categories')
@Controller('category-services')
export class CategoryServicesController {
  constructor(
    private readonly categoryServicesService: CategoryServicesService,
  ) {}

  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all category services' })
  @ApiResponse({ status: 200, description: 'Return all category services.' })
  @ApiResponse({ status: 404, description: 'No category services found.' })
  async findAll(): Promise<CategoryService[]> {
    const categoryServices = await this.categoryServicesService.findAll();

    if (!categoryServices || categoryServices.length === 0) {
      throw new HttpException(
        'No category services found',
        HttpStatus.NOT_FOUND,
      );
    }

    return categoryServices;
  }

  @Roles('ADMIN')
  @Get('active')
  @ApiOperation({ summary: 'Get all category services with status active' })
  @ApiResponse({
    status: 200,
    description: 'Return all category services with status true.',
  })
  @ApiResponse({ status: 404, description: 'No category services found.' })
  async findAllActive(): Promise<CategoryService[]> {
    const categoryServices = await this.categoryServicesService.findAllActive();

    if (!categoryServices || categoryServices.length === 0) {
      throw new HttpException(
        'No category services found',
        HttpStatus.NOT_FOUND,
      );
    }

    return categoryServices;
  }

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new category service' })
  @ApiResponse({
    status: 201,
    description: 'The category service has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(
    @Body() createCategoryServiceDto: CreateCategoryServiceDto,
  ): Promise<CategoryService> {
    try {
      const createdCategoryService = await this.categoryServicesService.create(
        createCategoryServiceDto,
      );

      if (!createdCategoryService) {
        throw new HttpException(
          'Failed to create the category service',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return createdCategoryService;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a category service by ID' })
  @ApiResponse({
    status: 200,
    description: 'The category service has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Category service not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryServiceDto: UpdateCategoryServiceDto,
  ): Promise<CategoryService> {
    try {
      const updatedCategoryService = await this.categoryServicesService.update(
        +id,
        updateCategoryServiceDto,
      );

      if (!updatedCategoryService) {
        throw new HttpException(
          'Category service not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedCategoryService;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id/change-status')
  @ApiOperation({ summary: 'Delete a category service by ID' })
  @ApiResponse({
    status: 200,
    description: 'The category service has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Category service not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async changeStatus(@Param('id') id: string): Promise<CategoryService> {
    try {
      const updatedCategory: CategoryService =
        await this.categoryServicesService.changeStatus(+id);

      if (!updatedCategory) {
        throw new HttpException(
          'Category service not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedCategory;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
