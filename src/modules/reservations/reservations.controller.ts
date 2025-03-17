import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll() {
    try {
      return this.reservationsService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Roles('ADMIN', 'CLIENT')
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.reservationsService.findOne(+id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    try {
      return this.reservationsService.update(+id, updateReservationDto);
    } catch (error) {
      console.log(error);
    }
  }
}
