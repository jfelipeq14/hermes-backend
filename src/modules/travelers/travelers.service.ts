import { Injectable } from '@nestjs/common';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDto } from './dto/update-traveler.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class TravelersService {
  constructor(private readonly prisma: PrismaService) {}

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

  async update(id: number, updateTravelerDto: UpdateTravelerDto) {
    return await this.prisma.detailReservationTravelers.update({
      where: { id },
      data: updateTravelerDto,
    });
  }

  async changeStatus(id: number) {

    const traveler = await this.prisma.detailReservationTravelers.findUnique({
      where: {
        id,
      },
    });

    if (!traveler) {
      throw new Error('Traveler not found');
    }

    return this.prisma.detailReservationTravelers.update({
      where: {
        id,
      },
      data: {
        status: !traveler.status, // Toggle the status

      },
    });

    if (travelerData) {
      return await this.prisma.detailReservationTravelers.update({
        where: {
          id: id,
        },
        data: {
          status: !travelerData.status,
        },
      });
    }
    
  }
   
  
}
