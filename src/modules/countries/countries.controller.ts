import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Roles('ADMIN')
  @Get()
  findAll() {
    try {
      return this.countriesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }
}
