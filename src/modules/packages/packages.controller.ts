import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  findAll() {
    try {
      return this.packagesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.packagesService.findOne(+id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    try {
      return this.packagesService.create(createPackageDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    try {
      return this.packagesService.update(+id, updatePackageDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.packagesService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
