import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async findAll() {
    const activities = await this.activitiesService.findAll();
    if (!activities) {
      throw new HttpException('No hay actividades', HttpStatus.NOT_FOUND);
    }
    return activities;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const activity = await this.activitiesService.findOne(+id);
    if (!activity) {
      throw new HttpException('No existe esa actividad', HttpStatus.NOT_FOUND);
    }
    return activity;
  }

  @Post()
  async create(@Body() createActivityDto: CreateActivityDto) {
    try {
      return await this.activitiesService.create(createActivityDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    try {
      return await this.activitiesService.update(+id, updateActivityDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.activitiesService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
