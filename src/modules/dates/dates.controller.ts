/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DatesService } from './dates.service';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Date } from './entities/date.entity';

@Controller('dates')
export class DatesController {
  constructor(private readonly datesService: DatesService) {}

  @Roles('ADMIN', 'GUIDE')
  @Get()
  async findAll(): Promise<Date[]> {
    const dates_ = await this.datesService.findAll();
    if (!dates_ || dates_.length === 0)
      throw new HttpException(
        'No existen programaciones',
        HttpStatus.NOT_FOUND,
      );
    return dates_;
  }

  @Roles('ADMIN', 'GUIDE')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Date> {
    const date_ = await this.datesService.findOne(+id);
    if (!date_)
      throw new HttpException(
        'No existe esa programación',
        HttpStatus.NOT_FOUND,
      );
    return date_;
  }

  @Roles('ADMIN')
  @Post()
  async create(@Body() createDateDto: CreateDateDto): Promise<Date> {
    try {
      return await this.datesService.create(createDateDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDateDto: UpdateDateDto,
  ): Promise<Date> {
    try {
      const updatedDate = await this.datesService.update(+id, updateDateDto);
      if (!updatedDate) {
        throw new HttpException(
          'No se pudo actualizar la programación',
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedDate;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN')
  @Patch(':id')
  async changeStatus(@Param('id') id: string): Promise<Date> {
    try {
      const updatedDate = await this.datesService.changeStatus(+id);
      if (!updatedDate) {
        throw new HttpException(
          'No se pudo cambiar el estado de la programación',
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedDate;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Roles('ADMIN')
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   try {
  //     return await this.datesService.remove(+id);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
