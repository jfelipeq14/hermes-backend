import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.services.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.services.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createServiceDto: CreateServiceDto) {
    return await this.prisma.services.create({
      data: createServiceDto,
    });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const packagesAsociated = await this.prisma.services.findUnique({
      where: {
        id,
      },
      include: {
        detailPackagesServices: true,
      },
    });

    if (!packagesAsociated) {
      throw new Error('No se encontro el servicio');
    }

    if (packagesAsociated.detailPackagesServices.length > 0) {
      throw new Error(
        'No se puede actualizar un servicio con paquetes asociados',
      );
    }

    return await this.prisma.services.update({
      where: {
        id,
      },
      data: updateServiceDto,
    });
  }

  async changeStatus(id: number) {
    const service = await this.prisma.services.findUnique({
      where: {
        id,
      },
    });

    if (service)
      return this.prisma.services.update({
        where: {
          id,
        },
        data: {
          status: !service.status,
        },
      });
  }
}
