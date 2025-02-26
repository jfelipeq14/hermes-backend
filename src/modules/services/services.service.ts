import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.services.findMany();
  }

  findOne(id: number) {
    return this.prisma.services.findUnique({
      where: {
        id,
      },
    });
  }

  create(createServiceDto: CreateServiceDto) {
    return this.prisma.services.create({
      data: createServiceDto,
    });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.prisma.services.update({
      where: {
        id,
      },
      data: updateServiceDto,
    });
  }

  remove(id: number) {
    return this.prisma.services.delete({
      where: {
        id,
      },
    });
  }
}
