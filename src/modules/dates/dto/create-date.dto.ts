import { IsDateString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDateDto {
  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Identificador del paquete',
    example: 1,
  })
  @IsInt({
    message: "el campo 'idPackage' debe ser un número entero",
  })
  @Min(1, {
    message: "el campo 'idPackage' debe ser mayor a 0",
  })
  @IsNotEmpty({
    message: "el campo 'idPackage' no puede estar vacío",
  })
  idPackage: number;

  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Cantidad de personas por paquete',
    example: 4,
  })
  @IsInt({
    message: "el campo 'amount' debe ser un número entero",
  })
  @Min(4, {
    message: "el campo 'amount' debe ser mayor a 4",
  })
  @Max(80, {
    message: "el campo 'amount' debe ser menor a 80",
  })
  @IsNotEmpty({
    message: "el campo 'amount' no puede estar vacío",
  })
  amount: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Fecha de ejecución del paquete',
    example: '2021-12-31T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty({
    message: "el campo 'start' no puede estar vacío",
  })
  start: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Fecha de finalización del paquete',
    example: '2021-12-31T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty({
    message: "el campo 'end' no puede estar vacío",
  })
  end: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Fecha de inicio de registro',
    example: '2021-12-31T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty({
    message: "el campo 'startRegistration' no puede estar vacío",
  })
  startRegistration: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Fecha de finalización de registro',
    example: '2021-12-31T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty({
    message: "el campo 'endRegistration' no puede estar vacío",
  })
  endRegistration: string;
}
