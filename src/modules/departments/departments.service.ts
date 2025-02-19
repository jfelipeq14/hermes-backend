import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    try {
      return this.prisma.departments.findMany();
    } catch (error) {
      console.log(error);
    }
  }
}
