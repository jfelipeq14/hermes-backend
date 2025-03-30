import { Injectable } from '@nestjs/common';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ResponsiblesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.responsibles.findMany();
  }

  async findAllByGuide(idUser: number) {
    return await this.prisma.responsibles.findMany({
      where: {
        idUser,
      },
    });
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

  async changeStatus(id: number) {
    const responsible = await this.prisma.responsibles.findUnique({
      where: {
        id,
      },
    });

    if (!responsible) {
      throw new Error('Responsible not found');
    }

    return this.prisma.responsibles.update({
      where: {
        id,
      },
      data: {
        status: !responsible.status, // Toggle the status
      },
    });
  }
}
