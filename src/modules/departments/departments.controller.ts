import { Controller, Get } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Roles('ADMIN')
  @Get()
  findAll() {
    try {
      return this.departmentsService.findAll();
    } catch (error) {
      console.log(error);
    }
  }
}
