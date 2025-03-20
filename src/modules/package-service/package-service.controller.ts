import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackageServiceService } from './package-service.service';
import { CreatePackageServiceDto } from './dto/create-package-service.dto';
import { UpdatePackageServiceDto } from './dto/update-package-service.dto';

@Controller('package-service')
export class PackageServiceController {
  constructor(private readonly packageServiceService: PackageServiceService) {}

  @Post()
  create(@Body() createPackageServiceDto: CreatePackageServiceDto) {
    return this.packageServiceService.create(createPackageServiceDto);
  }

  @Get()
  findAll() {
    return this.packageServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageServiceDto: UpdatePackageServiceDto) {
    return this.packageServiceService.update(+id, updatePackageServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageServiceService.remove(+id);
  }
}
