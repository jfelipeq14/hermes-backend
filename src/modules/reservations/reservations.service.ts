import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.reservations.findMany({
      include: { detailReservationTravelers: true },
    });
  }

  async findOne(id: number) {
    return await this.prisma.reservations.findUnique({
      where: {
        id,
      },
      include: { detailReservationTravelers: true },
    });
  }

  async findAllByUser(idUser: number) {
    return await this.prisma.reservations.findMany({
      where: {
        idUser,
      },
      include: { detailReservationTravelers: true },
    });
  }

  async create(createReservationDto: CreateReservationDto) {
    const { detailReservationTravelers, ...reservationData } =
      createReservationDto;

    // Verificar que detailReservationTravelers no sea undefined o null
    if (
      !detailReservationTravelers ||
      detailReservationTravelers.length === 0
    ) {
      throw new Error('No se proporcionaron viajeros para la reserva');
    }

    const dates = await this.prisma.dates.findUnique({
      where: {
        id: reservationData.idDate,
      },
      include: {
        packages: true,
      },
    });

    if (!dates) {
      throw new Error('No existe la fecha de reserva seleccionada');
    }

    // Verificar que el campo price exista en packages
    if (!dates.packages || typeof dates.packages.price !== 'number') {
      throw new Error('El paquete seleccionado no tiene un precio válido');
    }

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
    return this.prisma.$transaction(async (prisma) => {
      // Si se proporcionan nuevos privilegios, eliminamos los antiguos primero
      if (detailReservationTravelers && detailReservationTravelers.length > 0) {
        // Eliminar privilegios existentes para este rol
        await prisma.reservations.deleteMany({
          where: { id },
        });

        // Luego actualizamos el rol y creamos los nuevos privilegios
        return prisma.reservations.update({
          where: { id },
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
      } else {
        // Si no hay privilegios nuevos, solo actualizamos los datos del rol
        return prisma.reservations.update({
          where: { id },
          data: reservationData,
          include: {
            detailReservationTravelers: true,
          },
        });
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.reservations.delete({
      where: {
        id,
      },
    });
  }
}
