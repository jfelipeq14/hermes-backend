import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) { }
  create(createPackageDto: CreatePackageDto) {
    try {
      return this.prisma.packages.create({
        data: createPackageDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all packages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} package`;
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
