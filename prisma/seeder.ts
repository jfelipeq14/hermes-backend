import { PrismaClient, Role, PrivilegeType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Limpiar tablas existentes
  await prisma.permit.deleteMany();
  await prisma.userPrivilege.deleteMany();
  await prisma.privilege.deleteMany();
  await prisma.user.deleteMany();
  await prisma.municipalities.deleteMany();

  // Crear municipio de ejemplo
  const municipality = await prisma.municipalities.create({
    data: {
      code: '001',
      name: 'Municipio Principal',
      idDepartment: 1, // Asegúrate de que este ID exista en tu tabla departments
    },
  });

  // Función auxiliar para hashear contraseñas
  const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };

  // Crear usuarios iniciales
  const adminUser = await prisma.user.create({
    data: {
      idRole: 1, // ID del rol admin
      typeDocument: 'CC',
      document: 1234567890,
      name: 'Admin',
      surName: 'System',
      dateBirth: new Date('1990-01-01'),
      email: 'admin@example.com',
      password: await hashPassword('admin123'),
      municipalitiesId: municipality.id,
      address: 'Calle Admin 123',
      phone: '3001234567',
      emergency: '3009876543',
      sex: 'M',
      bloodType: 'O+',
      eps: 'EPS Ejemplo',
      status: true,
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      idRole: 3, // ID del rol usuario regular
      typeDocument: 'CC',
      document: 1234567892,
      name: 'Regular',
      surName: 'User',
      dateBirth: new Date('1992-01-01'),
      email: 'user@example.com',
      password: await hashPassword('user123'),
      municipalitiesId: municipality.id,
      address: 'Calle User 123',
      phone: '3001234569',
      emergency: '3009876545',
      sex: 'M',
      bloodType: 'B+',
      eps: 'EPS Ejemplo',
      status: true,
    },
  });

  // Crear privilegios
  const userManagementPrivilege = await prisma.privilege.create({
    data: {
      name: 'User Management',
      type: PrivilegeType.MANAGE,
      description: 'Gestión completa de usuarios',
      status: true,
    },
  });

  const contentManagementPrivilege = await prisma.privilege.create({
    data: {
      name: 'Content Management',
      type: PrivilegeType.WRITE,
      description: 'Gestión de contenido',
      status: true,
    },
  });

  const readOnlyPrivilege = await prisma.privilege.create({
    data: {
      name: 'Read Only Access',
      type: PrivilegeType.READ,
      description: 'Acceso de solo lectura',
      status: true,
    },
  });

  // Crear permisos para cada privilegio
  await prisma.permit.createMany({
    data: [
      {
        name: 'Crear Usuario',
        privilegeId: userManagementPrivilege.id,
        status: true,
      },
      {
        name: 'Editar Usuario',
        privilegeId: userManagementPrivilege.id,
        status: true,
      },
      {
        name: 'Eliminar Usuario',
        privilegeId: userManagementPrivilege.id,
        status: true,
      },
      {
        name: 'Crear Contenido',
        privilegeId: contentManagementPrivilege.id,
        status: true,
      },
      {
        name: 'Editar Contenido',
        privilegeId: contentManagementPrivilege.id,
        status: true,
      },
      {
        name: 'Ver Contenido',
        privilegeId: readOnlyPrivilege.id,
        status: true,
      },
    ],
  });

  // Asignar privilegios a usuarios
  await prisma.userPrivilege.createMany({
    data: [
      // Admin: todos los privilegios
      {
        userId: adminUser.id,
        privilegeId: userManagementPrivilege.id,
      },
      {
        userId: adminUser.id,
        privilegeId: contentManagementPrivilege.id,
      },
      {
        userId: adminUser.id,
        privilegeId: readOnlyPrivilege.id,
      },

      // Usuario regular: solo lectura
      {
        userId: regularUser.id,
        privilegeId: readOnlyPrivilege.id,
      },
    ],
  });

  console.log('Base de datos poblada exitosamente');
}

main()
  .catch((e) => {
    console.error('Error al poblar la base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
