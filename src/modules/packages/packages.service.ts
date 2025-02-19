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
      });
    } catch (error) {
      console.log(error);
    }
  }

  create(createPackageDto: CreatePackageDto) {
    try {
      return this.prisma.packages.create({
        data: {
          ...createPackageDto,
          detailPackagesServices: {
            create: createPackageDto.detailPackagesServices,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    try {
      return this.prisma.packages.update({
        where: {
          id: id,
        },
        data: {
          ...updatePackageDto,
          detailPackagesServices: updatePackageDto.detailPackagesServices
            ? {
                update: updatePackageDto.detailPackagesServices.map(
                  (service) => ({
                    where: { id: service.idService },
                    data: service,
                  }),
                ),
              }
            : undefined,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.packages.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
