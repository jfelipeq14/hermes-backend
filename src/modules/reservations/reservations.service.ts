import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.reservations.findMany();
  }

  async findOne(id: number) {
    const reservation = await this.prisma.reservations.findUnique({
      where: { id },
    });
    if (!reservation) {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
    }
    return reservation;
  }

  async findAllByUser(idUser: number) {
    return await this.prisma.reservations.findMany({
      where: { idUser },
    });
  }

  async findByReservation(idReservation: number) {
    return await this.prisma.detailReservationTravelers.findMany({
      where: { idReservation },
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
    const dates = await this.prisma.dates.findUnique({
      where: { id: createReservationDto.idDate },
      include: { packages: true },
    });

    if (!dates) {
      throw new HttpException(
        'Selected reservation date does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.reservations.create({
      data: createReservationDto,
    });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const dates = await this.prisma.dates.findUnique({
      where: { id: updateReservationDto.idDate },
      include: { packages: true },
    });

    if (!dates) {
      throw new HttpException(
        'Selected reservation date does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedReservation = await this.prisma.reservations.update({
      where: { id },
      data: updateReservationDto,
    });

    if (!updatedReservation) {
      throw new HttpException(
        'Failed to update the reservation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return updatedReservation;
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
