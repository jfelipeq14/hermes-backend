import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const servicios = await prisma.$transaction(async (prisma) => {
    const servicio = await prisma.categoryServices.create({
      data: {
        name: 'Alimentación',
      },
    });

    return servicio;
  });

  console.log(servicios);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
