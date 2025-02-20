import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DatesService } from './dates.service';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';

@Controller('dates')
export class DatesController {
  constructor(private readonly datesService: DatesService) {}

  @Post()
  create(@Body() createDateDto: CreateDateDto) {
    try {
      return this.datesService.create(createDateDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.datesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.datesService.findOne(+id);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDateDto: UpdateDateDto) {
    try {
      return this.datesService.update(+id, updateDateDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.datesService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
