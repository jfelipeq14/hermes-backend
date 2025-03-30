import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivitiesService {
  constructor( private readonly prisma: PrismaService) {}

  async findAll(): Promise<Activity[]> {
    const activities = await this.prisma.activities.findMany();
    return activities;
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.prisma.activities.findUnique({
      where: { id },
    });

    if (!activity) {
      return new Activity();
    }

    return activity;
  }

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const activityCreated = await this.prisma.activities.create({
      data: createActivityDto,
    });

    return activityCreated;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const packagesAsociated = await this.prisma.activities.findUnique({
      where: { id },
      include: {
        packages: true,
      },
    });

    if (!packagesAsociated) {
      throw new Error('No se encontro la actividad');
    }

    if (packagesAsociated.packages.length > 0) {
      throw new Error(
        'No se puede actualizar una actividad con paquetes asociados',
      );
    }

    return this.prisma.activities.update({
      where: { id },
      data: updateActivityDto,
    });
  }

  async remove(id: number) {
    const packagesAsociated = await this.prisma.activities.findUnique({
      where: { id },
      include: {
        packages: true,
      },
    });

    if (!packagesAsociated) {
      throw new Error('No se encontro la actividad');
    }

    if (packagesAsociated.packages.length > 0) {
      throw new Error(
        'No se puede eliminar una actividad con paquetes asociados',
      );
    }
    return await this.prisma.activities.delete({
      where: { id },
    });
  }
}
