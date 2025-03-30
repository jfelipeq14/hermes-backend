import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class CountriesService {
  constructor( private readonly prisma: PrismaService) {}
  findAll() {
    try {
      return this.prisma.countries.findMany();
    } catch (error) {
      console.log(error);
    }
  }
}
