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
import { DatesService } from './dates.service';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';

@Controller('dates')
export class DatesController {
  constructor(private readonly datesService: DatesService) {}
  @Get()
  async findAll() {
    const dates = await this.datesService.findAll();
    if (!dates)
      throw new HttpException(
        'No existen programaciones',
        HttpStatus.NOT_FOUND,
      );
    return dates;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const date = await this.datesService.findOne(+id);
    if (!date)
      throw new HttpException(
        'No existe esa programación',
        HttpStatus.NOT_FOUND,
      );
    return date;
  }

  @Post()
  async create(@Body() createDateDto: CreateDateDto) {
    try {
      return await this.datesService.create(createDateDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDateDto: UpdateDateDto) {
    try {
      return await this.datesService.update(+id, updateDateDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.datesService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
