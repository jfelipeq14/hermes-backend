import { Injectable } from '@nestjs/common';
import { CreatePackageServiceDto } from './dto/create-package-service.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UpdatePackageServiceDto } from './dto/update-package-service.dto';

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

  async update(updatePackageServiceDto: UpdatePackageServiceDto[]) {
    const updatedPackageService = await Promise.all(
      updatePackageServiceDto.map(async (packageService) => {
        return this.prisma.detailPackagesServices.update({
          where: {
            id: packageService.id,
          },
          data: packageService,
        });
      }),
    );

    return updatedPackageService;
  }

  async delete(id: number) {
    return this.prisma.detailPackagesServices.delete({
      where: {
        id,
      },
    });
  }
}
