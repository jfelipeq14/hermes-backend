import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class MeetingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.meetings.findMany({
      include: {
        responsibles: true,
      },
    });
  }

  async findAllByResponsible(id: number) {
    return await this.prisma.meetings.findMany({
      where: {
        responsibles: {
          some: {
            id,
          },
        },
      },
      include: {
        responsibles: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.meetings.findUnique({
      where: {
        id,
      },
      include: {
        responsibles: true,
      },
    });
  }

  async create(createMeetingDto: CreateMeetingDto) {
    const { hour, ...rest } = createMeetingDto;

    // Convert the hour string (HH:mm) to a valid Date object
    const hourAsDate = new Date(`1970-01-01T${hour}:00Z`);

    if (isNaN(hourAsDate.getTime())) {
      throw new Error('Invalid hour format. Expected HH:mm.');
    }

    return await this.prisma.meetings.create({
      data: {
        ...rest,
        hour: hourAsDate,
      },
    });
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return await this.prisma.meetings.update({
      where: {
        id,
      },
      data: updateMeetingDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.meetings.delete({
      where: {
        id,
      },
    });
  }
}
