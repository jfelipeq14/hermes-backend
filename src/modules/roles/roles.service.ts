import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    try {
      return this.prisma.roles.findMany({
        include: {
          rolePrivileges: true,
        },
      });
    } catch (error) {}
  }

  findOne(id: number) {
    try {
      return this.prisma.roles.findUnique({
        where: {
          id: id,
        },
        include: {
          rolePrivileges: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  create(createRoleDto: CreateRoleDto) {
    try {
      const { rolePrivileges, ...roleData } = createRoleDto;
      return this.prisma.roles.create({
        data: {
          ...roleData,
          rolePrivileges: {
            create: rolePrivileges,
          },
        },
        include: {
          rolePrivileges: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const { rolePrivileges, ...roleData } = updateRoleDto;
      return this.prisma.roles.update({
        where: { id },
        data: {
          ...roleData,
          rolePrivileges: {
            create: rolePrivileges,
          },
        },
        include: {
          rolePrivileges: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.roles.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
