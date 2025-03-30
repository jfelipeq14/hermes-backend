import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class MunicipalitiesService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.municipalities.findMany();
  }
}
