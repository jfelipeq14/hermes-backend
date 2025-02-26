import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.reservations.findMany({
      include: { detailReservationTravelers: true },
    });
  }

  findOne(id: number) {
    return this.prisma.reservations.findUnique({
      where: {
        id,
      },
      include: { detailReservationTravelers: true },
    });
  }

  async create(createReservationDto: CreateReservationDto) {
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
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
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
  }

  remove(id: number) {
    return this.prisma.reservations.delete({
      where: {
        id,
      },
    });
  }
}
