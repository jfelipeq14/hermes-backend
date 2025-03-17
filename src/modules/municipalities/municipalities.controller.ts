import { Controller, Get } from '@nestjs/common';
import { MunicipalitiesService } from './municipalities.service';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('municipalities')
export class MunicipalitiesController {
  constructor(private readonly municipalitiesService: MunicipalitiesService) {}

  @Roles('ADMIN')
  @Get()
  findAll() {
    try {
      return this.municipalitiesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }
}
