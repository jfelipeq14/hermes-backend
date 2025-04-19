import { Controller, Get } from '@nestjs/common';
import { MunicipalitiesService } from './municipalities.service';
import { IsPublic } from '../auth/decorators/public.decorator';

@Controller('municipalities')
export class MunicipalitiesController {
  constructor(private readonly municipalitiesService: MunicipalitiesService) {}

  @IsPublic()
  @Get()
  findAll() {
    try {
      return this.municipalitiesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }
}
