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

  const permits = await prisma.$transaction(async (prisma) => {
    const permit_ = await prisma.permits.create({
      data: {
        name: 'Users',
        status: true,
      },
    });

    return permit_;
  });

  const privileges = await prisma.$transaction(async (prisma) => {
    const privilege_ = await prisma.privileges.create({
      data: {
        name: 'Create',
        idPermit: permits.id,
      },
    });

    return privilege_;
  });

  const roles = await prisma.$transaction(async (prisma) => {
    const role_ = await prisma.roles.create({
      data: {
        name: 'Administrador',
        status: true,
      },
    });

    return role_;
  });

  const rolePrivileges = await prisma.$transaction(async (prisma) => {
    const rolePrivilege_ = await prisma.rolePrivileges.create({
      data: {
        idRole: roles.id,
        idPrivilege: privileges.id,
      },
    });

    return rolePrivilege_;
  });

  const users = await prisma.$transaction(async (prisma) => {
    const user_ = await prisma.users.create({
      data: {
        idRole: roles.id,
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

    return user_;
  });

  const activities = await prisma.$transaction(async (prisma) => {
    const activity = await prisma.activities.create({
      data: {
        name: 'Senderismo',
      },
    });

    return activity;
  });

  const categoryServices = await prisma.$transaction(async (prisma) => {
    const categoryService_ = await prisma.categoryServices.create({
      data: {
        name: 'Alimentación',
      },
    });

    return categoryService_;
  });

  const services = await prisma.$transaction(async (prisma) => {
    const service_ = await prisma.services.create({
      data: {
        idCategoryServices: categoryServices.id,
        name: 'Desayuno',
        price: 100,
        status: true,
      },
    });

    return service_;
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
    const detailPackagesService_ = await prisma.detailPackagesServices.create({
      data: {
        idPackage: packages.id,
        idService: services.id,
        quantity: 1,
        price: services.price,
      },
    });

    return detailPackagesService_;
  });

  const dates = await prisma.$transaction(async (prisma) => {
    const date_ = await prisma.dates.create({
      data: {
        start: new Date(),
        end: new Date(),
        startRegistration: new Date(),
        endRegistration: new Date(),
        idPackage: packages.id,
        amount: 1,
        idUser: users.id,
        status: true,
      },
    });

    return date_;
  });

  const meetings = await prisma.$transaction(async (prisma) => {
    const meeting_ = await prisma.meetings.create({
      data: {
        idDate: dates.id,
        idMunicipality: municipalities.id,
        hour: new Date(),
        description: 'En x parte',
      },
    });

    return meeting_;
  });

  const reservations = await prisma.$transaction(async (prisma) => {
    const reservation_ = await prisma.reservations.create({
      data: {
        idDate: dates.id,
        idMunicipality: municipalities.id,
        idUser: users.id,
        date: new Date(),
        price: 100,
        status: 'R',
      },
    });

    return reservation_;
  });
  const detailReservationTravelers = await prisma.$transaction(async (prisma) => {
    const detailReservationTraveler_ = await prisma.detailReservationTravelers.create({
      data: {
        idReservation: reservations.id,
        idTraveler: users.id,
        status: true,
      },
    });

    return detailReservationTraveler_;
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
