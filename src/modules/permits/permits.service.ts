import { Injectable } from '@nestjs/common';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';
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

  findOne(id: number) {
    return this.prisma.permits.findUnique({
      where: {
        id: id,
      },
    });
  }

  create(createPermitDto: CreatePermitDto) {
    return this.prisma.permits.create({
      data: createPermitDto,
    });
  }

  update(id: number, updatePermitDto: UpdatePermitDto) {
    return this.prisma.permits.update({
      where: {
        id: id,
      },
      data: updatePermitDto,
    });
  }

  remove(id: number) {
    return this.prisma.permits.delete({
      where: {
        id: id,
      },
    });
  }
}
