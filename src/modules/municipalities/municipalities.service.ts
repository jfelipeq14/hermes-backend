import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class MunicipalitiesService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    try {
      return this.prisma.municipalities.findMany();
    } catch (error) {
      console.log(error);
    }
  }
}
