import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    try {
      return this.prisma.reservations.findMany({
        include: { detailReservationTravelers: true },
      });
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
        include: { detailReservationTravelers: true },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async create(createReservationDto: CreateReservationDto) {
    try {
      const { detailReservationTravelers, ...reservationData } =
        createReservationDto;
      return await this.prisma.reservations.create({
        data: {
          ...reservationData,
          detailReservationTravelers: {
            create: detailReservationTravelers,
          },
        },
        include: {
          detailReservationTravelers: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    try {
      const { detailReservationTravelers, ...reservationData } =
        updateReservationDto;
      return this.prisma.reservations.update({
        where: {
          id,
        },
        data: {
          ...reservationData,
          detailReservationTravelers: {
            create: detailReservationTravelers,
          },
        },
        include: {
          detailReservationTravelers: true,
        },
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
