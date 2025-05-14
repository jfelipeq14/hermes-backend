import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  Matches,
  IsString,
  MaxLength,
  IsInt,
  IsArray,
  ValidateNested,
  Min,
  MinLength,
} from 'class-validator';
import { IsHourRegex, IsZoneRegex } from 'src/utils/regex';
import { DESCRIPTION_MAXVALUE } from 'src/utils/values';

export class CreateResponsibleDto {
  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Identificador del responsable',
    example: 1,
  })
  @IsInt({
    message: "El campo 'idUser' debe ser un número entero",
  })
  @Min(1, {
    message: "El campo 'idUser' debe ser un valor positivo",
  })
  @IsNotEmpty({
    message: "El campo 'idUser' no puede estar vacío",
  })
  idUser: number;
}

export class CreateMeetingDto {
  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'Identificador de la programación',
    example: 1,
  })
  @IsInt({
    message: "El campo 'idDate' debe ser un número entero",
  })
  @Min(1, {
    message: "El campo 'idDate' debe ser un valor positivo",
  })
  @IsNotEmpty({
    message: "El campo 'idDate' no puede estar vacío",
  })
  idDate: number;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Zona del encuentro',
    example: 'N',
  })
  @IsString({
    message: "El campo 'zone' debe ser una cadena de texto",
  })
  @MaxLength(1, {
    message: "El campo 'zone' no puede exceder 1 carácter",
  })
  @IsNotEmpty({
    message: "El campo 'zone' no puede estar vacío",
  })
  @Matches(IsZoneRegex, {
    message: "El campo 'zone' debe ser una de las siguientes opciones: N, S",
  })
  zone: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Hora del encuentro',
    example: '16:00',
  })
  @IsString({
    message: "El campo 'hour' debe ser una cadena de texto",
  })
  @IsNotEmpty({
    message: "El campo 'hour' no puede estar vacío",
  })
  @Matches(IsHourRegex, {
    message: "El campo 'hour' debe tener el formato HH:mm",
  })
  hour: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Descripcion del encuentro',
    example: 'Los encuentros se realizarán en: ...',
  })
  @IsString({
    message: "El campo 'description' debe ser una cadena de texto",
  })
  @MinLength(1, {
    message: "El campo 'description' debe tener al menos 1 carácter",
  })
  @MaxLength(DESCRIPTION_MAXVALUE, {
    message: `El campo 'description' no puede tener más de ${DESCRIPTION_MAXVALUE} caracteres`,
  })
  @IsNotEmpty({
    message: "El campo 'description' no puede estar vacío",
  })
  description: string;

  @ApiProperty({
    type: [CreateResponsibleDto],
    required: true,
    description: 'Lista de responsables del encuentro',
    example: [
      {
        idUser: 1,
      },
      {
        idUser: 2,
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResponsibleDto)
  responsibles: CreateResponsibleDto[];
}
