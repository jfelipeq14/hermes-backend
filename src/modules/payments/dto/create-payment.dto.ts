import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ required: true, description: 'Date of the payment' })
  @IsInt()
  @IsNotEmpty()
  idReservation: number;

  @ApiProperty({ required: true, description: 'Date of the payment' })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Precio total a pagar',
    example: 180000,
  })
  @IsInt({
    message: 'El campo de total debe ser un número entero',
  })
  @Min(1, {
    message: 'El campo de total debe ser un valor positivo',
  })
  @Max(9999999999999, {
    message: `El campo de total no puede ser mayor a 9999999999999`,
  })
  @IsNotEmpty({
    message: 'El campo de total no puede estar vacío',
  })
  total: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Abono para reservar el paquete',
    example: 180000,
  })
  @IsInt({
    message: 'El campo de abono debe ser un número entero',
  })
  @Min(1, {
    message: 'El campo de abono debe ser un valor positivo',
  })
  @Max(9999999999999, {
    message: `El campo de abono no puede ser mayor a 9999999999999`,
  })
  @IsNotEmpty({
    message: 'El campo de abono no puede estar vacío',
  })
  pay: number;

  @ApiProperty({ required: true, description: 'Voucher of the payment' })
  @IsString()
  voucher: string;
}
