import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { IsPublic } from '../auth/decorators/public.decorator';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @IsPublic()
  @Get()
  findAll() {
    try {
      return this.countriesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }
}
