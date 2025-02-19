import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const countries = await prisma.$transaction(async (prisma) => {
    const country_ = await prisma.countries.create({
      data: {
        code: '57',
        name: 'Colombia',
      },
    });

    return country_;
  });

  const departments = await prisma.$transaction(async (prisma) => {
    const department_ = await prisma.departments.create({
      data: {
        code: '05',
        name: 'Antioquia',
        idCountry: countries.id,
      },
    });

    return department_;
  });

  const municipalities = await prisma.$transaction(async (prisma) => {
    const municipality_ = await prisma.municipalities.create({
      data: {
        code: '0500',
        name: 'Medellín',
        idDepartment: departments.id,
      },
    });
    return municipality_;
  });

  const roles = await prisma.$transaction(async (prisma) => {
    const role_ = await prisma.roles.create({
      data: {
        name: 'Administrador',
        description: 'Administrador de la empresa',
        status: true,
      },
    });

    return role_;
  });

  const users = await prisma.$transaction(async (prisma) => {
    const user_ = await prisma.users.create({
      data: {
        idRol: roles.id,
        typeDocument: 'CC',
        document: '1001015566',
        name: 'Juan',
        surName: 'Perez',
        dateBirth: new Date(),
        email: 'juanperez@gmail.com',
        password: '123456',
        idMunicipality: municipalities.id,
        address: 'Calle 123',
        phone: '123456789',
        emergency: '123456789',
        sex: 'Masculino',
        bloodType: 'A+',
        eps: 'Sura',
        status: true,
      },
    });
  });

  const activities = await prisma.$transaction(async (prisma) => {
    const activity = await prisma.activities.create({
      data: {
        name: 'Senderismo',
      },
    });

    return activity;
  });

  const categorias = await prisma.$transaction(async (prisma) => {
    const categoria_ = await prisma.categoryServices.create({
      data: {
        name: 'Alimentación',
      },
    });

    return categoria_;
  });

  const servicios = await prisma.$transaction(async (prisma) => {
    const servicio_ = await prisma.services.create({
      data: {
        idCategoryServices: categorias.id,
        name: 'Desayuno',
        price: 100,
        status: true,
      },
    });

    return servicio_;
  });

  const packages = await prisma.$transaction(async (prisma) => {
    const package_ = await prisma.packages.create({
      data: {
        activity: 'Venecia',
        start: new Date(),
        end: new Date(),
        idActivity: activities.id,
        level: 1,
        price: 100,
        reserve: 50,
        description: 'Caminata por allá',
        status: true,
      },
    });

    return package_;
  });

  const detailPackagesServices = await prisma.$transaction(async (prisma) => {
    const detailPackagesService_ =
      await prisma.detailPackagesServices.createMany({
        data: [
          {
            idPackage: packages.id,
            idService: servicios.id,
            quantity: 1,
            price: 100,
          },
        ],
      });

    return detailPackagesService_;
  });

  const dates = await prisma.$transaction(async (prisma) => {
    const date_ = await prisma.dates.createMany({
      data: [
        {
          start: new Date(),
          end: new Date(),
          startRegistration: new Date(),
          endRegistration: new Date(),
          idPackage: packages.id,
          amount: 1,
          idUser: users.id,
          status: true,
        },
      ],
    });
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
