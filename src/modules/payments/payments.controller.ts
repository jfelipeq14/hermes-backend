/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles('ADMIN')
  @Roles('ADMIN', 'CLIENT')
  @Get()
  async findAll() {
    const payments_ = await this.paymentsService.findAll();
    if (!payments_)
      throw new HttpException('No existen pagos', HttpStatus.NOT_FOUND);
    return payments_;
  }

  @Roles('ADMIN')
  @Roles('ADMIN', 'CLIENT')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const payment_ = await this.paymentsService.findOne(+id);
    if (!payment_)
      throw new HttpException('No existe ese pago', HttpStatus.NOT_FOUND);
    return payment_;
  }

  async findAllByReservation(idReservation: string) {
    const payments_ =
      await this.paymentsService.findAllByReservation(+idReservation);
    if (!payments_)
      throw new HttpException('No existe ese pago', HttpStatus.NOT_FOUND);
    return payments_;
  }

  @Roles('ADMIN', 'CLIENT')
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      return await this.paymentsService.create(createPaymentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('ADMIN', 'CLIENT')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    try {
      return await this.paymentsService.update(+id, updatePaymentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
