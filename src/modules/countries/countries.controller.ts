import { Controller, Get} from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll() {
    try {
      return this.countriesService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

}
