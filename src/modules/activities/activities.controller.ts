/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all activities' })
  @ApiResponse({ status: 200, description: 'Return all activities.' })
  @ApiResponse({ status: 404, description: 'No activities found.' })
  async findAll(): Promise<Activity[]> {
    const activitiesFound = await this.activitiesService.findAll();

    if (!activitiesFound || activitiesFound.length === 0) {
      throw new HttpException('No activities found', HttpStatus.NOT_FOUND);
    }

    return activitiesFound;
  }

  @Roles('ADMIN')
  @Get('active')
  @ApiOperation({ summary: 'Get all activities with status true' })
  @ApiResponse({
    status: 200,
    description: 'Return all activities with status true.',
  })
  @ApiResponse({ status: 404, description: 'No activities found.' })
  async findAllActive(): Promise<Activity[]> {
    const activitiesFound = await this.activitiesService.findAllActive();

    if (!activitiesFound || activitiesFound.length === 0) {
      throw new HttpException('No activities found', HttpStatus.NOT_FOUND);
    }

    return activitiesFound;
  }

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new activity' })
  @ApiResponse({
    status: 201,
    description: 'The activity has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    try {
      const createdActivity: Activity =
        await this.activitiesService.create(createActivityDto);

      if (!createdActivity) {
        throw new HttpException(
          'Failed to create the activity',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return createdActivity;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update an activity by ID' })
  @ApiResponse({
    status: 200,
    description: 'The activity has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Activity not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    try {
      const updatedActivity: Activity = await this.activitiesService.update(
        +id,
        updateActivityDto,
      );

      if (!updatedActivity) {
        throw new HttpException('Activity not found', HttpStatus.NOT_FOUND);
      }

      return updatedActivity;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id/change-status')
  @ApiOperation({ summary: 'Change the status of an activity by ID' })
  @ApiResponse({
    status: 200,
    description: 'The status of the activity has been successfully changed.',
  })
  @ApiResponse({ status: 404, description: 'Activity not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async changeStatus(@Param('id') id: string): Promise<Activity> {
    try {
      const updatedActivity: Activity =
        await this.activitiesService.changeStatus(+id);

      if (!updatedActivity) {
        throw new HttpException('Activity not found', HttpStatus.NOT_FOUND);
      }

      return updatedActivity;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
