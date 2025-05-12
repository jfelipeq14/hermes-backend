import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.reservations.findMany({
      include: {
        detailReservationTravelers: true,
      },
    });
  }

  async findOne(id: number) {
    const reservation = await this.prisma.reservations.findUnique({
      where: { id },
      include: {
        detailReservationTravelers: true,
      },
    });
    if (!reservation) {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
    }
    return reservation;
  }

  async findAllByUser(idUser: number) {
    return await this.prisma.reservations.findMany({
      where: { idUser },
      include: {
        detailReservationTravelers: true,
      },
    });
  }

  async findAllReservationWithPayments() {
    return await this.prisma.reservations.findMany({
      include: {
        payments: true,
      },
    });
  }

  async create(createReservationDto: CreateReservationDto) {
    const { detailReservationTravelers, ...reservation } = createReservationDto;
    return await this.prisma.reservations.create({
      data: {
        ...reservation,
        detailReservationTravelers: {
          create: detailReservationTravelers,
        },
      },
      include: {
        detailReservationTravelers: true,
      },
    });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const { detailReservationTravelers, ...reservation } = updateReservationDto;

    return this.prisma.$transaction(async (prisma) => {
      if (detailReservationTravelers && detailReservationTravelers.length > 0) {
        await prisma.detailReservationTravelers.deleteMany({
          where: { idReservation: id },
        });

        return prisma.reservations.update({
          where: { id },
          data: {
            ...reservation,
            detailReservationTravelers: {
              create: detailReservationTravelers,
            },
          },
          include: {
            detailReservationTravelers: true,
          },
        });
      } else {
        return prisma.reservations.update({
          where: { id },
          data: reservation,
          include: {
            detailReservationTravelers: true,
          },
        });
      }
    });
  }

  async changeStatus(id: number, status: string) {
    const reservation = await this.prisma.reservations.findUnique({
      where: {
        id,
      },
    });

    if (!reservation) {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.reservations.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });
  }
}
