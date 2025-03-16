import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class MeetingsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.meetings.findMany();
  }

  findAllByResponsible(id: number) {
    return this.prisma.meetings.findMany({
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

  findOne(id: number) {
    return this.prisma.meetings.findUnique({
      where: {
        id,
      },
    });
  }

  create(createMeetingDto: CreateMeetingDto) {
    return this.prisma.meetings.create({
      data: createMeetingDto,
    });
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return this.prisma.meetings.update({
      where: {
        id,
      },
      data: updateMeetingDto,
    });
  }

  remove(id: number) {
    return this.prisma.meetings.delete({
      where: {
        id,
      },
    });
  }
}
