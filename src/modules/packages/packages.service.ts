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
    const { detailPackagesServices, ...packageData } = createPackageDto;

    // Validate foreign keys
    const activityExists = await this.prisma.activities.findUnique({
      where: { id: packageData.idActivity },
    });
    if (!activityExists) {
      throw new Error('Invalid idActivity: Activity does not exist');
    }

    const municipalityExists = await this.prisma.municipalities.findUnique({
      where: { id: packageData.idMunicipality },
    });
    if (!municipalityExists) {
      throw new Error('Invalid idMunicipality: Municipality does not exist');
    }

    for (const service of detailPackagesServices) {
      const serviceExists = await this.prisma.services.findUnique({
        where: { id: service.idService },
      });
      if (!serviceExists) {
        throw new Error(
          `Invalid idService: Service with id ${service.idService} does not exist`,
        );
      }
    }

    // Proceed with package creation
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
        // Delete existing related entities
        await prisma.detailPackagesServices.deleteMany({
          where: { idPackage: id },
        });

        // Update package and create new related entities
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
        // Update package without modifying related entities
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
