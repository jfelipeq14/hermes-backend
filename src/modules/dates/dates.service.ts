import { Injectable } from '@nestjs/common';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class DatesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.dates.findMany({});
  }

  findOne(id: number) {
    return this.prisma.dates.findUnique({
      where: {
        id,
      },
    });
  }

  create(createDateDto: CreateDateDto) {
    return this.prisma.dates.create({
      data: createDateDto,
    });
  }

  update(id: number, updateDateDto: UpdateDateDto) {
    return this.prisma.dates.update({
      where: {
        id,
      },
      data: updateDateDto,
    });
  }

  async changeStatus(id: number) {
    const datesData = await this.prisma.dates.findUnique({
      where: {
        id: id,
      },
    });

    if (datesData) {
      return await this.prisma.packages.update({
        where: {
          id: id,
        },
        data: {
          status: !datesData.status,
        },
      });
    }
  }

  remove(id: number) {
    return this.prisma.dates.delete({
      where: {
        id,
      },
    });
  }
}
