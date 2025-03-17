import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class MeetingsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.meetings.findMany();
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
    });
  }

  async create(createMeetingDto: CreateMeetingDto) {
    return await this.prisma.meetings.create({
      data: createMeetingDto,
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
