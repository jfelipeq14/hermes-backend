/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { IsPublic } from '../auth/decorators/public.decorator';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Roles('ADMIN')
  @Get()
  async findAll() {
    try {
      return await this.reservationsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Roles('ADMIN')
  @Get('reservations-with-payments')
  async findAllReservationWithPayments() {
    try {
      const reservation =
        await this.reservationsService.findAllReservationWithPayments();
      if (!reservation || reservation.length === 0) {
        throw new HttpException('No reservations found', HttpStatus.NOT_FOUND);
      }
      return reservation;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.reservationsService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('CLIENT')
  @Get('user/:idUser')
  async findAllByUser(@Param('idUser') idUser: string) {
    try {
      return await this.reservationsService.findAllByUser(+idUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @IsPublic()
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      return await this.reservationsService.create(createReservationDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    try {
      const updatedReservation = await this.reservationsService.update(
        +id,
        updateReservationDto,
      );

      if (!updatedReservation) {
        throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
      }

      return updatedReservation;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch(':id/change-status')
  async changeStatus(@Param('id') id: string, @Body('status') status: string) {
    try {
      return await this.reservationsService.changeStatus(+id, status);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
