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

  async findByIdDate(idDate: number) {
    return await this.prisma.meetings.findFirst({
      where: {
        idDate,
      },
      include: {
        responsibles: true,
      },
    });
  }

  async create(createMeetingDto: CreateMeetingDto) {
    const { responsibles, ...meetingData } = createMeetingDto;

    return await this.prisma.meetings.create({
      data: {
        ...meetingData,
        hour: new Date(`1970-01-01T${meetingData.hour}:00Z`), // Convert hour to ISO-8601 format
        responsibles: {
          create: responsibles,
        },
      },
      include: {
        responsibles: true,
      },
    });
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto) {
    const { responsibles, ...meetingData } = updateMeetingDto;

    return this.prisma.$transaction(async (prisma) => {
      if (responsibles && responsibles.length > 0) {
        await prisma.responsibles.deleteMany({
          where: { idMeeting: id },
        });

        return prisma.meetings.update({
          where: { id },
          data: {
            ...meetingData,
            hour: meetingData.hour
              ? new Date(`1970-01-01T${meetingData.hour}:00Z`)
              : undefined, // Convert hour to ISO-8601 format
            responsibles: {
              create: responsibles,
            },
          },
          include: {
            responsibles: true,
          },
        });
      } else {
        return prisma.meetings.update({
          where: { id },
          data: {
            ...meetingData,
            hour: meetingData.hour
              ? new Date(`1970-01-01T${meetingData.hour}:00Z`)
              : undefined, // Convert hour to ISO-8601 format
          },
          include: {
            responsibles: true,
          },
        });
      }
    });
  }

  async changeStatus(id: number) {
    const meeting = await this.prisma.meetings.findUnique({
      where: {
        id,
      },
    });

    if (!meeting) {
      throw new Error('Meeting not found');
    }

    return this.prisma.meetings.update({
      where: {
        id,
      },
      data: {
        status: !meeting.status, // Toggle the status
      },
    });
  }
}
