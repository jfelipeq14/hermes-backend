/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoryServicesService } from './category-services.service';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';

@Controller('category-services')
export class CategoryServicesController {
  constructor(
    private readonly categoryServicesService: CategoryServicesService,
  ) {}

  @Get()
  async findAll() {
    const categoryServices_ = await this.categoryServicesService.findAll();
    if (!categoryServices_) {
      throw new HttpException('No existen categorias', HttpStatus.NOT_FOUND);
    }
    return categoryServices_;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const categoryService_ = await this.categoryServicesService.findOne(+id);
    if (!categoryService_) {
      throw new HttpException('No existe esa categoria', HttpStatus.NOT_FOUND);
    }
    return categoryService_;
  }

  @Post()
  async create(@Body() createCategoryServiceDto: CreateCategoryServiceDto) {
    try {
      return await this.categoryServicesService.create(
        createCategoryServiceDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryServiceDto: UpdateCategoryServiceDto,
  ) {
    try {
      return this.categoryServicesService.update(+id, updateCategoryServiceDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.categoryServicesService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
