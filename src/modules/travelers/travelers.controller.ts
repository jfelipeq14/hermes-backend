import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelersService } from './travelers.service';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDto } from './dto/update-traveler.dto';

@Controller('travelers')
export class TravelersController {
  constructor(private readonly travelersService: TravelersService) {}

  @Post()
  create(@Body() createTravelerDto: CreateTravelerDto) {
    return this.travelersService.create(createTravelerDto);
  }

  @Get()
  findAll() {
    return this.travelersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelerDto: UpdateTravelerDto) {
    return this.travelersService.update(+id, updateTravelerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelersService.remove(+id);
  }
}
