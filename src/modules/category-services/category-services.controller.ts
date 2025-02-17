import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { CategoryServicesService } from './category-services.service';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';

@Controller('category-services')
export class CategoryServicesController {
  constructor(
    private readonly categoryServicesService: CategoryServicesService,
  ) { }

  @Get()
  findAll() {
    try {
      return this.categoryServicesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.categoryServicesService.findOne(+id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  create(@Body() createCategoryServiceDto: CreateCategoryServiceDto) {
    try {
      if (!createCategoryServiceDto.name) throw new BadRequestException('Name is required');

      return this.categoryServicesService.create(createCategoryServiceDto);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.categoryServicesService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
