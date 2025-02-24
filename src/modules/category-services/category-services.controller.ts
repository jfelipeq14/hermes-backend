import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryServicesService } from './category-services.service';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';
import { ErrorHandler } from 'src/utils/error.handler';

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
      throw new ErrorHandler({
        type: 'INTERNAL_SERVER_ERROR',
        message: error
      })
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.categoryServicesService.findOne(+id);
    } catch (error) {
      throw new ErrorHandler({
        type: "INTERNAL_SERVER_ERROR",
        message: error
      })
    }
  }

  @Post()
  create(@Body() createCategoryServiceDto: CreateCategoryServiceDto) {
    try {
      return this.categoryServicesService.create(createCategoryServiceDto);
    } catch (error) {
      throw new ErrorHandler({
        type: "INTERNAL_SERVER_ERROR",
        message: error
      })
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
      throw new ErrorHandler({
        type: "INTERNAL_SERVER_ERROR",
        message: error
      })
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.categoryServicesService.remove(+id);
    } catch (error) {
      throw new ErrorHandler({
        type: "INTERNAL_SERVER_ERROR",
        message: error
      })
    }
  }
}
