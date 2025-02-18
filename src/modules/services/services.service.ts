import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    try {
      return this.prisma.services.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.services.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  create(createServiceDto: CreateServiceDto) {
    try {
      return this.prisma.services.create({
        data: createServiceDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      return this.prisma.services.update({
        where: {
          id,
        },
        data: updateServiceDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.services.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
