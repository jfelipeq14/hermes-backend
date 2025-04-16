import { Injectable } from '@nestjs/common';
import { CreatePackageServiceDto } from './dto/create-package-service.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PackageServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async findByPackage(idPackage: number) {
    return await this.prisma.detailPackagesServices.findMany({
      where: {
        idPackage,
      },
    });
  }

  async create(createPackageServiceDto: CreatePackageServiceDto[]) {
    return await this.prisma.detailPackagesServices.createMany({
      data: createPackageServiceDto,
    });
  }

  async changeStatus(id: number) {
    const packageService = await this.prisma.detailPackagesServices.findUnique({
      where: { id },
    });

    if (!packageService) {
      throw new Error('Package service not found');
    }

    return await this.prisma.detailPackagesServices.update({
      where: { id },
      data: {
        status: !packageService.status,
      },
    });
  }
}
