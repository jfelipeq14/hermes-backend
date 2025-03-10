import { Injectable } from '@nestjs/common';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ResponsiblesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.responsibles.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.responsibles.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createResponsibleDto: CreateResponsibleDto) {
    return await this.prisma.responsibles.create({
      data: createResponsibleDto,
    });
  }

  async update(id: number, updateResponsibleDto: UpdateResponsibleDto) {
    return await this.prisma.responsibles.update({
      where: {
        id,
      },
      data: updateResponsibleDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.responsibles.delete({
      where: {
        id,
      },
    });
  }
}
