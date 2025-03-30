import { Decimal } from '@prisma/client/runtime/library';

export class Package {
  id: number;
  name: string;
  idActivity: number;
  idMunicipality: number;
  level: Decimal | null;
  price: Decimal;
  reserve: Decimal;
  description: string;
  status: boolean;
}
