/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to safely create records or return existing ones
async function safeCreateOrReturn<T extends { id: number }>(
  findFn: () => Promise<T | null>,
  createFn: () => Promise<T>,
  entityName: string,
): Promise<T> {
  const existing = await findFn();
  if (existing) {
    console.log(`${entityName} already exists, skipping creation`);
    return existing;
  }
  const created = await createFn();
  console.log(`${entityName} created successfully`);
  return created;
}

async function main() {
  // Create country
  const countries = await prisma.$transaction(async (prisma) => {
    // Check if country exists first
    const existingCountry = await prisma.countries.findUnique({
      where: { name: 'Colombia' },
    });

    // If exists, return it, otherwise create it
    if (existingCountry) {
      console.log('Country already exists, skipping creation');
      return existingCountry;
    }

    const country_ = await prisma.countries.create({
      data: {
        code: 'CO',
        name: 'Colombia',
      },
    });
    return country_;
  });

  // Create department
  const departments = await prisma.$transaction(async (prisma) => {
    // Check if department exists first
    const existingDepartment = await prisma.departments.findUnique({
      where: { name: 'Antioquia' },
    });

    // If exists, return it, otherwise create it
    if (existingDepartment) {
      console.log('Department already exists, skipping creation');
      return existingDepartment;
    }

    const department_ = await prisma.departments.create({
      data: {
        code: '05',
        name: 'Antioquia',
        idCountry: countries.id,
      },
    });

    return department_;
  });

  // Create municipality
  const municipalities = await prisma.$transaction(async (prisma) => {
    // Check if municipality exists first
    const existingMunicipality = await prisma.municipalities.findUnique({
      where: { name: 'Medellín' },
    });

    // If exists, return it, otherwise create it
    if (existingMunicipality) {
      console.log('Municipality already exists, skipping creation');
      return existingMunicipality;
    }

    const municipality_ = await prisma.municipalities.create({
      data: {
        code: '05001',
        name: 'Medellín',
        idDepartment: departments.id,
      },
    });
    return municipality_;
  });

  // Create permit
  const permits = await prisma.$transaction(async (prisma) => {
    // Check if permit exists first
    const existingPermit = await prisma.permits.findFirst({
      where: { name: 'Users Management' },
    });

    // If exists, return it, otherwise create it
    if (existingPermit) {
      console.log('Permit already exists, skipping creation');
      return existingPermit;
    }

    const permit_ = await prisma.permits.create({
      data: {
        name: 'Users Management',
      },
    });

    return permit_;
  });

  // Create privilege
  const privileges = await prisma.$transaction(async (prisma) => {
    // Check if privilege exists
    const existingPrivilege = await prisma.privileges.findFirst({
      where: {
        name: 'Create',
        idPermit: permits.id,
      },
    });

    // If exists, return it, otherwise create it
    if (existingPrivilege) {
      console.log('Privilege already exists, skipping creation');
      return existingPrivilege;
    }

    const privilege_ = await prisma.privileges.create({
      data: {
        name: 'Create',
        idPermit: permits.id,
      },
    });

    return privilege_;
  });

  // Create roles one by one instead of using createMany
  let adminRole = await prisma.roles.findUnique({
    where: { name: 'Administrator' },
  });
  if (!adminRole) {
    adminRole = await prisma.roles.create({
      data: { name: 'Administrator' },
    });
    console.log('Administrator role created');
  } else {
    console.log('Administrator role already exists');
  }

  let guideRole = await prisma.roles.findUnique({
    where: { name: 'Guía' },
  });
  if (!guideRole) {
    guideRole = await prisma.roles.create({
      data: { name: 'Guía' },
    });
    console.log('Guía role created');
  } else {
    console.log('Guía role already exists');
  }

  let clientRole = await prisma.roles.findUnique({
    where: { name: 'Cliente' },
  });
  if (!clientRole) {
    clientRole = await prisma.roles.create({
      data: { name: 'Cliente' },
    });
    console.log('Cliente role created');
  } else {
    console.log('Cliente role already exists');
  }

  // Create role privilege relationship
  const rolePrivileges = await prisma.$transaction(async (prisma) => {
    // Check if relationship exists
    const existingRolePrivilege = await prisma.rolePrivileges.findFirst({
      where: {
        idRole: 1,
        idPrivilege: privileges.id,
      },
    });

    // If exists, return it, otherwise create it
    if (existingRolePrivilege) {
      console.log('Role privilege already exists, skipping creation');
      return existingRolePrivilege;
    }

    const rolePrivilege_ = await prisma.rolePrivileges.create({
      data: {
        idRole: 1, // Administrator role
        idPrivilege: privileges.id,
      },
    });

    return rolePrivilege_;
  });

  // Create an admin user
  const adminUser = await prisma.$transaction(async (prisma) => {
    // Check if admin user exists
    const existingUser = await prisma.users.findUnique({
      where: { email: 'admin@hermes.com' },
    });

    // If exists, return it, otherwise create it
    if (existingUser) {
      console.log('Admin user already exists, skipping creation');
      return existingUser;
    }

    const user_ = await prisma.users.create({
      data: {
        idRole: 1, // Administrator role
        typeDocument: 'CC',
        document: '1000000000',
        name: 'Juan',
        surName: 'Quintero',
        dateBirth: new Date('1990-01-01'),
        email: 'admin@hermes.com',
        password:
          '$2b$10$XapPalUnZH1/hIbw3spKXu2WN/NfUBQD3QeCWCNys7IwBE4NSYCuC', // encrypted "123456"
        idMunicipality: municipalities.id,
        address: 'Calle 10 #35-15',
        phone: '3001234567',
        emergency: '3109876543',
        sex: 'M',
        bloodType: 'O+',
        eps: 'Sura',
      },
    });

    return user_;
  });

  // Create a guide user
  const guideUser = await prisma.$transaction(async (prisma) => {
    // Check if guide user exists
    const existingUser = await prisma.users.findUnique({
      where: { email: 'guide@hermes.com' },
    });

    // If exists, return it, otherwise create it
    if (existingUser) {
      console.log('Guide user already exists, skipping creation');
      return existingUser;
    }

    const user_ = await prisma.users.create({
      data: {
        idRole: 2, // Guía role
        typeDocument: 'CC',
        document: '1000000001',
        name: 'Ana',
        surName: 'Vásquez',
        dateBirth: new Date('1985-05-15'),
        email: 'guide@hermes.com',
        password:
          '$2b$10$XapPalUnZH1/hIbw3spKXu2WN/NfUBQD3QeCWCNys7IwBE4NSYCuC', // encrypted "123456"
        idMunicipality: municipalities.id,
        address: 'Carrera 43 #30-25',
        phone: '3101234567',
        emergency: '3112345678',
        sex: 'F',
        bloodType: 'A+',
        eps: 'Coomeva',
      },
    });

    return user_;
  });

  // Create a client user
  const clientUser = await prisma.$transaction(async (prisma) => {
    // Check if client user exists
    const existingUser = await prisma.users.findUnique({
      where: { email: 'client@hermes.com' },
    });

    // If exists, return it, otherwise create it
    if (existingUser) {
      console.log('Client user already exists, skipping creation');
      return existingUser;
    }

    const user_ = await prisma.users.create({
      data: {
        idRole: 3, // Cliente role
        typeDocument: 'CC',
        document: '1000000002',
        name: 'Carlos',
        surName: 'Restrepo',
        dateBirth: new Date('1992-08-20'),
        email: 'client@hermes.com',
        password:
          '$2b$10$XapPalUnZH1/hIbw3spKXu2WN/NfUBQD3QeCWCNys7IwBE4NSYCuC', // encrypted "123456"
        idMunicipality: municipalities.id,
        address: 'Calle 65 #45-12',
        phone: '3201234567',
        emergency: '3153456789',
        sex: 'M',
        bloodType: 'B+',
        eps: 'Nueva EPS',
      },
    });

    return user_;
  });

  // Create activities one by one instead of using createMany
  let senderismoActivity = await prisma.activities.findUnique({
    where: { name: 'Senderismo' },
  });

  if (!senderismoActivity) {
    senderismoActivity = await prisma.activities.create({
      data: { name: 'Senderismo' },
    });
    console.log('Senderismo activity created');
  } else {
    console.log('Senderismo activity already exists');
  }

  let escaladaActivity = await prisma.activities.findUnique({
    where: { name: 'Escalada' },
  });

  if (!escaladaActivity) {
    escaladaActivity = await prisma.activities.create({
      data: { name: 'Escalada' },
    });
    console.log('Escalada activity created');
  } else {
    console.log('Escalada activity already exists');
  }

  let campingActivity = await prisma.activities.findUnique({
    where: { name: 'Camping' },
  });

  if (!campingActivity) {
    campingActivity = await prisma.activities.create({
      data: { name: 'Camping' },
    });
    console.log('Camping activity created');
  } else {
    console.log('Camping activity already exists');
  }

  let avesActivity = await prisma.activities.findUnique({
    where: { name: 'Avistamiento de aves' },
  });

  if (!avesActivity) {
    avesActivity = await prisma.activities.create({
      data: { name: 'Avistamiento de aves' },
    });
    console.log('Avistamiento de aves activity created');
  } else {
    console.log('Avistamiento de aves activity already exists');
  }

  const activitiesId = senderismoActivity.id;

  // Create category services one by one instead of using createMany
  let alimentacionCategory = await prisma.categoryServices.findUnique({
    where: { name: 'Alimentación' },
  });

  if (!alimentacionCategory) {
    alimentacionCategory = await prisma.categoryServices.create({
      data: { name: 'Alimentación' },
    });
    console.log('Alimentación category created');
  } else {
    console.log('Alimentación category already exists');
  }

  let transporteCategory = await prisma.categoryServices.findUnique({
    where: { name: 'Transporte' },
  });

  if (!transporteCategory) {
    transporteCategory = await prisma.categoryServices.create({
      data: { name: 'Transporte' },
    });
    console.log('Transporte category created');
  } else {
    console.log('Transporte category already exists');
  }

  let equipamientoCategory = await prisma.categoryServices.findUnique({
    where: { name: 'Equipamiento' },
  });

  if (!equipamientoCategory) {
    equipamientoCategory = await prisma.categoryServices.create({
      data: { name: 'Equipamiento' },
    });
    console.log('Equipamiento category created');
  } else {
    console.log('Equipamiento category already exists');
  }

  let alojamientoCategory = await prisma.categoryServices.findUnique({
    where: { name: 'Alojamiento' },
  });

  if (!alojamientoCategory) {
    alojamientoCategory = await prisma.categoryServices.create({
      data: { name: 'Alojamiento' },
    });
    console.log('Alojamiento category created');
  } else {
    console.log('Alojamiento category already exists');
  }

  // Create services one by one with appropriate checks
  let desayunoService = await prisma.services.findFirst({
    where: {
      name: 'Desayuno',
      idCategoryServices: alimentacionCategory.id,
    },
  });

  if (!desayunoService) {
    desayunoService = await prisma.services.create({
      data: {
        idCategoryServices: alimentacionCategory.id,
        name: 'Desayuno',
        price: 8000.0,
      },
    });
    console.log('Desayuno service created');
  } else {
    console.log('Desayuno service already exists');
  }

  let almuerzoService = await prisma.services.findFirst({
    where: {
      name: 'Almuerzo',
      idCategoryServices: alimentacionCategory.id,
    },
  });

  if (!almuerzoService) {
    almuerzoService = await prisma.services.create({
      data: {
        idCategoryServices: alimentacionCategory.id,
        name: 'Almuerzo',
        price: 12000.0,
      },
    });
    console.log('Almuerzo service created');
  } else {
    console.log('Almuerzo service already exists');
  }

  let transporteService = await prisma.services.findFirst({
    where: {
      name: 'Transporte ida y vuelta',
      idCategoryServices: transporteCategory.id,
    },
  });

  if (!transporteService) {
    transporteService = await prisma.services.create({
      data: {
        idCategoryServices: transporteCategory.id,
        name: 'Transporte ida y vuelta',
        price: 25000.0,
      },
    });
    console.log('Transporte service created');
  } else {
    console.log('Transporte service already exists');
  }

  let carpaService = await prisma.services.findFirst({
    where: {
      name: 'Alquiler de carpa',
      idCategoryServices: equipamientoCategory.id,
    },
  });

  if (!carpaService) {
    carpaService = await prisma.services.create({
      data: {
        idCategoryServices: equipamientoCategory.id,
        name: 'Alquiler de carpa',
        price: 15000.0,
      },
    });
    console.log('Alquiler de carpa service created');
  } else {
    console.log('Alquiler de carpa service already exists');
  }

  // Create package if it doesn't exist
  const existingPackage = await prisma.packages.findFirst({
    where: { name: 'Cerro Bravo - Aventura Natural' },
  });

  let packageId: number, packagePrice: number, packageReserve: number;
  if (!existingPackage) {
    const packages = await prisma.$transaction(async (prisma) => {
      const package_ = await prisma.packages.create({
        data: {
          name: 'Cerro Bravo - Aventura Natural',
          idActivity: activitiesId,
          idMunicipality: municipalities.id,
          level: 2.5,
          price: 120000.0,
          reserve: 30000.0,
          description:
            'Espectacular caminata al Cerro Bravo con vistas panorámicas y experiencia de aventura completa.',
          image: 'cerro_bravo.jpg',
        },
      });
      console.log('Package created');
      return package_;
    });
    packageId = packages.id;
    packagePrice = packages.price.toNumber();
    packageReserve = packages.reserve.toNumber();
  } else {
    console.log('Package already exists, skipping creation');
    packageId = existingPackage.id;
    packagePrice = existingPackage.price.toNumber();
    packageReserve = existingPackage.reserve.toNumber();
  }

  // Create detail packages services individually instead of using createMany
  const existingDetailPackageService1 =
    await prisma.detailPackagesServices.findFirst({
      where: {
        idPackage: packageId,
        idService: desayunoService.id,
      },
    });

  if (!existingDetailPackageService1) {
    await prisma.detailPackagesServices.create({
      data: {
        idPackage: packageId,
        idService: desayunoService.id,
        quantity: 1,
        price: 8000.0,
      },
    });
    console.log('Detail package service (Desayuno) created');
  } else {
    console.log('Detail package service (Desayuno) already exists');
  }

  const existingDetailPackageService2 =
    await prisma.detailPackagesServices.findFirst({
      where: {
        idPackage: packageId,
        idService: almuerzoService.id,
      },
    });

  if (!existingDetailPackageService2) {
    await prisma.detailPackagesServices.create({
      data: {
        idPackage: packageId,
        idService: almuerzoService.id,
        quantity: 1,
        price: 12000.0,
      },
    });
    console.log('Detail package service (Almuerzo) created');
  } else {
    console.log('Detail package service (Almuerzo) already exists');
  }

  const existingDetailPackageService3 =
    await prisma.detailPackagesServices.findFirst({
      where: {
        idPackage: packageId,
        idService: transporteService.id,
      },
    });

  if (!existingDetailPackageService3) {
    await prisma.detailPackagesServices.create({
      data: {
        idPackage: packageId,
        idService: transporteService.id,
        quantity: 1,
        price: 25000.0,
      },
    });
    console.log('Detail package service (Transporte) created');
  } else {
    console.log('Detail package service (Transporte) already exists');
  }

  // Create dates for the package if they don't exist
  // Create date for next month
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const startDate = new Date(nextMonth);
  startDate.setDate(15); // 15th of next month

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1); // Next day

  const startRegistration = new Date();
  const endRegistration = new Date(startDate);
  endRegistration.setDate(startDate.getDate() - 2); // Registration ends 2 days before

  const existingDate = await prisma.dates.findFirst({
    where: {
      idPackage: packageId,
      start: startDate,
    },
  });

  let dateId: number;
  if (!existingDate) {
    const dates = await prisma.$transaction(async (prisma) => {
      const date_ = await prisma.dates.create({
        data: {
          start: startDate,
          end: endDate,
          startRegistration: startRegistration,
          endRegistration: endRegistration,
          idPackage: packageId,
          amount: 20,
        },
      });
      console.log('Date created');
      return date_;
    });
    dateId = dates.id;
  } else {
    console.log('Date already exists, skipping creation');
    dateId = existingDate.id;
  }

  // Create meetings if they don't exist
  // Meeting time at 6:00 AM on the start date
  const meetingTime = new Date(startDate);
  meetingTime.setHours(6, 0, 0, 0);

  const existingMeeting = await prisma.meetings.findFirst({
    where: {
      idDate: dateId,
    },
  });

  let meetingId: number;
  if (!existingMeeting) {
    const meetings = await prisma.$transaction(async (prisma) => {
      const meeting_ = await prisma.meetings.create({
        data: {
          idDate: dateId,
          zone: 'N',
          hour: meetingTime,
          description:
            'Los puntos de encuentro hacia el norte son: Estación del Metro Parque Berrío (5:30 AM), Estación Moravia (5:45 AM) y Estación Niquía (6:00 AM).',
        },
      });
      console.log('Meeting created');
      return meeting_;
    });
    meetingId = meetings.id;
  } else {
    console.log('Meeting already exists, skipping creation');
    meetingId = existingMeeting.id;
  }

  // Assign guide as responsible for the meeting if not already assigned
  const existingResponsible = await prisma.responsibles.findFirst({
    where: {
      idUser: guideUser.id,
      idMeeting: meetingId,
    },
  });

  if (!existingResponsible) {
    const responsibles = await prisma.$transaction(async (prisma) => {
      const responsible_ = await prisma.responsibles.create({
        data: {
          idUser: guideUser.id, // Guide user
          idMeeting: meetingId,
        },
      });
      console.log('Responsible created');
      return responsible_;
    });
  } else {
    console.log('Responsible already exists, skipping creation');
  }

  // Create reservation for the client if it doesn't exist
  const existingReservation = await prisma.reservations.findFirst({
    where: {
      idDate: dateId,
      idUser: clientUser.id,
    },
  });

  let reservationId: number;
  if (!existingReservation) {
    const reservations = await prisma.$transaction(async (prisma) => {
      const reservation_ = await prisma.reservations.create({
        data: {
          idDate: dateId,
          idUser: clientUser.id, // Client user
          date: new Date(), // Today
          price: packagePrice,
          status: 'R', // Reserved
        },
      });
      console.log('Reservation created');
      return reservation_;
    });
    reservationId = reservations.id;
  } else {
    console.log('Reservation already exists, skipping creation');
    reservationId = existingReservation.id;
  }

  // Link the client as traveler to the reservation if not already linked
  const existingTravelerDetail =
    await prisma.detailReservationTravelers.findFirst({
      where: {
        idReservation: reservationId,
        idTraveler: clientUser.id,
      },
    });

  if (!existingTravelerDetail) {
    const detailReservationTravelers = await prisma.$transaction(
      async (prisma) => {
        const detailReservationTraveler_ =
          await prisma.detailReservationTravelers.create({
            data: {
              idReservation: reservationId,
              idTraveler: clientUser.id, // Client user as traveler
            },
          });
        console.log('Detail reservation traveler created');
        return detailReservationTraveler_;
      },
    );
  } else {
    console.log(
      'Detail reservation traveler already exists, skipping creation',
    );
  }

  // Create payment record for the reservation if it doesn't exist
  const existingPayment = await prisma.payments.findFirst({
    where: {
      idReservation: reservationId,
    },
  });

  if (!existingPayment) {
    const payments = await prisma.$transaction(async (prisma) => {
      const payment_ = await prisma.payments.create({
        data: {
          idReservation: reservationId,
          price: packageReserve, // Pay the reserve amount
          voucher: 'payment_001.jpg',
          status: 'A', // Approved
        },
      });
      console.log('Payment created');
      return payment_;
    });
  } else {
    console.log('Payment already exists, skipping creation');
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
