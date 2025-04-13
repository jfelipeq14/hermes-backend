import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PackagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.packages.findMany({
      include: {
        detailPackagesServices: true,
      },
    });
  }

  async findAllActive() {
    return await this.prisma.packages.findMany({
      where: {
        status: true,
      },
    });
  }

  async create(createPackageDto: CreatePackageDto) {
    return await this.prisma.packages.create({
      data: createPackageDto,
    });
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    return await this.prisma.packages.update({
      where: { id },
      data: updatePackageDto,
    });
  }

  async changeStatus(id: number) {
    const packageData = await this.prisma.packages.findUnique({
      where: {
        id,
      },
    });

    if (!packageData) {
      throw new Error('Package not found');
    }

    return await this.prisma.packages.update({
      where: {
        id: id,
      },
      data: {
        status: !packageData.status,
      },
    });
  }
}
