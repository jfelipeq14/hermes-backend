import { Injectable } from '@nestjs/common';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ErrorHandler } from 'src/utils/error.handler';

@Injectable()
export class CategoryServicesService {
  constructor(private prisma: PrismaService) { }

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
    try {
      return await this.prisma.categoryServices.create({
        data: createCategoryServiceDto,
      });
    } catch (error) {
      throw new ErrorHandler({
        type: 'INTERNAL_SERVER_ERROR',
        message: error,
      });
    }
  }

  update(id: number, updateCategoryServiceDto: UpdateCategoryServiceDto) {
    return this.prisma.categoryServices.update({
      where: {
        id,
      },
      data: updateCategoryServiceDto,
    });
  }

  remove(id: number) {
    return this.prisma.categoryServices.delete({
      where: {
        id,
      },
    });
  }
}
