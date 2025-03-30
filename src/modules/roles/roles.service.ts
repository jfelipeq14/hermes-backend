import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.roles.findMany({
      include: {
        rolePrivileges: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.roles.findUnique({
      where: {
        id: id,
      },
      include: {
        rolePrivileges: true,
      },
    });
  }

  async create(createRoleDto: CreateRoleDto) {
    const { rolePrivileges, ...roleData } = createRoleDto;
    return await this.prisma.roles.create({
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
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { rolePrivileges, ...roleData } = updateRoleDto;

    // Primero, realizamos una transacción para garantizar la integridad de los datos
    return this.prisma.$transaction(async (prisma) => {
      // Si se proporcionan nuevos privilegios, eliminamos los antiguos primero
      if (rolePrivileges && rolePrivileges.length > 0) {
        // Eliminar privilegios existentes para este rol
        await prisma.rolePrivileges.deleteMany({
          where: { idRole: id },
        });

        // Luego actualizamos el rol y creamos los nuevos privilegios
        return prisma.roles.update({
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
      } else {
        // Si no hay privilegios nuevos, solo actualizamos los datos del rol
        return prisma.roles.update({
          where: { id },
          data: roleData,
          include: {
            rolePrivileges: true,
          },
        });
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.roles.delete({
      where: {
        id: id,
      },
    });
  }
}
