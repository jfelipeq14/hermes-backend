import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    try {
      return this.prisma.reservations.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.reservations.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  create(createReservationDto: CreateReservationDto) {
    try {
      return this.prisma.reservations.create({
        data: createReservationDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    try {
      return this.prisma.reservations.update({
        where: {
          id,
        },
        data: updateReservationDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.reservations.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
