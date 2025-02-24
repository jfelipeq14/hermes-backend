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
    const categoryService = await this.categoryServicesService.findAll();
    if (!categoryService) {
      throw new HttpException('No hay categorias', HttpStatus.NOT_FOUND);
    }
    return categoryService;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const categoryService = await this.categoryServicesService.findOne(+id);
    if (!categoryService) {
      throw new HttpException('No existe esa categoria', HttpStatus.NOT_FOUND);
    }
    return categoryService;
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
