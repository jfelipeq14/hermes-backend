import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    try {
      return this.prisma.packages.findMany({
        include: {
          detailPackagesServices: true,
          dates: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.packages.findUnique({
        where: {
          id: id,
        },
        include: {
          detailPackagesServices: true,
          dates: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async create(createPackageDto: CreatePackageDto) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.packages.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
