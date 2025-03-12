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
    const dates = await this.prisma.dates.findUnique({
      where: {
        id: reservationData.idDate,
      },
      include: {
        packages: true,
      },
    });
    if (!dates) throw new Error('No existe la fecha de reserva seleccionada');
    const price = dates.packages.price;
    reservationData.price = +price * detailReservationTravelers.length;
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

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const { detailReservationTravelers, ...reservationData } =
      updateReservationDto;
    const dates = await this.prisma.dates.findUnique({
      where: {
        id: reservationData.idDate,
      },
      include: {
        packages: true,
      },
    });
    if (!dates) throw new Error('No existe la fecha de reserva seleccionada');
    const price = dates.packages.price;
    if (!detailReservationTravelers)
      throw new Error('No existe el detalle de los viajeros');
    reservationData.price = +price * detailReservationTravelers.length;
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
