/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoryServicesService } from './category-services.service';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { CategoryService } from './entities/category-service.entity';

@Controller('category-services')
export class CategoryServicesController {
  constructor(
    private readonly categoryServicesService: CategoryServicesService,
  ) {}

  @Roles('ADMIN')
  @Get()
  async findAll(): Promise<CategoryService[]> {
    const categoryServices_ = await this.categoryServicesService.findAll();
    if (!categoryServices_ || categoryServices_.length === 0) {
      throw new HttpException('No existen categorias', HttpStatus.NOT_FOUND);
    }
    return categoryServices_;
  }

  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryService> {
    const categoryService_ = await this.categoryServicesService.findOne(+id);
    if (!categoryService_) {
      throw new HttpException('No existe esa categoria', HttpStatus.NOT_FOUND);
    }
    return categoryService_;
  }

  @Roles('ADMIN')
  @Post()
  async create(
    @Body() createCategoryServiceDto: CreateCategoryServiceDto,
  ): Promise<CategoryService> {
    try {
      return await this.categoryServicesService.create(
        createCategoryServiceDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryServiceDto: UpdateCategoryServiceDto,
  ): Promise<CategoryService> {
    try {
      return await this.categoryServicesService.update(
        +id,
        updateCategoryServiceDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CategoryService> {
    try {
      return await this.categoryServicesService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
