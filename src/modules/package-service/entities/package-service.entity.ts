import { Decimal } from '@prisma/client/runtime/library';

export class PackageService {
  id: number; // Primary key
  idPackage: number; // Foreign key referencing the packages table
  idService: number; // Foreign key referencing the services table
  quantity: number; // Quantity of the service
  price: Decimal; // Price of the service (Decimal type for precision)
}
