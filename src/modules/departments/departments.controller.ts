import { Controller, Get} from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}


  @Get()
  findAll() {
    try {
      return this.departmentsService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

}
