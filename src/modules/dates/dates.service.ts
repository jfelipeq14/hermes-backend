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
      data: {
        start: new Date(createDateDto.start),
        end: new Date(createDateDto.end),
        startRegistration: new Date(createDateDto.startRegistration),
        endRegistration: new Date(createDateDto.endRegistration),
        idPackage: createDateDto.idPackage,
        amount: createDateDto.amount,
      },
    });
  }

  update(id: number, updateDateDto: UpdateDateDto) {
    if (updateDateDto) {
      return this.prisma.dates.update({
        where: {
          id,
        },
        data: {
          start: new Date(updateDateDto.start || new Date()),
          end: new Date(updateDateDto.end || new Date()),
          startRegistration: new Date(
            updateDateDto.startRegistration || new Date(),
          ),
          endRegistration: new Date(
            updateDateDto.endRegistration || new Date(),
          ),
          idPackage: updateDateDto.idPackage,
          amount: updateDateDto.amount,
        },
      });
    }
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
