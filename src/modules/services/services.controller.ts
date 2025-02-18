import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll() {
    try {
      return this.servicesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.servicesService.findOne(+id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    try {
      return this.servicesService.create(createServiceDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    try {
      return this.servicesService.update(+id, updateServiceDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.servicesService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
