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

  async delete(id: number) {
    return this.prisma.detailPackagesServices.delete({
      where: {
        id,
      },
    });
  }
}
