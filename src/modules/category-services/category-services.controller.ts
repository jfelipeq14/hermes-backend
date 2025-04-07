/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Put,
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
// import { Roles } from '../auth/decorators/roles.decorator';
import { CategoryService } from './entities/category-service.entity';
import { IsPublic } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('category-services')
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

  @IsPublic()
  @Get(':id')
  @ApiOperation({ summary: 'Get a category service by ID' })
  @ApiResponse({ status: 200, description: 'Return the category service.' })
  @ApiResponse({ status: 404, description: 'Category service not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async findOne(@Param('id') id: string): Promise<CategoryService> {
    try {
      const categoryService = await this.categoryServicesService.findOne(+id);

      if (!categoryService) {
        throw new HttpException(
          'Category service not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return categoryService;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @IsPublic()
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

  @IsPublic()
  @Put(':id')
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

  @IsPublic()
  @Patch(':id')
  @ApiOperation({ summary: 'Delete a category service by ID' })
  @ApiResponse({
    status: 200,
    description: 'The category service has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Category service not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async changeStatus(@Param('id') id: string): Promise<CategoryService> {
    try {
      const removedCategoryService =
        await this.categoryServicesService.changeStatus(+id);

      if (!removedCategoryService) {
        throw new HttpException(
          'Category service not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return removedCategoryService;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
