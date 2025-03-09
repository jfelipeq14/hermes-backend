/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Get()
  async findAll(): Promise<Meeting[]> {
    const meetings_ = await this.meetingsService.findAll();
    if (!meetings_ || meetings_.length === 0)
      throw new HttpException('No existen encuentros', HttpStatus.NOT_FOUND);
    return meetings_;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Meeting> {
    const meeting_ = await this.meetingsService.findOne(+id);
    if (!meeting_)
      throw new HttpException('No existe ese encuentro', HttpStatus.NOT_FOUND);
    return meeting_;
  }

  @Post()
  async create(@Body() createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    try {
      return await this.meetingsService.create(createMeetingDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ): Promise<Meeting> {
    try {
      return await this.meetingsService.update(+id, updateMeetingDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Meeting> {
    try {
      return await this.meetingsService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
