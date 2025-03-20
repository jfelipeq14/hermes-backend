import { Injectable } from '@nestjs/common';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDto } from './dto/update-traveler.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class TravelersService {
  constructor(private prisma: PrismaService) {}

  async create(createTravelerDto: CreateTravelerDto) {
    return await this.prisma.detailReservationTravelers.create({
      data: createTravelerDto,
    });
  }

  async findAll() {
    return await this.prisma.detailReservationTravelers.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.detailReservationTravelers.findUnique({
      where: { id },
    });
  }

  async findByReservation(idReservation: number) {
    return await this.prisma.detailReservationTravelers.findMany({
      where: { idReservation },
    });
  }

  async update(id: number, updateTravelerDto: UpdateTravelerDto) {
    return await this.prisma.detailReservationTravelers.update({
      where: { id },
      data: updateTravelerDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.detailReservationTravelers.delete({
      where: { id },
    });
  }
}
