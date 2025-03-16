import { Injectable } from '@nestjs/common';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class DatesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.dates.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.dates.findUnique({
      where: {
        id,
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
    if (updateDateDto) {
      return await this.prisma.dates.update({
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
      return await this.prisma.dates.update({
        where: {
          id: id,
        },
        data: {
          status: !datesData.status,
        },
      });
    }
  }

  // async remove(id: number) {
  //   const dataAsociated = await this.prisma.dates.findUnique({
  //     where: {
  //       id,
  //     },
  //     include: {
  //       meetings: true,
  //       reservations: true,
  //     },
  //   });

  //   if (!dataAsociated) {
  //     throw new Error('No se encontro la programación');
  //   }

  //   if (dataAsociated.meetings.length > 0) {
  //     throw new Error(
  //       'No se puede eliminar una programacion con encuentros asociados',
  //     );
  //   }

  //   if (dataAsociated.reservations.length > 0) {
  //     throw new Error(
  //       'No se puede eliminar una programacion con reservas asociadas',
  //     );
  //   }

  //   return await this.prisma.dates.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}
