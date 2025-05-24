/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create country
  const countries = await prisma.$transaction(async (prisma) => {
    const countries_ = await prisma.countries.createMany({
      data: [
        {
          code: '57',
          name: 'Colombia',
        },
        {
          code: '58',
          name: 'Venezuela',
        },
      ],
    });
    return countries_;
  });

  // Create department
  const departments = await prisma.$transaction(async (prisma) => {
    const departments_ = await prisma.departments.createMany({
      data: [
        {
          code: '05',
          name: 'Antioquia',
          idCountry: 1,
        },
        {
          code: '08',
          name: 'Atlántico',
          idCountry: 1,
        },
        {
          code: '76',
          name: 'Caldas',
          idCountry: 1,
        },
        {
          code: '91',
          name: 'Cundinamarca',
          idCountry: 1,
        },
        {
          code: '13',
          name: 'Bolívar',
          idCountry: 1,
        },
      ],
    });

    return departments_;
  });

  // Create municipality
  const municipalities = await prisma.$transaction(async (prisma) => {
    const municipalities_ = await prisma.municipalities.createMany({
      data: [
        {
          code: '05001',
          name: 'Medellín',
          idDepartment: 1,
        },
        {
          code: '08001',
          name: 'Barranquilla',
          idDepartment: 2,
        },
        {
          code: '76001',
          name: 'Manizales',
          idDepartment: 3,
        },
        {
          code: '11001',
          name: 'Bogotá D.C.',
          idDepartment: 4,
        },
        {
          code: '13001',
          name: 'Cartagena de Indias',
          idDepartment: 5,
        },
      ],
    });

    return municipalities_;
  });

  // Create permit
  const permits = await prisma.$transaction(async (prisma) => {
    const permits_ = await prisma.permits.createMany({
      data: [
        {
          name: 'Roles',
        },
        {
          name: 'Users',
        },
        {
          name: 'Activities',
        },
        {
          name: 'Category Services',
        },
        {
          name: 'Services',
        },
        {
          name: 'Packages',
        },
        {
          name: 'Dates',
        },
        {
          name: 'Meetings',
        },
        {
          name: 'Responsibles',
        },
        {
          name: 'Reservations',
        },
        {
          name: 'Payments',
        },
      ],
    });

    return permits_;
  });

  // Create privilege
  const privileges = await prisma.$transaction(async (prisma) => {
    // privilegios para cada permiso: Ver, Crear, Editar
    const privilege_ = await prisma.privileges.createMany({
      data: [
        {
          name: 'Read',
          idPermit: 1,
        },
        {
          name: 'Create',
          idPermit: 1,
        },
        {
          name: 'Update',
          idPermit: 1,
        },
        {
          name: 'Read',
          idPermit: 2,
        },
        {
          name: 'Create',
          idPermit: 2,
        },
        {
          name: 'Update',
          idPermit: 2,
        },
        {
          name: 'Read',
          idPermit: 3,
        },
        {
          name: 'Create',
          idPermit: 3,
        },
        {
          name: 'Update',
          idPermit: 3,
        },
        {
          name: 'Read',
          idPermit: 4,
        },
        {
          name: 'Create',
          idPermit: 4,
        },
        {
          name: 'Update',
          idPermit: 4,
        },
        {
          name: 'Read',
          idPermit: 5,
        },
        {
          name: 'Create',
          idPermit: 5,
        },
        {
          name: 'Update',
          idPermit: 5,
        },
        {
          name: 'Read',
          idPermit: 6,
        },
        {
          name: 'Create',
          idPermit: 6,
        },
        {
          name: 'Update',
          idPermit: 6,
        },
        {
          name: 'Read',
          idPermit: 7,
        },
        {
          name: 'Create',
          idPermit: 7,
        },
        {
          name: 'Update',
          idPermit: 7,
        },
        {
          name: 'Read',
          idPermit: 8,
        },
        {
          name: 'Create',
          idPermit: 8,
        },
        {
          name: 'Update',
          idPermit: 8,
        },
        {
          name: 'Read',
          idPermit: 9,
        },
        {
          name: 'Create',
          idPermit: 9,
        },
        {
          name: 'Update',
          idPermit: 9,
        },
        {
          name: 'Read',
          idPermit: 10,
        },
        {
          name: 'Create',
          idPermit: 10,
        },
        {
          name: 'Update',
          idPermit: 10,
        },
        {
          name: 'Read',
          idPermit: 11,
        },
        {
          name: 'Create',
          idPermit: 11,
        },
        {
          name: 'Update',
          idPermit: 11,
        },
      ],
    });

    return privilege_;
  });

  // Create roles first
  const roles = await prisma.$transaction(async (prisma) => {
    const roles_ = await prisma.roles.createMany({
      data: [
        {
          name: 'Administrator',
        },
        {
          name: 'Guía',
        },
        {
          name: 'Cliente',
        },
      ],
    });
    return roles_;
  });

  // Create role privilege relationship
  const rolePrivileges = await prisma.$transaction(async (prisma) => {
    // Roles: el administrador tiene todos los privilegios
    // Guía: tiene privilegios para dates
    // Cliente: tiene privilegios para reservations y payments
    const rolePrivilege_ = await prisma.rolePrivileges.createMany({
      data: [
        {
          idRole: 1, // Administrator role
          idPrivilege: 1,
        },
        {
          idRole: 1,
          idPrivilege: 2,
        },
        {
          idRole: 1,
          idPrivilege: 3,
        },
        {
          idRole: 1,
          idPrivilege: 4,
        },
        {
          idRole: 1,
          idPrivilege: 5,
        },
        {
          idRole: 1,
          idPrivilege: 6,
        },
        {
          idRole: 1,
          idPrivilege: 7,
        },
        {
          idRole: 1,
          idPrivilege: 8,
        },
        {
          idRole: 1,
          idPrivilege: 9,
        },
        {
          idRole: 1,
          idPrivilege: 10,
        },
        {
          idRole: 1,
          idPrivilege: 11,
        },
        {
          idRole: 2, // Guía role
          idPrivilege: 7,
        },
        {
          idRole: 3, // Cliente role
          idPrivilege: 9,
        },
        {
          idRole: 3,
          idPrivilege: 10,
        },
      ],
    });

    return rolePrivilege_;
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
