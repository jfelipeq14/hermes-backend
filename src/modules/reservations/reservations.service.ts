import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

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

    if (!dates.packages.price) {
      throw new HttpException(
        'Selected package does not have a valid price',
        HttpStatus.BAD_REQUEST,
      );
    }

    createReservationDto.price = +dates.packages.price;
    createReservationDto.date = new Date(createReservationDto.date);

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

    if (!dates.packages.price) {
      throw new HttpException(
        'Selected package does not have a valid price',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!updateReservationDto.date) {
      throw new HttpException(
        'Reservation date is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    updateReservationDto.price = +dates.packages.price;
    updateReservationDto.date = new Date(updateReservationDto.date);

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

  async remove(id: number) {
    const reservation = await this.prisma.reservations.delete({
      where: { id },
    });

    if (!reservation) {
      throw new HttpException(
        'Failed to delete the reservation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return reservation;
  }
}
