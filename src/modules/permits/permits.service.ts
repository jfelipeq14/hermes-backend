import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PermitsService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    try {
      return this.prisma.permits.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} permit`;
  // }

  // create(createPermitDto: CreatePermitDto) {
  //   return 'This action adds a new permit';
  // }

  // update(id: number, updatePermitDto: UpdatePermitDto) {
  //   return `This action updates a #${id} permit`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} permit`;
  // }
}
