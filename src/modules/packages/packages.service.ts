import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.packages.findMany({
      include: {
        detailPackagesServices: true,
        dates: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.packages.findUnique({
      where: {
        id,
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
    return this.prisma.$transaction(async (prisma) => {
      if (detailPackagesServices && detailPackagesServices.length > 0) {
        await prisma.packages.deleteMany({
          where: { id },
        });

        return prisma.packages.update({
          where: { id },
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
      } else {
        return prisma.packages.update({
          where: { id },
          data: packageData,
          include: {
            detailPackagesServices: true,
          },
        });
      }
    });
  }

  async changeStatus(id: number) {
    const packageData = await this.prisma.packages.findUnique({
      where: {
        id,
      },
    });

    if (packageData) {
      const dates = await this.prisma.dates.findMany({
        where: {
          idPackage: packageData.id,
        },
      });

      if (!dates) {
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
    return packageData;
  }
}
