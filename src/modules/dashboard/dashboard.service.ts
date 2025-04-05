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
        LEFT JOIN payments p ON p.idReservation = r.id
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

  async packageSales() {
    return await this.prisma.$queryRaw`
      WITH CompletedReservations AS (
        SELECT 
          r.id,
          r.idDate,
          d.idPackage,
          EXTRACT(YEAR FROM r.date) as year,
          r.price as total_price,
          SUM(p.price) as paid_amount
        FROM reservations r
        JOIN dates d ON r.idDate = d.id
        LEFT JOIN payments p ON p.idReservation = r.id AND p.status = 'C'
        GROUP BY r.id, r.idDate, d.idPackage, r.date, r.price
        HAVING SUM(p.price) >= r.price
      )
      SELECT 
        cr.year,
        pk.name as package_name,
        COUNT(*) as total_sales
      FROM CompletedReservations cr
      JOIN packages pk ON cr.idPackage = pk.id
      GROUP BY cr.year, pk.name, pk.id
      ORDER BY cr.year DESC, total_sales DESC;
    `;
  }

  async topClients() {
    return await this.prisma.$queryRaw`
      SELECT 
        u.name,
        u.surName,
        COUNT(r.id) as total_reservations
      FROM users u
      JOIN reservations r ON r.idUser = u.id
      GROUP BY u.name, u.surName
      ORDER BY total_reservations DESC
      LIMIT 10;
    `;
  }
}
