import { Controller, Get } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { IsPublic } from '../auth/decorators/public.decorator';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @IsPublic()
  @Get()
  findAll() {
    try {
      return this.departmentsService.findAll();
    } catch (error) {
      console.log(error);
    }
  }
}
