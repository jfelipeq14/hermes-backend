/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { IsPublic } from '../auth/decorators/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @IsPublic()
  @Get('sales')
  @ApiOperation({ summary: 'Get sales data' })
  @ApiResponse({ status: 200, description: 'Return sales data.' })
  @ApiResponse({ status: 404, description: 'Sales not found.' })
  async sales(): Promise<any> {
    try {
      const sales = await this.dashboardService.sales();

      if (!sales) {
        throw new HttpException('Sales not found', HttpStatus.NOT_FOUND);
      }

      return sales;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error getting sales data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @IsPublic()
  @Get('package-sales')
  @ApiOperation({ summary: 'Get package sales data' })
  @ApiResponse({ status: 200, description: 'Return package sales data.' })
  @ApiResponse({ status: 404, description: 'Package sales not found.' })
  async packageSales(): Promise<any> {
    try {
      const packageSales = await this.dashboardService.packageSales();

      if (!packageSales || packageSales.length === 0) {
        throw new HttpException(
          'Package sales not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return packageSales;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error getting package sales data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @IsPublic()
  @Get('top-clients')
  @ApiOperation({ summary: 'Get top clients data' })
  @ApiResponse({ status: 200, description: 'Return top clients data.' })
  @ApiResponse({ status: 404, description: 'Top clients not found.' })
  async topClients(): Promise<any> {
    try {
      const topClients = await this.dashboardService.topClients();

      if (!topClients || topClients.length === 0) {
        throw new HttpException('Top clients not found', HttpStatus.NOT_FOUND);
      }

      return topClients;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error getting top clients data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
