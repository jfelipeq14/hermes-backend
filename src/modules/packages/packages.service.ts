import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.packages.findMany({
      include: {
        detailPackagesServices: true,
        dates: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.packages.findUnique({
      where: {
        id: id,
      },
      include: {
        detailPackagesServices: true,
        dates: true,
      },
    });
  }

  async create(createPackageDto: CreatePackageDto) {
    const { detailPackagesServices, ...packageData } = createPackageDto;
    return await this.prisma.packages.create({
      data: {
        ...packageData,
        detailPackagesServices: {
          create: detailPackagesServices,
        },
      },
      include: {
        detailPackagesServices: true,
      },
    });
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    const { detailPackagesServices, ...packageData } = updatePackageDto;
    return await this.prisma.packages.update({
      where: {
        id: id,
      },
      data: {
        ...packageData,
        detailPackagesServices: {
          create: detailPackagesServices,
        },
      },
      include: {
        detailPackagesServices: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.packages.delete({
      where: {
        id: id,
      },
    });
  }
}
