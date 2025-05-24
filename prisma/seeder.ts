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
          name: 'Ver',
          idPermit: 1,
        },
        {
          name: 'Crear',
          idPermit: 1,
        },
        {
          name: 'Editar',
          idPermit: 1,
        },
        {
          name: 'Ver',
          idPermit: 2,
        },
        {
          name: 'Crear',
          idPermit: 2,
        },
        {
          name: 'Editar',
          idPermit: 2,
        },
        {
          name: 'Ver',
          idPermit: 3,
        },
        {
          name: 'Crear',
          idPermit: 3,
        },
        {
          name: 'Editar',
          idPermit: 3,
        },
        {
          name: 'Ver',
          idPermit: 4,
        },
        {
          name: 'Crear',
          idPermit: 4,
        },
        {
          name: 'Editar',
          idPermit: 4,
        },
        {
          name: 'Ver',
          idPermit: 5,
        },
        {
          name: 'Crear',
          idPermit: 5,
        },
        {
          name: 'Editar',
          idPermit: 5,
        },
        {
          name: 'Ver',
          idPermit: 6,
        },
        {
          name: 'Crear',
          idPermit: 6,
        },
        {
          name: 'Editar',
          idPermit: 6,
        },
        {
          name: 'Ver',
          idPermit: 7,
        },
        {
          name: 'Crear',
          idPermit: 7,
        },
        {
          name: 'Editar',
          idPermit: 7,
        },
        {
          name: 'Ver',
          idPermit: 8,
        },
        {
          name: 'Crear',
          idPermit: 8,
        },
        {
          name: 'Editar',
          idPermit: 8,
        },
        {
          name: 'Ver',
          idPermit: 9,
        },
        {
          name: 'Crear',
          idPermit: 9,
        },
        {
          name: 'Editar',
          idPermit: 9,
        },
        {
          name: 'Ver',
          idPermit: 10,
        },
        {
          name: 'Crear',
          idPermit: 10,
        },
        {
          name: 'Editar',
          idPermit: 10,
        },
        {
          name: 'Ver',
          idPermit: 11,
        },
        {
          name: 'Crear',
          idPermit: 11,
        },
        {
          name: 'Editar',
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

  // Create role privilege relationship  const rolePrivileges = await prisma.$transaction(async (prisma) => {
  // Roles: el administrador tiene todos los privilegios
  // Guía: tiene privilegios para dates
  // Cliente: tiene privilegios para reservations y payments
  const rolePrivilege_ = await prisma.rolePrivileges.createMany({
    data: [
      // Rol Administrador - todos los privilegios
      { idRole: 1, idPrivilege: 1 },
      { idRole: 1, idPrivilege: 2 },
      { idRole: 1, idPrivilege: 3 },
      { idRole: 1, idPrivilege: 4 },
      { idRole: 1, idPrivilege: 5 },
      { idRole: 1, idPrivilege: 6 },
      { idRole: 1, idPrivilege: 7 },
      { idRole: 1, idPrivilege: 8 },
      { idRole: 1, idPrivilege: 9 },
      { idRole: 1, idPrivilege: 10 },
      { idRole: 1, idPrivilege: 11 },
      { idRole: 1, idPrivilege: 12 },
      { idRole: 1, idPrivilege: 13 },
      { idRole: 1, idPrivilege: 14 },
      { idRole: 1, idPrivilege: 15 },
      { idRole: 1, idPrivilege: 16 },
      { idRole: 1, idPrivilege: 17 },
      { idRole: 1, idPrivilege: 18 },
      { idRole: 1, idPrivilege: 19 },
      { idRole: 1, idPrivilege: 20 },
      { idRole: 1, idPrivilege: 21 },
      { idRole: 1, idPrivilege: 22 },
      { idRole: 1, idPrivilege: 23 },
      { idRole: 1, idPrivilege: 24 },
      { idRole: 1, idPrivilege: 25 },
      { idRole: 1, idPrivilege: 26 },
      { idRole: 1, idPrivilege: 27 },
      { idRole: 1, idPrivilege: 28 },
      { idRole: 1, idPrivilege: 29 },
      { idRole: 1, idPrivilege: 30 },
      { idRole: 1, idPrivilege: 31 },
      { idRole: 1, idPrivilege: 32 },
      { idRole: 1, idPrivilege: 33 },
      // Guía role - solo privilegios de dates
      { idRole: 2, idPrivilege: 19 },
      { idRole: 2, idPrivilege: 20 },
      { idRole: 2, idPrivilege: 21 },

      // Cliente role - privilegios de reservations y payments
      { idRole: 3, idPrivilege: 28 },
      { idRole: 3, idPrivilege: 29 },
      { idRole: 3, idPrivilege: 30 },
      { idRole: 3, idPrivilege: 31 },
      { idRole: 3, idPrivilege: 32 },
      { idRole: 3, idPrivilege: 33 },
    ],
  });

  return rolePrivilege_;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
