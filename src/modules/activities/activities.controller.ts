/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Roles('ADMIN')
  @Get()
  async findAll(): Promise<Activity[]> {
    const activities_ = await this.activitiesService.findAll();
    if (!activities_ || activities_.length === 0) {
      throw new HttpException('No existen actividades', HttpStatus.NOT_FOUND);
    }
    return activities_;
  }

  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Activity> {
    const activity_ = await this.activitiesService.findOne(+id);
    if (!activity_) {
      throw new HttpException('No existe esa actividad', HttpStatus.NOT_FOUND);
    }
    return activity_;
  }

  @Roles('ADMIN')
  @Post()
  async create(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    try {
      return await this.activitiesService.create(createActivityDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    try {
      return await this.activitiesService.update(+id, updateActivityDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Activity> {
    try {
      return await this.activitiesService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
