import { Injectable } from '@nestjs/common';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class DatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.dates.findMany();
  }

  findDatesByResponsible(idUser: number) {
    return this.prisma.dates.findMany({
      where: {
        meetings: {
          some: {
            responsibles: {
              some: {
                idUser,
              },
            },
          },
        },
      },
      include: {
        meetings: {
          include: {
            responsibles: true,
          },
        },
      },
    });
  }

  async create(createDateDto: CreateDateDto) {
    return await this.prisma.dates.create({
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

  async update(id: number, updateDateDto: UpdateDateDto) {
    return await this.prisma.dates.update({
      where: { id: +id },
      data: {
        start: updateDateDto.start ? new Date(updateDateDto.start) : undefined,
        end: updateDateDto.end ? new Date(updateDateDto.end) : undefined,
        startRegistration: updateDateDto.startRegistration
          ? new Date(updateDateDto.startRegistration)
          : undefined,
        endRegistration: updateDateDto.endRegistration
          ? new Date(updateDateDto.endRegistration)
          : undefined,
        idPackage: updateDateDto.idPackage,
        amount: updateDateDto.amount,
      },
    });
  }

  async changeStatus(id: number) {
    const datesData = await this.prisma.dates.findUnique({
      where: { id },
    });

    if (datesData) {
      return await this.prisma.dates.update({
        where: { id },
        data: { status: !datesData.status },
      });
    }
  }
}
