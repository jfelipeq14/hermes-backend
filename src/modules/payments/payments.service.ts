import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.payments.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.payments.findUnique({
      where: { id },
    });
  }

  async findAllByReservation(idReservation: number) {
    return await this.prisma.payments.findMany({
      where: { idReservation },
    });
  }

  async create(createPaymentDto: CreatePaymentDto) {
    createPaymentDto.date = new Date(createPaymentDto.date);
    return await this.prisma.payments.create({
      data: createPaymentDto,
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const existingPayment = await this.prisma.payments.findUnique({
      where: { id },
    });

    if (!existingPayment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    if (!updatePaymentDto.date) {
      throw new HttpException('Date is required', HttpStatus.BAD_REQUEST);
    }

    updatePaymentDto.date = new Date(updatePaymentDto.date);

    return await this.prisma.payments.update({
      where: { id },
      data: updatePaymentDto,
    });
  }
  async changeStatus(id: number, status: string) {
    const existingPayment = await this.prisma.payments.findUnique({
      where: { id },
    });

    if (!existingPayment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.payments.update({
      where: { id },
      data: { status },
    });
  }
}
