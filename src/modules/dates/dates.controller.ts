/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DatesService } from './dates.service';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Date } from './entities/date.entity';
import { IsPublic } from '../auth/decorators/public.decorator';

@ApiTags('dates')
@Controller('dates')
export class DatesController {
  constructor(private readonly datesService: DatesService) {}

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Get all dates' })
  @ApiResponse({ status: 200, description: 'Return all dates.' })
  @ApiResponse({ status: 404, description: 'No dates found.' })
  async findAll(): Promise<Date[]> {
    const dates = await this.datesService.findAll();

    if (!dates || dates.length === 0) {
      throw new HttpException('No dates found', HttpStatus.NOT_FOUND);
    }

    return dates;
  }

  @Roles('GUIDE')
  @Get('responsible/:idUser')
  @ApiOperation({ summary: 'Get dates by responsible ID' })
  @ApiResponse({
    status: 200,
    description: 'Return dates for the specified responsible ID.',
  })
  @ApiResponse({ status: 404, description: 'No dates found for this user.' })
  async findDatesByResponsible(
    @Param('idUser') idUser: string,
  ): Promise<Date[]> {
    const dates = await this.datesService.findDatesByResponsible(+idUser);
    if (!dates || dates.length === 0) {
      throw new HttpException(
        'No dates found for this user',
        HttpStatus.NOT_FOUND,
      );
    }
    return dates;
  }

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new date' })
  @ApiResponse({
    status: 201,
    description: 'The date has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createDateDto: CreateDateDto): Promise<Date> {
    try {
      // No need to transform dates as they are already validated in DTO
      const createdDate = await this.datesService.create(createDateDto);

      if (!createdDate) {
        throw new HttpException(
          'Failed to create the date',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return createdDate;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a date by ID' })
  @ApiResponse({
    status: 200,
    description: 'The date has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Date not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(
    @Param('id') id: string,
    @Body() updateDateDto: UpdateDateDto,
  ): Promise<Date> {
    try {
      // No need to transform dates as they are already validated in DTO
      const updatedDate = await this.datesService.update(+id, updateDateDto);

      if (!updatedDate) {
        throw new HttpException('Date not found', HttpStatus.NOT_FOUND);
      }

      return updatedDate;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid input data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles('ADMIN')
  @Patch('changeStatus/:id')
  @ApiOperation({ summary: 'Change the status of a date by ID' })
  @ApiResponse({
    status: 200,
    description: 'The date status has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Date not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  async changeStatus(@Param('id') id: string): Promise<Date> {
    try {
      const updatedDate = await this.datesService.changeStatus(+id);

      if (!updatedDate) {
        throw new HttpException('Date not found', HttpStatus.NOT_FOUND);
      }

      return updatedDate;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
