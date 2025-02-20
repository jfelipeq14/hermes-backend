import { Injectable } from '@nestjs/common';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class DatesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    try {
      return this.prisma.dates.findMany({
        include: {
          meetings: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.dates.findUnique({
        where: {
          id,
        },
        include: {
          meetings: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  create(createDateDto: CreateDateDto) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateDateDto: UpdateDateDto) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.dates.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
