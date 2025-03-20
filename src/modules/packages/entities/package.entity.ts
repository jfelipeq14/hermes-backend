import { Decimal } from '@prisma/client/runtime/library';

export class Package {
  id: number;
  activity: string;
  start: Date;
  end: Date;
  idActivity: number;
  level: Decimal | null; // Puede ser null según el schema.prisma
  price: Decimal;
  reserve: Decimal;
  description: string;
  status: boolean;
}
