import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryServicesService } from './category-services.service';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';

@Controller('category-services')
export class CategoryServicesController {
  constructor(private readonly categoryServicesService: CategoryServicesService) { }

  @Get()
  findAll() {
    return this.categoryServicesService.findAll();
  }

  @Post()
  create(@Body() createCategoryServiceDto: CreateCategoryServiceDto) {
    return this.categoryServicesService.create(createCategoryServiceDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryServiceDto: UpdateCategoryServiceDto) {
    return this.categoryServicesService.update(+id, updateCategoryServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryServicesService.remove(+id);
  }
}
