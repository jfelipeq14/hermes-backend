/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TravelersService } from './travelers.service';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDto } from './dto/update-traveler.dto';
import { Traveler } from './entities/traveler.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('travelers')
@Controller('travelers')
export class TravelersController {
  constructor(private readonly travelersService: TravelersService) {}

  @Roles('ADMIN')
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

  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all travelers' })
  @ApiResponse({ status: 200, description: 'Return all travelers.' })
  async findAll() {
    return await this.travelersService.findAll();
  }

  @Roles('ADMIN')
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

  @Roles('ADMIN')
  @Patch('status/:id')
  @ApiOperation({ summary: 'Delete a traveler by ID' })
  @ApiResponse({
    status: 200,
    description: 'The traveler has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Traveler not found.' })
  async changeStatus(@Param('id') id: string): Promise<Traveler> {
    try {
      const updatedTraveler = await this.travelersService.changeStatus(+id);

      if (!updatedTraveler) {
        throw new HttpException('traveler not found', HttpStatus.NOT_FOUND);
      }

      return updatedTraveler;
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
