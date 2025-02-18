import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    try {
      return this.prisma.activities.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.activities.findUnique({
        where: { id, }
      });
    } catch (error) {
      console.log(error);
    }
  }

  create(createActivityDto: CreateActivityDto) {
    try {
      return this.prisma.activities.create({
        data: createActivityDto
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    try {
      return this.prisma.activities.update({
        where: { id },
        data: updateActivityDto
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.activities.delete({
        where: { id }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
