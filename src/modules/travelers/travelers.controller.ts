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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TravelersService } from './travelers.service';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDto } from './dto/update-traveler.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('travelers')
@Controller('travelers')
export class TravelersController {
  constructor(private readonly travelersService: TravelersService) { }

  @Roles('ADMIN', 'CLIENT')
  @Post()
  @ApiOperation({ summary: 'Create a new traveler' })
  @ApiResponse({
    status: 201,
    description: 'The traveler has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createTravelerDto: CreateTravelerDto) {
    try {
      return await this.travelersService.create(createTravelerDto);
    } catch {
      throw new HttpException('Invalid input data', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all travelers' })
  @ApiResponse({ status: 200, description: 'Return all travelers.' })
  async findAll() {
    return await this.travelersService.findAll();
  }

  @Roles('ADMIN')
  @Get('reservation/:idReservation')
  @ApiOperation({ summary: 'Get travelers by reservation ID' })
  @ApiResponse({ status: 200, description: 'Return the travelers.' })
  @ApiResponse({ status: 404, description: 'Travelers not found.' })
  async findByReservation(@Param('idReservation') idReservation: number) {
    const travelers = await this.travelersService.findByReservation(idReservation);
    if (!travelers || travelers.length === 0) {
      throw new HttpException('Travelers not found', HttpStatus.NOT_FOUND);
    }
    return travelers;
  }

  @Roles('ADMIN', 'CLIENT')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a traveler by ID' })
  @ApiResponse({
    status: 200,
    description: 'The traveler has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Traveler not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async update(
    @Param('id') id: number,
    @Body() updateTravelerDto: UpdateTravelerDto,
  ) {
    try {
      const traveler = await this.travelersService.update(
        id,
        updateTravelerDto,
      );
      if (!traveler) {
        throw new HttpException('Traveler not found', HttpStatus.NOT_FOUND);
      }
      return traveler;
    } catch {
      throw new HttpException('Invalid input data', HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN', 'CLIENT')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a traveler by ID' })
  @ApiResponse({
    status: 200,
    description: 'The traveler has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Traveler not found.' })
  async remove(@Param('id') id: number) {
    const traveler = await this.travelersService.remove(id);
    if (!traveler) {
      throw new HttpException('Traveler not found', HttpStatus.NOT_FOUND);
    }
    return traveler;
  }
}
