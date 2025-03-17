import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

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
    return await this.prisma.payments.create({
      data: createPaymentDto,
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return await this.prisma.payments.update({
      where: { id },
      data: updatePaymentDto,
    });
  }
}
