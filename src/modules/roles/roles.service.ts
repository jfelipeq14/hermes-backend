import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    try {
      return this.prisma.roles.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.roles.findUnique({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }

  create(createRoleDto: CreateRoleDto) {
    try {
      return this.prisma.roles.create({
        data: createRoleDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return this.prisma.roles.update({
        where: { id },
        data: updateRoleDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.roles.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
