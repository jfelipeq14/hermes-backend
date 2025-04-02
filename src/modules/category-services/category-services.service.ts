import { Injectable } from '@nestjs/common';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class CategoryServicesService {
  constructor(private readonly prisma: PrismaService) {}

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
    const serviceAsociated = await this.prisma.categoryServices.findUnique({
      where: {
        id,
      },
      include: {
        services: true,
      },
    });

    if (!serviceAsociated) {
      throw new Error('No se encontro la categoria');
    }

    if (serviceAsociated.services.length > 0) {
      throw new Error(
        'No se puede actualizar una categoria con servicios asociados',
      );
    }

    return await this.prisma.categoryServices.update({
      where: {
        id,
      },
      data: updateCategoryServiceDto,
    });
  }

  async changeStatus(id: number) {
    const category = await this.prisma.categoryServices.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return this.prisma.categoryServices.update({
      where: {
        id,
      },
      data: {
        status: !category.status, // Toggle the status
      },
    });
  }
}
