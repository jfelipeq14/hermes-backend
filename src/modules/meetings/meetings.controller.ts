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
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('meetings')
@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all meetings' })
  @ApiResponse({ status: 200, description: 'Return all meetings.' })
  @ApiResponse({ status: 404, description: 'No meetings found.' })
  async findAll(): Promise<Meeting[]> {
    const meetings = await this.meetingsService.findAll();

    if (!meetings || meetings.length === 0) {
      throw new HttpException('No meetings found', HttpStatus.NOT_FOUND);
    }

    return meetings;
  }

  @Roles('ADMIN')
  @Get('responsible/:id')
  @ApiOperation({ summary: 'Get all meetings by responsible ID' })
  @ApiResponse({
    status: 200,
    description: 'Return all meetings for the responsible.',
  })
  @ApiResponse({
    status: 404,
    description: 'No meetings found for this responsible.',
  })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async findAllByResponsible(@Param('id') id: string): Promise<Meeting[]> {
    try {
      const meetings = await this.meetingsService.findAllByResponsible(+id);

      if (!meetings || meetings.length === 0) {
        throw new HttpException(
          'No meetings found for this responsible',
          HttpStatus.NOT_FOUND,
        );
      }

      return meetings;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Get('date/:id')
  @ApiOperation({ summary: 'Get a meeting by ID' })
  @ApiResponse({ status: 200, description: 'Return the meeting.' })
  @ApiResponse({ status: 404, description: 'Meeting not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async findByIdDate(@Param('id') id: string): Promise<Meeting> {
    try {
      const meeting = await this.meetingsService.findByIdDate(+id);

      if (!meeting) {
        throw new HttpException('Meeting not found', HttpStatus.NOT_FOUND);
      }

      return meeting;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new meeting' })
  @ApiResponse({
    status: 201,
    description: 'The meeting has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    try {
      const createdMeeting =
        await this.meetingsService.create(createMeetingDto);

      if (!createdMeeting) {
        throw new HttpException(
          'Failed to create the meeting',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return createdMeeting;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a meeting by ID' })
  @ApiResponse({
    status: 200,
    description: 'The meeting has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Meeting not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(
    @Param('id') id: string,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ): Promise<Meeting> {
    try {
      const updatedMeeting = await this.meetingsService.update(
        +id,
        updateMeetingDto,
      );

      if (!updatedMeeting) {
        throw new HttpException('Meeting not found', HttpStatus.NOT_FOUND);
      }

      return updatedMeeting;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch('changeStatus/:id')
  @ApiOperation({ summary: 'Change status a meeting by ID' })
  @ApiResponse({
    status: 200,
    description: 'The meeting has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Meeting not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async changeStatus(@Param('id') id: string): Promise<Meeting> {
    try {
      const changedMeeting = await this.meetingsService.changeStatus(+id);

      if (!changedMeeting) {
        throw new HttpException('Meeting not found', HttpStatus.NOT_FOUND);
      }

      return changedMeeting;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
