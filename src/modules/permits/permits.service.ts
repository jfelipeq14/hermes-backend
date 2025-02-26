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
    try {
      return this.prisma.permits.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  create(createPermitDto: CreatePermitDto) {
    try {
      return this.prisma.permits.create({
        data: createPermitDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updatePermitDto: UpdatePermitDto) {
    try {
      return this.prisma.permits.update({
        where: {
          id: id,
        },
        data: updatePermitDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.permits.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
