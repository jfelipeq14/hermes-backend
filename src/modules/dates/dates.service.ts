import { Injectable } from '@nestjs/common';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class DatesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.dates.findMany({
      include: {
        meetings: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.dates.findUnique({
      where: {
        id,
      },
      include: {
        meetings: true,
      },
    });
  }

  create(createDateDto: CreateDateDto) {
    const { meetings, ...dateData } = createDateDto;
    return this.prisma.dates.create({
      data: {
        ...dateData,
        meetings: {
          create: meetings,
        },
      },
      include: {
        meetings: true,
      },
    });
  }

  update(id: number, updateDateDto: UpdateDateDto) {
    const { meetings, ...dateData } = updateDateDto;
    return this.prisma.dates.update({
      where: {
        id,
      },
      data: {
        ...dateData,
        meetings: {
          create: meetings,
        },
      },
      include: {
        meetings: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.dates.delete({
      where: {
        id,
      },
    });
  }
}
