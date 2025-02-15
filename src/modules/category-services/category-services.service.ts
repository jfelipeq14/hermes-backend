import { Injectable } from '@nestjs/common';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class CategoryServicesService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    try {
      return this.prisma.categoryServices.findMany();
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.categoryServices.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  }

  create(createCategoryServiceDto: CreateCategoryServiceDto) {
    try {
      return this.prisma.categoryServices.create({
        data: createCategoryServiceDto,
      });
    } catch (error) {
      return error;
    }
  }

  update(id: number, updateCategoryServiceDto: UpdateCategoryServiceDto) {
    try {
      return this.prisma.categoryServices.update({
        where: {
          id,
        },
        data: updateCategoryServiceDto,
      });
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    try {
      return this.prisma.categoryServices.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
