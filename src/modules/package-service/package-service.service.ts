import { Injectable } from '@nestjs/common';
import { CreatePackageServiceDto } from './dto/create-package-service.dto';
import { UpdatePackageServiceDto } from './dto/update-package-service.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PackageServiceService {
  constructor(private prisma: PrismaService) {}

  async findByPackage(idPackage: number) {
    return await this.prisma.detailPackagesServices.findMany({
      where: {
        idPackage,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.detailPackagesServices.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createPackageServiceDto: CreatePackageServiceDto) {
    return await this.prisma.detailPackagesServices.create({
      data: createPackageServiceDto,
    });
  }

  async update(id: number, updatePackageServiceDto: UpdatePackageServiceDto) {
    return await this.prisma.detailPackagesServices.update({
      where: { id },
      data: updatePackageServiceDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.detailPackagesServices.delete({
      where: {
        id,
      },
    });
  }
}
