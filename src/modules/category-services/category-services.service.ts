import { Injectable } from '@nestjs/common';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class CategoryServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.categoryServices.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.categoryServices.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createCategoryServiceDto: CreateCategoryServiceDto) {
    return await this.prisma.categoryServices.create({
      data: createCategoryServiceDto,
    });
  }

  async update(id: number, updateCategoryServiceDto: UpdateCategoryServiceDto) {
    return await this.prisma.categoryServices.update({
      where: {
        id,
      },
      data: updateCategoryServiceDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.categoryServices.delete({
      where: {
        id,
      },
    });
  }
}
