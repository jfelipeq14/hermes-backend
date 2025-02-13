import { Injectable } from '@nestjs/common';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';

@Injectable()
export class CategoryServicesService {
  findAll() {
    return `This action returns all categoryServices`;
  }

  create(createCategoryServiceDto: CreateCategoryServiceDto) {
    return 'This action adds a new categoryService';
  }

  update(id: number, updateCategoryServiceDto: UpdateCategoryServiceDto) {
    return `This action updates a #${id} categoryService`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryService`;
  }
}
