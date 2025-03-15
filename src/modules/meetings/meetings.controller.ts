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
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Roles('ADMIN')
  @Get()
  async findAll(): Promise<Meeting[]> {
    const meetings_ = await this.meetingsService.findAll();
    if (!meetings_ || meetings_.length === 0)
      throw new HttpException('No existen encuentros', HttpStatus.NOT_FOUND);
    return meetings_;
  }

  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Meeting> {
    const meeting_ = await this.meetingsService.findOne(+id);
    if (!meeting_)
      throw new HttpException('No existe ese encuentro', HttpStatus.NOT_FOUND);
    return meeting_;
  }

  @Roles('ADMIN', 'GUIDE')
  @Get('responsible/:id')
  async findAllByResponsible(@Param('id') id: string): Promise<Meeting[]> {
    const meetings_ = await this.meetingsService.findAllByResponsible(+id);
    if (!meetings_ || meetings_.length === 0)
      throw new HttpException(
        'No existen encuentros para este responsable',
        HttpStatus.NOT_FOUND,
      );
    return meetings_;
  }

  @Roles('ADMIN')
  @Post()
  async create(@Body() createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    try {
      return await this.meetingsService.create(createMeetingDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
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

  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Meeting> {
    try {
      return await this.meetingsService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
