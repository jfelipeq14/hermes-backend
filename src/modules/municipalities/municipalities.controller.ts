import { Controller, Get } from '@nestjs/common';
import { MunicipalitiesService } from './municipalities.service';

@Controller('municipalities')
export class MunicipalitiesController {
  constructor(private readonly municipalitiesService: MunicipalitiesService) {}


  @Get()
  findAll() {
    try {
      return this.municipalitiesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

}
