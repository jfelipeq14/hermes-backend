import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}
  async sales() {
    return await this.prisma.$queryRaw`
      WITH TotalPayments AS (
        SELECT 
          r.id,
          r.date,
          r.price as total_price,
          SUM(p.price) as paid_amount
        FROM reservations r
        LEFT JOIN payments p ON p."idReservation" = r.id
        WHERE p.status = 'C'
        GROUP BY r.id, r.date, r.price
      )
      SELECT 
        DATE(date) as date,
        COUNT(*) as count
      FROM TotalPayments
      WHERE paid_amount >= total_price
      GROUP BY DATE(date)
      ORDER BY date ASC;
    `;
  }

  async packageSales(): Promise<any[]> {
    return await this.prisma.$queryRaw`
      WITH CompletedReservations AS (
        SELECT 
          r.id,
          r.date,
          d."idPackage",
          EXTRACT(YEAR FROM r.date) as year,
          r.price as total_price,
          SUM(CASE WHEN p.status = 'C' THEN p.price ELSE 0 END) as paid_amount
        FROM reservations r
        JOIN dates d ON r."idDate" = d.id
        LEFT JOIN payments p ON p."idReservation" = r.id
        GROUP BY r.id, r.date, d."idPackage", r.price
        HAVING SUM(CASE WHEN p.status = 'C' THEN p.price ELSE 0 END) >= r.price
      )
      SELECT 
        cr.year,
        p.name as package_name,
        COUNT(DISTINCT cr.id) as total_sales
      FROM CompletedReservations cr
      JOIN packages p ON cr."idPackage" = p.id
      GROUP BY cr.year, p.name, p.id
      ORDER BY cr.year DESC, total_sales DESC;
    `;
  }

  async topClients(): Promise<any[]> {
    return await this.prisma.$queryRaw`
      SELECT 
        u.name,
        u."surName",
        COUNT(r.id) as total_reservations
      FROM users u
      JOIN reservations r ON r."idUser" = u.id
      GROUP BY u.name, u."surName"
      ORDER BY total_reservations DESC
      LIMIT 10;
    `;
  }
}
