import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  findAll() {
    try {
      return this.activitiesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.activitiesService.findOne(+id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    try {
      return this.activitiesService.create(createActivityDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    try {
      return this.activitiesService.update(+id, updateActivityDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.activitiesService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
