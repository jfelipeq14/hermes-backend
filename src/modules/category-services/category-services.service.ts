import { Injectable } from '@nestjs/common';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class CategoryServicesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    try {
      return this.prisma.categoryServices.findMany();
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }

  create(createCategoryServiceDto: CreateCategoryServiceDto) {
    try {
      return this.prisma.categoryServices.create({
        data: createCategoryServiceDto,
      });
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  }
}
